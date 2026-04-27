
export interface Region {
  id: string;
  name: string;
  coordinates: number[]; // [lat, lng]
}

export interface HousingMetric {
  regionId: string;
  year: number;
  avgPrice: number;
  avgRent: number;
  avgIncome: number;
  population: number;
}

export interface DashboardState {
  selectedRegionIds: string[];
  yearRange: [number, number];
  activeMetric: 'price' | 'rent' | 'affordability';
}
