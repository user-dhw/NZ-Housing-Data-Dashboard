import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Region, HousingMetric, DashboardState } from '../../types';
import {
  formatCompact,
  getAffordabilityRatio,
  getMetricLabel,
  getRegionLabel,
} from '../../utils/dataHelpers';

interface RegionalComparisonChartProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
}

export default function RegionalComparisonChart({ regions, historicalData, state }: RegionalComparisonChartProps) {
  const currentYear = state.yearRange[1];
  
  // Filter regions with data for current year
  const dataForYear = regions
    .map(r => {
      const metric = historicalData.find(d => d.regionId === r.id && d.year === currentYear);
      let value = 0;
      if (metric) {
        if (state.activeMetric === 'price') value = metric.avgPrice;
        else if (state.activeMetric === 'rent') value = metric.avgRent;
        else value = getAffordabilityRatio(metric);
      }
      return { name: getRegionLabel(r), value, id: r.id };
    })
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E5E5E5',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { 
        formatter: (value: number) => state.activeMetric === 'affordability' ? value : formatCompact(value),
        color: '#9E9E9E'
      },
      splitLine: { lineStyle: { type: 'dashed', color: '#F0F0F0' } }
    },
    yAxis: {
      type: 'category',
      data: dataForYear.map(d => d.name),
      axisLine: { lineStyle: { color: '#E5E5E5' } },
      axisLabel: { 
        color: (value: string) => {
          const region = regions.find((r) => getRegionLabel(r) === value);
          return state.selectedRegionIds.includes(region?.id || '') ? '#2563eb' : '#94a3b8';
        },
        fontWeight: (value: string) => {
          const region = regions.find((r) => getRegionLabel(r) === value);
          return state.selectedRegionIds.includes(region?.id || '') ? 'bold' : 'normal';
        }
      }
    },
    series: [
      {
        name: getMetricLabel(state.activeMetric),
        type: 'bar',
        data: dataForYear.map(d => ({
          value: d.value,
          itemStyle: {
            color: state.selectedRegionIds.includes(d.id) ? '#2563eb' : '#e2e8f0',
            borderRadius: [0, 6, 6, 0]
          }
        })),
        barWidth: '50%',
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => state.activeMetric === 'affordability' ? params.value.toFixed(1) + 'x' : formatCompact(params.value),
          fontSize: 10,
          fontWeight: 'bold',
          color: '#1e293b'
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 h-full flex flex-col shadow-sm">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Regional Rank</h3>
        <p className="text-xl font-bold text-slate-800">Comparison in {currentYear}</p>
      </div>
      <div className="flex-1 min-h-[400px]">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>
    </div>
  );
}
