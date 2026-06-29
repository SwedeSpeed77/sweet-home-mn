"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const E: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function FlannelBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: E }}
      className="relative w-full overflow-hidden"
      style={{ height: 88 }}
      aria-hidden="true"
    >
      {/* Buffalo check pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-conic-gradient(#1A1A18 0% 25%, #EDE6D4 0% 50%)`,
          backgroundSize: "22px 22px",
          opacity: 0.92,
        }}
      />

      {/* Dark espresso overlay to pull it into the site palette */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10,5,3,0.38)",
        }}
      />

      {/* Amber tint layer — ties it to the amber/ember brand */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(160,90,10,0.10)",
        }}
      />

      {/* Fade top and bottom edges so it blends with sections */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,3,0.75) 0%, transparent 30%, transparent 70%, rgba(10,5,3,0.75) 100%)",
        }}
      />

      {/* Centre text */}
      <div className="relative z-10 flex items-center justify-center h-full gap-4">
        <div style={{ width: 32, height: 1, background: "rgba(240,226,192,0.4)" }} />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(240,226,192,0.75)",
          }}
        >
          Isanti, Minnesota
        </span>
        <div style={{ width: 32, height: 1, background: "rgba(240,226,192,0.4)" }} />
      </div>
    </motion.div>
  );
}
