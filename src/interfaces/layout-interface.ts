import type { ReactElement, ReactNode } from "react";

export interface IWrapperProps {
  children: ReactNode;
}

export interface IGroupeButtonsProps {
  menuItems: {
    id: string;
    text: string;
    path: string;
  }[];
  iconsDisplay: Record<string, ReactElement>;
}
