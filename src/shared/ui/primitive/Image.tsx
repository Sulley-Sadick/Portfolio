import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ImageProps = {
  alt: string;
  url: string;
  imageClassName?: string;
  priority?: boolean;
} & ComponentProps<"div">;

export function Image({
  alt,
  url,
  imageClassName,
  priority = false,
  className,
  children,
  ...props
}: ImageProps) {
  return (
    <div
      className={cn("relative size-full overflow-hidden", className)}
      {...props}
    >
      <img
        src={url}
        alt={alt}
        sizes="(max-width: 768px) 80vw, 400px"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn(
          "absolute inset-0 size-full rounded-full object-contain",
          imageClassName,
        )}
      />
      {children}
    </div>
  );
}
