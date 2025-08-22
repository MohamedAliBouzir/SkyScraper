import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Select, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PersonIcon from "@mui/icons-material/Person";

type flightQueryType = {
  tripType: string;
  peoples: {
    adults: number;
    children: number;
    infants: number;
  };
  tripClass: string;
  from: string;
  to: string;
  startDate: string;
  endDate: string;
};

type numberInputType = {
  fieldName: string;
  value: number;
  handleValueChange: (actionType: string, fieldName: string) => void;
  minValue: number;
};
const NumberInput = ({
  fieldName,
  value,
  handleValueChange,
  minValue,
}: numberInputType) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
      <button
        disabled={value <= minValue ? true : false}
        onClick={() => handleValueChange("subtract", fieldName)}
        style={{
          width: "32px",
          height: "32px",
          fontSize: "24px",
          border: "none",
          backgroundColor:
            value <= minValue
              ? "rgba(98, 98, 98, 0.3)"
              : "rgba(53, 137, 255, 0.3)",
          borderRadius: "5px",
          color: value <= minValue ? "#000" : "#1967d2",
          cursor: "pointer",
        }}>
        -
      </button>
      <Typography sx={{ lineHeight: "32px" }}>{value}</Typography>
      <button
        onClick={() => handleValueChange("add", fieldName)}
        style={{
          width: "32px",
          height: "32px",
          fontSize: "24px",
          border: "none",
          backgroundColor: "rgba(53, 137, 255, 0.3)",
          borderRadius: "5px",
          color: "#1967d2",
          cursor: "pointer",
        }}>
        +
      </button>
    </Box>
  );
};
const FlightsExplore = () => {
  const [queryOptions, setQueryOptions] = useState<flightQueryType>({
    tripType: "Round trip",
    peoples: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    tripClass: "",
    from: "",
    to: "",
    startDate: "",
    endDate: "",
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleQueryData = (event: any) => {
    const { name, value } = event.target;
    setQueryOptions((data) => ({ ...data, [name]: value }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuReset = () => {
    handleMenuClose();
    setQueryOptions((data) => ({
      ...data,
      peoples: {
        adults: 1,
        children: 0,
        infants: 0,
      },
    }));
  };

  const handleNumberInputChange = (actionType: string, fieldName: string) => {
    setQueryOptions((data: any) => ({
      ...data,
      peoples: {
        ...data.peoples,
        [fieldName]:
          actionType === "add"
            ? data.peoples?.[fieldName] + 1
            : data.peoples?.[fieldName] - 1,
      },
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          minHeight: "100px",
          borderRadius: "8px",
          boxShadow:
            "0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)",
          margin: "0 16px",
          padding: "8px 16px 48px",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 0.5,
              justifyContent: "center",
              alignItems: "center",
              color: "gray",
              ":focus": {
                borderBottom: "1px solid #6200ee",
              },
            }}>
            {queryOptions.tripType === "Round trip" ? (
              <SwapHorizIcon />
            ) : queryOptions.tripType === "One way" ? (
              <TrendingFlatIcon />
            ) : (
              <MultipleStopIcon />
            )}
            <Select
              onChange={handleQueryData}
              name="tripType"
              value={queryOptions.tripType}
              variant="standard"
              disableUnderline
              sx={{ width: 120, p: "5px", color: "gray" }}>
              <MenuItem value="Round trip">Round trip</MenuItem>
              <MenuItem value="One way">One way</MenuItem>
              <MenuItem value="Multi-city">Multi-city</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 0.5,
              justifyContent: "center",
              alignItems: "center",
              color: "gray",
            }}>
            <PersonIcon />
            <Button
              onClick={handleMenuOpen}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="text"
              sx={{ color: "gray", minWidth: "30px" }}>
              {queryOptions.peoples.adults +
                queryOptions.peoples.children +
                queryOptions.peoples.infants}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 2,
                  minWidth: "250px",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    justifyContent: "space-between",
                  }}>
                  <Typography color="gray" variant="subtitle1">
                    Adults
                  </Typography>
                  <NumberInput
                    fieldName="adults"
                    value={queryOptions.peoples.adults}
                    minValue={1}
                    handleValueChange={handleNumberInputChange}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    justifyContent: "space-between",
                  }}>
                  <Typography color="gray" variant="subtitle1">
                    Children
                  </Typography>
                  <NumberInput
                    fieldName="children"
                    value={queryOptions.peoples.children}
                    minValue={0}
                    handleValueChange={handleNumberInputChange}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    justifyContent: "space-between",
                  }}>
                  <Typography color="gray" variant="subtitle1">
                    Infants
                  </Typography>
                  <NumberInput
                    fieldName="infants"
                    value={queryOptions.peoples.infants}
                    minValue={0}
                    handleValueChange={handleNumberInputChange}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}>
                  <Button
                    variant="text"
                    sx={{ textTransform: "capitalize" }}
                    onClick={handleMenuReset}>
                    cancel
                  </Button>
                  <Button
                    variant="text"
                    sx={{ textTransform: "capitalize" }}
                    onClick={handleMenuClose}>
                    {" "}
                    done
                  </Button>
                </Box>
              </Box>
            </Menu>
          </Box>

          <Select
            variant="standard"
            defaultValue={"Premium economy"}
            disableUnderline
            sx={{ minWidth: 120, p: "5px", color: "gray" }}>
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Premium economy">Premium economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="First">First</MenuItem>
          </Select>
        </Box>
        <Box></Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>

      </Box>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          position: "absolute",
          overflow: "hidden",
          width: "auto",
          zIndex: 0,
          borderRadius: "24px",
          height: "40px",
          left: "50%",
          bottom: "-20px",
          textTransform: "capitalize",
        }}>
        Explore
      </Button>
    </Box>
  );
};

export default FlightsExplore;