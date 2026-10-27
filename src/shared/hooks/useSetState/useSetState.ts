/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

import type { UseSetState } from "./overloads.types";
import {
  dotProps,
  type ArrayPaths,
  type ArrayPathValue,
  type Path,
  type PathValue,
} from "../../../libs/dot-prop";

export function useSetState<T extends Record<string, unknown>>(
  defaultState: T,
): [T, UseSetState<T>];

export function useSetState<T extends Record<string, unknown>>(
  defaultState?: T,
): [undefined, UseSetState<T>];

export function useSetState<T extends Record<string, unknown>>(
  defaultState: T,
) {
  const [state, setState] = useState({ ...(defaultState ?? {}) } as T);

  const setValue = useCallback(
    <P extends Path<T>>(path: P, data: PathValue<T, P>) => {
      setState((state) => ({
        ...dotProps.setValue({ ...(state ?? {}) } as T, path, data),
      }));
    },
    [],
  );

  const getValue = useCallback(
    <P extends Path<T>>(path: P) => dotProps.getValue(state, path),
    [state],
  );

  const reset = useCallback((data?: Partial<T>) => {
    setState({ ...(data ?? {}) } as T);
  }, []);

  const getPathValueFromData = useCallback(
    <P extends Path<T>>(data: T, path: P) => dotProps.getValue(data, path),
    [],
  );

  const insert = useCallback(
    <P extends ArrayPaths<T>>(
      data: ArrayPathValue<T, P>,
      path: P,
      position: "append" | "prepend",
    ) => {
      setState((state) => {
        const arrayValues = (dotProps.getValue(state, path) ?? []) as any[];

        const updatedData =
          position === "append"
            ? [...arrayValues, data]
            : position === "prepend"
              ? [data, ...arrayValues]
              : arrayValues;

        return {
          ...dotProps.setValue(
            { ...(state ?? {}) } as T,
            path,
            updatedData as PathValue<T, P>,
          ),
        };
      });
    },
    [],
  );

  const removeIndex = useCallback(
    <P extends ArrayPaths<T>>(path: P, index: number) => {
      setState((state) => {
        const arrayValues = (
          (dotProps.getValue(state, path) ?? []) as any[]
        ).filter((_, i) => i !== index);

        return {
          ...dotProps.setValue(
            { ...(state ?? {}) } as T,
            path,
            arrayValues as PathValue<T, P>,
          ),
        };
      });
    },
    [],
  );

  const createFieldArray = useCallback(
    <P extends ArrayPaths<T>>({ name }: { name: P }) => ({
      append: (data: ArrayPathValue<T, P>) => insert(data, name, "append"),
      prepend: (data: ArrayPathValue<T, P>) => insert(data, name, "prepend"),
      remove: removeIndex,
      fields: (getPathValueFromData(state, name) ?? []) as PathValue<T, P>,
    }),
    [insert, removeIndex, getPathValueFromData, state],
  );

  return [
    state,
    { setValue, getValue, createFieldArray, reset, getPathValueFromData },
  ] as const;
}
