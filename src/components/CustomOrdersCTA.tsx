"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EVENT_TYPES = ["Birthdays", "Weddings", "Corporate Events", "Baby Showers", "Holiday Trays", "Any Occasion"];

export default function CustomOrdersCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="orders"
      ref={ref}
      className="py-28 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "#1A0A04", borderTop: "1px solid rgba(200,122,20,0.1)" }}
    >
      {/* Background amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 120%, rgba(200,122,20,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="section-divider mx-auto mb-6" />

          <h2
            className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "#F5ECD7" }}
          >
            Bring Sweet Home to{" "}
            <span style={{ color: "#C87A14", fontStyle: "italic" }}>
              Your Event
            </span>
          </h2>

          <p
            className="text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(245,236,215,0.65)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Custom cookie trays, cupcake towers, dessert bars — made to order for any
            occasion. We ask for 48–72 hours notice to make sure every single one is
            baked fresh, from scratch, just for you.
          </p>

          {/* Event type chips */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {EVENT_TYPES.map((type, i) => (
              <motion.span
                key={type}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.2 + i * 0.06,
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-sm px-4 py-2 rounded-full"
                style={{
                  background: "rgba(200,122,20,0.08)",
                  color: "rgba(232,168,32,0.85)",
                  border: "1px solid rgba(200,122,20,0.2)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {type}
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="https://www.facebook.com/profile.php?id=100063650588110"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C87A14, #E8A820)",
                color: "#0D0604",
                fontFamily: "var(--font-inter)",
                boxShadow: "0 0 32px rgba(200,122,20,0.35), 0 4px 16px rgba(0,0,0,0.4)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 48px rgba(232,168,32,0.5), 0 6px 24px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 32px rgba(200,122,20,0.35), 0 4px 16px rgba(0,0,0,0.4)";
              }}
            >
              Message Us on Facebook
            </motion.a>

            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
              style={{
                background: "transparent",
                color: "#F5ECD7",
                fontFamily: "var(--font-inter)",
                border: "1px solid rgba(245,236,215,0.22)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,122,20,0.5)";
                (e.currentTarget as HTMLButtonElement).style.color = "#E8A820";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,236,215,0.22)";
                (e.currentTarget as HTMLButtonElement).style.color = "#F5ECD7";
              }}
            >
              Ask Our AI Assistant
            </motion.button>
          </motion.div>

          {/* Notice */}
          <p
            className="mt-8 text-xs"
            style={{ color: "rgba(245,236,215,0.35)", fontFamily: "var(--font-inter)" }}
          >
            Custom orders require 48–72 hours advance notice · Pricing quoted per order
          </p>
        </motion.div>
      </div>
    </section>
  );
}
