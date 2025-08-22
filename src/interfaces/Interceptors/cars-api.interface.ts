export interface ICarSearchSuggestion {
  hierarchy: string;
  location: string;
  entity_name: string;
  highlight: {
    entity_name: string;
    hierarchy: string;
  };
  entity_id: string;
  class: string;
}

export interface ICarSearchResponse {
  status: boolean;
  timestamp: number;
  data: ICarSearchSuggestion[];
}

export interface IUseCarSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: ICarSearchSuggestion[];
  isLoading: boolean;
  error: Error | undefined;
}

export interface ICarLocation {
  hierarchy: string;
  location: string;
  entity_name: string;
  highlight: {
    entity_name: string;
    hierarchy: string;
  };
  entity_id: string;
  class: string;
}