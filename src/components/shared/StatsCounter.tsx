"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-3xl font-bold text-primary-600 sm:text-4xl">
            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
