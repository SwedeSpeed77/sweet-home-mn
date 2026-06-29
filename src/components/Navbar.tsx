"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About",          href: "#about"   },
  { label: "Our Cookies",    href: "#products" },
  { label: "Find Us",        href: "#where"   },
  { label: "Custom Orders",  href: "#orders"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(13,6,4,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,122,20,0.18)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-3 group"
            aria-label="Sweet Home MN Cookie Co — scroll to top"
          >
            {/* Circular logo badge cropped from screenshot */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1.5px solid rgba(200,136,26,0.35)",
                boxShadow: "0 0 12px rgba(200,136,26,0.2)",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sweet home logo.png"
                alt="Sweet Home MN Cookie Co. logo"
                style={{
                  width: "226px",
                  height: "auto",
                  position: "absolute",
                  left: "-85px",
                  top: "-27px",
                }}
              />
            </div>
            {/* Text beside logo */}
            <div className="flex flex-col items-start leading-none">
              <span
                className="font-serif text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-honey"
                style={{ color: "#F0E2C0" }}
              >
                Sweet Home MN
              </span>
              <span
                className="text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(200,136,26,0.85)", fontFamily: "var(--font-inter)" }}
              >
                Cookie Co.
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="amber-underline text-sm tracking-wide transition-colors duration-200 cursor-pointer"
                style={{
                  color: "rgba(245,236,215,0.75)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5ECD7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,236,215,0.75)"; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => scrollTo("#orders")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
              style={{
                background: "#C87A14",
                color: "#0D0604",
                fontFamily: "var(--font-inter)",
                boxShadow: "0 0 20px rgba(200,122,20,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#E8A820";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(232,168,32,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#C87A14";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(200,122,20,0.3)";
              }}
            >
              Order Now
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: "#F5ECD7",
                  transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: "#F5ECD7",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: "#F5ECD7",
                  transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -16 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(26,10,4,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,122,20,0.2)",
          padding: "1.5rem 1.5rem 2rem",
        }}
      >
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -16 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="text-left text-lg font-medium cursor-pointer"
              style={{ color: "#F5ECD7", fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </motion.button>
          ))}
          <button
            onClick={() => scrollTo("#orders")}
            className="mt-2 px-6 py-3 rounded-full text-sm font-medium text-center cursor-pointer"
            style={{ background: "#C87A14", color: "#0D0604", fontFamily: "var(--font-inter)" }}
          >
            Order Now
          </button>
        </nav>
      </motion.div>
    </>
  );
}
