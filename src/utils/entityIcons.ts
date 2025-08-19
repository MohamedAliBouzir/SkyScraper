import {
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Place as PlaceIcon,
  LocationCity as CityIcon,
  Terrain as RegionIcon,
  Apartment as DistrictIcon,
  Public as CountryIcon,
  DirectionsCar as CarIcon,
  Restaurant as RestaurantIcon,
  LocalActivity as ActivityIcon,
  BeachAccess as BeachIcon,
  Landscape as LandscapeIcon,
} from '@mui/icons-material';

import React from 'react';

export const getEntityIcon = (entityType: string) => {
  const iconMap: Record<string, React.ComponentType> = {
    // Transportation
    airport: FlightIcon,
    bus_station: CarIcon,
    train_station: CarIcon,
    port: CarIcon,
    
    // Accommodation
    hotel: HotelIcon,
    hostel: HotelIcon,
    resort: HotelIcon,
    vacation_rental: HotelIcon,
    
    // Locations
    city: CityIcon,
    district: DistrictIcon,
    region: RegionIcon,
    country: CountryIcon,
    state: RegionIcon,
    province: RegionIcon,
    
    // Points of Interest
    restaurant: RestaurantIcon,
    attraction: ActivityIcon,
    landmark: PlaceIcon,
    museum: ActivityIcon,
    beach: BeachIcon,
    park: LandscapeIcon,
    mountain: LandscapeIcon,
    
    // Default
    default: PlaceIcon,
  };

  const IconComponent = iconMap[entityType.toLowerCase()] || iconMap.default;
  return React.createElement(IconComponent);
};

export const getEntityColor = (entityType: string) => {
  const colorMap: Record<string, string> = {
    airport: '#1976d2', // Blue
    city: '#2e7d32',    // Green
    hotel: '#ed6c02',   // Orange
    restaurant: '#d32f2f', // Red
    attraction: '#9c27b0', // Purple
    default: '#757575', // Gray
  };

  return colorMap[entityType.toLowerCase()] || colorMap.default;
};