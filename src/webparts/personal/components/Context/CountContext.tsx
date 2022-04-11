import * as React from "react";
import { sp, spGet, spPost } from "@pnp/sp";

export const CountContext = React.createContext({
  total: 0,
});
