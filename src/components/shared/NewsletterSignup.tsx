"use client";

import { useState, type FormEvent } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // Simulate subscription
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50 p-6">
      <h4 className="text-lg font-semibold text-medical-900">
        Subscribe to Our Newsletter
      </h4>
      <p className="mt-1 text-sm text-gray-600">
        Get the latest health tips, medical insights, and blog updates delivered
        to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-green-600">
          Thank you for subscribing! Check your email.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
