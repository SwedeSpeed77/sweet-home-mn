"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-28 px-6 md:px-10"
      style={{ background: "#0D0604" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="order-2 md:order-1"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 480,
                border: "1px solid rgba(200,122,20,0.18)",
              }}
            >
              <Image
                src="/about sweet home.jpg"
                alt="Shawn and Lisa Hodroff, founders of Sweet Home MN Cookie Co."
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Bottom fade for readability */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  height: "40%",
                  background: "linear-gradient(to top, rgba(13,6,4,0.85) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              {/* Name caption */}
              <div className="absolute bottom-5 left-6">
                <div className="font-serif text-base font-bold" style={{ color: "#F5ECD7" }}>
                  Shawn &amp; Lisa Hodroff
                </div>
                <div
                  className="text-[10px] tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: "rgba(200,122,20,0.85)", fontFamily: "var(--font-inter)" }}
                >
                  Founders · Sweet Home MN
                </div>
              </div>
              {/* Amber bottom line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, #C87A14, #E8A820, transparent)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Right: story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <div className="section-divider mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "#F5ECD7" }}
            >
              Made with the heart of a{" "}
              <span style={{ color: "#C87A14", fontStyle: "italic" }}>
                Minnesota home.
              </span>
            </h2>

            <div
              className="space-y-5 text-base leading-relaxed"
              style={{ color: "rgba(245,236,215,0.7)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              <p>
                Sweet Home MN Cookie Co. started the way the best things do — at a
                farmers market table in Isanti, Minnesota, with Shawn and Lisa Hodroff
                doing what they love: baking from scratch.
              </p>
              <p>
                Every recipe is made entirely from scratch. No box mixes, no shortcuts,
                no preservatives. Just quality ingredients, tested recipes, and the kind
                of care that you can actually taste.
              </p>
              <p>
                What started as a Saturday side project at the Isanti Farmers Market
                grew into something Isanti couldn&rsquo;t live without — and five Minnesota
                awards later, it&rsquo;s clear the feeling is mutual.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                "Registered Cottage Food Producer",
                "Isanti, Minnesota",
                "100% From Scratch",
                "5× Award-Winning",
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(200,122,20,0.1)",
                    color: "rgba(232,168,32,0.9)",
                    border: "1px solid rgba(200,122,20,0.2)",
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
