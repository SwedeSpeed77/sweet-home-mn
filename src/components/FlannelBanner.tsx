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
      {/* SVG flannel pattern — woven buffalo check with stitching */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="sh-flannel"
            x="0" y="0"
            width="48" height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Cream base */}
            <rect width="48" height="48" fill="#E2D9C0" />

            {/* Dark squares — classic buffalo check */}
            <rect x="0"  y="0"  width="24" height="24" fill="#1C1C1A" />
            <rect x="24" y="24" width="24" height="24" fill="#1C1C1A" />

            {/* Woven overlay — horizontal dark stripe bleeds into cream squares,
                simulating the cross-thread weave of real flannel fabric */}
            <rect x="0"  y="0"  width="48" height="24" fill="rgba(28,28,26,0.14)" />
            {/* Vertical dark stripe cross-thread */}
            <rect x="0"  y="0"  width="24" height="48" fill="rgba(28,28,26,0.10)" />

            {/* Primary stitching — seam at horizontal join */}
            <line
              x1="0" y1="24" x2="48" y2="24"
              stroke="rgba(240,228,200,0.9)" strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            {/* Primary stitching — seam at vertical join */}
            <line
              x1="24" y1="0" x2="24" y2="48"
              stroke="rgba(240,228,200,0.9)" strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* Secondary shadow stitch — offset slightly for fabric depth */}
            <line
              x1="0" y1="25.4" x2="48" y2="25.4"
              stroke="rgba(240,228,200,0.4)" strokeWidth="0.7"
              strokeDasharray="2 4" strokeDashoffset="2"
            />
            <line
              x1="25.4" y1="0" x2="25.4" y2="48"
              stroke="rgba(240,228,200,0.4)" strokeWidth="0.7"
              strokeDasharray="2 4" strokeDashoffset="2"
            />

            {/* Inner thread lines within dark squares — subtle warp/weft texture */}
            <line x1="0"  y1="8"  x2="24" y2="8"  stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="0"  y1="16" x2="24" y2="16" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="8"  y1="0"  x2="8"  y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="16" y1="0"  x2="16" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="24" y1="32" x2="48" y2="32" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="24" y1="40" x2="48" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="32" y1="24" x2="32" y2="48" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="40" y1="24" x2="40" y2="48" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sh-flannel)" />
      </svg>

      {/* Dark espresso overlay — pulls the banner into the site's palette */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,5,3,0.42)" }}
      />

      {/* Amber tint — ties to the brand warmth */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(140,75,8,0.12)" }}
      />

      {/* Top + bottom edge fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,3,0.72) 0%, transparent 28%, transparent 72%, rgba(10,5,3,0.72) 100%)",
        }}
      />

      {/* Centre label */}
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
