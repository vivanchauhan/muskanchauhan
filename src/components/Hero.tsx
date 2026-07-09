"use client";

import React, { useEffect, useState } from "react";
import Animated from "./animated";
import herohover from "../images/hero.png";
import { supabase } from "@/utils/supabase";

interface HeroData {
  subtitle?: string;
  title_line1?: string;
  title_line2?: string;
  description?: string;
  metric1_val?: string;
  metric1_lbl?: string;
  metric2_val?: string;
  metric2_lbl?: string;
  metric3_val?: string;
  metric3_lbl?: string;
  location_text?: string;
}

// REUSABLE HIGHLIGHT PARSER ENGINE
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

export default function Hero() {
  const [dbData, setDbData] = useState<HeroData | null>(null);

  // useEffect(() => {
  //   supabase
  //     .from("portfolio_content")
  //     .select("*")
  //     .then(({ data, error }) => {
  //       if (error) {
  //         console.error("Error fetching Hero data directly:", error.message);
  //         return;
  //       }

  //       const heroRow = data?.find((row) => row.id === "HERO");

  //       if (heroRow) {
  //         setDbData(heroRow.content || heroRow);
  //       }
  //     })
  //     .catch((err) => console.error("Hero mount fetch error:", err));
  // }, []);
  useEffect(() => {
    async function loadHero() {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("id", "HERO")
        .single();

      if (error) {
        console.error("Hero fetch error:", error.message);
        return;
      }

      setDbData(data.content as HeroData);
    }

    loadHero();
  }, []);

  const metrics: [string, string][] = [
    [dbData?.metric1_val || "6+", dbData?.metric1_lbl || "Years Exp."],
    [dbData?.metric2_val || "15+", dbData?.metric2_lbl || "Brands Managed"],
    [dbData?.metric3_val || "300K+", dbData?.metric3_lbl || "Followers Scaled"],
  ];
  // detecting the screen width in React
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 940);

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "clamp(0px, 0vw, 100px) var(--px) 0 var(--px)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          // gap: "40px",
          gap: "clamp(20px, 4vw, 40px)",
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            top: -150,
            right: -150,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            bottom: 80,
            left: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            inset: 0,
            background:
              "linear-gradient(to right, var(--black) 45%, transparent 80%), linear-gradient(to top, var(--black) 0%, transparent 35%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            right: -30,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(100px, 18vw, 280px)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "rgba(124,58,237,0.035)",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          Creative
        </div>

        {/* CONTENT AREA */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 700,
          }}
        >
          {/* SUBTITLE */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "var(--purple)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
              animation: "fadeUp 1s .2s ease both",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: 36,
                height: 1,
                background: "var(--purple)",
                display: "block",
                flexShrink: 0,
              }}
            />
            <HighlightedText
              text={dbData?.subtitle || "Brand & Social Media Strategist"}
            />
          </div>

          {/* MAIN H1 TITLES */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 9.5vw, 136px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: -2,
              marginBottom: 12,
            }}
          >
            <span style={{ overflow: "hidden", display: "block" }}>
              <span
                style={{
                  display: "block",
                  animation: "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                <HighlightedText text={dbData?.title_line1 || "Muskan."} />
              </span>
            </span>
            <span style={{ overflow: "hidden", display: "block" }}>
              <span
                style={{
                  display: "block",
                  animation:
                    "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) .12s both",
                  fontStyle: "italic",
                  color: "var(--purple)",
                }}
              >
                <HighlightedText text={dbData?.title_line2 || "Chauhan"} />
              </span>
            </span>
          </h1>

          {/* LOCATION META STRINGS */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(9px, 1.5vw, 11px)",
              color: "var(--muted)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 24,
              animation: "fadeUp 1s .3s ease both",
            }}
          >
            <HighlightedText
              text={
                dbData?.location_text ||
                "6 Years · Noida, India · Open to Opportunities"
              }
            />
          </div>

          {/* DESCRIPTIVE BODY BLOCK */}
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "rgba(244, 239, 233, .58)",
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 500,
              marginBottom: 40,
              animation: "fadeUp 1s .4s ease both",
            }}
          >
            <HighlightedText
              text={
                dbData?.description ||
                "Crafting bold brand identities and social strategies that move numbers. From scaling Instagram pages to ₹7.5L/month revenue — I don't just manage brands, I build them."
              }
            />
          </p>

          {/* METRIC CARD MAPPING (Preserved layout styles) */}
          <div
            style={{
              display: "flex",
              gap: "clamp(20px, 4vw, 52px)",
              marginBottom: 44,
              animation: "fadeUp 1s .5s ease both",
              flexWrap: "wrap",
            }}
          >
            {metrics.map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(32px, 5vw, 46px)",
                    fontWeight: 900,
                    color: "var(--purple)",
                    lineHeight: 1,
                    letterSpacing: -1,
                  }}
                >
                  <HighlightedText text={n} />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  <HighlightedText text={l} />
                </div>
              </div>
            ))}
          </div>

          {/* <div
            style={{
              display: "flex",
              gap: 12,
              animation: "fadeUp 1s .6s ease both",
              flexWrap: "wrap",
            }}
          >
            <a href="#work" className="btn-purple">
              View My Work
            </a>
            <a href="#contact" className="btn-ghost">
              Get In Touch
            </a>
          </div> */}
          <div className="hero-buttons">
            <a href="#work" className="btn-purple">
              View My Work
            </a>
            <a href="#contact" className="btn-ghost">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "var(--px)",
            zIndex: 2,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "var(--muted)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 12,
            animation: "fadeUp 1s .8s ease both",
          }}
        >
          <div
            style={{
              width: 1,
              height: 44,
              background:
                "linear-gradient(to bottom, var(--purple), transparent)",
              animation: "scrollAnim 2s ease infinite",
            }}
          />
          Scroll
        </div>

        {/* PHOTO AREA */}
        {/* <div
          className="hero-visual-area"
          style={{ position: "relative", zIndex: 3 }}
        > */}
        {/* <div
          className="hero-visual-area"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div className="show-desktop">
            <Animated />
          </div>
          <div className="show-mobile">
            <div className="mobile-glow" />
            <img
              src={herohover?.src || herohover}
              alt="Muskan Chauhan"
              className="mobile-avatar"
            />
          </div>
        </div> */}
        <div className="hero-visual-area">
          {isDesktop ? (
            <Animated />
          ) : (
            <>
              <div className="mobile-glow" />
              <img
                src={herohover.src}
                alt="Muskan Chauhan"
                className="mobile-avatar"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
