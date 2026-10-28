"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const sectionLinks = [
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

const sectionIds = sectionLinks.map((link) => link.id);

function HomeLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate}>
      Home
    </Link>
  );
}

interface NavbarLinkProps {
  id: (typeof sectionLinks)[number]["id"];
  label: string;
  onNavigate?: () => void;
  onSelect?: (id: NavbarLinkProps["id"]) => void;
}

function NavbarLink({ id, label, onNavigate, onSelect }: NavbarLinkProps) {
  const href = `/#${id}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(id);

    if (window.location.pathname === "/" && target) {
      event.preventDefault();
      onSelect?.(id);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    }

    if (window.location.pathname !== "/") {
      onSelect?.(id);
    }

    onNavigate?.();
  }

  return (
    <Link href={href} onClick={handleClick}>
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    function closeMenuOnDesktop() {
      if (desktopQuery.matches) {
        setIsMenuOpen(false);
        setIsMenuRendered(false);
      }
    }

    desktopQuery.addEventListener("change", closeMenuOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 24);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    function updateActiveSection() {
      if (pathname === "/services") {
        setActiveSection("services");
      } else if (pathname === "/") {
        setActiveSection(window.location.hash.slice(1) || null);
      } else {
        setActiveSection(null);
      }
    }

    updateActiveSection();

    if (pathname !== "/") {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuRendered) {
      return;
    }

    document.body.style.overflow = "hidden";
    if (isMenuOpen) {
      closeButtonRef.current?.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isMenuRendered]);

  function openMenu() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsMenuRendered(true);
    requestAnimationFrame(() => setIsMenuOpen(true));
  }

  function closeMenu() {
    setIsMenuOpen(false);
    closeTimerRef.current = window.setTimeout(() => {
      setIsMenuRendered(false);
      closeTimerRef.current = null;
    }, 320);
  }

  const displayedActiveSection = pathname === "/" ? activeSection : null;
  const activeNavigationSection =
    pathname === "/services"
      ? activeSection ?? "services"
      : displayedActiveSection;

  return (
    <header
      className={`site-navbar${isScrolled ? " site-navbar--scrolled" : ""}`}
    >
      <div className="site-navbar__mobile">
        <button
          type="button"
          className="site-navbar__icon-button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={openMenu}
        >
          <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
        </button>
        <Link className="site-navbar__book" href="/book">
          Book
        </Link>
      </div>

      <nav className="site-navbar__desktop" aria-label="Primary navigation">
        <div className="site-navbar__links">
          <span
            className={
              pathname === "/" && activeSection === null
                ? "site-navbar__link site-navbar__link--active"
                : "site-navbar__link"
            }
          >
            <HomeLink />
          </span>
          {sectionLinks.map((link) => (
            <span
              className={
                activeNavigationSection === link.id
                  ? "site-navbar__link site-navbar__link--active"
                  : "site-navbar__link"
              }
              key={link.id}
            >
              <NavbarLink
                {...link}
                onSelect={setActiveSection}
              />
            </span>
          ))}
        </div>
        <Link className="site-navbar__book" href="/book">
          Book
        </Link>
      </nav>

      {isMenuRendered ? (
        <div
          className={`site-navbar__overlay${isMenuOpen ? " site-navbar__overlay--open" : ""}`}
          onClick={closeMenu}
        >
          <nav
            ref={menuRef}
            id="mobile-navigation"
            className={`site-navbar__sheet${isMenuOpen ? " site-navbar__sheet--open" : ""}`}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="site-navbar__close"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <X aria-hidden="true" size={28} strokeWidth={1.5} />
            </button>
            <div className="site-navbar__sheet-links">
              <HomeLink onNavigate={closeMenu} />
              {sectionLinks.map((link) => (
                <NavbarLink
                  key={link.id}
                  {...link}
                  onSelect={setActiveSection}
                  onNavigate={closeMenu}
                />
              ))}
              <Link href="/#contact" onClick={closeMenu}>
                Call
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
