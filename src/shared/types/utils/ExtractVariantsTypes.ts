import type { VariantProps } from "class-variance-authority";

export type MakeVariantsNonNullable<Variant extends Record<string, unknown>> = {
  [k in keyof Variant]: Extract<Variant[k], string | number>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any type needed else it won't work
export type ExtractVariantTypes<Variant extends (...args: any[]) => unknown> =
  VariantProps<Variant> extends infer ElementVariants
    ? ElementVariants extends Record<string, unknown>
      ? MakeVariantsNonNullable<ElementVariants>
      : never
    : never;
