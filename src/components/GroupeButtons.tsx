import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { GroupeButtonStyle } from "../styles";
import type { IGroupeButtonsProps } from "../interfaces/layout-interface";

const GroupeButtons: FC<IGroupeButtonsProps> = ({
  menuItems,
  iconsDisplay,
}) => {
  return (
    <Box sx={GroupeButtonStyle.GroupeContainer}>
      {menuItems.map((item) => (
        <Link key={item.id} to={item.path} style={{ textDecoration: "none" }}>
          <Box sx={GroupeButtonStyle.ButtonBox}>
            {iconsDisplay[item.id] ? iconsDisplay[item.id] : null}
            <Typography sx={GroupeButtonStyle.TextStyle}>
              {item.text}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default GroupeButtons;
