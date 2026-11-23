import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Flame,
  HardHat,
  Briefcase
} from 'lucide-react';
import { EquipmentCard } from '../components/equipment/EquipmentCard';
import { EquipmentModal } from '../components/equipment/EquipmentModal';
import { DETECTION_CLASSES, CATEGORY_GROUPS } from '../data/detectionClasses';

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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#172033] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Verified Equipment Categories
            </h2>
            <p className="text-xs text-slate-400">
              Official catalog of the 7 fire protection, safety PPE, and workplace equipment classes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            7 Classes Monitored
          </span>
        </div>
      </div>

      {/* Regulatory Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-2 text-amber-400 font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Operational Safety Notice</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          FireGuard AI detects the visual presence and spatial boundaries of fire safety and workplace gear. Detection of an item does NOT certify that its operational pressure, maintenance tag, water supply, battery charge, or regulatory compliance meets statutory NFPA, OSHA, or IBC guidelines. Regular on-site physical inspections remain mandatory.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#172033]/80 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Categories (7)
          </button>

          <button
            onClick={() => setSelectedCategory('FIRE_PROTECTION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'FIRE_PROTECTION'
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Fire Protection (5)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('WORKPLACE_SAFETY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'WORKPLACE_SAFETY'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <HardHat className="w-3.5 h-3.5 text-emerald-400" />
            <span>Safety PPE (1)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('WORKPLACE_EQUIPMENT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'WORKPLACE_EQUIPMENT'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Equipment (1)</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search classes or standards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
