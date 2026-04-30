import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Region, HousingMetric, DashboardState } from '../../types';
import {
  formatCurrency,
  formatCompact,
  AFFORDABILITY_BENCHMARK,
  getAffordabilityRatio,
  getRegionLabel,
} from '../../utils/dataHelpers';

interface NZMapProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
  onRegionSelect: (id: string) => void;
}

// Component to handle map view resets or updates
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function NZMap({ regions, historicalData, state, onRegionSelect }: NZMapProps) {
  const currentYear = state.yearRange[1];
  
  const getMetricForRegion = (regionId: string) => {
    return historicalData.find(d => d.regionId === regionId && d.year === currentYear);
  };

  const getRadius = (value: number | undefined) => {
    if (!value) return 5;
    if (state.activeMetric === 'price') return Math.max(5, (value / 100000) * 2);
    if (state.activeMetric === 'rent') return Math.max(5, (value / 50) * 1.5);
    return 10; // Default for affordability
  };

  const getColor = (value: number | undefined) => {
    if (!value) return '#9E9E9E';
    if (state.activeMetric === 'price') {
      if (value > 1000000) return '#2563eb'; // Blue 600
      if (value > 800000) return '#60a5fa'; // Blue 400
      return '#94a3b8'; // Slate 400
    }
    if (state.activeMetric === 'rent') {
      if (value > 600) return '#2563eb';
      if (value > 500) return '#60a5fa';
      return '#94a3b8';
    }
    return '#4f46e5'; // Indigo 600
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-100 shadow-xl">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Year: {currentYear}</h3>
        <p className="text-sm font-bold text-slate-800 tracking-tight">Regional Heatmap</p>
      </div>

      <MapContainer 
        center={[-40.9006, 174.8860]} 
        zoom={5} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={[-40.9006, 174.8860]} />
        
        {regions.map(region => {
          const metric = getMetricForRegion(region.id);
          const value =
            state.activeMetric === 'price'
              ? metric?.avgPrice
              : state.activeMetric === 'rent'
                ? metric?.avgRent
                : metric
                  ? getAffordabilityRatio(metric)
                  : undefined;
          
          const isSelected = state.selectedRegionIds.includes(region.id);

          return (
            <CircleMarker
              key={region.id}
              center={region.coordinates}
              radius={isSelected ? getRadius(value) + 4 : getRadius(value)}
              fillColor={getColor(value)}
              color={isSelected ? '#2563eb' : 'white'}
              weight={isSelected ? 4 : 1}
              opacity={1}
              fillOpacity={0.8}
              eventHandlers={{
                click: () => onRegionSelect(region.id)
              }}
            >
          <Popup>
            <div className="font-sans min-w-[220px] p-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{getRegionLabel(region)}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                    {metric && getAffordabilityRatio(metric) > 7 ? 'High affordability pressure' : 'Moderate pressure'}
                  </p>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-black border border-blue-100">{currentYear}</span>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center group">
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">Market Value</span>
                  <span className="font-bold text-slate-800">{metric ? formatCurrency(metric.avgPrice) : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">Affordability Ratio</span>
                  <div className="text-right">
                    <span
                      className={`font-black block leading-none ${
                        metric && getAffordabilityRatio(metric) > AFFORDABILITY_BENCHMARK * 2
                          ? 'text-red-500'
                          : 'text-emerald-600'
                      }`}
                    >
                      {metric ? getAffordabilityRatio(metric).toFixed(2) : 'N/A'}x
                    </span>
                    <span className="text-[8px] text-slate-400 mt-0.5 block opacity-70">Dataset comparison ratio</span>
                  </div>
                </div>

                {metric && (
                  <div className="pt-2 px-1">
                    <p className="text-[10px] text-slate-600 leading-relaxed italic">
                      {getAffordabilityRatio(metric) > 8
                        ? 'Severely unaffordable: house values are high relative to household income in this series.'
                        : getAffordabilityRatio(metric) > 5
                          ? 'Elevated pressure: affordability is stretched relative to other selected locations.'
                          : 'Lower pressure: this region shows a less extreme value-to-income relationship in this series.'}
                    </p>
                  </div>
                )}
                
                <div className="pt-3 border-t border-slate-100 mt-2">
                   <p className="text-[9px] text-blue-600 font-bold italic flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                     Click marker to isolate in temporal charts
                   </p>
                </div>
              </div>
            </div>
          </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
