import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { sizeCharts } from '../data/sizeCharts';
import type { SizeChart } from '../data/sizeCharts';

// Simple original SVG for measuring guide
const MeasurementSVG = () => (
  <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[150px] mx-auto opacity-80">
    <path d="M40 20 C40 10 60 10 60 20 C70 30 90 35 90 45 L85 100 L70 95 L70 60 L65 60 L65 180 L55 180 L50 110 L45 180 L35 180 L35 60 L30 60 L30 95 L15 100 L10 45 C10 35 30 30 40 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    
    {/* Chest Line */}
    <line x1="20" y1="50" x2="80" y2="50" stroke="#B8FF3C" strokeWidth="2" strokeDasharray="4 4" />
    <text x="85" y="53" fill="#B8FF3C" fontSize="10" className="font-display tracking-widest">CHEST</text>
    
    {/* Waist Line */}
    <line x1="25" y1="75" x2="75" y2="75" stroke="#B8FF3C" strokeWidth="2" strokeDasharray="4 4" />
    <text x="80" y="78" fill="#B8FF3C" fontSize="10" className="font-display tracking-widest">WAIST</text>

    {/* Hip Line */}
    <line x1="25" y1="95" x2="75" y2="95" stroke="#B8FF3C" strokeWidth="2" strokeDasharray="4 4" />
    <text x="80" y="98" fill="#B8FF3C" fontSize="10" className="font-display tracking-widest">HIPS</text>
  </svg>
);

export const SizeGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tops-mens');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  const charts: SizeChart[] = Object.values(sizeCharts);
  const activeChart = sizeCharts[activeTab];

  const convert = (inches: number) => {
    if (inches === 0) return '-';
    return unit === 'in' ? inches : Math.round(inches * 2.54);
  };

  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[1200px] mx-auto min-h-screen">
        <h1 className="text-5xl lg:text-7xl font-display text-text-primary uppercase mb-6 text-center">Fit & Sizing</h1>
        <p className="text-center text-text-muted font-body max-w-2xl mx-auto mb-16">
          Our gear is built for progression. We engineer specific fits to match your training intensity. Use the charts below to dial in your precise measurements.
        </p>

        {/* Fit Philosophy Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-surface-elevated p-8 border border-border rounded">
            <h3 className="font-display text-2xl uppercase text-text-primary mb-3">Compression Fit</h3>
            <p className="font-body text-text-muted text-sm leading-relaxed">
              Acts as a second skin. Ultra-tight fit engineered to lock in muscles, reduce vibration, and wick moisture rapidly. True to size for maximum lockdown.
            </p>
          </div>
          <div className="bg-surface-elevated p-8 border border-border rounded relative overflow-hidden">
            <div className="absolute inset-0 border-2 border-accent-primary opacity-20 pointer-events-none rounded" />
            <h3 className="font-display text-2xl uppercase text-text-primary mb-3">Athletic Fit</h3>
            <p className="font-body text-text-muted text-sm leading-relaxed">
              Our signature silhouette. Tailored through the chest and arms while tapering sharply at the waist. Size up if you fall between measurements.
            </p>
          </div>
          <div className="bg-surface-elevated p-8 border border-border rounded">
            <h3 className="font-display text-2xl uppercase text-text-primary mb-3">Relaxed Fit</h3>
            <p className="font-body text-text-muted text-sm leading-relaxed">
              Built for recovery and warmups. Dropped shoulders and a looser drape through the body. Provides maximum mobility without feeling oversized.
            </p>
          </div>
        </div>

        {/* Interactive Sizing System */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Chart Area */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
              {charts.map(chart => (
                <button
                  key={chart.id}
                  onClick={() => setActiveTab(chart.id)}
                  className={`px-6 py-3 font-display tracking-widest uppercase text-sm transition-colors rounded ${activeTab === chart.id ? 'bg-text-primary text-background' : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated'}`}
                >
                  {chart.name.split(' (')[0]}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-end mb-6">
              <h2 className="font-display text-3xl uppercase text-text-primary">{activeChart.name}</h2>
              <div className="flex bg-surface p-1 rounded">
                <button 
                  onClick={() => setUnit('in')}
                  className={`px-4 py-1 text-sm font-display tracking-widest uppercase transition-colors rounded ${unit === 'in' ? 'bg-accent-primary text-background' : 'text-text-muted hover:text-text-primary'}`}
                >
                  IN
                </button>
                <button 
                  onClick={() => setUnit('cm')}
                  className={`px-4 py-1 text-sm font-display tracking-widest uppercase transition-colors rounded ${unit === 'cm' ? 'bg-accent-primary text-background' : 'text-text-muted hover:text-text-primary'}`}
                >
                  CM
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto border border-border rounded mb-8"
              >
                <table className="w-full text-left font-body">
                  <thead className="bg-surface text-text-primary uppercase text-xs tracking-wider border-b border-border">
                    <tr>
                      <th className="p-5">Size</th>
                      <th className="p-5">Chest</th>
                      <th className="p-5">Waist</th>
                      {activeChart.rows[0].hips !== undefined && <th className="p-5">Hips</th>}
                      {activeChart.rows[0].inseam !== undefined && <th className="p-5">Inseam</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-text-muted">
                    {activeChart.rows.map((row) => (
                      <tr key={row.size} className="hover:bg-surface/50 transition-colors">
                        <td className="p-5 font-bold text-text-primary">{row.size}</td>
                        <td className="p-5">{convert(row.chest)}</td>
                        <td className="p-5">{convert(row.waist)}</td>
                        {row.hips !== undefined && <td className="p-5">{convert(row.hips)}</td>}
                        {row.inseam !== undefined && <td className="p-5">{convert(row.inseam)}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* How to Measure Sidebar */}
          <div className="w-full lg:w-80 shrink-0 bg-surface rounded p-8 border border-border self-start">
            <h3 className="font-display text-2xl uppercase text-text-primary mb-6">How to Measure</h3>
            <div className="mb-8 bg-background/50 rounded py-6 flex items-center justify-center border border-border">
              <MeasurementSVG />
            </div>
            <p className="font-body text-text-muted text-sm leading-relaxed">
              {activeChart.guideInstructions}
            </p>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-body text-xs text-text-muted uppercase tracking-widest text-center">
                Need Help? <br/> <a href="/contact" className="text-accent-primary hover:underline mt-2 inline-block">Contact Support</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default SizeGuide;
