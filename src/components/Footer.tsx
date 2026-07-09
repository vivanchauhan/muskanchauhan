"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const targetUrl = "/admin/login";

  // Handles both standard left click and scroll-wheel middle click
  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      // Left Click -> Navigate in same tab
      e.preventDefault();
      router.push(targetUrl);
    } else if (e.button === 1) {
      // Middle Click -> Open in a new tab
      e.preventDefault();
      window.open(targetUrl, "_blank");
    }
  };

  return (
    <footer
      style={{
        padding: "24px var(--px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontStyle: "italic",
          color: "var(--muted)",
        }}
      >
        Muskan Chauhan
      </div>

      {/* Updated Copyright Div */}
      <div
        onMouseUp={handleNavigation}
        onAuxClick={(e) => {
          if (e.button === 1) e.preventDefault(); // Prevents default auto-scroll icon behavior
        }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--muted)",
          letterSpacing: 1,
          userSelect: "none",
        }}
      >
        © {currentYear} — Brand Marketing Manager
      </div>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--muted)",
          letterSpacing: 1,
        }}
      >
        Noida, Uttar Pradesh · India
      </div>
    </footer>
  );
}
