"use client";

import { useRef, useState, type FormEvent } from "react";
import { inquiryTypes, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact-input";
import { ContactIcon } from "./contact-icons";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const submitting = useRef(false);
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const { values, errors: fieldErrors } = validateContact(data);
    setErrors(fieldErrors);
    setStatus(null);
    if (Object.keys(fieldErrors).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      const payload = JSON.stringify(values);
      if (attempt.current?.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: data.website, requestId: attempt.current.id }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (result.errors && typeof result.errors === "object") {
          const serverErrors: ContactErrors = {};
          for (const key of ["name", "email", "inquiry", "message"] as const) if (typeof result.errors[key] === "string") serverErrors[key] = result.errors[key];
          setErrors(serverErrors);
        }
        throw new Error(typeof result.error === "string" ? result.error : "Your message could not be sent. Please retry.");
      }
      setStatus({ type: "success", message: "Thank you for reaching out. Your message has been accepted by the email service for delivery." });
      form.reset();
      attempt.current = null;
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error && error.name === "Error" ? error.message : "Sending could not be confirmed. Check your connection and try again." });
    } finally {
      submitting.current = false;
      setPending(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  function validateField(event: FormEvent<HTMLFormElement>) {
    if (submitting.current) return;
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) || field.name === "website") return;
    const key = field.name as keyof ContactValues;
    const { errors: fieldErrors } = validateContact(Object.fromEntries(new FormData(event.currentTarget)));
    setErrors(previous => ({ ...previous, [key]: fieldErrors[key] }));
  }

  return <section className="contact-form-panel" aria-labelledby="contact-form-heading">
    <h2 id="contact-form-heading">Tell me what you have in mind<span className="period">.</span></h2>
    <p className="contact-form-intro">A role, a product, or an idea — I’d love to hear about it.</p>
    <p className="contact-form-note">Name, email, and inquiry type are required. Message is optional.</p>
    <form method="post" action="/api/contact" noValidate onSubmit={submit} onBlur={validateField} aria-busy={pending}>
      <fieldset disabled={pending}>
        <div className="contact-field">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errors.name && <p className="contact-field-error" id="contact-name-error">{errors.name}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} spellCheck={false} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errors.email && <p className="contact-field-error" id="contact-email-error">{errors.email}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-inquiry">Inquiry type</label>
          <div className="contact-select">
            <select id="contact-inquiry" name="inquiry" required defaultValue="" aria-invalid={!!errors.inquiry} aria-describedby={errors.inquiry ? "contact-inquiry-error" : undefined}>
              <option value="" disabled>Select an inquiry type</option>
              {inquiryTypes.map(type => <option key={type}>{type}</option>)}
            </select>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </div>
          {errors.inquiry && <p className="contact-field-error" id="contact-inquiry-error">{errors.inquiry}</p>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">Message <span className="contact-optional">(Optional)</span></label>
          <textarea id="contact-message" name="message" rows={5} minLength={10} maxLength={2000} aria-invalid={!!errors.message} aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`} />
          <p className="contact-field-hint" id="contact-message-hint">Optional. If provided, use 10–2000 characters after trimming. Your details are used to respond to your inquiry.</p>
          {errors.message && <p className="contact-field-error" id="contact-message-error">{errors.message}</p>}
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="button button-dark contact-submit" type="submit" disabled={pending}>{pending ? "Sending…" : "Send message"}<ContactIcon name="arrow" /></button>
      </fieldset>
      <div ref={statusRef} className={`contact-form-status${status ? ` is-${status.type}` : ""}`} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true">
        {status && <><p>{status.message}</p>{status.type === "error" && <p>Your message is still here. Use Send message to retry, or <a href="mailto:priyazakharias@gmail.com">email me directly</a>.</p>}</>}
      </div>
      <noscript><p>JavaScript is needed to submit this form. Please <a href="mailto:priyazakharias@gmail.com">email me directly</a> instead.</p></noscript>
    </form>
  </section>;
}
