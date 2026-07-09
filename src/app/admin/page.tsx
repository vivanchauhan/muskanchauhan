"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Cursor from "@/components/Cursor";

import HeroEditor from "./editors/HeroEditor";
import AboutEditor from "./editors/AboutEditor";
import ExperienceEditor from "./editors/ExperienceEditor";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger state
  const [sections, setSections] = useState<Record<string, any>>({});
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [formFields, setFormFields] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Define the menu order
  const menuOrder = ["HERO", "ABOUT", "EXPERIENCE"];

  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }

        const { data, error } = await supabase
          .from("portfolio_content")
          .select("*");
        if (!error && data) {
          const transformed = data.reduce(
            (acc, item) => {
              acc[item.id.toUpperCase()] = item.content;
              return acc;
            },
            {} as Record<string, any>,
          );

          setSections(transformed);
          const keys = Object.keys(transformed);
          if (keys.length > 0) {
            const defaultKey = transformed["HERO"] ? "HERO" : keys[0];
            setSelectedSection(defaultKey);
            setFormFields(transformed[defaultKey] || {});
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndLoadData();
  }, [router]);

  const handleSectionChange = (id: string) => {
    setSelectedSection(id);
    setFormFields(sections[id] || {});
    setIsMenuOpen(false); // Close menu on mobile after selection
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("portfolio_content")
        .upsert({ id: selectedSection.toUpperCase(), content: formFields });
      if (error) throw error;
      alert("✨ Changes saved successfully!");
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  const handleAboutImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Delete previous image if it exists
      if (formFields.image_url) {
        const oldFileName = formFields.image_url.split("/").pop();

        if (oldFileName) {
          await supabase.storage.from("portfolio_images").remove([oldFileName]);
        }
      }

      // Upload new image
      const extension = file.name.split(".").pop();
      const fileName = `about-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio_images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("portfolio_images")
        .getPublicUrl(fileName);

      // Update preview
      setFormFields((prev) => ({
        ...prev,
        image_url: data.publicUrl,
      }));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-[var(--black)] text-[var(--white)] font-sans">
      {/* HEADER */}
      <Cursor />

      <header className="flex justify-between items-center p-5 md:px-8 bg-[var(--card)] border-b border-[var(--border)]">
        <h1
          className="text-lg font-bold uppercase tracking-widest text-[var(--purple)]"
          style={{
            position: "fixed",
            top: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            margin: 0,
          }}
        >
          Portfolio Editor
        </h1>

        {/* Hamburger Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </header>

      {/* DASHBOARD BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <nav
          className={`fixed md:static inset-0 z-50 bg-[var(--black)] p-8 pt-24 md:pt-4 md:w-64 md:bg-[var(--card)] border-r border-[var(--border)] overflow-y-auto ${isMenuOpen ? "block" : "hidden md:block"}`}
        >
          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-4">
            Edit Sections
          </p>

          {Object.keys(sections)
            .sort((a, b) => menuOrder.indexOf(a) - menuOrder.indexOf(b))
            .map((key) => (
              <button
                key={key}
                onClick={() => handleSectionChange(key)}
                className={`block w-full text-left p-3 mb-2 rounded text-sm transition-all ${
                  selectedSection === key
                    ? "bg-[var(--purple)] text-white font-bold"
                    : "text-[#888] hover:bg-[var(--black)]"
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
        </nav>

        {/* WORKSPACE */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="flex justify-between items-center mb-8 border-b border-[var(--border)] pb-6">
            <Link href="/" className="btn-ghost">
              ← Portfolio
            </Link>
            <h2 className="text-xl font-serif italic">
              {selectedSection.toUpperCase()}
            </h2>
            <button
              onClick={handleSave}
              className="bg-white text-black px-4 py-2 rounded font-bold text-sm"
            >
              Save
            </button>
          </div>

          <div className="max-w-[800px] w-full">
            {selectedSection === "HERO" && (
              <HeroEditor
                formFields={formFields}
                onFieldChange={(k, v) =>
                  setFormFields((p) => ({ ...p, [k]: v }))
                }
              />
            )}
            {selectedSection === "ABOUT" && (
              <AboutEditor
                formFields={formFields}
                onFieldChange={(k, v) =>
                  setFormFields((p) => ({ ...p, [k]: v }))
                }
                uploading={uploading}
                onImageUpload={handleAboutImageUpload}
              />
            )}
            {selectedSection === "EXPERIENCE" && (
              <ExperienceEditor
                formFields={formFields}
                onFieldChange={(k, v) =>
                  setFormFields((p) => ({ ...p, [k]: v }))
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
