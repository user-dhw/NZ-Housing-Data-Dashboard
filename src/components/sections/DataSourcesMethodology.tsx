import React from 'react';
import type { DashboardDataset, DatasetDataSource } from '../../types';

type DataSources = NonNullable<DashboardDataset['dataSources']>;
type Methodology = NonNullable<DashboardDataset['methodology']>;

interface DataSourcesMethodologyProps {
  dataSources?: DataSources;
  methodology?: Methodology;
  lastUpdated?: string;
}

function sourceCardTitle(key: string): string {
  const map: Record<string, string> = {
    priceMetric: 'Price metric',
    rentMetric: 'Rent metric',
    incomeMetric: 'Income metric',
    populationMetric: 'Population metric',
    affordabilityMetric: 'Affordability metric',
  };
  return map[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

export default function DataSourcesMethodology({
  dataSources,
  methodology,
  lastUpdated,
}: DataSourcesMethodologyProps) {
  const sourceEntries = dataSources ? (Object.entries(dataSources) as [string, DatasetDataSource][]) : [];

  return (
    <section id="methodology" className="scroll-mt-24">
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Data Sources
      </h2>

      {lastUpdated && (
        <p className="mb-4 text-xs text-slate-500">
          Project dataset notes last updated:{' '}
          <span className="font-semibold text-slate-700">{lastUpdated}</span>
        </p>
      )}

      {sourceEntries.length > 0 ? (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sourceEntries.map(([key, src]) => (
            <article
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-700">
                {sourceCardTitle(key)}
              </h3>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {src.sourceName}
              </p>
              <p className="mb-2 text-xs leading-relaxed text-slate-600">{src.reasonForUse}</p>
              <p className="text-[10px] leading-relaxed text-slate-500">
                <span className="font-semibold text-slate-600">Geographic level: </span>
                {src.geographicLevel}
              </p>
              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[10px] font-bold text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800"
                >
                  Source link
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-xs text-slate-500">No structured data source metadata found in the dataset file.</p>
      )}

      {methodology?.calculationNotes && methodology.calculationNotes.length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-[11px] font-black uppercase tracking-wide text-slate-700">
            Calculation notes
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-xs leading-relaxed text-slate-600">
            {methodology.calculationNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {methodology?.geographicMatching && Object.keys(methodology.geographicMatching).length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-[11px] font-black uppercase tracking-wide text-slate-700">
            Geographic matching
          </h3>
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full border-collapse text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-2 font-black uppercase tracking-wide text-slate-500">
                    Dashboard region
                  </th>
                  <th className="px-4 py-2 font-black uppercase tracking-wide text-slate-500">
                    Territorial Authority
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(methodology.geographicMatching).map(([id, ta]) => (
                  <tr key={id} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-2 font-mono text-[11px] text-slate-600">{id}</td>
                    <td className="px-4 py-2">{ta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {methodology?.limitations && methodology.limitations.length > 0 && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
          <h3 className="mb-3 text-[11px] font-black uppercase tracking-wide text-amber-900">
            Limitations & transparency
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-xs leading-relaxed text-amber-950/80">
            {methodology.limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
