import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Region, HousingMetric, DashboardState } from '../../types';
import {
  formatCurrency,
  formatCompact,
  getAffordabilityRatio,
  getMetricLabel,
  getRegionLabel,
} from '../../utils/dataHelpers';

interface TimeSeriesChartProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
}

export default function TimeSeriesChart({ regions, historicalData, state }: TimeSeriesChartProps) {
  const years = Array.from(
    { length: state.yearRange[1] - state.yearRange[0] + 1 }, 
    (_, i) => state.yearRange[0] + i
  );
  
  const getSeriesData = (regionId: string) => {
    return years.map(year => {
      const entry = historicalData.find(d => d.regionId === regionId && d.year === year);
      if (!entry) return null;
      if (state.activeMetric === 'price') return entry.avgPrice;
      if (state.activeMetric === 'rent') return entry.avgRent;
      return getAffordabilityRatio(entry);
    });
  };

  const getNationalAverage = () => {
    return years.map(year => {
      const yearData = historicalData.filter(d => d.year === year);
      if (yearData.length === 0) return null;
      
      const sum = yearData.reduce((acc, curr) => {
        if (state.activeMetric === 'price') return acc + curr.avgPrice;
        if (state.activeMetric === 'rent') return acc + curr.avgRent;
        return acc + getAffordabilityRatio(curr);
      }, 0);
      
      return sum / yearData.length;
    });
  };

  const selectedRegions = regions.filter(r => state.selectedRegionIds.includes(r.id));
  const regionsToShow = selectedRegions.length > 0 ? selectedRegions : regions; // Default to all if none selected

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E5E5E5',
      textStyle: { color: '#141414' },
      formatter: (params: any) => {
        let res = `<div style="font-weight: 700; border-bottom: 1px solid #E5E5E5; padding-bottom: 5px; margin-bottom: 5px;">Year: ${params[0].name}</div>`;
        params.forEach((item: any) => {
          const val = state.activeMetric === 'affordability' ? (item.value ? item.value.toFixed(2) + 'x' : 'N/A') : formatCurrency(item.value);
          res += `<div style="display: flex; justify-content: space-between; gap: 15px;">
            <span>${item.marker} ${item.seriesName}</span>
            <span style="font-weight: 700; font-family: monospace;">${val}</span>
          </div>`;
        });
        return res;
      }
    },
    legend: {
      data: ['Composite Benchmark', ...regionsToShow.map((r) => getRegionLabel(r))],
      bottom: 0,
      icon: 'circle',
      textStyle: { fontSize: 10, fontWeight: 'bold' },
      padding: [10, 0, 0, 0], // Add some padding
      type: 'scroll' // Enable scrolling if too many regions
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: years,
      axisLine: { lineStyle: { color: '#E5E5E5' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#F1F5F9' } },
      axisLabel: { 
        color: '#94a3b8',
        fontSize: 10,
        formatter: (value: number) => state.activeMetric === 'affordability' ? value : formatCompact(value)
      }
    },
    series: [
      {
        name: 'Composite Benchmark',
        type: 'line',
        smooth: true,
        data: getNationalAverage(),
        lineStyle: { width: 2, type: 'dashed', color: '#cbd5e1' },
        itemStyle: { color: '#cbd5e1' },
        symbol: 'none',
        z: 1
      },
      ...regionsToShow.map((region, index) => ({
        name: getRegionLabel(region),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: getSeriesData(region.id),
        lineStyle: { width: 3 },
        itemStyle: {
          color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'][index % 6]
        },
        emphasis: { focus: 'series' },
        z: 10,
        markArea: (index === 0 && state.activeMetric === 'price') ? {
          silent: true,
          itemStyle: { color: 'rgba(59, 130, 246, 0.05)' },
          data: [[{
            name: 'COVID-19 Impact',
            xAxis: '2020'
          }, {
            xAxis: '2022'
          }]]
        } : undefined
      }))
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Trend Over Time</h3>
          <p className="text-xl font-bold text-slate-800">{getMetricLabel(state.activeMetric)}</p>
        </div>
        <div className="text-[10px] bg-slate-50 px-2 py-1 rounded-full font-mono uppercase text-slate-400 font-bold border border-slate-100">
          Multiple Selection Enabled
        </div>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>
    </div>
  );
}
