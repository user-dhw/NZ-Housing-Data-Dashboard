import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Region, HousingMetric, DashboardState } from '../../types';
import { getAffordabilityRatio, getRegionLabel } from '../../utils/dataHelpers';

interface AffordabilityHeatmapProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
}

export default function AffordabilityHeatmap({ regions, historicalData, state }: AffordabilityHeatmapProps) {
  const years = Array.from(
    { length: state.yearRange[1] - state.yearRange[0] + 1 }, 
    (_, i) => state.yearRange[0] + i
  );
  const popularityOrder = ['auckland', 'wellington', 'christchurch', 'queenstown', 'hamilton'];
  
  const sortedRegions = [...regions].sort((a, b) => {
    const idxA = popularityOrder.indexOf(a.id);
    const idxB = popularityOrder.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return getRegionLabel(a).localeCompare(getRegionLabel(b));
  });

  const sortedRegionNames = sortedRegions.map((r) => getRegionLabel(r));

  const data = [];
  for (let i = 0; i < sortedRegions.length; i++) {
    for (let j = 0; j < years.length; j++) {
      const metric = historicalData.find(d => d.regionId === sortedRegions[i].id && d.year === years[j]);
      const ratio = metric ? getAffordabilityRatio(metric) : 0;
      data.push([j, i, ratio || '-']);
    }
  }

  const option = {
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E5E5E5',
      borderWidth: 1,
      textStyle: { color: '#334155', fontSize: 12 },
      formatter: (params: any) => {
        const val = params.data[2];
        const status =
          val > 7 ? 'Critical' : val > 5 ? 'High stress' : val > 3 ? 'Elevated' : 'Lower pressure';
        return `<div style="font-family: sans-serif; padding: 4px;">
          <div style="font-weight: 700; margin-bottom: 4px;">${getRegionLabel(sortedRegions[params.data[1]])} | ${years[params.data[0]]}</div>
          <div style="display: flex; justify-content: space-between; gap: 20px;">
            <span style="color: #64748b;">HPI Ratio:</span>
            <span style="font-weight: 700;">${val === '-' ? 'N/A' : val.toFixed(2) + 'x'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 20px; margin-top: 2px;">
            <span style="color: #64748b;">Status:</span>
            <span style="font-weight: 700; color: ${val > 5 ? '#ef4444' : '#10b981'}">${status}</span>
          </div>
        </div>`;
      }
    },
    grid: {
      top: '10%',
      bottom: '15%',
      left: '15%',
      right: '5%'
    },
    xAxis: {
      type: 'category',
      data: years,
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: sortedRegionNames,
      splitArea: { show: true },
      inverse: true // Auckland at top
    },
    visualMap: {
      min: 2,
      max: 12,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%', // Moved up to avoid overlap with footer
      inRange: {
        color: ['#10b981', '#f59e0b', '#ef4444'] // Green to Red
      },
      label: {
        formatter: (v: number) => `${v}x`,
        style: { fontSize: 10 }
      }
    },
    series: [{
      name: 'Affordability Ratio',
      type: 'heatmap',
      data: data,
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Affordability Pressure Matrix</h3>
        <p className="text-xl font-bold text-slate-800">Regional Inequality Evolution ({state.yearRange[0]}-{state.yearRange[1]})</p>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
      <div className="mt-2 p-3 bg-slate-50 rounded-xl">
        <p className="text-[10px] text-slate-500 leading-relaxed italic">
          * Heat intensity represents the Price-to-Income ratio. Standard benchmark is 3.0x.
        </p>
      </div>
    </div>
  );
}
