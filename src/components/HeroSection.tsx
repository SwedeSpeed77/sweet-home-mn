"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const AmberParticles = dynamic(() => import("./AmberParticles"), { ssr: false });

const HEADLINE = ["The cookies", "Isanti can't stop", "buying."];
const E: [number, number, number, number] = [0.23, 1, 0.32, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
} as const;

const lineVariants = {
  hidden: { opacity: 0, y: 50, skewY: 2 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.95, ease: E },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: E },
  },
};

export default function HeroSection() {
  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0D0604" }}
    >
      {/* Canvas particles */}
      <AmberParticles />

      {/* Aurora / firelight ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 2 }}>
        {/* Main hearth glow — bottom center */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "50vw",
            background: "radial-gradient(ellipse, rgba(200,122,20,0.18) 0%, rgba(200,122,20,0.05) 50%, transparent 75%)",
            animation: "amber-pulse-slow 10s ease-in-out infinite",
            borderRadius: "50%",
          }}
        />
        {/* Secondary left ember */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-5%",
            width: "40vw",
            height: "40vw",
            background: "radial-gradient(circle, rgba(180,90,12,0.1) 0%, transparent 65%)",
            animation: "amber-pulse 14s ease-in-out infinite",
            borderRadius: "50%",
          }}
        />
        {/* Tertiary right ember */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-5%",
            width: "35vw",
            height: "35vw",
            background: "radial-gradient(circle, rgba(232,168,32,0.08) 0%, transparent 65%)",
            animation: "amber-pulse 18s ease-in-out infinite reverse",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative flex flex-col items-center text-center px-6 md:px-12 max-w-6xl mx-auto"
        style={{ zIndex: 10 }}
      >
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase"
          style={{
            background: "rgba(200,122,20,0.12)",
            border: "1px solid rgba(200,122,20,0.3)",
            color: "#E8A820",
            fontFamily: "var(--font-inter)",
          }}
        >
          <span style={{ color: "#E8A820" }}>★</span>
          5× Award-Winning · Isanti, Minnesota · Cottage Food Producer
        </motion.div>

        {/* Main headline — staggered lines */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif mb-8 leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
        >
          {HEADLINE.map((line, i) => (
            <motion.span
              key={i}
              variants={lineVariants}
              className="block"
              style={{
                color: i === 1 ? "#C87A14" : "#F5ECD7",
                fontStyle: i === 1 ? "italic" : "normal",
                fontWeight: i === 2 ? 900 : 700,
              }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.75 }}
          className="text-base md:text-lg max-w-xl mb-12 leading-relaxed"
          style={{ color: "rgba(245,236,215,0.7)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          Made entirely from scratch by Shawn &amp; Lisa Hodroff. Every batch baked
          with the warmth of a Minnesota home&nbsp;kitchen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={scrollToProducts}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #C87A14, #E8A820)",
              color: "#0D0604",
              fontFamily: "var(--font-inter)",
              boxShadow: "0 0 32px rgba(200,122,20,0.4), 0 4px 16px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 48px rgba(232,168,32,0.55), 0 6px 24px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 32px rgba(200,122,20,0.4), 0 4px 16px rgba(0,0,0,0.4)";
            }}
          >
            Shop This Week&rsquo;s Special
          </motion.button>

          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="px-8 py-4 rounded-full text-sm font-medium tracking-wide cursor-pointer transition-all duration-200"
            style={{
              background: "transparent",
              color: "#F5ECD7",
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(245,236,215,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,122,20,0.6)";
              (e.currentTarget as HTMLButtonElement).style.color = "#E8A820";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,236,215,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "#F5ECD7";
            }}
          >
            Our Story
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToProducts}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ zIndex: 10 }}
        aria-label="Scroll down"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "rgba(200,122,20,0.6)", fontFamily: "var(--font-inter)" }}
        >
          Discover
        </span>
        <div style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="rgba(200,122,20,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.button>
    </section>
  );
}
