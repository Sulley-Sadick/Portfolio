import { createContext } from "react";

type Search = Record<string, string | string[]>;

type AppRoutingContextProps = {
  search: Search;
  pathname: string;
};

export const AppRoutingContext = createContext<AppRoutingContextProps | null>(
  null,
);
