import React from 'react';

interface ProjectOverviewProps {
  authenticityNote?: string;
}

export default function ProjectOverview({ authenticityNote }: ProjectOverviewProps) {
  return (
    <section
      id="project-overview"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
    >
      <h2 className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Project Overview
      </h2>
      <p className="text-sm leading-relaxed text-slate-700">
        This project investigates housing affordability and market inequality across selected New Zealand cities. It compares house prices, rental costs, income, and affordability pressure derived from comparable metrics. The goal is to help users explore regional differences and long-term trends through interactive visualisations linked by year, metric, and place.
      </p>
      {authenticityNote && (
        <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
          {authenticityNote}
        </p>
      )}
    </section>
  );
}
