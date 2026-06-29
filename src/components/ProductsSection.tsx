"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PRODUCTS = [
  {
    name: "Classic Cookies",
    tagline: "Where every bite started.",
    description:
      "Chocolate chip, snickerdoodle, sugar — rotating seasonal varieties. Award-winning twice over, and the reason Isanti keeps coming back.",
    badge: "2× MN Best Silver",
    photo: "/cookie.jpg",
  },
  {
    name: "Cupcakes",
    tagline: "Moist, generous, unforgettable.",
    description:
      "Silver and Bronze Minnesota's Best cupcakes. Rotating flavors loaded with real frosting — baked the morning of every pop-up.",
    badge: "MN Best Silver + Bronze",
    photo: "/cupcakes.jpg",
  },
  {
    name: "Weekly Special",
    tagline: "Always a surprise. Always sold out.",
    description:
      "Brownies, lemon bars, rice crispy treats, and whatever inspiration struck that week. Follow on Facebook — these never last.",
    badge: "Readers' Choice: Best Dessert",
    photo: "/weekly-special.jpg",
  },
];

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      style={{
        background: "#1A0A04",
        border: "1px solid rgba(200,122,20,0.15)",
        borderRadius: "1.25rem",
        overflow: "hidden",
        cursor: "default",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 1px rgba(200,122,20,0.35), 0 8px 48px rgba(200,122,20,0.2), 0 24px 60px rgba(0,0,0,0.6)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,122,20,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,122,20,0.15)";
      }}
    >
      {/* Product photo */}
      <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
        <Image
          src={product.photo}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {/* Bottom fade so text below stays readable */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "55%",
            background: "linear-gradient(to top, rgba(26,10,4,0.92) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Badge */}
        <div
          className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase"
          style={{
            background: "rgba(200,122,20,0.1)",
            color: "#E8A820",
            border: "1px solid rgba(200,122,20,0.2)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {product.badge}
        </div>

        <h3
          className="font-serif text-2xl font-bold mb-1.5"
          style={{ color: "#F5ECD7" }}
        >
          {product.name}
        </h3>

        <p
          className="text-sm italic mb-4"
          style={{ color: "#C87A14", fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          {product.tagline}
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(245,236,215,0.6)", fontFamily: "var(--font-inter)" }}
        >
          {product.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ProductsSection() {
  const headingRef = useRef(null);
  const inView     = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="products" className="py-28 px-6 md:px-10" style={{ background: "#0D0604" }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="section-divider mx-auto mb-6" />
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#F5ECD7" }}
          >
            Crafted From Scratch
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(245,236,215,0.6)", fontFamily: "var(--font-inter)" }}
          >
            Every cookie, cupcake, and bar is made by hand in our registered
            Minnesota cottage kitchen. No shortcuts. No preservatives. Just love.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
