import React from 'react';

const insights = [
  {
    title: 'Regional variation',
    text: 'Affordability pressure differs clearly across the selected locations.',
  },
  {
    title: 'Price-income gap',
    text: 'In several selected locations, house prices have grown faster than incomes over much of the period.',
  },
  {
    title: 'Rent and price movement',
    text: 'Rent trends and house-price trends do not move at the same pace in every selected location.',
  },
];

export default function KeyInsights() {
  return (
    <section id="insights" className="scroll-mt-24">
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Key Analytical Insights
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {insights.map(({ title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-2 text-[11px] font-black uppercase tracking-wide text-slate-700">
              {title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
