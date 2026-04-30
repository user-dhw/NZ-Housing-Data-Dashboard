export interface Region {
  id: string;
  name: string;
  coordinates: number[]; // [lat, lng]
  /** Official Territorial Authority label when it differs from `name` */
  officialTerritorialAuthority?: string;
  /** Preferred label for charts and UI */
  displayName?: string;
}

export interface HousingMetric {
  regionId: string;
  year: number;
  avgPrice: number;
  avgRent: number;
  avgIncome: number;
  population: number;
  /** Pre-computed ratio when supplied by the dataset */
  affordabilityRatio?: number;
}

export interface DashboardState {
  selectedRegionIds: string[];
  yearRange: [number, number];
  activeMetric: 'price' | 'rent' | 'affordability';
}

export interface DatasetDataSource {
  metricKey: string;
  sourceName: string;
  sourceType: string;
  reasonForUse: string;
  geographicLevel: string;
  url?: string;
}

export interface DatasetMethodology {
  geographicMatching: Record<string, string>;
  calculationNotes: string[];
  limitations: string[];
}

export interface DatasetMetadata {
  projectTitle?: string;
  subtitle?: string;
  country?: string;
  timePeriod?: string;
  selectedLocations?: string[];
  dataAuthenticityNote?: string;
  lastUpdatedForProject?: string;
}

/** Top-level shape of `Updated_NZ_Housing_Data_With_Sources.json` */
export interface DashboardDataset {
  metadata?: DatasetMetadata;
  metricDefinitions?: Record<string, unknown>;
  dataSources?: Record<string, DatasetDataSource>;
  methodology?: DatasetMethodology;
  regions: Region[];
  historicalData: HousingMetric[];
}
