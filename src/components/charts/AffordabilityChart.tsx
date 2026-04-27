import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Region, HousingMetric, DashboardState } from '../../types';
import { formatCurrency, formatCompact } from '../../utils/dataHelpers';

interface AffordabilityChartProps {
  regions: Region[];
  historicalData: HousingMetric[];
  state: DashboardState;
}

export default function AffordabilityChart({ regions, historicalData, state }: AffordabilityChartProps) {
  const currentYear = state.yearRange[1];
  
  const scatterData = regions.map(r => {
    const metric = historicalData.find(d => d.regionId === r.id && d.year === currentYear);
    if (!metric) return null;
    return [
      metric.avgIncome, // x
      metric.avgPrice,  // y
      metric.population, // size
      r.name,           // name
      r.id              // id
    ];
  }).filter(Boolean);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E5E5E5',
      formatter: (params: any) => {
        const [income, price, pop, name] = params.data.value;
        return `<div style="font-family: sans-serif;">
          <div style="font-weight: 700; border-bottom: 1px solid #E5E5E5; padding-bottom: 5px; margin-bottom: 5px;">${name}</div>
          <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 12px;">
            <span style="color: #9E9E9E">Avg Income:</span>
            <span>${formatCurrency(income)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 12px;">
            <span style="color: #9E9E9E">Avg Price:</span>
            <span>${formatCurrency(price)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 12px;">
            <span style="color: #9E9E9E">Ratio:</span>
            <span style="font-weight: 700;">${(price / income).toFixed(1)}x</span>
          </div>
        </div>`;
      }
    },
    xAxis: {
      type: 'value',
      name: 'Avg Annual Income',
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: { formatter: (v: number) => formatCompact(v), color: '#9E9E9E' },
      splitLine: { lineStyle: { color: '#F0F0F0', type: 'dashed' } }
    },
    yAxis: {
      type: 'value',
      name: 'Avg House Price',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: { formatter: (v: number) => formatCompact(v), color: '#9E9E9E' },
      splitLine: { lineStyle: { color: '#F0F0F0', type: 'dashed' } }
    },
    series: [
      {
        type: 'scatter',
        symbolSize: function (data: any) {
          return Math.sqrt(data[2]) / 180;
        },
        data: scatterData.map((d: any) => ({
          value: d,
          itemStyle: {
            color: state.selectedRegionIds.includes(d[4]) ? '#2563eb' : 'rgba(94, 116, 147, 0.2)',
            borderWidth: state.selectedRegionIds.includes(d[4]) ? 3 : 1,
            borderColor: state.selectedRegionIds.includes(d[4]) ? '#2563eb' : '#cbd5e1'
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) => params.data.value[3],
          fontSize: 10,
          color: '#64748b',
          fontWeight: 'bold'
        },
        markLine: {
          silent: true,
          lineStyle: { color: '#ef4444', type: 'dashed', opacity: 0.5 },
          label: { position: 'end', formatter: 'Critical Stress', fontSize: 9 },
          data: [{ yAxis: 800000 }, { xAxis: 80000 }]
        },
        markArea: {
          silent: true,
          itemStyle: { color: 'rgba(16, 185, 129, 0.05)' },
          data: [[{
            xAxis: 0,
            yAxis: 0
          }, {
            xAxis: 65000,
            yAxis: 400000
          }]]
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 h-full flex flex-col shadow-sm">
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Affordability Matrix</h3>
        <p className="text-xl font-bold text-slate-800">Income vs Price ({currentYear})</p>
      </div>
      <div className="flex-1 min-h-[350px]">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-[10px] text-[#9E9E9E] italic">
        * Bubble size represents regional population
      </div>
    </div>
  );
}
