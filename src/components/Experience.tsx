"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export const revalidate = 0;

interface Job {
  company: string;
  role: string;
  date: string;
  bullets: string[];
}

interface ExperienceSectionData {
  title_years?: string;
  title_action?: string;
  jobs: Job[];
}

// THE UNIFIED HIGHLIGHT PARSER ENGINE
function HighlightedText({
  text,
  highlightColor = "#ff007f",
}: {
  text: string;
  highlightColor?: string;
}) {
  if (!text) return null;

  const parts = text.split(/~([^~]+)~/g);

  return (
    <>
      {parts.map((part, i) => {
        const isHighlighted = i % 2 !== 0;
        return isHighlighted ? (
          <span
            key={i}
            style={{
              color: highlightColor,
              fontWeight: 600,
              fontStyle: "normal",
            }}
          >
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

export default function Experience() {
  const [data, setData] = useState<ExperienceSectionData | null>(null);

  useEffect(() => {
    async function loadExperienceData() {
      const { data: row, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("id", "EXPERIENCE")
        .single();

      if (!error && row?.content) {
        setData(row.content as ExperienceSectionData);
      }
    }
    loadExperienceData();
  }, []);

  // Hardcoded Fallback Arrays to keep it perfectly safe if the DB is fetching or empty
  const fallbackJobs: Job[] = [
    {
      company: "GNC India (Guardian Group)",
      role: "Assistant Marketing Manager",
      date: "Aug 2024 — Dec 2025",
      bullets: [
        "Scaled Instagram from ~130K → 300K+ followers~",
        "Grew social-driven revenue from ~₹14K → ₹10L/month~",
        "Built in-house communities: ~100K+ WhatsApp~, 50K+ Instagram Broadcast",
        "Led end-to-end campaign strategy & execution for ~Project Creatine (1.0 & 2.0)~, ~Protein Wafer Bar~ & ~Nitro Surge Whey (with Dr. Randhawa)~",
        "Owned brand positioning & messaging across ~digital, influencer and marketplace~ channels",
        "Executed multi-tier ~influencer seeding~ (celebrity, Category A, nano & micro) to drive ~reach & conversions~",
        "Developed ~performance-driven content & creative strategy~ aligned with paid ads and growth goals",
        "Managed end-to-end content ecosystem across ~offline events, website, and marketplace (A+, PDPs, listings)~",
        "Led ~All Play No Work~ Internship, ~Run of Champions~, and ~multiple podcast series~",
        "Managed and mentored a ~team of 6~ content and community executives",
      ],
    },
    {
      company: "Buffalo Soldiers",
      role: "Senior Account Manager",
      date: "Jan 2024 — Aug 2024",
      bullets: [
        "Primary client advocate ensuring brand needs are met across all agency interactions",
        "Developed comprehensive brand strategies aligned with business objectives and market trends",
        "Project management, revenue growth, internal training sessions and business expansion",
      ],
    },
  ];

  const visibleJobs = data?.jobs || fallbackJobs;

  return (
    <section
      id="experience"
      style={{
        padding: "clamp(80px, 10vw, 100px) var(--px) var(--px)",
        background: "var(--black)",
      }}
    >
      <div className="sec-label">02 — Experience</div>

      {/* Dynamic Main Section Title */}
      <div className="sec-title ">
        <HighlightedText text={data?.title_years || "6 Years of"} />
        <br />
        <em style={{ fontStyle: "italic", color: "var(--purple)" }}>
          <HighlightedText text={data?.title_action || "Building Brands"} />
        </em>
      </div>

      <div
        style={{ position: "relative", paddingLeft: "clamp(16px, 4vw, 28px)" }}
      >
        {/* Vertical Timeline Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--border)",
          }}
        />

        {visibleJobs.map((job, i) => (
          <div
            key={`${job.company}-${i}`}
            style={{
              position: "relative",
              marginBottom: 52,
              paddingLeft: "clamp(24px, 4vw, 40px)",
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            {/* Timeline Dot */}
            <div
              style={{
                position: "absolute",
                left: "clamp(-20px, -3.5vw, -28px)",
                top: 8,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--purple)",
                boxShadow: "0 0 14px rgba(124, 58, 237, 0.65)",
                flexShrink: 0,
              }}
            />

            {/* Job Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(17px, 2.5vw, 22px)",
                    fontWeight: 700,
                  }}
                >
                  <HighlightedText text={job.company} />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--purple)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  <HighlightedText text={job.role} />
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--purple)",
                  letterSpacing: "2px",
                  paddingTop: 4,
                  whiteSpace: "nowrap",
                }}
              >
                <HighlightedText text={job.date} />
              </div>
            </div>

            {/* Bullets List */}
            <ul style={{ listStyle: "none" }}>
              {job.bullets &&
                job.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "clamp(12px, 1.4vw, 13px)",
                      color: "rgba(244, 239, 233, .58)",
                      lineHeight: 1.75,
                      marginBottom: 7,
                      paddingLeft: 16,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--purple)",
                        fontSize: 11,
                      }}
                    >
                      →
                    </span>
                    <HighlightedText text={bullet} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
