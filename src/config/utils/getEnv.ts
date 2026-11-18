type GetEnvProps = {
  name: string;
  description?: string;
  required?: boolean;
};

export function getEnv(props: {
  name: string;
  description?: string;
  required?: true;
}): string;

export function getEnv(props: {
  name: string;
  description?: string;
  required: false;
}): string | undefined;

/**
 * Read a Vite `import.meta.env` value.
 * Prefer `required: false` for anything that should not blank-screen the static UI.
 */
export function getEnv({ name, description = "", required }: GetEnvProps) {
  const raw = import.meta.env[name.trim()];
  const value = typeof raw === "string" ? raw.trim() : raw;

  if (required !== false && !value) {
    throw new Error(
      `${name}${description ? ` ${description}` : ""} is required but not defined.`,
    );
  }

  return value || undefined;
}
