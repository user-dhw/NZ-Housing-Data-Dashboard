import { HousingMetric, Region } from '../types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCompact = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

export const AFFORDABILITY_BENCHMARK = 3.0; // Standard affordability ratio (Price/Income)
export const RENTAL_STRESS_THRESHOLD = 0.30; // 30% of income spent on rent

export const calculateAffordabilityIndex = (price: number, income: number) => {
  if (income === 0) return 0;
  return price / income;
};

/** Uses dataset `affordabilityRatio` when present; otherwise price / income. */
export const getAffordabilityRatio = (metric: HousingMetric): number => {
  if (metric.affordabilityRatio != null && Number.isFinite(metric.affordabilityRatio)) {
    return metric.affordabilityRatio;
  }
  return calculateAffordabilityIndex(metric.avgPrice, metric.avgIncome);
};

export const getRegionLabel = (region: Region): string =>
  region.displayName ?? region.name;

export const getAffordabilityClassification = (ratio: number) => {
  if (ratio <= 3.0) return { label: 'Affordable', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  if (ratio <= 5.0) return { label: 'Moderately Unaffordable', color: 'text-amber-600', bg: 'bg-amber-50' };
  if (ratio <= 7.0) return { label: 'Very Unaffordable', color: 'text-orange-600', bg: 'bg-orange-50' };
  return { label: 'Severely Unaffordable', color: 'text-red-600', bg: 'bg-red-50' };
};

export const calculateGrowthVsBaseline = (current: number, baseline: number) => {
  if (baseline === 0) return 0;
  return ((current - baseline) / baseline) * 100;
};

export const getMetricLabel = (metric: 'price' | 'rent' | 'affordability') => {
  switch (metric) {
    case 'price': return 'Avg House Price';
    case 'rent': return 'Avg Weekly Rent';
    case 'affordability': return 'Affordability Index (Price/Income)';
    default: return '';
  }
};

export const calculateCAGR = (startValue: number, endValue: number, years: number) => {
  if (years === 0 || startValue === 0) return 0;
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

export const getRentToIncomeRatio = (annualRent: number, annualIncome: number) => {
  if (annualIncome === 0) return 0;
  return (annualRent / annualIncome) * 100;
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};
