import type { ICarSearchResponse } from "../interfaces/Interceptors/cars-api.interface";
import type { ISearchEverythingResponse } from "../interfaces/Interceptors/everyThing-api.interface";
import type {
  IAirportSearchResponse,
  INearbyAirportsResponse,
} from "../interfaces/Interceptors/flight-api.interface";

export type TSearchResponse =
  | IAirportSearchResponse
  | ICarSearchResponse
  | ISearchEverythingResponse
  | INearbyAirportsResponse;

export type TArraySuggestion =
  | IAirportSearchResponse["data"][0]
  | ICarSearchResponse["data"][0]
  | ISearchEverythingResponse["data"][0];

export type TObjectData = INearbyAirportsResponse["data"];

export type TSearchData = TArraySuggestion[] | TObjectData;
