"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FlannelBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: 320 }}
      aria-label="Sweet Home MN Cookie Co. — Northern Goodness"
    >
      {/* The Facebook cover photo lives in the top ~42% of the screenshot */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sweet home logo.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          top: "-28%",
          left: 0,
          objectFit: "cover",
        }}
      />

      {/* Dark overlay to keep the espresso site feel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,3,0.55) 0%, rgba(10,5,3,0.3) 50%, rgba(10,5,3,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Buffalo check / flannel top border */}
      <div
        className="absolute top-0 left-0 right-0 h-3"
        style={{
          backgroundImage: `repeating-conic-gradient(#1A1A1A 0% 25%, #F0E2C0 0% 50%)`,
          backgroundSize: "12px 12px",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      {/* Buffalo check / flannel bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-3"
        style={{
          backgroundImage: `repeating-conic-gradient(#1A1A1A 0% 25%, #F0E2C0 0% 50%)`,
          backgroundSize: "12px 12px",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Flannel-style divider */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ width: 40, height: 1, background: "rgba(240,226,192,0.35)" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(200,136,26,0.8)", fontFamily: "var(--font-inter)" }}
            >
              Isanti, Minnesota
            </span>
            <div style={{ width: 40, height: 1, background: "rgba(240,226,192,0.35)" }} />
          </div>

          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              color: "#F0E2C0",
              textShadow: "0 2px 24px rgba(0,0,0,0.7)",
              lineHeight: 1.2,
            }}
          >
            &ldquo;Northern Goodness&rdquo;
          </p>

          <p
            className="mt-4 text-sm"
            style={{
              color: "rgba(240,226,192,0.6)",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              letterSpacing: "0.06em",
            }}
          >
            Homemade cookies &amp; cupcakes from a Minnesota kitchen
          </p>
        </motion.div>
      </div>
    </section>
  );
}
