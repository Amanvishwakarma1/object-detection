/**
 * Curated Industrial Fire Safety Sample Images
 * Encoded as high-clarity SVG Data URLs specifically for the 3 model classes:
 * 1. Fire Extinguisher
 * 2. Oxygen Tank
 * 3. Toolbox
 */

const svgToDataUrl = (svgString) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
};

// 1. Wall-Mounted Fire Extinguisher SVG
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

  <rect width="800" height="600" fill="url(#wall)"/>
  <line x1="0" y1="480" x2="800" y2="480" stroke="#334155" stroke-width="3"/>
  <rect x="0" y="480" width="800" height="120" fill="#0b1120"/>

  <!-- Wall Safety Backboard -->
  <rect x="280" y="60" width="240" height="100" rx="6" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
  <text x="400" y="100" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">FIRE</text>
  <text x="400" y="135" font-family="Arial, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="1">EXTINGUISHER</text>

  <!-- Extinguisher Wall Bracket -->
  <rect x="385" y="240" width="30" height="80" rx="4" fill="url(#metal)"/>

  <!-- Extinguisher Main Cylinder -->
  <g id="extinguisher">
    <rect x="340" y="200" width="120" height="260" rx="28" fill="url(#cyl)"/>
    <path d="M340,220 C340,180 460,180 460,220 Z" fill="url(#cyl)"/>
    
    <!-- Valve neck & Pressure Gauge -->
    <rect x="388" y="160" width="24" height="25" fill="url(#metal)"/>
    <circle cx="370" cy="165" r="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
    <path d="M363,165 A7,7 0 0,1 377,165" fill="none" stroke="#22c55e" stroke-width="3"/>
    <line x1="370" y1="165" x2="370" y2="158" stroke="#ef4444" stroke-width="2"/>

    <!-- Handles -->
    <path d="M385,160 L360,140 L380,135 L400,155 Z" fill="url(#metal)"/>
    <path d="M400,155 L450,140 L445,150 L405,160 Z" fill="url(#metal)"/>
    <circle cx="395" cy="150" r="7" fill="none" stroke="#f59e0b" stroke-width="3"/>

    <!-- Black Hose & Horn Nozzle -->
    <path d="M410,165 Q480,170 475,250 T460,360 L450,350" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
    <polygon points="445,340 475,370 460,385 435,355" fill="#1e293b"/>

    <!-- White Instruction Label -->
    <rect x="350" y="240" width="100" height="140" rx="4" fill="#ffffff" opacity="0.95"/>
    <rect x="355" y="245" width="90" height="20" fill="#dc2626"/>
    <text x="400" y="259" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">INSTRUCTIONS</text>
  </g>
</svg>
`;

// 2. High-Pressure Industrial Oxygen Tank / Cylinder SVG
const oxygenTankSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="facilityBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#141a29"/>
    </linearGradient>
    <linearGradient id="tankBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="30%" stop-color="#059669"/>
      <stop offset="70%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="tankShoulder" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="40%" stop-color="#94a3b8"/>
      <stop offset="80%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="brassValve" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>

  <!-- Facility Staging Background -->
  <rect width="800" height="600" fill="url(#facilityBg)"/>
  
  <!-- Concrete Base & Safety Restraint Rails -->
  <rect x="0" y="470" width="800" height="130" fill="#1e293b"/>
  <line x1="0" y1="470" x2="800" y2="470" stroke="#334155" stroke-width="4"/>

  <!-- Warning Signage on Wall -->
  <rect x="520" y="90" width="220" height="140" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <rect x="530" y="100" width="200" height="30" fill="#eab308"/>
  <text x="630" y="122" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#000" text-anchor="middle" letter-spacing="1">CAUTION</text>
  <text x="630" y="155" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#000" text-anchor="middle">COMPRESSED GAS</text>
  <text x="630" y="175" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="#047857" text-anchor="middle">OXYGEN (O2)</text>
  <text x="630" y="200" font-family="Arial, sans-serif" font-size="10" fill="#475569" text-anchor="middle">NO SMOKING / NO OPEN FLAME</text>

  <!-- Safety Securing Chain across Cylinder -->
  <line x1="260" y1="360" x2="480" y2="360" stroke="#94a3b8" stroke-width="8" stroke-dasharray="14,6"/>

  <!-- Oxygen Tank Assembly -->
  <g id="oxygen-tank" transform="translate(40, 0)">
    <!-- Base Foot Ring -->
    <ellipse cx="330" cy="495" rx="55" ry="16" fill="#047857"/>
    
    <!-- Main Cylinder Column -->
    <rect x="275" y="190" width="110" height="300" rx="10" fill="url(#tankBody)"/>
    
    <!-- Metallic Cylinder Shoulder (Industry Standard Silver/Green Dome) -->
    <path d="M275,200 C275,130 385,130 385,200 Z" fill="url(#tankShoulder)"/>
    
    <!-- High-Pressure Brass Valve Body & Handwheel -->
    <rect x="318" y="100" width="24" height="38" fill="url(#brassValve)"/>
    <!-- Cylinder Cap Thread Collar -->
    <rect x="310" y="125" width="40" height="12" fill="url(#brassValve)"/>
    
    <!-- Pressure Dual Gauges (Regulator) -->
    <circle cx="295" cy="95" r="16" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
    <line x1="295" y1="95" x2="290" y2="87" stroke="#dc2626" stroke-width="2"/>
    <circle cx="365" cy="95" r="16" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
    <line x1="365" y1="95" x2="370" y2="87" stroke="#16a34a" stroke-width="2"/>
    
    <!-- Top Handwheel Knob -->
    <ellipse cx="330" cy="80" rx="20" ry="7" fill="#475569"/>
    <rect x="325" y="80" width="10" height="20" fill="url(#brassValve)"/>

    <!-- Hazmat Diamond Label (Yellow 5.1 Oxidizer) -->
    <g transform="translate(330, 260) rotate(45)">
      <rect x="-24" y="-24" width="48" height="48" fill="#eab308" stroke="#000" stroke-width="2"/>
    </g>
    <text x="330" y="258" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#000" text-anchor="middle">OXIDIZER</text>
    <text x="330" y="272" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#000" text-anchor="middle">5.1</text>

    <!-- Vertical Stenciled Identification Label -->
    <rect x="300" y="320" width="60" height="130" rx="4" fill="#064e3b" opacity="0.9"/>
    <text x="330" y="350" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" letter-spacing="1">OXYGEN</text>
    <text x="330" y="375" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#a7f3d0" text-anchor="middle">COMPRESSED</text>
    <text x="330" y="395" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#e2e8f0" text-anchor="middle">UN 1072</text>
    <text x="330" y="420" font-family="Arial, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">CGA P-1</text>
  </g>
</svg>
`;

