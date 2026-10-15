const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zakharias-priya-7715b9208/", path: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67ZM7 8.22a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.18c0-1-.02-2.3-1.4-2.3-1.4 0-1.61 1.1-1.61 2.23V18H10V9.4h2.56v1.17h.04a2.8 2.8 0 0 1 2.52-1.39c2.69 0 3.2 1.77 3.2 4.07Z" },
  { label: "Behance", href: "https://www.behance.net/priyazakharias", path: "M1 5h6c3 0 4.5 1.5 4.5 3.5 0 1.5-.7 2.4-1.8 2.9 1.6.5 2.4 1.7 2.4 3.4C12.1 17.5 10 19 7 19H1V5Zm3 5.5h2.7c1.2 0 1.8-.5 1.8-1.4S7.9 7.7 6.7 7.7H4v2.8Zm0 5.8h3c1.4 0 2.1-.5 2.1-1.6S8.4 13 7 13H4v3.3ZM15 5h7v2h-7V5Zm8.7 9.8h-7.5c.1 1.5.9 2.2 2.3 2.2 1 0 1.8-.5 2-1.1h2.9c-.9 2.3-2.5 3.4-5 3.4-3.4 0-5.4-2.3-5.4-5.6 0-3.2 2.2-5.6 5.4-5.6 3.6 0 5.5 2.8 5.3 6.7Zm-7.5-1.9h4.5c-.2-1.3-.8-2-2.2-2-1.2 0-2 .8-2.3 2Z" },
];

export function SocialLinks() {
  return <div className="social-links">{profiles.map(({ label, href, path }) => <a key={label} className="social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile (opens in a new tab)`} title={label}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={path} /></svg></a>)}</div>;
}
