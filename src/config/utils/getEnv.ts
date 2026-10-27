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

export function getEnv({ name, description = "", required }: GetEnvProps) {
  const value = import.meta.env[name.trim()];

  if (required !== false && !value)
    throw new Error(
      `${name} ${description} : is a required variable environment but not defined!`,
    );

  return value;
}
