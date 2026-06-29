"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AWARDS = [
  {
    icon: "🏆",
    title: "Minnesota's Best",
    category: "Cookies — Gold & Silver × 3",
    year: "Multi-Year",
  },
  {
    icon: "🏆",
    title: "Minnesota's Best",
    category: "Cupcakes — Gold & Silver × 3",
    year: "Multi-Year",
  },
  {
    icon: "⭐",
    title: "Readers' Choice",
    category: "Best Dessert — 2× Winner",
    year: "Isanti-Chisago County Star",
  },
  {
    icon: "⭐",
    title: "Readers' Choice",
    category: "Best Bakery",
    year: "Isanti-Chisago County Star",
  },
];

function AwardBadge({
  award,
  index,
}: {
  award: (typeof AWARDS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="flex-shrink-0 flex flex-col items-center text-center px-8 py-6 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(200,122,20,0.15)",
        minWidth: "180px",
      }}
    >
      <span className="text-4xl mb-3" aria-hidden="true">{award.icon}</span>
      <div
        className="text-[10px] tracking-[0.22em] uppercase mb-1"
        style={{ color: "#E8A820", fontFamily: "var(--font-inter)" }}
      >
        {award.year}
      </div>
      <div
        className="font-serif text-sm font-semibold mb-1"
        style={{ color: "#F5ECD7" }}
      >
        {award.title}
      </div>
      <div
        className="text-xs leading-snug"
        style={{ color: "rgba(245,236,215,0.55)", fontFamily: "var(--font-inter)" }}
      >
        {award.category}
      </div>
    </motion.div>
  );
}

export default function AwardsStrip() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="awards"
      className="py-20 overflow-hidden"
      style={{
        background: "#1A0A04",
        borderTop: "1px solid rgba(200,122,20,0.12)",
        borderBottom: "1px solid rgba(200,122,20,0.12)",
      }}
      aria-label="Awards"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <div className="section-divider mx-auto mb-5" />
          <h2
            className="font-serif text-2xl md:text-3xl font-bold"
            style={{ color: "#F5ECD7" }}
          >
            Award-Winning. All Homemade. All Deserved.
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: "rgba(245,236,215,0.55)", fontFamily: "var(--font-inter)" }}
          >
            Minnesota recognizes what Isanti already knew.
          </p>
        </motion.div>

        {/* Award badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {AWARDS.map((award, i) => (
            <AwardBadge key={i} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
