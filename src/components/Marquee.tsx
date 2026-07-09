"use client";

import React from "react";

const items: string[] = [
  "Social Media Strategy",
  "Brand Marketing",
  "Content Creation",
  "Email Marketing",
  "Client Servicing",
  "Campaign Management",
  "Community Building",
  "Analytics & Reporting",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "13px 0",
        overflow: "hidden",
        background: "var(--dark)",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 32s linear infinite",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`marquee-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 40,
              padding: "0 20px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              fontStyle: "italic",
              color: "var(--muted)",
              letterSpacing: 1,
              flexShrink: 0,
            }}
          >
            {item}
            <span
              style={{
                color: "var(--purple)",
                fontSize: 16,
                fontStyle: "normal",
                flexShrink: 0,
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
