"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Cursor from "@/components/Cursor";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Submit authentication request
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
      }}
    >
      <Cursor />
      <Link
        href="/"
        className="btn-ghost"
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 100,
        }}
      >
        ← Portfolio
      </Link>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "360px",
          padding: "2rem",
          background: "#111",
          borderRadius: "8px",
          border: "1px solid #222",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Hello Muskan 👋
        </h1>
        <p style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Welcome back! Please enter your credentials to access the admin panel.
        </p>

        {errorMsg && (
          <p
            style={{
              color: "#ff4d4d",
              fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            {errorMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            background: "#222",
            border: "1px solid #333",
            borderRadius: "4px",
            color: "#fff",
          }}
          className="input-ghost"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            marginBottom: "1.5rem",
            background: "#222",
            border: "1px solid #333",
            borderRadius: "4px",
            color: "#fff",
          }}
          className="input-ghost"
        />

        <button type="submit" className="btn-ghost">
          Login
        </button>
      </form>
    </div>
  );
}
