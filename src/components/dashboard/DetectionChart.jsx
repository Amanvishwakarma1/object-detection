import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { DETECTION_CLASSES } from '../../data/detectionClasses';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0B101D] border border-slate-700/80 p-2.5 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-semibold text-slate-100">{data.fullName}</p>
        <p className="text-[11px] text-slate-400">
          Standard: <span className="text-orange-400 font-mono">{data.standard}</span>
        </p>
        <p className="text-[11px] text-slate-400">
          Category: <span className="text-slate-300">{data.category}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DetectionChart = ({ records = [] }) => {
  const chartData = DETECTION_CLASSES.map((cls) => {
    return {
      name: cls.displayName.split(' ')[0],
      fullName: cls.displayName,
      color: cls.color,
      standard: cls.standardCode.split('/')[0],
      category: cls.categoryLabel,
      inspections: 1
    };
  });

  return (
    <div className="p-4.5 rounded-xl enterprise-card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Safety Equipment Categories
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Active industrial equipment classes monitored by the YOLO model
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-300 bg-[#162033] px-2 py-0.5 rounded border border-slate-700/60">
          3 Verified Classes
        </span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 15 }}>
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1E293B' }}
              interval={0}
              angle={0}
              textAnchor="middle"
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1E293B' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
            <Bar dataKey="inspections" radius={[3, 3, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-[10px]">
        {DETECTION_CLASSES.map((c) => (
          <div key={c.id} className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="truncate">{c.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
