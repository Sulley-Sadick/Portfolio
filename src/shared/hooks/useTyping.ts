import { useLayoutEffect, useRef, useState } from "react";
import { useIntersection } from "./useIntersection";

type UseTypingOptions = {
  text: string;
  enabled?: boolean;
  whileInView?: boolean;
  speedInSeconds?: number;
};

export function useTyping(props: {
  text: string;
  whileInView?: boolean;
  enabled: true;
  speedInSeconds?: number;
}): string;

export function useTyping(props: {
  text: string;
  whileInView: true;
  speedInSeconds?: number;
}): { output: string; ref: <T>(el: T | null) => void };

export function useTyping({
  text,
  enabled: defaultEnabled,
  whileInView,
  speedInSeconds = 0.15,
}: UseTypingOptions) {
  const [current, setCurrent] = useState<string | null>(null);
  const { ref, isIntersecting } = useIntersection({ once: true });

  const timeoutRefId =
    useRef<Record<number, ReturnType<typeof setTimeout>>>(null);

  const enabled =
    (whileInView ? isIntersecting : defaultEnabled) && current !== text;

  useLayoutEffect(() => {
    if (!enabled) return;

    text.split("").forEach((_, index) => {
      if (!timeoutRefId.current) timeoutRefId.current = {};

      const timeoutId = setTimeout(
        () => {
          setCurrent(
            index === text.length - 1 ? text : `${text.slice(0, index + 1)} | `,
          );
        },
        index * speedInSeconds * 100,
      );

      timeoutRefId.current[index] = timeoutId;
    });
    return () => {
      if (timeoutRefId.current) {
        Object.values(timeoutRefId.current).forEach((id) => clearTimeout(id));
      }
    };
  }, [enabled, text, speedInSeconds]);

  if (defaultEnabled) return current ?? "";

  return { output: current ?? "", ref };
}
