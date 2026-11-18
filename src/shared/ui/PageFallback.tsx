import { cn } from "../utils/cn";

type PageFallbackProps = {
  className?: string;
};

/** Minimal Suspense placeholder so lazy routes keep layout instead of flashing blank. */
export function PageFallback({ className }: PageFallbackProps) {
  return (
    <div
      className={cn(
        "min-h-app-height mx-auto mt-15 w-full max-w-6xl px-4 py-20 sm:px-6",
        className,
      )}
      aria-hidden="true"
    >
      <div className="bg-muted-secondary/50 h-8 w-40 rounded motion-safe:animate-pulse" />
      <div className="bg-muted-secondary/35 mt-6 h-28 w-full max-w-xl rounded motion-safe:animate-pulse" />
      <div className="bg-muted-secondary/25 mt-4 h-16 w-full max-w-md rounded motion-safe:animate-pulse" />
    </div>
  );
}
