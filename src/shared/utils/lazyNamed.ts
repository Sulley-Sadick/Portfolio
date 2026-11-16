import { lazy, type ComponentType } from "react";

type ModuleWithNamedExport = Record<string, ComponentType<unknown>>;

export function lazyNamed(
  loader: () => Promise<ModuleWithNamedExport>,
  exportName: string,
) {
  return lazy(() =>
    loader().then((module) => ({
      default: module[exportName] as ComponentType<unknown>,
    })),
  );
}