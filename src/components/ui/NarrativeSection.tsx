import React from 'react';
import { motion } from 'motion/react';

interface NarrativeSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  children: React.ReactNode;
  id?: string;
}

export default function NarrativeSection({ title, subtitle, description, children, id }: NarrativeSectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="max-w-4xl mb-6">
        {subtitle && (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-1 block">
            {subtitle}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 mb-2">{title}</h2>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
