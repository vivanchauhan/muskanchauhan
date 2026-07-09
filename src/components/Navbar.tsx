"use client";

import React, { useState, useEffect } from "react";

const links: string[] = ["About", "Experience", "Brands", "Work", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "16px var(--px)" : "28px var(--px)",
          background: scrolled ? "rgba(6,6,6,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 19,
            fontStyle: "italic",
            color: "var(--white)",
            textDecoration: "none",
            zIndex: 101,
          }}
        >
          Muskan<span style={{ color: "var(--purple)" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul
          className="nav-desktop"
          style={{ display: "flex", gap: 36, listStyle: "none" }}
        >
          {links.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  cursor: "none",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "var(--purple)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="btn-purple nav-desktop"
          style={{ padding: "10px 22px", fontSize: 10, letterSpacing: "2px" }}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ zIndex: 101 }}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={close}>
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="btn-purple"
          style={{ marginTop: 16 }}
          onClick={close}
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
