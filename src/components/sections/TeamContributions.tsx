import React from 'react';

export default function TeamContributions() {
  return (
    <section id="team-contributions" className="scroll-mt-24">
      <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
          <h2 className="text-sm font-black uppercase tracking-[0.15em] text-slate-400">
            Team Contributions
          </h2>
          <span className="text-xs font-bold text-blue-600 group-open:rotate-45 transition-transform">+</span>
        </summary>
        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-600 space-y-3">
          <p>
            <span className="font-semibold text-slate-700">Hongwei Ding:</span> Dashboard layout, frontend
            implementation, chart components, interaction design, and deployment.
          </p>
          <p>
            <span className="font-semibold text-slate-700">Zhaoxuan Chen:</span> Data source checking,
            metric design, affordability interpretation, documentation, and presentation preparation.
          </p>
        </div>
      </details>
    </section>
  );
}
