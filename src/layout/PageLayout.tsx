import type { FC } from "react";
import type { IWrapperProps } from "../interfaces/layout-interface";
import Box from "@mui/material/Box";
import { LayoutStyle } from "../styles";

const PageLayout: FC<IWrapperProps> = ({ children }: IWrapperProps) => {
  return <Box sx={LayoutStyle.pageLayout}>{children}</Box>;
};

export default PageLayout;
