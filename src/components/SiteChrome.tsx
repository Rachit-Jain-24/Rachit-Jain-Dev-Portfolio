import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

const NAV_LINKS = [
  { label: "About",      hash: "about" },
  { label: "Projects",   hash: "projects" },
  { label: "Research",   hash: "research" },
  { label: "Experience", hash: "experience" },
  { label: "Contact",    hash: "contact" },
];

// Theme toggle helper
function useTheme() {
  const [theme, setTheme] = useState("light");
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { theme, toggleTheme };
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          rachit<span className="text-brand">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="grid size-9 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-brand hover:text-brand md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {/* Animated bars */}
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-t border-border/70 transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-border/50 bg-background/95 px-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {/* Resume CTA in mobile menu */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="py-4 font-mono text-xs uppercase tracking-widest text-brand hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Resume ↓
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Contact</p>
        <h2 className="mt-3 max-w-xl font-mono text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
          Open to AI/ML engineering roles.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          I'm a 2026 B.Tech graduate in Computer Science & Engineering (Data Science) from NMIMS Hyderabad, actively looking for full-time roles in AI engineering, GenAI, and cloud infrastructure. Let's talk.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-background transition-opacity hover:opacity-85 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:border-brand hover:text-brand sm:px-4 sm:py-2.5 sm:text-xs"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:border-brand hover:text-brand sm:px-4 sm:py-2.5 sm:text-xs"
          >
            GitHub ↗
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:border-brand hover:text-brand sm:px-4 sm:py-2.5 sm:text-xs"
          >
            Resume ↓
          </a>
        </div>
        <p className="mt-12 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rachit Jain
        </p>
      </div>
    </footer>
  );
}
