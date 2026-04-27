import React from 'react';
import { Region, HousingMetric, DashboardState } from '../../types';
import { formatCurrency } from '../../utils/dataHelpers';
import { Zap, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InsightPanelProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
}

export default function InsightPanel({ regions, historicalData, state }: InsightPanelProps) {
  const currentYear = state.yearRange[1];
  const startYear = state.yearRange[0];
  
  const generateDeepInsights = () => {
    const selectedRegionsData = regions
      .filter(r => state.selectedRegionIds.includes(r.id))
      .map(r => {
        const start = historicalData.find(d => d.regionId === r.id && d.year === startYear);
        const end = historicalData.find(d => d.regionId === r.id && d.year === currentYear);
        if (!start || !end) return null;
        
        const priceGrowth = ((end.avgPrice - start.avgPrice) / start.avgPrice) * 100;
        const incomeGrowth = ((end.avgIncome - start.avgIncome) / start.avgIncome) * 100;
        const rentGrowth = ((end.avgRent - start.avgRent) / start.avgRent) * 100;
        
        return {
          name: r.name,
          priceVsIncome: priceGrowth / (incomeGrowth || 1),
          rentStress: (end.avgRent * 52) / (end.avgIncome || 1),
          priceGrowth,
          incomeGrowth,
          rentGrowth
        };
      })
      .filter(Boolean) as any[];

    if (selectedRegionsData.length === 0) return ["Select regions to generate specific local insights."];

    const insights: string[] = [];
    const lead = selectedRegionsData[0];

    if (lead.priceVsIncome > 1.5) {
      insights.push(`${lead.name} house prices surged by ${lead.priceGrowth.toFixed(1)}%, outpacing income growth by a factor of ${lead.priceVsIncome.toFixed(1)}x since ${startYear}.`);
    } else {
      insights.push(`${lead.name} showed relatively coupled growth between property values (${lead.priceGrowth.toFixed(1)}%) and household income.`);
    }
    
    if (lead.rentStress > 0.3) {
      insights.push(`Analytical Warning: Average rent in ${lead.name} now absorbs ${(lead.rentStress * 100).toFixed(1)}% of median gross income, exceeding key affordability benchmarks.`);
    }

    const maxRatio = Math.max(...selectedRegionsData.map(d => d.priceVsIncome));
    if (selectedRegionsData.length > 1) {
      const highestInequality = selectedRegionsData.find(d => d.priceVsIncome === maxRatio);
      insights.push(`Inequality Gap: ${highestInequality.name} shows the most extreme divergence, with prices rising ${highestInequality.priceVsIncome.toFixed(1)}x faster than local wages.`);
    }

    return insights;
  };

  const dynamicInsights = generateDeepInsights();
  
  const growthStats = regions.map(r => {
    const startData = historicalData.find(d => d.regionId === r.id && d.year === startYear);
    const endData = historicalData.find(d => d.regionId === r.id && d.year === currentYear);
    if (!startData || !endData) return null;
    const metricStart = state.activeMetric === 'price' ? startData.avgPrice : startData.avgRent;
    const metricEnd = state.activeMetric === 'price' ? endData.avgPrice : endData.avgRent;
    const pctChange = ((metricEnd - metricStart) / metricStart) * 100;
    return { name: r.name, pctChange, value: metricEnd, id: r.id };
  }).filter(Boolean);

  const fastestGrowth = growthStats.length > 0 ? [...growthStats as any].sort((a,b) => b.pctChange - a.pctChange)[0] : null;
  const highestValue = growthStats.length > 0 ? [...growthStats as any].sort((a,b) => b.value - a.value)[0] : null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5">Intelligence Layer</h3>
            <p className="text-xl font-black tracking-tight text-slate-800">Key Narratives</p>
          </div>
        </div>
        <div className="text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md tracking-widest">
           v2025.4
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 relative z-10 pr-2 custom-scrollbar">
        {dynamicInsights.map((insight, i) => (
          <div key={i} className="group bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:bg-white hover:border-blue-200 transition-all duration-300">
            <div className="flex gap-4">
              <span className="text-blue-600 font-mono text-[10px] font-black mt-1 py-1 px-1.5 bg-blue-50 rounded-md shrink-0 h-fit">0{i+1}</span>
              <p className="text-xs leading-relaxed text-slate-600 font-bold group-hover:text-slate-800 transition-colors">{insight}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-4 grid grid-cols-1 gap-3">
          <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 opacity-80">Cycle Projection</div>
                <div className="text-2xl font-black tracking-tight mb-1">{fastestGrowth ? `${fastestGrowth.pctChange.toFixed(1)}%` : 'N/A'}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Peak Growth: {fastestGrowth?.name}</div>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp size={100} />
             </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
             <div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Stance</div>
                <div className="text-sm font-black text-slate-800 uppercase tracking-tight">{currentYear > 2023 ? "Strategic Correction" : "Expansionary Phase"}</div>
             </div>
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center border-4",
               currentYear > 2023 ? "border-amber-100 text-amber-500" : "border-emerald-100 text-emerald-500"
             )}>
                <AlertCircle size={18} />
             </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
    </div>
  );
}

function InsightCard({ icon, label, value, subValue, period, color }: { icon: React.ReactNode, label: string, value: string, subValue: string, period: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-600/50 transition-all group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all", color)}>
            {icon}
          </div>
          <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{period}</span>
        </div>
        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5">{label}</h4>
        <div className="text-2xl font-bold tracking-tight text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{value}</div>
      </div>
      <div className="text-xs text-slate-500 font-bold tracking-tight">{subValue}</div>
    </div>
  );
}
