/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import DashboardShell from './components/layout/DashboardShell';
import FilterPanel from './components/ui/FilterPanel';
import InsightPanel from './components/ui/InsightPanel';
import ChartCaption from './components/ui/ChartCaption';
import NZMap from './components/map/NZMap';
import TimeSeriesChart from './components/charts/TimeSeriesChart';
import RegionalComparisonChart from './components/charts/RegionalComparisonChart';
import AffordabilityChart from './components/charts/AffordabilityChart';
import { DashboardState } from './types';
import dataset from './data/dataset';
import { motion } from 'motion/react';

import AffordabilityHeatmap from './components/charts/AffordabilityHeatmap';
import ProjectOverview from './components/sections/ProjectOverview';
import DataSourcesMethodology from './components/sections/DataSourcesMethodology';
import TeamContributions from './components/sections/TeamContributions';
import KeyInsights from './components/sections/KeyInsights';

const { regions, historicalData, metadata, dataSources, methodology } = dataset;

export default function App() {
  const [state, setState] = useState<DashboardState>({
    selectedRegionIds: ['auckland', 'wellington'],
    yearRange: [2015, 2025],
    activeMetric: 'price',
  });

  const handleRegionSelect = (id: string) => {
    setState((prev) => {
      const isSelected = prev.selectedRegionIds.includes(id);
      if (isSelected) {
        return { ...prev, selectedRegionIds: prev.selectedRegionIds.filter((rid) => rid !== id) };
      }
      return { ...prev, selectedRegionIds: [...prev.selectedRegionIds, id] };
    });
  };

  return (
    <DashboardShell
      sidebar={
        <FilterPanel regions={regions} state={state} setState={setState} />
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 pb-12"
      >
        <header className="mb-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="h-8 w-1.5 rounded-full bg-blue-600" />
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-800">
                  {metadata?.projectTitle ??
                    'Visualising Housing Affordability and Market Inequality in New Zealand'}
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {metadata?.subtitle ??
                    'Interactive visual analysis of housing affordability trends across five New Zealand cities from 2015 to 2025.'}
                </p>
              </div>
            </div>
          </div>
          <div className="self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm md:self-auto">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              2015–{state.yearRange[1]}
            </span>
          </div>
        </header>

        <div
          id="geospatial"
          className="scroll-mt-24 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch"
        >
          <div className="lg:col-span-7">
            <ChartCaption>Shows geographic differences in housing affordability across selected cities.</ChartCaption>
            <div className="h-[460px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm xl:h-[520px]">
              <NZMap
                regions={regions}
                historicalData={historicalData}
                state={state}
                onRegionSelect={handleRegionSelect}
              />
            </div>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <ChartCaption>
              Compares selected metrics between cities for the chosen year ({state.yearRange[1]}).
            </ChartCaption>
            <div className="h-[460px] min-h-0 xl:h-[520px]">
              <RegionalComparisonChart
                regions={regions}
                historicalData={historicalData}
                state={state}
              />
            </div>
          </div>
        </div>

        <div id="performance" className="scroll-mt-24 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <ChartCaption>
              Shows how the selected metric changes over time across selected locations.
            </ChartCaption>
            <div className="h-[480px]">
              <TimeSeriesChart
                regions={regions}
                historicalData={historicalData}
                state={state}
              />
            </div>
          </div>
          <div>
            <ChartCaption>
              Compares income and house prices to show affordability pressure (price divided by income).
            </ChartCaption>
            <div className="h-[480px]">
              <AffordabilityChart
                regions={regions}
                historicalData={historicalData}
                state={state}
              />
            </div>
          </div>
        </div>

        <div id="intelligence" className="scroll-mt-24 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ChartCaption>Shows affordability intensity across cities and years.</ChartCaption>
            <div className="h-[500px]">
              <AffordabilityHeatmap
                regions={regions}
                historicalData={historicalData}
                state={state}
              />
            </div>
          </div>
          <div className="lg:col-span-4 h-[500px] min-h-0">
            <InsightPanel
              regions={regions}
              historicalData={historicalData}
              state={state}
            />
          </div>
        </div>

        <KeyInsights />

        <ProjectOverview authenticityNote={metadata?.dataAuthenticityNote} />

        <DataSourcesMethodology
          dataSources={dataSources}
          methodology={methodology}
          lastUpdated={metadata?.lastUpdatedForProject}
        />

        <TeamContributions />

        <footer className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-8 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-4xl leading-relaxed normal-case tracking-normal font-medium text-slate-500">
            Data references: MBIE / Tenancy Services Rental Bond Data; HUD Change in Housing Affordability
            Indicators; Cotality/CoreLogic Home Value Index; Stats NZ regional income and population statistics.
          </p>
          <span className="shrink-0 text-slate-400">NZ Housing Visualisation Dashboard</span>
        </footer>
      </motion.div>
    </DashboardShell>
  );
}
