"use client";

import React, { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

type SubmissionStatus = null | "sending" | "ok" | "err";

// 1. Cleanly isolate static configs outside the component space
const CONTACT_INFO = [
  ["Email", "muskanchauhan@zohomail.in", "mailto:muskanchauhan@zohomail.in"],
  ["Phone", "+91 9773510992", "tel:+919773510992"],
  ["Based", "Noida, Uttar Pradesh", null],
  [
    "LinkedIn",
    "linkedin.com/in/muskan-chauhan",
    "https://www.linkedin.com/in/muskan-chauhan-613a79187/",
  ],
] as const;

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 9,
  color: "var(--purple)",
  letterSpacing: "2px",
  textTransform: "uppercase",
  padding: "10px 14px 0",
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderBottom: "none",
  display: "block",
};

const fieldStyle: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderTop: "none",
  color: "var(--white)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  fontWeight: 300,
  padding: "12px 14px 14px",
  outline: "none",
  width: "100%",
  transition: "border-color .3s",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmissionStatus>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Keeping the standard event handler async is perfectly valid!
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("ok");
        setForm({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => setStatus(null), 4000);
      } else {
        throw new Error();
      }
    } catch {
      setStatus("err");
    }
  };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setStatus("sending");
  //   try {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  //     const res = await fetch(`${apiUrl}/api/contact`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });
  //     if (res.ok) {
  //       setStatus("ok");
  //       setForm({ name: "", email: "", message: "" });
  //       setTimeout(() => setStatus(null), 4000);
  //     } else {
  //       throw new Error();
  //     }
  //   } catch {
  //     setStatus("err");
  //   }
  // };

  return (
    <section
      id="contact"
      style={{ padding: "100px var(--px)", background: "var(--black)" }}
    >
      <div className="sec-label">06 — Contact</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
      >
        {/* Left info */}
        <div className="reveal">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5.5vw, 80px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -1,
              marginBottom: 32,
            }}
          >
            Let's Create
            <br />
            Something{" "}
            <em style={{ fontStyle: "italic", color: "var(--purple)" }}>
              Bold
            </em>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {CONTACT_INFO.map(([label, val, href]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "var(--purple)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    width: 68,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{
                      fontSize: 13,
                      color: "rgba(244, 239, 233, .6)",
                      textDecoration: "none",
                      transition: "color .3s",
                      cursor: "none",
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      (e.currentTarget.style.color = "var(--purple)")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      (e.currentTarget.style.color = "rgba(244, 239, 233, .6)")
                    }
                  >
                    {val}
                  </a>
                ) : (
                  <span
                    style={{ fontSize: 13, color: "rgba(244, 239, 233, .6)" }}
                  >
                    {val}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="reveal" style={{ transitionDelay: ".15s" }}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
                gap: 2,
                marginBottom: 2,
              }}
            >
              {[
                ["name", "Name", "Your name", "text"],
                ["email", "Email", "your@email.com", "email"],
              ].map(([id, lbl, ph, type]) => (
                <div key={id}>
                  <label htmlFor={id} style={labelStyle}>
                    {lbl}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={ph}
                    value={form[id]}
                    onChange={handleChange}
                    required
                    style={fieldStyle}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(124, 58, 237, .5)")
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              ))}
            </div>

            {/* Message */}
            <div style={{ marginBottom: 2 }}>
              <label htmlFor="message" style={labelStyle}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
                style={{
                  ...fieldStyle,
                  minHeight: 140,
                  lineHeight: 1.7,
                  resize: "vertical",
                }}
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                  (e.currentTarget.style.borderColor = "rgba(124, 58, 237, .5)")
                }
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--purple)",
                color: "#fff",
                border: "1px solid var(--purple)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                cursor: status === "sending" ? "not-allowed" : "none",
                opacity: status === "sending" ? 0.6 : 1,
                transition: "all .3s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (status !== "sending") {
                  e.currentTarget.style.background = "var(--purp2)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(124, 58, 237, 0.35)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.background = "var(--purple)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "ok" && (
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "2px",
                  padding: "12px 0",
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: "#4ade80",
                }}
              >
                ✓ Message sent — I'll be in touch!
              </p>
            )}
            {status === "err" && (
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "2px",
                  padding: "12px 0",
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: "#f87171",
                }}
              >
                ✕ Something went wrong. Please email directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
