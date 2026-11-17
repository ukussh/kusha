export default function GrainOverlay({ hidden = false }: { hidden?: boolean }) {
  // A pre-rendered tile, tiled with no blend mode: a live noise filter blended
  // over moving content had to be recomposited on every frame.
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-[url('/assets/grain.png')] bg-[length:128px_128px] transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-60"
      }`}
      aria-hidden="true"
    />
  );
}
