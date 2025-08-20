import { Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import FlightIcon from "@mui/icons-material/Flight";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle, SearchInputStyle } from "../styles";
import { useSearch } from "../hooks/swr/useSearch";

const flights = () => {
  const { setQuery, data, isLoading } = useSearch.airports();

  const formattedResults = data.map((suggestion) => ({
    text: suggestion.presentation.title,
    subText:
      suggestion.presentation.subtitle || suggestion.navigation.entityType,
    icon: <FlightIcon />,
    data: suggestion,
  }));
  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
        alt="Flights Hero"
        text="Flights"
        imgStyle={{ width: "100%", height: "auto", display: "block" }}
      />
      <Box sx={CommonStyle.contentWrapper}>
        <SearchInput
          onSearch={setQuery}
          icon={<SearchIcon />}
          placeholder="Search airports"
          width={{ xs: "100%", md: "40%" }}
          results={formattedResults}
          isLoading={isLoading}
          sx={SearchInputStyle.searchInputHomeLayout}
        />
      </Box>
    </Box>
  );
};

export default flights;
