import React, { useCallback, useMemo, useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
} from "@mui/material";
import _ from "lodash";
import type { SearchInputProps } from "../interfaces/components-interfaces";

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  icon,
  width,
  results,
  sx,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = useMemo(
    () => _.debounce((query: string) => onSearch(query), 500),
    [onSearch]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: width,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        value={searchTerm}
        onChange={handleChange}
        variant="outlined"
        placeholder={placeholder || undefined}
        fullWidth
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <IconButton edge="start">{icon}</IconButton>
            </InputAdornment>
          ) : undefined,
          sx: sx,
        }}
        sx={{
          maxWidth: "100%",
          backgroundColor: "#fff",
        }}
      />
      {results && results.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 10,
            maxHeight: 300,
            overflowY: "auto",
            borderRadius: "12px",
          }}
        >
          <List>
            {results?.map((item: any, idx: number) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton onClick={() => setSearchTerm(item.text)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} secondary={item.subText} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchInput;
