"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SocialLinks } from "./social-links";

type Theme = "light" | "dark" | "system";

// Survives the page's header remount; consumed only by a logo navigation.
let scrollHomeAfterLogoNavigation = false;

type PortfolioHeaderProps = {
  resumeHref: string | null;
};

const themes: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>;
  }

  if (theme === "dark") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>;
}

function ResumeControl({ resumeHref }: PortfolioHeaderProps) {
  if (resumeHref) {
    return <a className="nav-cta resume-cta" href={resumeHref} download="Zakharias_Priya_Resume.pdf">Download resume <span aria-hidden="true">↓</span></a>;
  }

  return <button className="nav-cta resume-cta" type="button" disabled title="A verified resume PDF is not available yet">Download resume <span aria-hidden="true">↓</span></button>;
}

function ThemePicker({
  theme,
  onChange,
  mobile = false,
}: {
  theme: Theme;
  onChange: (value: Theme) => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pickerId = useId();
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const currentTheme = themes.find((option) => option.value === theme) ?? themes[0];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectTheme(value: Theme) {
    onChange(value);
    setOpen(false);
  }

  return (
    <div
      className={`theme-picker${mobile ? " theme-picker-mobile" : ""}`}
      ref={pickerRef}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        className="theme-trigger"
        type="button"
        aria-label={`Color theme: ${currentTheme.label}`}
        aria-expanded={open}
        aria-controls={`theme-options-${pickerId}`}
        onClick={() => setOpen((value) => !value)}
      >
        <ThemeIcon theme={theme} />
        <span>{currentTheme.label}</span>
        <svg className={`theme-chevron${open ? " is-open" : ""}`} viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div className="theme-options" id={`theme-options-${pickerId}`} role="group" aria-label="Choose color theme" hidden={!open}>
        {themes.map((option) => (
          <button
            className="theme-option"
            key={option.value}
            type="button"
            aria-pressed={theme === option.value}
            onClick={() => selectTheme(option.value)}
          >
            <span className="theme-option-content">
              <ThemeIcon theme={option.value} />
              <span>{option.label}</span>
              <span className="theme-option-check" aria-hidden="true">{theme === option.value ? "✓" : ""}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PortfolioHeader({ resumeHref }: PortfolioHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname === "/" && scrollHomeAfterLogoNavigation) {
      scrollHomeAfterLogoNavigation = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    let initial: Theme = "system";
    try {
      const saved = localStorage.getItem("zp-theme");
      if (themes.some((option) => option.value === saved)) initial = saved as Theme;
    } catch {
      // Restricted storage uses the system preference, just like first paint.
    }
    const themeTimeout = window.setTimeout(() => setTheme(initial), 0);
    document.documentElement.dataset.theme = initial;
    return () => window.clearTimeout(themeTimeout);
  }, []);

  function changeTheme(value: Theme) {
    let applied = value;
    try {
      localStorage.setItem("zp-theme", value);
    } catch {
      applied = "system";
    }
    setTheme(applied);
    document.documentElement.dataset.theme = applied;
  }

  function closeMenu() { setMenuOpen(false); }

  return <header className="site-header" onKeyDown={(event) => {
    if (menuOpen && event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      menuToggleRef.current?.focus();
    }
  }}><div className="nav-wrap wrap">
    <Link className="wordmark" href="/" aria-label="Zakharias Priya home" onNavigate={(event) => {
      closeMenu();
      if (pathname === "/") {
        event.preventDefault();
        router.replace("/", { scroll: false });
        window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      } else {
        scrollHomeAfterLogoNavigation = true;
      }
    }}>ZP<span>.</span></Link>
    <nav className={`nav-links${menuOpen ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
      <Link href="/work" onClick={closeMenu}>Work</Link><Link href="/about" onClick={closeMenu}>About</Link><Link href="/contact" onClick={closeMenu}>Contact</Link>
      <div className="mobile-controls"><ThemePicker theme={theme} onChange={changeTheme} mobile /></div>
      <div className="mobile-menu-actions"><SocialLinks /><ResumeControl resumeHref={resumeHref} /></div>
    </nav>
    <div className="nav-actions"><ThemePicker theme={theme} onChange={changeTheme} /><SocialLinks /><ResumeControl resumeHref={resumeHref} /></div>
    <button ref={menuToggleRef} type="button" className="menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
  </div></header>;
}
