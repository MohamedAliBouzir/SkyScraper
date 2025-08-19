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
  CircularProgress, // ADD THIS
} from "@mui/material";
import _ from "lodash";
import type { SearchInputProps } from "../interfaces/components-interfaces";

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  icon,
  width,
  results,
  isLoading = false, // ADD DEFAULT
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

  const handleResultClick = useCallback((result: any) => {
    setSearchTerm(result.text);
    // You might want to call onSearch with the selected result
    // or handle it differently based on your needs
  }, []);

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
          endAdornment: isLoading ? ( // ADD LOADING INDICATOR
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
          sx: sx,
        }}
        sx={{
          maxWidth: "100%",
          backgroundColor: "#fff",
        }}
      />
      
      {/* Results Dropdown */}
      {results && results.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1300, // Higher z-index
            maxHeight: 300,
            overflowY: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <List>
            {results.map((item: any, idx: number) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton onClick={() => handleResultClick(item)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText 
                    primary={item.text} 
                    secondary={item.subText}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      fontSize: "0.8rem",
                      color: "text.secondary",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* No Results Found */}
      {searchTerm && results && results.length === 0 && !isLoading && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1300,
            p: 2,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <ListItemText 
            primary="No results found" 
            primaryTypographyProps={{
              color: "text.secondary",
              textAlign: "center",
            }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default SearchInput;