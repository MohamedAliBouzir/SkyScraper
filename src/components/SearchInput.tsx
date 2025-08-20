import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
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
  CircularProgress,
} from "@mui/material";
import _ from "lodash";
import type { SearchInputProps } from "../interfaces/components-interfaces";
import { SearchInputStyle } from "../styles";

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  icon,
  width,
  results,
  isLoading = false,
  sx,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useMemo(
    () =>
      _.debounce((query: string) => {
        if (query.trim() !== "") {
          setHasSearched(true);
          onSearch(query);
        } else {
          setHasSearched(false);
        }
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);

      if (value.trim() === "") {
        onSearch("");
        debouncedSearch.cancel();
        setHasSearched(false);
        setIsDropdownOpen(false);
      } else {
        debouncedSearch(value);
        setIsDropdownOpen(true);
      }
    },
    [debouncedSearch, onSearch]
  );

  const handleInputFocus = useCallback(() => {
    if (
      searchTerm.trim() !== "" &&
      ((results?.length ?? 0) > 0 || hasSearched)
    ) {
      setIsDropdownOpen(true);
    }
  }, [searchTerm, results, hasSearched]);

  const handleResultClick = useCallback((result: any) => {
    setSearchTerm(result.text);
    const searchQuery = encodeURIComponent(result.text);
    const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}&tcfs=UgRgAXgB`;
    window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
    setIsDropdownOpen(false);
  }, []);

  const shouldShowResults =
    isDropdownOpen && searchTerm.trim() !== "" && results && results.length > 0;
  return (
    <Box
      ref={searchRef}
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
        onFocus={handleInputFocus}
        variant="outlined"
        placeholder={placeholder || undefined}
        fullWidth
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <IconButton edge="start">{icon}</IconButton>
            </InputAdornment>
          ) : undefined,
          endAdornment: isLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
          sx: sx,
        }}
        sx={SearchInputStyle.inputTextField}
      />
      {shouldShowResults && (
        <Paper sx={SearchInputStyle.resultsBox}>
          <List>
            {results.map((item: any, idx: number) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton onClick={() => handleResultClick(item)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText
                    primary={item.text}
                    secondary={item.subText}
                    primaryTypographyProps={SearchInputStyle.primaryText}
                    secondaryTypographyProps={SearchInputStyle.secondaryText}
                  />
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
