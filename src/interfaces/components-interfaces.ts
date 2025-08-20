import type { SxProps } from "@mui/material";

export interface SearchInputProps {
  onSearch: (query: string) => void;
  onResultClick?: (result: SearchResult) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  width?:
    | number
    | string
    | undefined
    | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", number | string>>;
  sx?: SxProps;
  results?: any[];
  isLoading?: boolean;
}

export interface SearchResult {
  text: string;
  subText: string;
  icon?: React.ReactNode;
  data?: any;
}

export interface SearchSuggestion {
  hierarchy: string;
  location: string;
  score: number;
  entityName: string;
  entityId: string;
  entityType: string;
  suggestItem: string;
  class: string;
  pois: any | null;
}

export interface SearchEverythingResponse {
  status: boolean;
  timestamp: number;
  data: SearchSuggestion[];
}

