export function Watermark() {
  return (
    <div
      className="pointer-events-none fixed top-3 left-4 z-50 select-none sm:top-4 sm:left-5"
      aria-hidden="true"
    >
      <p className="ks-watermark text-lg font-medium tracking-tight text-primary/70 sm:text-xl">
        khalifa study
      </p>
    </div>
  );
}
