import React from 'react';

export default function TeamContributions() {
  return (
    <section id="team-contributions" className="scroll-mt-24">
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.15em] text-slate-400">
        Team Contributions
      </h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-[11px] font-black uppercase tracking-wide text-slate-600">
                Team Member
              </th>
              <th className="px-5 py-3 text-[11px] font-black uppercase tracking-wide text-slate-600">
                Main Responsibilities
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 align-top">
              <td className="px-5 py-4 font-semibold whitespace-nowrap">Hongwei Ding</td>
              <td className="px-5 py-4 text-slate-600">
                Dashboard layout, frontend implementation, chart components, interaction design, and
                deployment
              </td>
            </tr>
            <tr className="align-top">
              <td className="px-5 py-4 font-semibold whitespace-nowrap">Zhaoxuan Chen</td>
              <td className="px-5 py-4 text-slate-600">
                Data source checking, metric design, housing affordability interpretation, documentation,
                and presentation preparation
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
