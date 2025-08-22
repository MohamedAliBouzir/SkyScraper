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
import type { ISearchInputProps } from "../interfaces/components-interfaces";
import { SearchInputStyle } from "../styles";

const SearchInput: React.FC<ISearchInputProps> = ({
  onSearch,
  onResultClick,
  placeholder,
  icon,
  width,
  results,
  isLoading = false,
  sx,
  value: externalValue,
  onValueChange,
}) => {
  const [internalValue, setInternalValue] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchTerm = externalValue !== undefined ? externalValue : internalValue;

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
      if (onValueChange) {
        onValueChange(value);
      } else {
        setInternalValue(value);
      }

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
    [debouncedSearch, onSearch, onValueChange]
  );

  const handleInputFocus = useCallback(() => {
    if (
      searchTerm.trim() !== "" &&
      ((results?.length ?? 0) > 0 || hasSearched)
    ) {
      setIsDropdownOpen(true);
    }
  }, [searchTerm, results, hasSearched]);

  const handleResultClick = useCallback(
    (result: any) => {
      if (onResultClick) {
        onResultClick(result);
      }
      setIsDropdownOpen(false);
    },
    [onResultClick]
  );

  const handleInputClick = useCallback(() => {
    if (
      searchTerm.trim() !== "" &&
      ((results?.length ?? 0) > 0 || hasSearched)
    ) {
      setIsDropdownOpen(true);
    }
  }, [searchTerm, results, hasSearched]);

  const shouldShowResults =
    isDropdownOpen && searchTerm.trim() !== "" && results && results.length > 0;

  return (
    <Box
      ref={searchRef}
      width={width}
      sx={{
        ...SearchInputStyle.containingBox,
      }}
    >
      <TextField
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onClick={handleInputClick}
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