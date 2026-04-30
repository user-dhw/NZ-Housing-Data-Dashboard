import React from 'react';

interface ProjectOverviewProps {
  authenticityNote?: string;
}

export default function ProjectOverview({ authenticityNote }: ProjectOverviewProps) {
  return (
    <section
      id="project-overview"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
    >
      <h2 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Project Overview
      </h2>
      <p className="text-sm leading-relaxed text-slate-700">
        This dashboard compares housing affordability indicators across selected New Zealand locations from 2015 to 2025 using coordinated interactive charts. It helps users inspect how house prices, rents, incomes, and affordability ratios change over time and differ by place.
      </p>
      {authenticityNote && (
        <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500">
          {authenticityNote}
        </p>
      )}
    </section>
  );
}
