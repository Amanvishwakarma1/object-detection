/**
 * Curated Industrial Fire Safety Sample Images
 * Encoded as high-clarity SVG Data URLs for instantaneous testing and demonstration
 */

// Helper to encode SVG to clean data URL
const svgToDataUrl = (svgString) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
};

const extinguisherSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#991b1b"/>
      <stop offset="35%" stop-color="#ef4444"/>
      <stop offset="70%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
  </defs>

  <!-- Industrial Wall Background -->
  <rect width="800" height="600" fill="url(#wall)"/>
  
  <!-- Wall baseboard and tile seams -->
  <line x1="0" y1="480" x2="800" y2="480" stroke="#334155" stroke-width="3"/>
  <rect x="0" y="480" width="800" height="120" fill="#0b1120"/>
  <!-- Safety hazard diagonal striping on floor -->
  <g opacity="0.15">
    <path d="M-50,600 L50,480 M50,600 L150,480 M150,600 L250,480 M250,600 L350,480 M350,600 L450,480 M450,600 L550,480 M550,600 L650,480 M650,600 L750,480 M750,600 L850,480" stroke="#f59e0b" stroke-width="24"/>
  </g>

  <!-- Wall Safety Backboard (Red/White Signage) -->
  <rect x="280" y="60" width="240" height="100" rx="6" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
  <text x="400" y="100" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">FIRE</text>
  <text x="400" y="135" font-family="Arial, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="1">EXTINGUISHER</text>

  <!-- Extinguisher Wall Bracket -->
  <rect x="385" y="240" width="30" height="80" rx="4" fill="url(#metal)"/>

  <!-- Extinguisher Main Cylinder -->
  <g id="extinguisher">
    <!-- Cylinder Body -->
    <rect x="340" y="200" width="120" height="260" rx="28" fill="url(#cyl)"/>
    
    <!-- Top Dome -->
    <path d="M340,220 C340,180 460,180 460,220 Z" fill="url(#cyl)"/>
    
    <!-- Valve neck & Pressure Gauge -->
    <rect x="388" y="160" width="24" height="25" fill="url(#metal)"/>
    <!-- Pressure gauge dial -->
    <circle cx="370" cy="165" r="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
    <path d="M363,165 A7,7 0 0,1 377,165" fill="none" stroke="#22c55e" stroke-width="3"/>
    <line x1="370" y1="165" x2="370" y2="158" stroke="#ef4444" stroke-width="2"/>

    <!-- Discharge Lever and Carry Handle -->
    <path d="M385,160 L360,140 L380,135 L400,155 Z" fill="url(#metal)"/>
    <path d="M400,155 L450,140 L445,150 L405,160 Z" fill="url(#metal)"/>
    <!-- Pull Pin & Yellow Tamper Seal -->
    <circle cx="395" cy="150" r="7" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <rect x="393" y="157" width="5" height="10" fill="#eab308"/>

    <!-- Black Hose & Horn Nozzle -->
    <path d="M410,165 Q480,170 475,250 T460,360 L450,350" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
    <polygon points="445,340 475,370 460,385 435,355" fill="#1e293b"/>

    <!-- White Instruction Label on Cylinder -->
    <rect x="350" y="240" width="100" height="140" rx="4" fill="#ffffff" opacity="0.95"/>
    <rect x="355" y="245" width="90" height="20" fill="#dc2626"/>
    <text x="400" y="259" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">INSTRUCTIONS</text>
    <rect x="360" y="275" width="80" height="4" fill="#64748b" rx="2"/>
    <rect x="360" y="285" width="80" height="4" fill="#64748b" rx="2"/>
    <rect x="360" y="295" width="80" height="4" fill="#64748b" rx="2"/>
    
    <!-- Classification Symbols: A B C -->
    <circle cx="370" cy="330" r="9" fill="#22c55e"/>
    <text x="370" y="334" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#fff" text-anchor="middle">A</text>
    <rect x="392" y="321" width="16" height="18" fill="#ef4444" rx="2"/>
    <text x="400" y="334" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#fff" text-anchor="middle">B</text>
    <circle cx="430" cy="330" r="9" fill="#3b82f6"/>
    <text x="430" y="334" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#fff" text-anchor="middle">C</text>

    <!-- Inspection Maintenance Tag -->
    <polygon points="345,300 365,300 365,350 345,350" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
    <circle cx="355" cy="305" r="2" fill="#ca8a04"/>
  </g>
