import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
const nodeRequire = createRequire(import.meta.url);

// Compile the actual route with the project's existing TypeScript dependency.
// Isolate its module state and mock only the external email transport.
function loadContact() {
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(relative);
    if (cache.has(file)) return cache.get(file).exports;
    const compiled = { exports: {} };
    cache.set(file, compiled);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const localRequire = specifier => specifier.startsWith('@/') ? load(`src/${specifier.slice(2)}.ts`) : nodeRequire(specifier);
    new Function('require', 'module', 'exports', code)(localRequire, compiled, compiled.exports);
    return compiled.exports;
  }
  return { route: load('src/app/api/contact/route.ts'), input: load('src/lib/contact-input.ts'), limiter: load('src/lib/contact-rate-limit.ts') };
}
const valid = { name: 'Portfolio Test', email: 'visitor@example.org', inquiry: 'Freelance Project', message: 'A safe test inquiry about product design.', website: '', requestId: '0bcd1234-1234-4123-8123-123456789abc' };
function request(data = valid, headers = {}) {
  return new Request('http://localhost:3100/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof data === 'string' ? data : JSON.stringify(data) });
}

test('validates message boundaries, email headers, types, and enum values', () => {
  const { input: { validateContact } } = loadContact();
  assert.deepEqual(validateContact(valid).errors, {});
  for (const message of ['a'.repeat(10), 'a'.repeat(2000)]) assert.equal(validateContact({ ...valid, message }).errors.message, undefined);
  for (const message of ['short', 'a'.repeat(2001), 'hello\u0000world']) assert.ok(validateContact({ ...valid, message }).errors.message);
  for (const email of ['bad', 'test@example.org\r\nBcc:other@example.org', 'x@<bad>.org']) assert.ok(validateContact({ ...valid, email }).errors.email);
  assert.ok(validateContact({ ...valid, inquiry: 'Injected' }).errors.inquiry);
  assert.ok(validateContact({ ...valid, name: {} }).errors.name);
  assert.ok(Object.keys(validateContact(null).errors).length);
});

test('rejects invalid JSON, oversized requests, honeypots, bad fields and foreign origins', async () => {
  const cases = [
    ['{', {}, 400],
    ['null', {}, 400],
    ['x'.repeat(16385), {}, 413],
    [{ ...valid, website: 'bot.example' }, {}, 400],
    [{ ...valid, email: 'invalid' }, {}, 422],
    [{ ...valid, inquiry: 'unexpected' }, {}, 422],
    [{ ...valid, requestId: 'bad-id' }, {}, 400],
    [valid, { origin: 'https://other.example' }, 403],
    [valid, { 'content-type': 'text/plain' }, 415],
  ];
  for (const [body, headers, status] of cases) {
    const response = await loadContact().route.POST(request(body, headers));
    assert.equal(response.status, status);
    assert.notEqual((await response.json()).ok, true);
  }
});

test('unconfigured delivery fails honestly without calling a provider', async () => {
  const saved = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const response = await loadContact().route.POST(request());
    assert.equal(response.status, 503);
    const result = await response.json();
    assert.notEqual(result.ok, true);
    assert.ok(result.error.includes('email'));
  } finally {
    if (saved !== undefined) process.env.RESEND_API_KEY = saved;
  }
});

test('rate limit has a shared fallback, trusted IP isolation, expiry, and global ceiling', () => {
  const previous = process.env.CONTACT_TRUSTED_IP_HEADER;
  delete process.env.CONTACT_TRUSTED_IP_HEADER;
  try {
    const limiter = loadContact().limiter.contactRateLimit;
    for (let i = 0; i < 5; i++) assert.equal(limiter(new Headers({ 'x-forwarded-for': `192.0.2.${i}` }), 0), 0);
    assert.equal(limiter(new Headers({ 'x-forwarded-for': '192.0.2.99' }), 0), 600);
    assert.equal(limiter(new Headers(), 600001), 0);
    process.env.CONTACT_TRUSTED_IP_HEADER = 'x-verified-ip';
    const scoped = loadContact().limiter.contactRateLimit;
    for (let i = 1; i <= 30; i++) assert.equal(scoped(new Headers({ 'x-verified-ip': `192.0.2.${i}` }), 0), 0);
    assert.equal(scoped(new Headers({ 'x-verified-ip': '192.0.2.31' }), 0), 60);
  } finally {
    if (previous === undefined) delete process.env.CONTACT_TRUSTED_IP_HEADER;
    else process.env.CONTACT_TRUSTED_IP_HEADER = previous;
  }
});

test('route returns 429 with Retry-After after repeated attempts', async () => {
  const { route } = loadContact();
  for (let i = 0; i < 5; i++) await route.POST(request('{'));
  const response = await route.POST(request('{'));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get('Retry-After')) > 0);
  assert.notEqual((await response.json()).ok, true);
});

test('provider contract: trusted sender, Reply-To, escaped HTML, idempotency and honest failures', async () => {
  const savedEnv = { ...process.env };
  const originalFetch = global.fetch;
  process.env.RESEND_API_KEY = 'test-key-never-sent';
  process.env.CONTACT_FROM_EMAIL = 'contact@example.org';
  process.env.CONTACT_TO_EMAIL = 'owner@example.org';
  try {
    const { route } = loadContact();
    const calls = [];
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      calls.push(options);
      return Response.json({ id: 'mock-email-id' });
    };
    const input = { ...valid, name: '<img src=x onerror=alert(1)>', message: '<script>alert("test")</script> & safe text' };
    assert.equal((await route.POST(request(input))).status, 200);
    assert.equal((await route.POST(request(input))).status, 200);
    const email = JSON.parse(calls[0].body);
    assert.equal(email.from, 'Portfolio <contact@example.org>');
    assert.deepEqual(email.to, ['owner@example.org']);
    assert.equal(email.reply_to, input.email);
    assert.ok(email.html.includes('&lt;script&gt;'));
    assert.ok(!email.html.includes('<script>') && !email.html.includes('<img'));
    assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']);
    for (const mock of [async () => Response.json({ message: 'Provider private details' }, { status: 403 }), async () => Response.json({}), async () => { throw new Error('timeout'); }]) {
      global.fetch = mock;
      const response = await loadContact().route.POST(request());
      assert.equal(response.status, 502);
      const result = await response.json();
      assert.notEqual(result.ok, true);
      assert.ok(!JSON.stringify(result).includes('private details'));
    }
  } finally {
    global.fetch = originalFetch;
    for (const key of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']) {
      if (savedEnv[key] === undefined) delete process.env[key]; else process.env[key] = savedEnv[key];
    }
  }
});
