export default function GlassOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,.08),transparent_55%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.03),transparent)]" />

    </div>
  );
}