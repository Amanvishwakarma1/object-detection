import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  Flame,
  Cylinder,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../common/Badge';

const ICON_MAP = {
  FlameKindling: Flame,
  Cylinder: Cylinder,
  Briefcase: Briefcase
};

export const EquipmentModal = ({ equipment, isOpen, onClose }) => {
  if (!equipment) return null;

  const Icon = ICON_MAP[equipment.iconName] || Flame;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={equipment.displayName}
      subtitle={`Category: ${equipment.categoryLabel} • Standard: ${equipment.standardCode}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Header Icon + Description */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
            style={{
              backgroundColor: `${equipment.color}18`,
              color: equipment.color,
              border: `1px solid ${equipment.color}40`
            }}
          >
            <Icon className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-100">{equipment.displayName}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{equipment.description}</p>
          </div>
        </div>

        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#172033] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Regulatory Standard</span>
            <span className="text-slate-200 font-mono font-medium">{equipment.standardCode}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#172033] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Model Training Class</span>
            <span className="text-orange-400 font-mono font-medium">{equipment.className}</span>
          </div>
        </div>

        {/* Typical Locations */}
        <div className="p-3.5 rounded-xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            Typical Industrial Locations
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            {equipment.typicalLocations}
          </p>
        </div>

        {/* Physical Inspection Focus */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Physical Inspection Protocol
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {equipment.inspectionTip}
          </p>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300 block mb-0.5">Regulatory Disclaimer:</strong>
          Object detection verifies visual presence and placement within the camera field of view. AI detection does NOT certify operational pressure, hydro-test expiration, chemical validity, or formal NFPA/OSHA compliance.
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
