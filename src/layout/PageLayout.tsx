import type { FC } from "react";
import type { IWrapperProps } from "../interfaces/layout-interface";
import Box from "@mui/material/Box";

const PageLayout: FC<IWrapperProps> = ({ children }: IWrapperProps) => {
  return <Box sx={{width:"80%"}}>{children}</Box>;
};

export default PageLayout;
