import React from 'react';
import {
  Flame,
  Droplets,
  Disc,
  BellRing,
  Radio,
  HardHat,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

const ICON_MAP = {
  FlameKindling: Flame,
  Droplets: Droplets,
  Disc: Disc,
  BellRing: BellRing,
  Radio: Radio,
  HardHat: HardHat,
  Briefcase: Briefcase
};

export const EquipmentCard = ({ equipment, onClick }) => {
  const Icon = ICON_MAP[equipment.iconName] || Flame;

  return (
    <div
      onClick={() => onClick && onClick(equipment)}
      className="rounded-2xl border border-slate-800 bg-[#172033] hover:border-slate-700 hover:shadow-2xl transition-all duration-200 p-5 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
    >
      {/* Accent glow corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
        style={{ backgroundColor: equipment.color }}
      />

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              backgroundColor: `${equipment.color}15`,
              color: equipment.color,
              border: `1px solid ${equipment.color}30`
            }}
          >
            <Icon className="w-6 h-6" />
          </div>

          <Badge variant={equipment.category === 'FIRE_PROTECTION' ? 'orange' : equipment.category === 'WORKPLACE_SAFETY' ? 'success' : 'blue'} size="sm">
            {equipment.categoryLabel}
          </Badge>
        </div>

        {/* Title & Standard Code */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-orange-400 transition-colors mb-1">
          {equipment.displayName}
        </h3>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-3">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>{equipment.standardCode}</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {equipment.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        {/* Typical Locations */}
        <div className="flex items-start gap-1.5 text-[11px] text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span className="line-clamp-1">{equipment.typicalLocations}</span>
        </div>

        {/* Inspection Advisory */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
          <strong className="text-slate-300 block mb-0.5">Physical Inspection Focus:</strong>
          <span className="line-clamp-2">{equipment.inspectionTip}</span>
        </div>

        {/* Detection Status Footer */}
        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            AI Detection Verified
          </span>
          <span className="text-orange-400 group-hover:translate-x-0.5 transition-transform font-medium">
            View Specs →
          </span>
        </div>
      </div>
    </div>
  );
};
