import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { getEntityIcon, getEntityColor } from "./../../utils/entityIcons";
import type { INearbyAirport } from "../../interfaces/Interceptors/flight-api.interface";

interface SearchResultsGridProps {
  results: INearbyAirport[];
}

const NearByAirports: React.FC<SearchResultsGridProps> = ({ results }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        mt: 2,
        cursor: "pointer",
      }}
    >
      {results.map((item) => (
        <Card
          key={item.entityId}
          sx={{
            width: "300px",
            borderRadius: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: getEntityColor(item.navigation.entityType),
              }}
            >
              {getEntityIcon(item.navigation.entityType)}
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.presentation?.suggestionTitle ||
                  item.navigation.localizedName}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {item.presentation?.subtitle}
            </Typography>
            {item.skyId && (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 0.5, color: "text.disabled" }}
              >
                Code: {item.skyId}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default NearByAirports;
