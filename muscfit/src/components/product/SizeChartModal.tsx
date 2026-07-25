import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SizeChart } from '../../data/sizeCharts';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: SizeChart;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose, sizeChart }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  const convert = (inches: number) => {
    if (inches === 0) return '-';
    return unit === 'in' ? inches : Math.round(inches * 2.54);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-surface-elevated border border-border rounded shadow-2xl p-8 z-10 max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-text-primary text-2xl leading-none">
              &times;
            </button>

            <h2 className="font-display text-4xl text-text-primary uppercase mb-2">Size Guide</h2>
            <p className="font-body text-text-muted mb-8">{sizeChart.name}</p>

            <div className="flex justify-end mb-4 bg-surface p-1 rounded w-max ml-auto">
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

            <div className="overflow-x-auto mb-8 border border-border rounded">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-surface text-text-primary uppercase text-xs tracking-wider border-b border-border">
                  <tr>
                    <th className="p-4">Size</th>
                    <th className="p-4">Chest</th>
                    <th className="p-4">Waist</th>
                    {sizeChart.rows[0].hips !== undefined && <th className="p-4">Hips</th>}
                    {sizeChart.rows[0].inseam !== undefined && <th className="p-4">Inseam</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-muted">
                  {sizeChart.rows.map((row) => (
                    <tr key={row.size} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-text-primary">{row.size}</td>
                      <td className="p-4">{convert(row.chest)}</td>
                      <td className="p-4">{convert(row.waist)}</td>
                      {row.hips !== undefined && <td className="p-4">{convert(row.hips)}</td>}
                      {row.inseam !== undefined && <td className="p-4">{convert(row.inseam)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-surface p-6 rounded">
              <h3 className="font-display text-xl uppercase mb-2 text-text-primary">How to Measure</h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {sizeChart.guideInstructions}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
