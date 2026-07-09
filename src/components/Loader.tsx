"use client";

import React, { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--black)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hide ? 0 : 1,
        visibility: hide ? "hidden" : "visible",
        transition: "opacity 0.7s ease, visibility 0.7s",
        pointerEvents: hide ? "none" : "all",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 8vw, 56px)",
          fontStyle: "italic",
          color: "var(--white)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {"Muskan".split("").map((l, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s both`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: "linear-gradient(90deg, var(--purple), var(--purp2))",
          animation: "loaderBar 1.9s ease forwards",
          boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
        }}
      />
    </div>
  );
}
