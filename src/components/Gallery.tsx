"use client";

import React, { useState } from "react";
import GNC1 from "../images/img6.jpeg";
import GNC2 from "../images/img7.jpeg";
import GNC3 from "../images/img10.jpeg";
import GNC4 from "../images/img9.jpeg";
import GNC5 from "../images/img11.jpeg";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import img6 from "../images/trial1.png";
import img7 from "../images/trial2.png";

import reel1 from "../images/reel1.png";
import reel2 from "../images/reel2.png";
import reel3 from "../images/reel3.png";
import reel4 from "../images/reel4.png";
import reel5 from "../images/reel5.png";
import reel6 from "../images/reel6.png";
import reel7 from "../images/reel7.png";
import reel8 from "../images/reel8.png";

// Enforcing structure for the scrolling carousel arrays
interface GalleryItem {
  type: "img" | string;
  src?: any; // Supports imported image asset objects or string paths
  label: string;
  link?: string;
  icon?: string;
  brand?: string;
}

interface CardProps {
  item: GalleryItem;
  width: string;
  height: string;
}

const row1: GalleryItem[] = [
  { type: "img", src: img6, label: "" },
  { type: "img", src: img7, label: "" },
  { type: "img", src: img1, label: "" },
  { type: "img", src: img2, label: "" },
  { type: "img", src: img3, label: "" },
  { type: "img", src: img4, label: "" },
  { type: "img", src: img5, label: "" },
  { type: "img", src: GNC1, label: "GNC" },
  { type: "img", src: GNC2, label: "GNC" },
  { type: "img", src: GNC3, label: "GNC" },
  { type: "img", src: GNC4, label: "GNC" },
  { type: "img", src: GNC5, label: "GNC" },
];

const row2: GalleryItem[] = [
  {
    type: "img",
    src: reel1,
    label: "GNC Podcast with Sandeep Singh",
    link: "https://www.instagram.com/reels/DOJGO1pEufK/",
  },
  {
    type: "img",
    src: reel2,
    label: "GNC Podcast reel",
    link: "https://www.instagram.com/reels/DJOd518yNLb/",
  },
  {
    type: "img",
    src: reel3,
    label: "Mother’s Day reel",
    link: "https://www.instagram.com/reels/DJfzqNbzNVb/",
  },
  {
    type: "img",
    src: reel4,
    label: "Wafer Bouquet",
    link: "https://www.instagram.com/reels/DM0IThpyKvU/",
  },
  {
    type: "img",
    src: reel5,
    label: "GNC Creatine reel",
    link: "https://www.instagram.com/reels/DJGnM2SopaH/",
  },
  {
    type: "img",
    src: reel6,
    label: "GNC Podcast reel",
    link: "https://www.instagram.com/reels/DIGEwJwyoYL/",
  },
  {
    type: "img",
    src: reel7,
    label: "GNC animated reel",
    link: "https://www.instagram.com/reels/DH8bsL3Tt_1/",
  },
  {
    type: "img",
    src: reel8,
    label: "Strength isn’t given. It’s built. 💪✨",
    link: "https://www.instagram.com/reels/DG5dcsVy1r_/",
  },
];

function Card({ item, width, height }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  if (item.type === "img") {
    return (
      <div
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        style={{
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--border)",
          cursor: item.link ? "pointer" : "default",
          width: width,
          height: height,
        }}
      >
        <img
          src={item.src?.src || item.src} // Clean fallback match for Next.js image imports vs paths
          alt={item.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "var(--card)",
            transition: "transform .5s, filter .5s",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: hovered ? "grayscale(0%)" : "grayscale(25%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(6,6,6,.85) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity .3s",
            display: "flex",
            alignItems: "flex-end",
            padding: 14,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "var(--purple)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        background: "var(--card)",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.35)" : "var(--border)"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        transition: "border-color .3s",
        cursor: "default",
        width: width,
        height: height,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 60%)",
        }}
      />
      <span style={{ fontSize: 24, opacity: 0.3 }}>{item.icon}</span>
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 13,
          color: "var(--purple)",
          fontStyle: "italic",
          position: "relative",
        }}
      >
        {item.brand}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--muted)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          position: "relative",
        }}
      >
        {item.label}
      </span>
    </div>
  );
}

export default function Gallery() {
  const r1 = [...row1, ...row1];
  const r2 = [...row2, ...row2];

  return (
    <section
      id="work"
      style={{
        padding: "100px 0",
        background: "var(--black)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "0 var(--px)", marginBottom: 48 }}>
        <div className="sec-label">04 — Campaigns</div>
        <div className="sec-title reveal">
          Campaign <em>Showcase</em>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ overflow: "hidden", marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            animation: "gallScroll 50s linear infinite",
            width: "max-content",
            height: "clamp(280px, 24vw, 380px)",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {r1.map((item, i) => (
            <Card
              key={`r1-${i}`}
              item={item}
              width="clamp(380px, 45vw, 580px)"
              height="clamp(200px, 24vw, 280px)"
            />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            animation: "gallScroll2 30s linear infinite",
            width: "max-content",
            height: "clamp(380px, 24vw, 480px)",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {r2.map((item, i) => (
            <Card
              key={`r2-${i}`}
              item={item}
              width="clamp(220px, 28vw, 300px)"
              height="clamp(220px, 28vw, 300px)"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