</svg>
`;

const hydrantSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="hydrantBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c2410c"/>
      <stop offset="30%" stop-color="#ea580c"/>
      <stop offset="70%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="bonnet" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7c2d12"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#7c2d12"/>
    </linearGradient>
  </defs>

  <!-- Outdoor Pavement and Wall -->
  <rect width="800" height="600" fill="url(#sky)"/>
  <!-- Concrete Pavement Base -->
  <rect x="0" y="440" width="800" height="160" fill="#334155"/>
  <line x1="0" y1="440" x2="800" y2="440" stroke="#475569" stroke-width="4"/>
  <!-- Curb markings (Yellow curb) -->
  <rect x="0" y="440" width="800" height="25" fill="#eab308" opacity="0.85"/>
  <line x1="0" y1="465" x2="800" y2="465" stroke="#ca8a04" stroke-width="2"/>

  <!-- Fire Hydrant -->
  <g id="hydrant">
    <!-- Flange Base at Ground Level -->
    <ellipse cx="400" cy="445" rx="90" ry="20" fill="#7c2d12"/>
    <ellipse cx="400" cy="440" rx="85" ry="16" fill="url(#hydrantBody)"/>
    <!-- Flange Bolts -->
    <circle cx="330" cy="440" r="5" fill="#f8fafc"/>
    <circle cx="360" cy="448" r="5" fill="#f8fafc"/>
    <circle cx="440" cy="448" r="5" fill="#f8fafc"/>
    <circle cx="470" cy="440" r="5" fill="#f8fafc"/>

    <!-- Lower Barrel -->
    <rect x="345" y="320" width="110" height="120" fill="url(#hydrantBody)"/>
    <!-- Ribbing Rings -->
    <rect x="340" y="360" width="120" height="14" rx="4" fill="#9a3412"/>
    
    <!-- Upper Barrel -->
    <rect x="340" y="210" width="120" height="120" fill="url(#hydrantBody)"/>

    <!-- Left Pumper Nozzle Outlet -->
    <path d="M340,250 L270,240 L270,290 L340,280 Z" fill="url(#bonnet)"/>
    <ellipse cx="270" cy="265" rx="12" ry="25" fill="#7c2d12"/>
    <rect x="250" y="255" width="20" height="20" fill="#94a3b8" rx="3"/>
    <!-- Chain to Cap -->
    <path d="M260,275 Q300,310 345,300" fill="none" stroke="#cbd5e1" stroke-dasharray="3,3" stroke-width="3"/>

    <!-- Right Pumper Nozzle Outlet -->
    <path d="M460,250 L530,240 L530,290 L460,280 Z" fill="url(#bonnet)"/>
    <ellipse cx="530" cy="265" rx="12" ry="25" fill="#7c2d12"/>
    <rect x="530" y="255" width="20" height="20" fill="#94a3b8" rx="3"/>
    <!-- Chain to Cap -->
    <path d="M540,275 Q500,310 455,300" fill="none" stroke="#cbd5e1" stroke-dasharray="3,3" stroke-width="3"/>

    <!-- Center Large Steamer Port -->
    <circle cx="400" cy="270" r="32" fill="#7c2d12"/>
    <circle cx="400" cy="270" r="26" fill="url(#bonnet)"/>
    <!-- Hexagonal operating nut on steamer -->
    <polygon points="400,256 412,263 412,277 400,284 388,277 388,263" fill="#94a3b8"/>

    <!-- Bonnet / Dome Cap -->
    <ellipse cx="400" cy="210" rx="60" ry="24" fill="url(#bonnet)"/>
    <path d="M340,210 C340,150 460,150 460,210 Z" fill="url(#bonnet)"/>

    <!-- Pentagonal Operating Nut at Top -->
    <polygon points="400,135 415,148 409,165 391,165 385,148" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  </g>
</svg>
`;

const helmetToolboxSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
    <linearGradient id="helmetGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="35%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="30%" stop-color="#2563eb"/>
      <stop offset="70%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>

  <!-- Industrial Workbench Background -->
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- Steel Worktable Surface -->
  <polygon points="0,380 800,380 800,600 0,600" fill="#374151"/>
  <line x1="0" y1="380" x2="800" y2="380" stroke="#4b5563" stroke-width="4"/>

  <!-- Safety Helmet (Hard Hat) -->
  <g id="safety-helmet" transform="translate(140, 210)">
    <!-- Helmet Brim -->
    <ellipse cx="140" cy="140" rx="125" ry="32" fill="#ca8a04"/>
    <ellipse cx="140" cy="136" rx="120" ry="28" fill="url(#helmetGrad)"/>

    <!-- Helmet Crown/Dome -->
    <path d="M45,130 C45,30 235,30 235,130 Z" fill="url(#helmetGrad)"/>
    
    <!-- Center Reinforcement Ridge -->
    <path d="M135,35 Q140,30 145,35 L148,135 Q140,138 132,135 Z" fill="#fef08a" opacity="0.6"/>

    <!-- Reflective Safety Decal -->
    <rect x="75" y="85" width="40" height="15" rx="3" fill="#ffffff" opacity="0.85"/>
    <rect x="165" y="85" width="40" height="15" rx="3" fill="#ffffff" opacity="0.85"/>
  </g>

  <!-- Industrial Metal Toolbox -->
  <g id="toolbox" transform="translate(420, 250)">
    <!-- Main Box Body -->
    <rect x="0" y="80" width="310" height="170" rx="8" fill="url(#boxGrad)"/>
    
    <!-- Box Lid -->
    <path d="M0,80 L20,30 L290,30 L310,80 Z" fill="#1e40af"/>
    <rect x="15" y="30" width="280" height="12" rx="4" fill="#1e3a8a"/>

    <!-- Chrome Carry Handle -->
    <path d="M125,30 L125,5 L185,5 L185,30" fill="none" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round"/>

    <!-- Heavy-Duty Metal Latches -->
    <rect x="65" y="70" width="24" height="42" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <circle cx="77" cy="88" r="4" fill="#0f172a"/>

    <rect x="220" y="70" width="24" height="42" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <circle cx="232" cy="88" r="4" fill="#0f172a"/>

    <!-- Reinforcement Corner Ribs -->
    <line x1="15" y1="95" x2="15" y2="235" stroke="#1e3a8a" stroke-width="6"/>
    <line x1="295" y1="95" x2="295" y2="235" stroke="#1e3a8a" stroke-width="6"/>
    <!-- Yellow Caution Housekeeping Label -->
    <rect x="110" y="130" width="90" height="35" rx="4" fill="#eab308"/>
    <text x="155" y="152" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#000" text-anchor="middle">TOOLBOX</text>
  </g>
</svg>
`;

export const SAMPLE_IMAGES = [
  {
    id: 'sample-extinguisher',
    title: 'Commercial Hallway Fire Extinguisher',
    subtitle: 'High-contrast wall-mounted cylinder with safety tag',
    category: 'FIRE_PROTECTION',
    expectedClass: 'Fire Extinguisher',
    filename: 'sample_fire_extinguisher_corridor.jpg',
    dataUrl: svgToDataUrl(extinguisherSvg),
    thumbnailBg: 'from-red-950 to-slate-900',
    tags: ['Wall-Mounted', 'NFPA 10', 'Commercial Egress']
  },
  {
    id: 'sample-hydrant',
    title: 'Industrial Roadway Fire Hydrant',
    subtitle: 'Active outdoor wet-barrel hydrant at yellow curb',
    category: 'FIRE_PROTECTION',
    expectedClass: 'Fire Hydrant',
    filename: 'sample_fire_hydrant_roadway.jpg',
    dataUrl: svgToDataUrl(hydrantSvg),
    thumbnailBg: 'from-orange-950 to-slate-900',
    tags: ['Outdoor Perimeter', 'NFPA 25', 'High Pressure']
  },
  {
    id: 'sample-ppe-toolbox',
    title: 'Workplace Safety Helmet & Toolbox',
    subtitle: 'Industrial workbench staging with hard hat and equipment box',
    category: 'WORKPLACE_SAFETY',
    expectedClass: 'Safety Helmet & Toolbox',
    filename: 'sample_safety_gear_toolbox.jpg',
    dataUrl: svgToDataUrl(helmetToolboxSvg),
    thumbnailBg: 'from-amber-950 to-slate-900',
    tags: ['PPE', '5S Compliance', 'OSHA Standard']
  }
];
