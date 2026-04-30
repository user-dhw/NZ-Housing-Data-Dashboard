import React from 'react';

const insights = [
  {
    title: 'Regional spread',
    text: 'Housing affordability pressure differs strongly between cities, reflecting uneven price, rent, and income dynamics.',
  },
  {
    title: 'High-pressure markets',
    text: 'Queenstown-Lakes and Auckland show high affordability pressure because house values are high compared with income in this dataset.',
  },
  {
    title: 'Price and rent trajectories',
    text: 'Rent growth and house price growth do not always move at the same speed across regions or periods.',
  },
  {
    title: 'Recent market phase',
    text: 'The post-COVID period shows noticeable housing market changes across several cities when viewed alongside earlier years.',
  },
];

export default function KeyInsights() {
  return (
    <section id="insights" className="scroll-mt-24">
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Key Analytical Insights
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
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
