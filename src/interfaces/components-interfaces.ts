import type { SxProps } from "@mui/material";

export interface ISearchInputProps {
  onSearch: (query: string) => void;
  onResultClick?: (result: ISearchResult) => void;
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

export interface ISearchResult {
  text: string;
  subText: string;
  icon?: React.ReactNode;
  data?: any;
}

export interface ISearchSuggestion {
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

