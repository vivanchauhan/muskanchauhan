"use client";

import React, { useState } from "react";

interface Brand {
  name: string;
  cat: string;
}

interface BrandCardProps {
  brand: Brand;
  delay: string;
}

const brands: Brand[] = [
  { name: "HouseEazy", cat: "Prop Tech" },
  { name: "HouseCanvas", cat: "Interior Designing" },
  { name: "GNC India", cat: "Health & Wellness" },
  { name: "One8 Commune", cat: "Fashion" },
  { name: "Snitch", cat: "Fashion" },

  { name: "Forever New India", cat: "Fashion & Lifestyle" },
  { name: "Hyundai India", cat: "Automotive" },
  { name: "MPL", cat: "Gaming & Sports" },
  { name: "Sabhyata", cat: "Indian Fashion" },
  { name: "Chique Studios", cat: "Fashion" },
  { name: "Estele", cat: "Jewellery" },
  { name: "Plush", cat: "Lifestyle" },
  { name: "Ramagya Group", cat: "Education" },
  { name: "Mobikwik", cat: "Fintech" },
  { name: "Alcis Sports", cat: "Sportswear" },
  { name: "London Essence Co.", cat: "Premium Beverages" },
  { name: "Britvic Mixers", cat: "Beverages" },
  { name: "Parker Pens", cat: "Consumer Goods" },
  { name: "Gulshan Group", cat: "Real Estate" },
];

function BrandCard({ brand, delay }: BrandCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(124, 58, 237, 0.04)" : "var(--card)",
        border: `1px solid ${hovered ? "rgba(124, 58, 237, 0.4)" : "var(--border)"}`,
        padding: "clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 22px)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.25s",
        transitionDelay: delay,
        cursor: "default",
        minWidth: 0, // prevents overflow inside grid
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(13px, 1.6vw, 17px)",
          fontWeight: 700,
          marginBottom: 5,
          color: hovered ? "var(--purple)" : "var(--white)",
          transition: "color 0.25s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {brand.name}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px, 0.9vw, 10px)",
          color: "var(--muted)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {brand.cat}
      </div>
    </div>
  );
}

export default function Brands() {
  return (
    <section
      id="brands"
      style={{
        padding: "clamp(80px, 10vw, 100px) var(--px) 20px var(--px)",
        background: "var(--dark)",
      }}
    >
      <div className="sec-label">03 — Brands</div>
      <div className="sec-title reveal">
        Brands I've
        <br />
        <em>Shaped</em>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 190px), 1fr))",
          gap: 2,
        }}
      >
        {brands.map((b, i) => (
          <BrandCard key={b.name} brand={b} delay={`${i * 0.04}s`} />
        ))}
      </div>
    </section>
  );
}
