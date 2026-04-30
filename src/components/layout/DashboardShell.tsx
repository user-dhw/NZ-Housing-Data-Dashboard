import React from 'react';
import { LayoutDashboard, Map as MapIcon, BarChart3, TrendingUp, Info, BookOpen } from 'lucide-react';
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
              NZ Housing <span className="text-blue-600">Dashboard</span>
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
            <nav className="flex flex-wrap gap-1 h-full items-center">
              <HeaderLink icon={<Info size={16} />} label="Overview" href="#project-overview" />
              <HeaderLink icon={<MapIcon size={16} />} label="Map" href="#geospatial" />
              <HeaderLink icon={<TrendingUp size={16} />} label="Intelligence" href="#intelligence" />
              <HeaderLink icon={<BarChart3 size={16} />} label="Trends" href="#performance" />
              <HeaderLink icon={<BookOpen size={16} />} label="Sources" href="#methodology" />
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden max-w-md text-right lg:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Scope</p>
                <p className="text-xs font-semibold leading-snug text-slate-700">
                  Five cities/regions • 2015–2025
                </p>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50/50">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>

        <footer className="min-h-8 shrink-0 border-t border-slate-200 bg-white px-6 py-2 md:px-8">
          <div className="flex flex-col gap-1 text-[10px] font-semibold tracking-wide text-slate-500 md:flex-row md:items-center md:justify-between md:gap-4">
            <span className="truncate">
              Data references: MBIE / Tenancy Services; HUD affordability indicators; Cotality/CoreLogic; Stats NZ
            </span>
            <span className="text-slate-400">Course visualisation demo</span>
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
