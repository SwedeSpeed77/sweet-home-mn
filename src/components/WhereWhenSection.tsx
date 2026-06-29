"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhereWhenSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="where"
      className="py-28 px-6 md:px-10"
      style={{ background: "#1A0A04", borderTop: "1px solid rgba(200,122,20,0.1)" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: schedule info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="section-divider mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "#F5ECD7" }}
            >
              Find Us Every{" "}
              <span style={{ color: "#C87A14", fontStyle: "italic" }}>
                Saturday
              </span>
            </h2>

            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: "rgba(245,236,215,0.65)", fontFamily: "var(--font-inter)" }}
            >
              Pop-up sales run every Saturday. Locations vary by week — follow us on
              Facebook for that week&rsquo;s exact time and spot. We sell out, so get
              there early.
            </p>

            {/* Schedule cards */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                {
                  icon: "📍",
                  label: "Saturday Pop-Up",
                  detail: "Weekly · Location announced on Facebook",
                },
                {
                  icon: "🧊",
                  label: "Self-Serve Cooler",
                  detail: "Mid-week pick-up available — check Facebook",
                },
                {
                  icon: "📅",
                  label: "Isanti Farmers Market",
                  detail: "Our roots — where Sweet Home MN began",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(200,122,20,0.12)",
                  }}
                >
                  <span className="text-2xl mt-0.5" aria-hidden="true">{item.icon}</span>
                  <div>
                    <div
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "#F5ECD7", fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(245,236,215,0.5)", fontFamily: "var(--font-inter)" }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Facebook CTA */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=100063650588110"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: "rgba(200,122,20,0.15)",
                color: "#E8A820",
                border: "1px solid rgba(200,122,20,0.3)",
                fontFamily: "var(--font-inter)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,122,20,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,122,20,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,122,20,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,122,20,0.3)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Follow on Facebook for This Week&rsquo;s Schedule
            </motion.a>
          </motion.div>

          {/* Right: map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.12 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{ border: "1px solid rgba(200,122,20,0.25)" }}
              aria-label="709 Fir St SW, Isanti, MN 55040 on Google Maps"
            >
              {/* Embedded Google Map */}
              <iframe
                src="https://maps.google.com/maps?q=709+Fir+St+SW,+Isanti,+MN+55040&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.75)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="709 Fir St SW, Isanti, MN 55040 on Google Maps"
              />

              {/* Facebook callout bar */}
              <div
                className="flex items-center justify-center gap-2.5 px-5 py-3.5"
                style={{ background: "#1A0A04", borderTop: "1px solid rgba(200,122,20,0.18)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(200,122,20,0.7)" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span
                  className="text-xs tracking-[0.14em] uppercase"
                  style={{ color: "rgba(200,122,20,0.7)", fontFamily: "var(--font-inter)" }}
                >
                  Location announced weekly on Facebook
                </span>
              </div>

              {/* Corner decoration */}
              <div
                className="absolute top-4 right-4 text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(200,122,20,0.12)",
                  color: "rgba(232,168,32,0.7)",
                  border: "1px solid rgba(200,122,20,0.2)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Every Saturday
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
