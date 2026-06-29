export default function DemoBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-center py-1.5"
      style={{
        background: "rgba(13, 6, 4, 0.92)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(200, 122, 20, 0.2)",
      }}
    >
      <p
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ color: "rgba(200, 122, 20, 0.75)", fontFamily: "var(--font-inter)" }}
      >
        DEMO PREVIEW &mdash; Designed by Jacob Brown &middot; Pine &amp; Pixel
      </p>
    </div>
  );
}
