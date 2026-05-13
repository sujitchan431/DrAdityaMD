"use client";

import { useState, type FormEvent } from "react";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    reason: "",
    consent: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setStatus("loading");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-green-800">Appointment Request Received</h3>
        <p className="mt-2 text-green-700">
          Thank you! We will contact you within 24 hours to confirm your appointment.
          For urgent matters, please call or WhatsApp the clinic directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-medical-900 mb-6">Request an Appointment</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Consultation
          </label>
          <textarea
            id="reason"
            rows={3}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none"
            placeholder="Briefly describe your health concern (optional)"
          />
        </div>
        <div className="flex items-start gap-2">
          <input
            id="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="consent" className="text-xs text-gray-500">
            I understand this form is for appointment requests only and does not create a
            doctor-patient relationship. I consent to being contacted regarding my appointment.
          </label>
        </div>
        <button
          type="submit"
          disabled={status === "loading" || !formData.consent}
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Request Appointment"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-600 text-center">Something went wrong. Please try again or call the clinic.</p>
        )}
      </div>
    </form>
  );
}
