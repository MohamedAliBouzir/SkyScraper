import type { FC } from "react";
import Content from "./Content";
import type { IWrapperProps } from "./../interfaces/layout-interface";
import Header from "./Header/Header";
import { Box, Toolbar } from "@mui/material";
import PageLayout from "./PageLayout";

export const WrapperContainer: FC<IWrapperProps> = ({ children, ...props }) => {
  return (
    <Box className="root" {...props}>
      <Header />
      <Toolbar />
      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <PageLayout> {children}</PageLayout>
      </Box>
    </Box>
  );
};

const Wrapper = () => {
  return (
    <WrapperContainer>
      <Content />
    </WrapperContainer>
  );
};

export default Wrapper;
