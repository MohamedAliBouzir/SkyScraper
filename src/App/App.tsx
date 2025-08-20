import { BrowserRouter } from "react-router-dom";
import Wrapper from "../layout/Wrapper";
import { LocationProvider } from "../providers/GeoLocation.provider";

const App = () => {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Wrapper />
      </LocationProvider>
    </BrowserRouter>
  );
};

export default App;
