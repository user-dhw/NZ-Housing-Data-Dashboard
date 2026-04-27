import React from 'react';
import { LayoutDashboard, Map as MapIcon, BarChart3, TrendingUp, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function DashboardShell({ children, sidebar }: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800">
              NZ Housing <span className="text-blue-600">Pulse</span>
            </h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {sidebar}
        </div>
        

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-20 sticky top-0">
          <div className="flex items-center gap-12 h-full">
            <nav className="flex gap-1 h-full items-center">
              <HeaderLink icon={<MapIcon size={16} />} label="Geospatial" href="#geospatial" active />
              <HeaderLink icon={<TrendingUp size={16} />} label="Intelligence" href="#intelligence" />
              <HeaderLink icon={<BarChart3 size={16} />} label="Performance" href="#performance" />
              <HeaderLink icon={<Info size={16} />} label="Methodology" href="#methodology" />
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex gap-6 items-center px-4">
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">Market Price</p>
                  <p className="text-sm font-bold text-slate-800">$845k <span className="text-[10px] text-emerald-500 font-black">+4.2%</span></p>
                </div>
                <div className="w-px h-6 bg-slate-100"></div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">Rental Yield</p>
                  <p className="text-sm font-bold text-slate-800">4.1% <span className="text-[10px] text-rose-500 font-black">+0.3%</span></p>
                </div>
             </div>
             <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                Share Dataset
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50/50">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>

        <footer className="h-8 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex gap-4 text-[10px] font-bold text-slate-400 tracking-wider">
            <span>SOURCE: REINZ & TENANCY SERVICES</span>
            <span className="text-slate-200">|</span>
            <span>LAST UPDATED: APR 2026</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 animate-pulse"></span>
            <span className="uppercase tracking-widest">Data Connection Live</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function HeaderLink({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <a 
      href={href} 
      className={cn(
        "flex items-center gap-2.5 text-[10px] font-black transition-all relative h-full px-4 uppercase tracking-[0.15em]",
        active ? "text-blue-600 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-blue-600 after:rounded-full" : "text-slate-400 hover:text-slate-800"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("transition-colors", active ? "text-blue-600" : "text-slate-400")
      })}
      <span>{label}</span>
    </a>
  );
}
