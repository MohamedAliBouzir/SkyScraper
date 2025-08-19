import type { SxProps } from "@mui/material";

export interface SearchInputProps {
  onSearch: (query: string) => void;
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
