/**
 * FireGuard AI - Centralized Equipment & Detection Classes
 * 
 * Supported categories are strictly limited to the verified 7 classes.
 * FireGuard AI does not detect generic open flames, gas leaks, or smoke clouds.
 */

export const CATEGORY_GROUPS = {
  FIRE_PROTECTION: {
    id: 'FIRE_PROTECTION',
    label: 'Fire Protection',
    description: 'Active and passive fire suppression, alert, and control equipment',
    color: '#F97316'
  },
  WORKPLACE_SAFETY: {
    id: 'WORKPLACE_SAFETY',
    label: 'Workplace Safety',
    description: 'Personal protective equipment (PPE) and occupational safety gear',
    color: '#22C55E'
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
    className: 'Fire Extinguisher',
    displayName: 'Fire Extinguisher',
    iconName: 'FlameKindling',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#EF4444',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    borderColor: 'border-red-500/40',
    accentColor: '#EF4444',
    standardCode: 'NFPA 10 / OSHA 1910.157',
    description: 'Portable pressurized cylinder containing chemical suppression agent (ABC Dry Chemical, CO2, or Water) used for extinguishing or controlling small fires.',
    typicalLocations: 'Corridors, electrical switchgear rooms, chemical storage areas, workshop exits, commercial kitchens.',
    inspectionTip: 'Verify pressure gauge in green zone, safety pin and tamper seal intact, nozzle unobstructed, and annual service tag up to date.',
    modelVerified: true
  },
  {
    id: 'fire-hydrant',
    className: 'Fire Hydrant',
    displayName: 'Fire Hydrant',
    iconName: 'Droplets',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#F97316',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    borderColor: 'border-orange-500/40',
    accentColor: '#F97316',
    standardCode: 'NFPA 25 / AWWA C502',
    description: 'Exterior active fire protection connection point tapped directly into municipal or high-pressure private industrial water mains for firefighting operations.',
    typicalLocations: 'Facility perimeter roads, warehouse access driveways, logistics loading bays, outdoor parking zones.',
    inspectionTip: 'Ensure 36-inch clearance envelope around hydrant, check valve cap chain integrity, inspect for rust, leaks, or physical collision damage.',
    modelVerified: true
  },
  {
    id: 'fire-hose',
    className: 'Fire Hose',
    displayName: 'Fire Hose & Reel',
    iconName: 'Disc',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#EC4899',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    borderColor: 'border-pink-500/40',
    accentColor: '#EC4899',
    standardCode: 'NFPA 14 / NFPA 1962',
    description: 'High-pressure flexible conduit wound on wall-mounted reel or cabinet racks, connected to wet standpipe systems for sustained emergency water delivery.',
    typicalLocations: 'Stairwell landings, manufacturing floors, large assembly halls, multi-story warehouse centers.',
    inspectionTip: 'Inspect hose jacket for rot, cracking, or kinks; ensure brass nozzle twists freely and reel rotates without mechanical binding.',
    modelVerified: true
  },
  {
    id: 'fire-alarm',
    className: 'Fire Alarm',
    displayName: 'Fire Alarm Pull Station',
    iconName: 'BellRing',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#F59E0B',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    accentColor: '#F59E0B',
    standardCode: 'NFPA 72 / IBC 907',
    description: 'Manual fire alarm call point or pull station that initiates an emergency audible and visual strobe notification throughout the occupancy upon manual activation.',
    typicalLocations: 'Near egress doorways, exit stairwell doors, central reception lobbies, along primary evacuation routes.',
    inspectionTip: 'Ensure unobstructed line of sight, mount height compliant with ADA standards (42-48 inches), glass break rod intact if applicable.',
    modelVerified: true
  },
  {
    id: 'smoke-detector',
    className: 'Smoke Detector',
    displayName: 'Smoke Detector',
    iconName: 'Radio',
    category: 'FIRE_PROTECTION',
    categoryLabel: 'Fire Protection',
    color: '#06B6D4',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderColor: 'border-cyan-500/40',
    accentColor: '#06B6D4',
    standardCode: 'NFPA 72 / UL 268',
    description: 'Ceiling or high-wall mounted photoelectric or ionization sensing device designed to detect airborne combustion particulates and trigger building alarm systems.',
    typicalLocations: 'Ceilings of offices, electrical riser shafts, server rooms, warehouse aisles, residential units.',
    inspectionTip: 'Check LED indicator for regular operational blink, clear dust or insect nesting from acoustic chamber, ensure unobstructed 36-inch radius.',
    modelVerified: true
  },
  {
    id: 'safety-helmet',
    className: 'Safety Helmet',
    displayName: 'Safety Hard Hat / Helmet',
    iconName: 'HardHat',
    category: 'WORKPLACE_SAFETY',
    categoryLabel: 'Workplace Safety',
    color: '#22C55E',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    accentColor: '#22C55E',
    standardCode: 'ANSI/ISEA Z89.1 / EN 397',
    description: 'Rigid industrial head protection shell engineered to protect personnel from falling debris, low-hanging structural impact, and electrical hazards.',
    typicalLocations: 'Construction zones, production plants, overhead crane corridors, warehouse maintenance zones.',
    inspectionTip: 'Inspect outer shell for hairline fractures, chalking, or UV degradation; replace harness suspension if webbing is torn or worn.',
    modelVerified: true
  },
  {
    id: 'toolbox',
    className: 'Toolbox',
    displayName: 'Toolbox / Equipment Kit',
    iconName: 'Briefcase',
    category: 'WORKPLACE_EQUIPMENT',
    categoryLabel: 'Workplace Equipment',
    color: '#6366F1',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    borderColor: 'border-indigo-500/40',
    accentColor: '#6366F1',
    standardCode: 'ISO 45001 5S Good Housekeeping',
    description: 'Standardized industrial tool chest or portable technician repair kit used in maintenance operations; essential for 5S workplace organization and hazard prevention.',
    typicalLocations: 'Maintenance workshops, equipment staging bays, mechanical repair stations, engineering rooms.',
    inspectionTip: 'Keep secure latches closed during transport, store only in designated designated floor markings, prevent egress pathway obstruction.',
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
