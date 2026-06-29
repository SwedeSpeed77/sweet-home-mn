"use client";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-16 px-6 md:px-10 pb-20"
      style={{
        background: "#0A0402",
        borderTop: "1px solid rgba(200,122,20,0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                className="font-serif text-xl font-bold block"
                style={{ color: "#F5ECD7" }}
              >
                Sweet Home MN
              </span>
              <span
                className="text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(200,122,20,0.8)", fontFamily: "var(--font-inter)" }}
              >
                Cookie Co.
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(245,236,215,0.45)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Award-winning homemade cookies, cupcakes &amp; desserts. Made from
              scratch in Isanti, Minnesota by Shawn &amp; Lisa Hodroff.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(200,122,20,0.7)", fontFamily: "var(--font-inter)" }}
            >
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Our Story",      href: "#about"    },
                { label: "Our Cookies",    href: "#products" },
                { label: "Find Us",        href: "#where"    },
                { label: "Custom Orders",  href: "#orders"   },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: "rgba(245,236,215,0.5)",
                      textDecoration: "none",
                      fontFamily: "var(--font-inter)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C87A14"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,236,215,0.5)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h3
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(200,122,20,0.7)", fontFamily: "var(--font-inter)" }}
            >
              Connect
            </h3>
            <a
              href="https://www.facebook.com/profile.php?id=100063650588110"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mb-6 transition-colors duration-200"
              style={{ color: "rgba(245,236,215,0.6)", textDecoration: "none", fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C87A14"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,236,215,0.6)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sweet Home MN Cookie Co. on Facebook
            </a>
            <div className="space-y-1.5">
              {["Isanti, Minnesota", "Registered Cottage Food Producer", "Pop-ups every Saturday"].map((line) => (
                <p
                  key={line}
                  className="text-xs"
                  style={{ color: "rgba(245,236,215,0.35)", fontFamily: "var(--font-inter)" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(245,236,215,0.25)", fontFamily: "var(--font-inter)" }}
          >
            &copy; {new Date().getFullYear()} Sweet Home MN Cookie Co. &middot; All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(245,236,215,0.2)", fontFamily: "var(--font-inter)" }}
          >
            Isanti, MN &middot; Minnesota Cottage Food Producer
          </p>
        </div>
      </div>
    </footer>
  );
}
