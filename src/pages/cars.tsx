import { Box } from "@mui/material";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle, SearchInputStyle } from "../styles";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import GarageIcon from "@mui/icons-material/Garage";
import { useSearch } from "../hooks/swr/useSearch";

const cars = () => {
  const { setQuery, suggestions, isLoading } = useSearch.cars();
  const formattedResults = suggestions.map((suggestion) => ({
    text: suggestion.entity_name,
    subText: suggestion.hierarchy,
    icon: <GarageIcon />,
    data: suggestion,
  }));
  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://cdni.iconscout.com/illustration/premium/thumb/order-car-on-rent-via-mobile-app-6031683-5053357.png"
        alt="Cars Hero"
        text="Cars"
        imgStyle={{ width: "auto", maxHeight: "360px", display: "block" }}
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

export default cars;
