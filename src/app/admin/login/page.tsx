"use client";

import { useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function AdminLogin() {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || text("Login failed", "लगइन असफल भयो"));
        return;
      }

      const token = result.data;
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      const cookie = [
        `adminToken=${token}`,
        "path=/",
        `expires=${expires.toUTCString()}`,
        "SameSite=Lax",
      ].join("; ");

      document.cookie = cookie;

      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert(
        text("Something went wrong during login: ", "लगइन गर्दा समस्या भयो: ") +
          (error instanceof Error ? error.message : String(error)),
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-black">
          {text("Admin Login", "एडमिन लगइन")}
        </h1>

        <input
          type="text"
          placeholder={text("Username", "युजरनेम")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder={text("Password", "पासवर्ड")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading
            ? text("Signing in...", "साइन इन हुँदै...")
            : text("Login", "लगइन")}
        </button>
      </form>
    </div>
  );
}
