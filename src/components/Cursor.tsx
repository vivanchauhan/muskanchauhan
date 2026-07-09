"use client";

import React, { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    // Only execute if working inside a browser context
    if (typeof window === "undefined") return;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.11;
      p.ry += (p.my - p.ry) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + "px";
        ringRef.current.style.top = p.ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const grow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "16px";
        cursorRef.current.style.height = "16px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(124, 58, 237, 0.8)";
      }
    };

    const shrink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "8px";
        cursorRef.current.style.height = "8px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "30px";
        ringRef.current.style.height = "30px";
        ringRef.current.style.borderColor = "rgba(124, 58, 237, 0.45)";
      }
    };

    const targets = document.querySelectorAll(
      "a, button, input, textarea, [data-hover]",
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          background: "var(--purple)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "width .25s, height .25s",
          left: 0,
          top: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 30,
          height: 30,
          border: "1px solid rgba(124, 58, 237, 0.45)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "width .3s, height .3s, border-color .3s",
          left: 0,
          top: 0,
        }}
      />
    </>
  );
}
