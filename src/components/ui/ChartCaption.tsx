import React from 'react';

interface ChartCaptionProps {
  children: React.ReactNode;
  position?: 'above' | 'below';
}

export default function ChartCaption({ children, position = 'above' }: ChartCaptionProps) {
  return (
    <p
      className={`text-xs text-slate-500 leading-relaxed font-medium ${
        position === 'above' ? 'mb-2' : 'mt-2'
      }`}
    >
      {children}
    </p>
  );
}
