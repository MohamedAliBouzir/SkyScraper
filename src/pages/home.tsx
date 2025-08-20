import { Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import { getEntityIcon } from "../utils/entityIcons";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle, SearchInputStyle } from "../styles";
import GroupeButtons from "../components/GroupeButtons";
import { MenuIcons } from "../assets/icons/Material/MenuIcons";
import { menuItems } from "../assets/data/MenuData";
import { useSearch } from "../hooks/swr/useSearch";
import type { ISearchResult } from "../interfaces/components-interfaces";

const Home = () => {
  const { setQuery, suggestions, isLoading } = useSearch.everything();

  const handleResultClick = (result: ISearchResult) => {
    const searchQuery = encodeURIComponent(result.text);
    const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}&tcfs=UgRgAXgB`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  const formattedResults = suggestions.map((suggestion) => ({
    text: suggestion.entityName,
    subText: suggestion.hierarchy,
    icon: getEntityIcon(suggestion.entityType),
    data: suggestion,
    entityType: suggestion.entityType,
  }));

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://www.gstatic.com/travel-frontend/animation/hero/trips_4.svg"
        alt="Hero"
        text="Let's Plan a Trip"
        imgStyle={{ width: "100%", height: "auto", display: "block" }}
      />
      <Box sx={CommonStyle.contentWrapper}>
        <SearchInput
          onSearch={setQuery}
          onResultClick={handleResultClick}
          icon={<SearchIcon />}
          placeholder="Search flights, hotels, cities, airports, attractions..."
          width={{ xs: "100%", md: "40%" }}
          results={formattedResults}
          isLoading={isLoading}
          sx={SearchInputStyle.searchInputHomeLayout}
        />
        <GroupeButtons menuItems={menuItems} iconsDisplay={MenuIcons} />
      </Box>
    </Box>
  );
};

export default Home;
