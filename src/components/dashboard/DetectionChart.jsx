import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { DETECTION_CLASSES } from '../../data/detectionClasses';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#111827] border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-slate-100">{data.name}</p>
        <p className="text-slate-400 mt-0.5">
          Standard: <span className="text-orange-400">{data.standard}</span>
        </p>
        <p className="text-slate-400">
          Category: <span className="text-slate-300">{data.category}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DetectionChart = ({ records = [] }) => {
  // Chart data representing all 7 monitored classes
  const chartData = DETECTION_CLASSES.map((cls) => {
    return {
      name: cls.displayName.split(' ')[0], // short label
      fullName: cls.displayName,
      color: cls.color,
      standard: cls.standardCode.split('/')[0],
      category: cls.categoryLabel,
      inspections: 1 // Baseline class representation
    };
  });

  return (
    <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Safety Equipment Distribution
          </h3>
          <p className="text-xs text-slate-400">
            All 7 industrial categories supported by the active model
          </p>
        </div>
        <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
          7 Classes
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar dataKey="inspections" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>Extinguisher</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span>Hydrant</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span>Hose</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Alarm</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>Detector</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Helmet</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <span>Toolbox</span>
        </div>
      </div>
    </div>
  );
};
