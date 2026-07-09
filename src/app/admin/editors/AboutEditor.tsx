"use client";

import React from "react";

interface AboutEditorProps {
  formFields: Record<string, any>;
  onFieldChange: (key: string, value: any) => void;
  uploading: boolean;
  onImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void> | void;
}

export default function AboutEditor({
  formFields,
  onFieldChange,
  uploading,
  onImageUpload,
}: AboutEditorProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      {/* 1. Image Upload Block */}
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "90px",
            aspectRatio: "3/4",
            background: "#050505",
            border: "1px solid #333",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {formFields.image_url ? (
            <img
              src={formFields.image_url}
              alt="Preview"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/muskan.jpg";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontSize: "10px",
                color: "#555",
              }}
            >
              No Photo
            </div>
          )}
        </div>
        <div>
          <h4 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>
            About Component Cover Photo
          </h4>
          <p
            style={{
              margin: "0 0 12px 0",
              fontSize: "12px",
              color: "#666",
            }}
          >
            Upload a picture asset to refresh the frame container on the
            homepage grid row instantly.
          </p>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={onImageUpload}
            style={{ fontSize: "13px", color: "#aaa" }}
          />
        </div>
      </div>

      {/* 2. Heading Regular Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Main Title Prefix
        </label>
        <input
          type="text"
          value={formFields.heading_main || ""}
          onChange={(e) => onFieldChange("heading_main", e.target.value)}
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

      {/* 3. Heading Italic Suffix Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Emphasized Script (Italic Segment)
        </label>
        <input
          type="text"
          value={formFields.heading_sub || ""}
          onChange={(e) => onFieldChange("heading_sub", e.target.value)}
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

      {/* 4. Dynamic Paragraph Control List Array */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Biography Copy Text Blocks</span>
          <span style={{ color: "#00ffcc" }}>
            Blocks Attached: {(formFields.paragraphs || []).length}
          </span>
        </label>

        {(formFields.paragraphs || []).map((paraText: string, idx: number) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#444",
                marginTop: "14px",
                fontFamily: "monospace",
              }}
            >
              #{idx + 1}
            </span>
            <textarea
              value={paraText}
              onChange={(e) => {
                const currentArr = [...(formFields.paragraphs || [])];
                currentArr[idx] = e.target.value;
                onFieldChange("paragraphs", currentArr);
              }}
              style={{
                flex: 1,
                minHeight: "80px",
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
            <button
              type="button"
              onClick={() => {
                const currentArr = (formFields.paragraphs || []).filter(
                  (_: any, i: number) => i !== idx,
                );
                onFieldChange("paragraphs", currentArr);
              }}
              style={{
                background: "rgba(255, 77, 77, 0.15)",
                color: "#ff4d4d",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                fontSize: "12px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const currentArr = [...(formFields.paragraphs || []), ""];
            onFieldChange("paragraphs", currentArr);
          }}
          style={{
            background: "#222",
            color: "#fff",
            border: "1px dashed #444",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "6px",
          }}
        >
          ➕ Add New Paragraph Block
        </button>
      </div>
    </div>
  );
}
