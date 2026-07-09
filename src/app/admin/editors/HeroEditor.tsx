"use client";

import React from "react";

interface HeroEditorProps {
  formFields: Record<string, any>;
  onFieldChange: (key: string, value: string) => void;
}

export default function HeroEditor({
  formFields,
  onFieldChange,
}: HeroEditorProps) {
  // Format standard metadata labels cleanly inside the sub-editor
  const formatLabel = (str: string) => {
    return str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      {/* Title Configuration Grid Matrix */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            style={{
              fontSize: "11px",
              color: "#888",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Hero Title - Line 1
          </label>
          <input
            type="text"
            value={formFields.title_line1 || ""}
            onChange={(e) => onFieldChange("title_line1", e.target.value)}
            style={{
              width: "100%",
              background: "#151515",
              color: "#fff",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "12px",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            style={{
              fontSize: "11px",
              color: "#888",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Hero Title - Line 2
          </label>
          <input
            type="text"
            value={formFields.title_line2 || ""}
            onChange={(e) => onFieldChange("title_line2", e.target.value)}
            style={{
              width: "100%",
              background: "#151515",
              color: "#fff",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "12px",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Subtitle / Role Tagline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Subtitle Tagline / Role Label
        </label>
        <input
          type="text"
          value={formFields.subtitle || ""}
          onChange={(e) => onFieldChange("subtitle", e.target.value)}
          style={{
            width: "100%",
            background: "#151515",
            color: "#fff",
            border: "1px solid #222",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
      </div>

      {/* Main Narrative Description Block */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Hero Profile Description
        </label>
        <textarea
          value={formFields.description || ""}
          onChange={(e) => onFieldChange("description", e.target.value)}
          style={{
            width: "100%",
            minHeight: "100px",
            background: "#151515",
            color: "#fff",
            border: "1px solid #222",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "0.95rem",
            lineHeight: "1.5",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      {/* Availability / Location Status Pin */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Location Status Indicator Text
        </label>
        <input
          type="text"
          value={formFields.location_text || ""}
          onChange={(e) => onFieldChange("location_text", e.target.value)}
          style={{
            width: "100%",
            background: "#151515",
            color: "#fff",
            border: "1px solid #222",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
      </div>

      {/* Core Highlight Metrics Panel */}
      <div
        style={{
          borderTop: "1px solid #222",
          paddingTop: "1.5rem",
          marginTop: "0.5rem",
        }}
      >
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px",
          }}
        >
          Highlight Stats & Metrics Rows
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#555",
                  fontFamily: "monospace",
                }}
              >
                Metric Block #{num}
              </span>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <input
                  type="text"
                  placeholder="Value (e.g. 15+)"
                  value={formFields[`metric${num}_val`] || ""}
                  onChange={(e) =>
                    onFieldChange(`metric${num}_val`, e.target.value)
                  }
                  style={{
                    width: "30%",
                    background: "#151515",
                    color: "#00ffcc",
                    border: "1px solid #222",
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "0.9rem",
                    outline: "none",
                    fontWeight: "bold",
                  }}
                />
                <input
                  type="text"
                  placeholder="Label Descriptive Suffix (e.g. Projects Completed)"
                  value={formFields[`metric${num}_lbl`] || ""}
                  onChange={(e) =>
                    onFieldChange(`metric${num}_lbl`, e.target.value)
                  }
                  style={{
                    flex: 1,
                    background: "#151515",
                    color: "#fff",
                    border: "1px solid #222",
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
