import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ImageProps = {
  alt: string;
  url: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Defaults to `contain` (circular avatars). Hero portraits should use `cover`. */
  objectFit?: "contain" | "cover";
  rounded?: "full" | "xl" | "none";
  /** `intrinsic` preserves full image height (hero portraits). Default `fill` fills the wrapper. */
  layout?: "fill" | "intrinsic";
} & ComponentProps<"div">;

const roundedClass = {
  full: "rounded-full",
  xl: "rounded-2xl",
  none: "rounded-none",
} as const;

export function Image({
  alt,
  url,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 80vw, 400px",
  objectFit = "contain",
  rounded = "full",
  layout = "fill",
  className,
  children,
  ...props
}: ImageProps) {
  const fitClass =
    objectFit === "cover" ? "object-cover" : "object-contain";

  if (layout === "intrinsic") {
    return (
      <div className={cn("relative", className)} {...props}>
        <img
          src={url}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className={cn(
            "block h-auto w-full max-w-full",
            roundedClass[rounded],
            fitClass,
            imageClassName,
          )}
        />
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("relative size-full overflow-hidden", className)}
      {...props}
    >
      <img
        src={url}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn(
          "absolute inset-0 size-full",
          roundedClass[rounded],
          fitClass,
          imageClassName,
        )}
      />
      {children}
    </div>
  );
}