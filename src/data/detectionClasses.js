/**
 * FireGuard AI - Centralized Equipment & Detection Classes
 * 
 * Strictly verified against the active YOLO checkpoint (best.pt):
 * 0: FireExtinguisher
 * 1: ToolBox
 * 2: OxygenTank
 */

export const CATEGORY_GROUPS = {
  FIRE_PROTECTION: {
    id: 'FIRE_PROTECTION',
    label: 'Fire Protection',
    description: 'Active fire suppression and emergency response equipment',
    color: '#EF4444'
  },
  HAZARDOUS_EQUIPMENT: {
    id: 'HAZARDOUS_EQUIPMENT',
    label: 'Compressed Gas & Safety',
    description: 'High-pressure cylinder management and hazardous materials containment',
    color: '#06B6D4'
  },
  WORKPLACE_EQUIPMENT: {
    id: 'WORKPLACE_EQUIPMENT',
    label: 'Workplace Equipment',
    description: 'Industrial maintenance and facility operational toolsets',
    color: '#3B82F6'
  }
};

export const DETECTION_CLASSES = [
  {
    id: 'fire-extinguisher',
    className: 'FireExtinguisher',
    displayName: 'Fire Extinguisher',
    iconName: 'FlameKindling',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#EF4444',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/25',
    borderColor: 'border-red-500/40',
    accentColor: '#EF4444',
    standardCode: 'NFPA 10 / OSHA 1910.157',
    description: 'Portable pressurized cylinder containing suppression agents (ABC Dry Chemical, CO2, or Water) engineered for rapid suppression of Class A, B, or C fires.',
    typicalLocations: 'Corridors, electrical distribution rooms, chemical storage units, workshop egress paths, commercial kitchens.',
    inspectionTip: 'Confirm pressure indicator needle is centered in green operational sector, safety pull pin & tamper seal intact, discharge nozzle clear, and annual inspection collar valid.',
    modelClassIndex: 0,
    modelVerified: true
  },
  {
    id: 'oxygen-tank',
    className: 'OxygenTank',
    displayName: 'Oxygen Tank & Cylinder',
    iconName: 'Cylinder',
    category: 'HAZARDOUS_EQUIPMENT',
    categoryLabel: 'Compressed Gas & Safety',
    color: '#06B6D4',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    borderColor: 'border-cyan-500/40',
    accentColor: '#06B6D4',
    standardCode: 'OSHA 1910.101 / CGA P-1 / NFPA 55',
    description: 'Heavy-gauge steel/aluminum high-pressure vessel for medical, cutting, or welding compressed oxygen gas; critical for fire prevention and explosion hazard mitigation.',
    typicalLocations: 'Welding staging bays, industrial fabrication shops, medical gas storage, cryogenic transfer stations.',
    inspectionTip: 'Ensure protective cylinder valve cap is tightly fastened when not connected, verify safety chaining/strapping against tipping, check hydro-test stamp, and isolate from flammable combustibles.',
    modelClassIndex: 2,
    modelVerified: true
  },
  {
    id: 'toolbox',
    className: 'ToolBox',
    displayName: 'Toolbox / Equipment Kit',
    iconName: 'Briefcase',
    category: 'WORKPLACE_EQUIPMENT',
    categoryLabel: 'Workplace Equipment',
    color: '#3B82F6',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    borderColor: 'border-blue-500/40',
    accentColor: '#3B82F6',
    standardCode: 'ISO 45001 / 5S Good Housekeeping',
    description: 'Standardized industrial tool chest or portable technician repair kit essential for mechanical maintenance, 5S workplace organization, and egress pathway obstruction control.',
    typicalLocations: 'Maintenance workshops, equipment staging bays, mechanical repair stations, engineering plant rooms.',
    inspectionTip: 'Ensure secure latch engagement during transport, store within designated painted floor boundary markings, prevent egress pathway obstruction.',
    modelClassIndex: 1,
    modelVerified: true
  }
];

export const getClassByName = (name) => {
  if (!name) return null;
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return DETECTION_CLASSES.find(c => {
    const classNorm = c.className.toLowerCase().replace(/[^a-z0-9]/g, '');
    const idNorm = c.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return classNorm === normalized || idNorm === normalized || normalized.includes(classNorm);
  }) || null;
};
