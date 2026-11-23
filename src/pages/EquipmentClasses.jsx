import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Flame,
  HardHat,
  Briefcase
} from 'lucide-react';
import { EquipmentCard } from '../components/equipment/EquipmentCard';
import { EquipmentModal } from '../components/equipment/EquipmentModal';
import { DETECTION_CLASSES } from '../data/detectionClasses';

export const EquipmentClasses = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filteredClasses = useMemo(() => {
    return DETECTION_CLASSES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.standardCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl enterprise-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#162033] border border-slate-700/80 text-orange-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Verified Equipment Categories
            </h2>
            <p className="text-[11px] text-slate-400">
              Standardized catalog of 7 life-safety, PPE, and workplace apparatus classes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-[#141C2E] border border-slate-700/80 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            3 Verified Categories
          </span>
        </div>
      </div>

      {/* Regulatory Notice */}
      <div className="p-3.5 rounded-xl bg-[#0E1422] border border-slate-800 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Operational Safety Protocol</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          FireGuard AI detects visual equipment presence for Oxygen Tanks, Fire Extinguishers, and Toolboxes. Automated visual inference does not certify cylinder hydrostatic tests, chemical charge pressure, or statutory NFPA/OSHA inspection compliance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl enterprise-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#1E293B] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (3)
          </button>

          <button
            onClick={() => setSelectedCategory('FIRE_PROTECTION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'FIRE_PROTECTION'
                ? 'bg-[#1E293B] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span>Fire Extinguisher</span>
          </button>

          <button
            onClick={() => setSelectedCategory('HAZARDOUS_EQUIPMENT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'HAZARDOUS_EQUIPMENT'
                ? 'bg-[#1E293B] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Oxygen Tank</span>
          </button>

          <button
            onClick={() => setSelectedCategory('WORKPLACE_EQUIPMENT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'WORKPLACE_EQUIPMENT'
                ? 'bg-[#1E293B] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3 h-3 text-blue-400" />
            <span>Toolbox</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search standards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0F1B] border border-slate-700/80 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onClick={(eq) => setActiveModalItem(eq)}
          />
        ))}
      </div>

      {/* Equipment Detail Modal */}
      <EquipmentModal
        equipment={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
      />
    </div>
  );
};
