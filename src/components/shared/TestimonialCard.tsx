"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  text: string;
  date: string;
  rating: number;
}

export function TestimonialCard({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (testimonials.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < testimonials[current].rating
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 italic leading-relaxed">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>
          <div className="mt-4">
            <p className="font-semibold text-medical-900">
              {testimonials[current].name}
            </p>
            <p className="text-xs text-gray-400">
              {testimonials[current].date}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === current ? "bg-primary-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
