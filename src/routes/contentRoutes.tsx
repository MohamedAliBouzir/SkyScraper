import { lazy } from "react";
import type { RouteProps } from "react-router-dom";
import { homeMenu, RentingMenu } from "../menu";

const HOME = {
  HOME: lazy(() => import("../pages/home")),
};
const RENTING = {
  FLIGHTS: lazy(() => import("../pages/flights")),
  HOTELS: lazy(() => import("../pages/hotels")),
  CARS: lazy(() => import("../pages/cars")),
};

const presentation: RouteProps[] = [
  {
    path: homeMenu.homePage.path,
    id: homeMenu.homePage.id,
    element: <HOME.HOME />,
  },
];
const renting: RouteProps[] = [
  {
    path: RentingMenu.flightsPage.path,
    id: RentingMenu.flightsPage.id,
    element: <RENTING.FLIGHTS />,
  },
  {
    path: RentingMenu.hotelsPage.path,
    id: RentingMenu.hotelsPage.id,
    element: <RENTING.HOTELS />,
  },
  {
    path: RentingMenu.carsPage.path,
    id: RentingMenu.carsPage.id,
    element: <RENTING.CARS />,
  },
];

const contents = [...presentation, ...renting];

export default contents;
