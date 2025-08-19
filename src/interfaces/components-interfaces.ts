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
}
