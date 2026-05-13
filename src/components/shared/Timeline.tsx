"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-200 sm:left-1/2 sm:-translate-x-px" />
      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 sm:gap-0 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-md sm:mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
              <div className={`sm:w-1/2 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                <span className="text-sm font-bold text-primary-600">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-medical-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
