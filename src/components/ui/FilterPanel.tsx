import React from 'react';
import { Region, DashboardState } from '../../types';
import { Search, Filter, Calendar } from 'lucide-react';

interface FilterPanelProps {
  regions: Region[];
  state: DashboardState;
  setState: React.Dispatch<React.SetStateAction<DashboardState>>;
}

export default function FilterPanel({ regions, state, setState }: FilterPanelProps) {
  const toggleRegion = (id: string) => {
    setState(prev => {
      const isSelected = prev.selectedRegionIds.includes(id);
      if (isSelected) {
        return { ...prev, selectedRegionIds: prev.selectedRegionIds.filter(rid => rid !== id) };
      } else {
        return { ...prev, selectedRegionIds: [...prev.selectedRegionIds, id] };
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Metric Selector */}
      <section>
        <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-5 block">
          Primary Analysis
        </label>
        <div className="grid grid-cols-1 gap-2.5">
          {['price', 'rent', 'affordability'].map((m) => (
            <button
              key={m}
              onClick={() => setState(prev => ({ ...prev, activeMetric: m as any }))}
              className={`text-left px-5 py-4 rounded-xl text-xs font-bold transition-all relative overflow-hidden group ${
                state.activeMetric === m 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{m.charAt(0).toUpperCase() + m.slice(1)} Metric</span>
                {state.activeMetric === m && (
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Year Range */}
      <section>
        <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-5 block">
          Time Horizon
        </label>
        <div className="bg-slate-50 flex items-center gap-3 border border-slate-100 rounded-xl p-5 shadow-inner">
          <Calendar size={18} className="text-slate-400" />
          <div className="flex-1 flex justify-between items-center text-[11px] font-bold font-mono tracking-tighter">
            <span className="text-blue-600">{state.yearRange[0]}</span>
            <div className="h-0.5 bg-slate-200 flex-1 mx-4 rounded-full relative">
               <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-blue-600">{state.yearRange[1]}</span>
          </div>
        </div>
        <input 
          type="range" 
          min="2015" 
          max="2025" 
          step="1"
          value={state.yearRange[1]}
          onChange={(e) => setState(prev => ({ ...prev, yearRange: [prev.yearRange[0], parseInt(e.target.value)] }))}
          className="w-full mt-6 accent-blue-600"
        />
      </section>

      {/* Region Selection */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 block">
            Region Filtering
          </label>
          <button 
            onClick={() => setState(prev => ({ ...prev, selectedRegionIds: [] }))}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto pr-3 space-y-1.5 custom-scrollbar">
          {regions.map((region) => (
            <label 
              key={region.id}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                state.selectedRegionIds.includes(region.id) 
                  ? 'bg-blue-50 border-blue-100' 
                  : 'bg-white border-transparent hover:bg-slate-50'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                state.selectedRegionIds.includes(region.id)
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-white border-slate-200'
              }`}>
                {state.selectedRegionIds.includes(region.id) && (
                   <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <input 
                type="checkbox"
                className="hidden"
                checked={state.selectedRegionIds.includes(region.id)}
                onChange={() => toggleRegion(region.id)}
              />
              <span className={`text-[13px] font-semibold ${
                state.selectedRegionIds.includes(region.id) ? 'text-blue-700' : 'text-slate-600'
              }`}>
                {region.name}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
