"use client";

import React from "react";

interface Job {
  company: string;
  role: string;
  date: string;
  bullets: string[];
}

export default function ExperienceEditor({
  formFields,
  onFieldChange,
}: {
  formFields: any;
  onFieldChange: (key: string, value: any) => void;
}) {
  const jobs = formFields.jobs || [];

  const handleMetaChange = (
    field: "title_years" | "title_action",
    value: string,
  ) => {
    onFieldChange(field, value);
  };

  const handleJobChange = (index: number, key: keyof Job, value: any) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = { ...updatedJobs[index], [key]: value };
    onFieldChange("jobs", updatedJobs);
  };

  const addJobCard = () => {
    const newJob = {
      company: "New Company",
      role: "Role Title",
      date: "Jan 2026 — Present",
      bullets: [""],
    };
    onFieldChange("jobs", [newJob, ...jobs]);
  };

  const deleteJobCard = (index: number) => {
    if (!confirm("Are you sure you want to remove this whole job role?"))
      return;
    onFieldChange(
      "jobs",
      jobs.filter((_: any, i: number) => i !== index),
    );
  };

  return (
    <div style={{ color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Manage Work Experience
        </h2>
        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
          Use ~text~ anywhere to highlight achievements or metrics in pink.
        </p>
      </div>

      {/* SECTION HEADER META */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "40px",
          paddingBottom: "24px",
          borderBottom: "1px solid #1a1a1a",
        }}
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
            Main Title Prefix
          </label>
          <input
            type="text"
            value={formFields.title_years || ""}
            onChange={(e) => handleMetaChange("title_years", e.target.value)}
            style={{
              width: "100%",
              background: "#151515",
              color: "#fff",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "12px",
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
            Main Title Action
          </label>
          <input
            type="text"
            value={formFields.title_action || ""}
            onChange={(e) => handleMetaChange("title_action", e.target.value)}
            style={{
              width: "100%",
              background: "#151515",
              color: "#fff",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "12px",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* JOBS LIST */}

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <button
          type="button"
          onClick={addJobCard}
          style={{
            width: "100%",
            background: "transparent",
            color: "#888",
            border: "1px dashed #333",
            borderRadius: "8px",
            padding: "16px",
            cursor: "pointer",
          }}
        >
          + Add New Professional Experience Role
        </button>
        {jobs.map((job: Job, index: number) => (
          <div
            key={index}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "8px",
              padding: "24px",
              position: "relative",
            }}
          >
            <button
              onClick={() => deleteJobCard(index)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#221212",
                color: "#f87171",
                border: "1px solid #3a1a1a",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                value={job.company}
                placeholder="Company"
                onChange={(e) =>
                  handleJobChange(index, "company", e.target.value)
                }
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #2d2d2d",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
              <input
                type="text"
                value={job.role}
                placeholder="Role"
                onChange={(e) => handleJobChange(index, "role", e.target.value)}
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #2d2d2d",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
              <input
                type="text"
                value={job.date}
                placeholder="Date"
                onChange={(e) => handleJobChange(index, "date", e.target.value)}
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #2d2d2d",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </div>

            <textarea
              rows={4}
              value={job.bullets ? job.bullets.join("\n") : ""}
              onChange={(e) =>
                handleJobChange(index, "bullets", e.target.value.split("\n"))
              }
              placeholder="Bullets (one per line)"
              style={{
                width: "100%",
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2d2d2d",
                borderRadius: "4px",
                padding: "12px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
