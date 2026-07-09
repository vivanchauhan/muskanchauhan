"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Brands from "@/components/Brands";
import Gallery from "@/components/Gallery";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // End the full page initialization loader smoothly on mount
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Setup scroll animation intersection observer
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 },
    );

    // Dynamic delay to ensure components are mapped down to DOM before query selection
    const revealTimer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    }, 800);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
      obs.disconnect();
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        {/* Hero now securely pulls its own dataset independently */}
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Brands />
        <Gallery />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
