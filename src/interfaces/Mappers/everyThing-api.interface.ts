import type { ISearchSuggestion } from "../components-interfaces";

export interface ISearchEverythingResponse {
  status: boolean;
  timestamp: number;
  data: ISearchSuggestion[];
}

export interface IUseSearchEverythingReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: ISearchSuggestion[];
  isLoading: boolean;
  error: Error | undefined;
}