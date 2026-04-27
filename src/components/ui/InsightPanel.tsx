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
    <div className="bg-white rounded-3xl p-6 border border-slate-200 h-full shadow-sm relative overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
          <AlertCircle size={20} />
        </div>
        <div>
          <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-0.5">Intelligence Layer</h3>
          <p className="text-lg font-bold tracking-tight text-slate-800">Market Analysis</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 relative z-10 pr-2 custom-scrollbar">
        {dynamicInsights.map((insight, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
            <div className="flex gap-3">
              <span className="text-blue-600 font-mono text-xs mt-0.5 shrink-0">0{i+1}</span>
              <p className="text-xs leading-relaxed text-slate-600 font-semibold">{insight}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-4 grid grid-cols-1 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
             <div className="text-[9px] font-bold text-blue-600 uppercase mb-1">Growth Peak ({startYear}-{currentYear})</div>
             <div className="text-lg font-bold text-slate-800">{fastestGrowth ? `${fastestGrowth.pctChange.toFixed(1)}%` : 'N/A'}</div>
             <div className="text-[9px] text-slate-500 font-medium">Leading: {fastestGrowth?.name}</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
             <div className="text-[9px] font-bold text-emerald-600 uppercase mb-1">Market Context</div>
             <div className="text-lg font-bold uppercase tracking-tight text-slate-800">{currentYear > 2023 ? "Correction" : "Expansionary"}</div>
             <div className="text-[9px] text-slate-500 font-medium">Macro cycle status</div>
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
