"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const skills = [
  ["Social Media Marketing", "95%"],
  ["Brand Strategy", "90%"],
  ["Content Creation", "92%"],
  ["Email Marketing", "85%"],
  ["Client Servicing", "96%"],
];

interface AboutData {
  heading_main: string;
  heading_sub: string;
  paragraphs: string[];
  image_url: string;
}

// 1. REUSABLE PARSER HELPER COMPONENT
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

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function loadAboutData() {
  //     const { data: row, error } = await supabase
  //       .from("portfolio_content")
  //       .select("content")
  //       .eq("id", "ABOUT")
  //       .single();

  //     if (!error && row?.content) {
  //       setData(row.content as AboutData);
  //     } else if (error) {
  //       console.error("About fetch error:", error.message);
  //       setLoadError(error.message);
  //     }
  //   }
  //   loadAboutData();
  // }, []);
  useEffect(() => {
    let mounted = true;

    async function loadAboutData() {
      const { data: row, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("id", "ABOUT")
        .single();

      if (!mounted) return;

      if (!error && row?.content) {
        setData(row.content as AboutData);
      } else if (error) {
        console.error("About fetch error:", error.message);
        setLoadError(error.message);
      }
    }

    loadAboutData();

    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <section
        id="about"
        style={{
          padding: "100px var(--px)",
          background: "var(--dark)",
        }}
      >
        <div className="sec-label">01 — About</div>

        {loadError && (
          <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 24 }}>
            Couldn't load this section right now.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* Image Placeholder */}
          <div
            style={{
              width: "100%",
              maxWidth: 440,
              aspectRatio: "3/4",
              background: "#242424",
              border: "1px solid var(--border)",
              borderRadius: 8,
              animation: "pulse 1.6s infinite ease-in-out",
            }}
          />

          {/* Text Placeholder */}
          <div>
            <div
              style={{
                width: "60%",
                height: 52,
                background: "#242424",
                borderRadius: 6,
                marginBottom: 28,
                animation: "pulse 1.6s infinite ease-in-out",
              }}
            />

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: `${100 - i * 10}%`,
                  height: 14,
                  background: "#242424",
                  borderRadius: 4,
                  marginBottom: 14,
                  animation: "pulse 1.6s infinite ease-in-out",
                }}
              />
            ))}

            <div style={{ marginTop: 40 }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 36,
                    borderBottom: "1px solid var(--border)",
                    marginBottom: 12,
                    background:
                      "linear-gradient(90deg, #242424 25%, #303030 50%, #242424 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s linear infinite",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const imageSource = data.image_url || "/images/muskan.jpg";
  return (
    <section
      id="about"
      style={{ padding: "100px var(--px)", background: "var(--dark)" }}
    >
      <div className="sec-label">01 — About</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
      >
        {/* Photo Container */}
        <div className="reveal">
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 440,
                aspectRatio: "3/4",
                background: "var(--card)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <img
                src={imageSource}
                alt="Muskan Chauhan"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/muskan.jpg";
                }}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "grayscale(15%)",
                  transition: "filter .5s, transform .5s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(15%)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: "#fff",
                  background: "var(--purple)",
                  padding: "6px 12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Muskan Chauhan
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -14,
                right: 14,
                width: 64,
                height: 64,
                background: "var(--purple)",
                zIndex: -1,
              }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="reveal" style={{ transitionDelay: ".15s" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            <HighlightedText text={data.heading_main || "The"} />{" "}
            <em style={{ fontStyle: "italic" }}>
              <HighlightedText text={data.heading_sub || "Story"} />
            </em>
          </div>

          {data.paragraphs &&
            data.paragraphs.map((para, index) => (
              <p
                key={index}
                style={{
                  fontSize: 14,
                  color: "rgba(244, 239, 233, .62)",
                  lineHeight: 1.9,
                  fontWeight: 300,
                  marginBottom: index === data.paragraphs.length - 1 ? 32 : 16,
                }}
              >
                <HighlightedText text={para} />
              </p>
            ))}

          <div className="sec-label" style={{ marginBottom: 14 }}>
            Core Skills
          </div>
          {skills.map(([name, pct]) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
                {name}
              </span>
              <div
                style={{
                  width: "clamp(80px, 15vw, 140px)",
                  height: 2,
                  background: "var(--border)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: pct,
                    background:
                      "linear-gradient(90deg, var(--purple), var(--purp2))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
