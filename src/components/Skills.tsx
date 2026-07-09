"use client";

import React, { useState } from "react";

interface BlockType {
  icon: string;
  title: string;
  tags: string[];
}

const blocks: BlockType[] = [
  {
    icon: "📱",
    title: "Social Media",
    tags: [
      "Instagram",
      "Facebook",
      "Twitter/X",
      "LinkedIn",
      "YouTube",
      "Community Building",
    ],
  },
  {
    icon: "🎯",
    title: "Brand Strategy",
    tags: [
      "Brand Identity",
      "Campaign Planning",
      "Content Strategy",
      "Market Research",
      "Competitor Analysis",
    ],
  },
  {
    icon: "📧",
    title: "Performance & Email",
    tags: [
      "Email Marketing",
      "Automation Tools",
      "Ad Campaigns",
      "Analytics",
      "Reporting",
    ],
  },
];

interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  const [h, setH] = useState(false);
  return (
    <span
      data-hover
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontSize: 11,
        padding: "5px 12px",
        border: `1px solid ${h ? "var(--purple)" : "var(--border)"}`,
        color: h ? "var(--purple)" : "rgba(244, 239, 233, .55)",
        background: h ? "rgba(124, 58, 237, 0.06)" : "transparent",
        transition: "all .2s",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

interface BlockProps {
  block: BlockType;
  delay: string;
}

function Block({ block, delay }: BlockProps) {
  const [h, setH] = useState(false);
  return (
    <div
      className="reveal"
      data-hover
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${h ? "rgba(124, 58, 237, 0.3)" : "var(--border)"}`,
        padding: "clamp(24px, 3vw, 34px) clamp(20px, 3vw, 30px)",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        transition: "all .3s",
        transitionDelay: delay,
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 14 }}>{block.icon}</div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--purple)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {block.title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {block.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "100px var(--px)", background: "var(--dark)" }}
    >
      <div className="sec-label">05 — Skills</div>
      <div className="sec-title reveal">
        What I<br />
        <em>Bring</em>
      </div>
      {/* 3-col → 2-col → 1-col */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: 2,
        }}
      >
        {blocks.map((b, i) => (
          <Block key={b.title} block={b} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