// 3. Heavy-Duty Industrial Toolbox SVG
const toolboxSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="benchBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0f19"/>
      <stop offset="100%" stop-color="#161f30"/>
    </linearGradient>
    <linearGradient id="boxBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="30%" stop-color="#2563eb"/>
      <stop offset="70%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="boxLid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <linearGradient id="metalChrome" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="50%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  </defs>

  <!-- Industrial Workshop Surface -->
  <rect width="800" height="600" fill="url(#benchBg)"/>
  <polygon points="0,380 800,380 800,600 0,600" fill="#1e293b"/>
  <line x1="0" y1="380" x2="800" y2="380" stroke="#334155" stroke-width="4"/>

  <!-- Industrial Heavy-Duty Toolbox -->
  <g id="toolbox" transform="translate(200, 190)">
    <!-- Main Box Container -->
    <rect x="0" y="80" width="400" height="200" rx="10" fill="url(#boxBody)"/>
    
    <!-- Box Lid with Chamfer -->
    <path d="M0,80 L25,25 L375,25 L400,80 Z" fill="url(#boxLid)"/>
    <rect x="20" y="25" width="360" height="14" rx="4" fill="#1e3a8a"/>

    <!-- Chrome Heavy-Duty Carry Handle -->
    <path d="M165,25 L165,0 L235,0 L235,25" fill="none" stroke="url(#metalChrome)" stroke-width="14" stroke-linecap="round"/>

    <!-- Latches & Drawbolts -->
    <rect x="85" y="70" width="30" height="50" rx="4" fill="url(#metalChrome)" stroke="#475569" stroke-width="2"/>
    <circle cx="100" cy="90" r="5" fill="#0f172a"/>

    <rect x="285" y="70" width="30" height="50" rx="4" fill="url(#metalChrome)" stroke="#475569" stroke-width="2"/>
    <circle cx="300" cy="90" r="5" fill="#0f172a"/>

    <!-- Center Lock Hasps -->
    <rect x="185" y="75" width="30" height="40" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
    <circle cx="200" cy="95" r="4" fill="#0f172a"/>

    <!-- Structural Reinforcement Ribs -->
    <line x1="20" y1="100" x2="20" y2="260" stroke="#172554" stroke-width="8"/>
    <line x1="380" y1="100" x2="380" y2="260" stroke="#172554" stroke-width="8"/>

    <!-- Yellow 5S Identification Label -->
    <rect x="140" y="145" width="120" height="45" rx="5" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <text x="200" y="172" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#000" text-anchor="middle" letter-spacing="1">TOOLBOX</text>
    <text x="200" y="184" font-family="Arial, sans-serif" font-weight="bold" font-size="9" fill="#713f12" text-anchor="middle">5S WORKPLACE KIT</text>
  </g>
</svg>
`;

export const SAMPLE_IMAGES = [
  {
    id: 'sample-extinguisher',
    title: 'Commercial Fire Extinguisher',
    subtitle: 'Wall-mounted pressurized ABC dry chemical cylinder',
    category: 'FIRE_PROTECTION',
    expectedClass: 'Fire Extinguisher',
    filename: 'sample_fire_extinguisher.jpg',
    dataUrl: svgToDataUrl(extinguisherSvg),
    thumbnailBg: 'from-red-950 to-slate-900',
    tags: ['Fire Protection', 'NFPA 10', 'Cylinder']
  },
  {
    id: 'sample-oxygen-tank',
    title: 'High-Pressure Oxygen Tank',
    subtitle: 'Industrial compressed oxygen gas cylinder with regulator',
    category: 'HAZARDOUS_EQUIPMENT',
    expectedClass: 'Oxygen Tank',
    filename: 'sample_oxygen_tank.jpg',
    dataUrl: svgToDataUrl(oxygenTankSvg),
    thumbnailBg: 'from-emerald-950 to-slate-900',
    tags: ['Compressed Gas', 'OSHA 1910.101', 'Hazmat']
  },
  {
    id: 'sample-toolbox',
    title: 'Industrial Heavy-Duty Toolbox',
    subtitle: 'Standardized mechanical maintenance equipment kit',
    category: 'WORKPLACE_EQUIPMENT',
    expectedClass: 'Toolbox',
    filename: 'sample_industrial_toolbox.jpg',
    dataUrl: svgToDataUrl(toolboxSvg),
    thumbnailBg: 'from-blue-950 to-slate-900',
    tags: ['Workplace Gear', '5S Standard', 'Equipment']
  }
];
