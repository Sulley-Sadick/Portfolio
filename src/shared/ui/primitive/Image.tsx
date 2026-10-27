import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ImageProps = {
  alt: string;
  url: string;
  imageClassName?: string;
} & ComponentProps<"div">;

export function Image({
  alt,
  url,
  imageClassName,
  children,
  ...props
}: ImageProps) {
  return (
    <div className="relative size-full overflow-hidden" {...props}>
      <img
        src={url}
        alt={alt}
        sizes="100%"
        loading="lazy"
        className={cn(
          "absolute inset-0 size-full rounded-full object-contain",
          imageClassName,
        )}
      />
      {children}
    </div>
  );
}
