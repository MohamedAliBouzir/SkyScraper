import { Box, Typography } from "@mui/material";
import { CommonTitleStyle } from "../../styles";
import type { FC } from "react";
import type { PageCommonTitleProps } from "../../types/pages-type";

const PageCommonTitle: FC<PageCommonTitleProps> = ({
  src,
  alt = "Hero Image",
  imgStyle = {},
  text,
}) => {
  return (
    <Box sx={CommonTitleStyle.CommonTitleWrapper}>
      <img src={src} alt={alt} style={{ ...imgStyle }} />
      <Typography sx={CommonTitleStyle.CommonTitleText}>{text}</Typography>
    </Box>
  );
};

export default PageCommonTitle;
