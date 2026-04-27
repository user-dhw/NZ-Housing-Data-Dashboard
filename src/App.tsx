/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import DashboardShell from './components/layout/DashboardShell';
import FilterPanel from './components/ui/FilterPanel';
import InsightPanel from './components/ui/InsightPanel';
import NZMap from './components/map/NZMap';
import TimeSeriesChart from './components/charts/TimeSeriesChart';
import RegionalComparisonChart from './components/charts/RegionalComparisonChart';
import AffordabilityChart from './components/charts/AffordabilityChart';
import { DashboardState } from './types';
import data from './data/nz-housing-data.json';
import { motion } from 'motion/react';
import { LayoutDashboard, TrendingUp, Zap } from 'lucide-react';

import NarrativeSection from './components/ui/NarrativeSection';
import AffordabilityHeatmap from './components/charts/AffordabilityHeatmap';

export default function App() {
  const [state, setState] = useState<DashboardState>({
    selectedRegionIds: ['auckland', 'wellington'],
    yearRange: [2015, 2025],
    activeMetric: 'price'
  });

  const handleRegionSelect = (id: string) => {
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
    <DashboardShell 
      sidebar={
        <FilterPanel 
          regions={data.regions} 
          state={state} 
          setState={setState} 
        />
      }
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 pb-12"
      >
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800">Analytical Workspace</h1>
            </div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.25em] pl-4.5">NZ Housing Pulse • Geospatial & Temporal Study 2015-{state.yearRange[1]}</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm self-start md:self-auto">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Real-time Data Active</span>
          </div>
        </div>

        {/* Row 1: Geospatial Analysis */}
        <div id="geospatial" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
          <div className="lg:col-span-8 h-[550px] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <NZMap 
              regions={data.regions}
              historicalData={data.historicalData}
              state={state}
              onRegionSelect={handleRegionSelect}
            />
          </div>
          <div className="lg:col-span-4 h-[550px]">
             <RegionalComparisonChart 
               regions={data.regions}
               historicalData={data.historicalData}
               state={state}
             />
          </div>
        </div>

        {/* Row 2: Trend & Relationship Analysis */}
        <div id="performance" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-24">
          <div className="h-[480px]">
             <TimeSeriesChart 
               regions={data.regions}
               historicalData={data.historicalData}
               state={state}
             />
          </div>
          <div className="h-[480px]">
             <AffordabilityChart 
               regions={data.regions}
               historicalData={data.historicalData}
               state={state}
             />
          </div>
        </div>

        {/* Row 3: Temporal Matrix & Intelligence */}
        <div id="intelligence" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
          <div className="lg:col-span-8 h-[500px]">
            <AffordabilityHeatmap 
              regions={data.regions}
              historicalData={data.historicalData}
              state={state}
            />
          </div>
          <div className="lg:col-span-4 h-[500px]">
            <InsightPanel 
              regions={data.regions} 
              historicalData={data.historicalData} 
              state={state} 
            />
          </div>
        </div>

        {/* Row 4: Synthesis & Synthesis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-500 flex flex-col">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
               <TrendingUp size={24} />
            </div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Market Volatility</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">Queenstown remains NZ's most expensive market, with price-to-income ratios consistently exceeding 15x. Auckland and Wellington show a stabilizing trend post-2022 correction.</p>
          </div>
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all duration-500 flex flex-col">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
               <LayoutDashboard size={24} />
            </div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Urban Stability</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">Christchurch maintains the highest resilience among major centers, offering the most balanced ratio between household income and median property values.</p>
          </div>
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-500 flex flex-col">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
               <Zap size={24} />
            </div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Satellite Density</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">Hamilton has transitioned from a satellite to a hub, experiencing significant pressure as population density follows Auckland's northward expansion.</p>
          </div>
        </div>

        {/* Row 5: Methodology Strip */}
        <div id="methodology" className="flex items-center gap-8 bg-slate-100/50 p-4 rounded-xl border border-slate-200/50 scroll-mt-24">
          <div className="flex items-center gap-2 shrink-0">
             <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
               <span className="text-white text-[10px] font-bold">M</span>
             </div>
             <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">Analytical Framework</span>
          </div>
          <div className="flex-1 flex gap-12 overflow-hidden">
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Synchronized Linking</span>
                <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Brushing & Linking applied across all geospatial and temporal datasets.</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Normalization</span>
                <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">HPI ratio used for socio-economic parity comparison.</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Benchmarks</span>
                <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Standardized against international 3.0x affordability barrier.</span>
             </div>
          </div>
        </div>
        
        <footer className="mt-12 py-8 border-t border-slate-100 flex justify-between items-center text-[9px] uppercase font-bold tracking-widest text-slate-400">
          <div>Reference: MBIE, REINZ & Stats NZ</div>
          <div>Information Visualization v2025</div>
        </footer>
      </motion.div>
    </DashboardShell>
  );
}

