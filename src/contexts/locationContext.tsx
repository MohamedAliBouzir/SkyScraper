import { createContext } from "react";
import type { TBrowserLocation } from "../types/locations-type";

export const LocationContext = createContext<TBrowserLocation | undefined>(undefined);