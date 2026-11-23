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
  FileText,
  MapPin,
  ArrowRight
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
      className="rounded-xl enterprise-card enterprise-card-hover p-4.5 flex flex-col justify-between group cursor-pointer relative"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#162033] border border-slate-700/80 flex items-center justify-center text-slate-300 transition-colors group-hover:text-orange-400">
            <Icon className="w-5 h-5" />
          </div>

          <Badge variant="default" size="sm">
            {equipment.categoryLabel}
          </Badge>
        </div>

        {/* Title & Standard Code */}
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-orange-400 transition-colors mb-1">
          {equipment.displayName}
        </h3>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-2.5">
          <FileText className="w-3 h-3 text-slate-500" />
          <span>{equipment.standardCode}</span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-3 line-clamp-3">
          {equipment.description}
        </p>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
        {/* Typical Locations */}
        <div className="flex items-start gap-1.5 text-[10px] text-slate-400 font-mono">
          <MapPin className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
          <span className="line-clamp-1 truncate">{equipment.typicalLocations}</span>
        </div>

        {/* Inspection Advisory */}
        <div className="p-2 rounded bg-[#0A0F1B] border border-slate-800 text-[10px] text-slate-400">
          <strong className="text-slate-300 block mb-0.5 font-sans">Physical Inspection Focus:</strong>
          <span className="line-clamp-2">{equipment.inspectionTip}</span>
        </div>

        {/* Detection Status Footer */}
        <div className="flex items-center justify-between text-[10px] pt-0.5">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Model Verified
          </span>
          <span className="text-slate-400 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex items-center gap-1">
            Specs <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
