# FireGuard AI 🛡️🔥

> **Intelligent Fire Safety Equipment Detection & Visual Inspection Platform**

FireGuard AI is an enterprise-grade industrial computer vision platform specifically designed for automated visual inspection of fire protection apparatus, personal protective equipment (PPE), and workplace safety equipment. 

The application integrates with an existing trained Ultralytics YOLO model hosted on Hugging Face Spaces (`aman9832/object-detection`), allowing safety officers, compliance engineers, and facility managers to upload workplace imagery and verify safety equipment coverage in real time.

---

## 🌟 Key Features

- **Direct AI Inference Integration**: Connects seamlessly via `@gradio/client` to the official Hugging Face Space `aman9832/object-detection` using the verified `/detect` endpoint.
- **7 Verified Equipment Classes**: Dedicated detection and inspection protocols for 7 standardized industrial categories.
- **Interactive Visual Studio**:
  - Drag-and-drop file ingestion (JPG, PNG, WebP up to 15 MB).
  - 1-click curated industrial test samples (Fire Extinguisher, Fire Hydrant, Safety Helmet & Toolbox).
  - Multi-mode visual inspection viewer: **Annotated Layer**, **Original View**, **Side-by-Side Comparison**, and **Interactive Split Slider**.
  - High-precision pan, zoom (up to 300%), fit-to-screen, and one-click WebP image export.
- **Auditable Detection History**:
  - Device-local IndexedDB persistence (high capacity, privacy-preserving, zero cloud storage).
  - Search, sort, filter, and inspect detailed previous inference records.
  - One-click JSON backup export.
- **Regulatory Equipment Catalog**:
  - Detailed reference cards for NFPA 10, NFPA 14, NFPA 25, NFPA 72, OSHA 1910, and ANSI Z89 standards.
  - Physical inspection guidelines and typical industrial locations.
- **Verified Model Information**:
  - Real-time connection latency ping, backend specifications, and execution architecture documentation.
  - Honest presentation: visual bounding box layers plotted directly by YOLO without fabricated JSON coordinates.
- **Embed & Share Suite**:
  - Independent SaaS public URL sharing.
  - Copyable iframe integration snippet for embedding in enterprise intranets, safety dashboards, and portals.
  - Dedicated standalone embedded widget view (`#/embed`).

---

## 🎯 Supported Detection Classes

FireGuard AI is strictly verified against the underlying YOLO model weights (`best.pt` in `aman9832/object-detection`):

| Model Class | Category | Regulatory Standard | Typical Locations |
| :--- | :--- | :--- | :--- |
| **Fire Extinguisher** (`FireExtinguisher`) | Fire Protection | NFPA 10 / OSHA 1910.157 | Corridors, electrical rooms, kitchens, exits |
| **Oxygen Tank** (`OxygenTank`) | Compressed Gas & Safety | OSHA 1910.101 / CGA P-1 / NFPA 55 | Welding bays, fabrication shops, medical gas stores |
| **Toolbox** (`ToolBox`) | Workplace Equipment | ISO 45001 / 5S Good Housekeeping | Maintenance staging, mechanical repair bays |

*Note: FireGuard AI does not claim or simulate detection of open flames, toxic gas leaks, or smoke clouds.*

---

## 🏗️ Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│  React 19 + Vite + Tailwind CSS v4 + React Router DOM  │
└──────────────────────────┬─────────────────────────────┘
                           │
             @gradio/client Client.connect()
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│        Hugging Face Space: aman9832/object-detection   │
│             Gradio 6.6.0  •  Endpoint: /detect         │
└──────────────────────────┬─────────────────────────────┘
                           │
                    Ultralytics YOLO
                     (model="best.pt")
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│      Annotated Canvas Result (results[0].plot())       │
│           Returned via Server-Sent Events              │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│         FireGuard AI Visual Inspection Viewer          │
│       Side-by-Side • Split Slider • IndexedDB Sync     │
└────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (HashRouter for universal hosting & iframe compatibility)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics Charts**: [Recharts](https://recharts.org/)
- **AI Integration**: Official `@gradio/client`
- **Inference Host**: [Hugging Face Spaces](https://huggingface.co/spaces/aman9832/object-detection)
- **Persistence**: Browser-native `IndexedDB` with `localStorage` fallback

---

## 🚀 Quick Start & Local Setup

### Prerequisites

- Node.js `v18+` (Tested on Node v22)
- npm `v9+`

### Installation

```bash
# Clone or navigate to the repository
cd objd

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will launch at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build

```bash
# Compile and optimize production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to Vercel

FireGuard AI is ready for instant deployment to [Vercel](https://vercel.com):

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, import the repository.
3. Keep default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

A pre-configured [`vercel.json`](./vercel.json) is included with universal routing rewrites and `X-Frame-Options: ALLOWALL` for cross-site iframe embedding.

---

## 🚀 Deployment to Render (Static Site)

To deploy on [Render](https://render.com) without 404 errors:

1. In Render Dashboard, click **New +** → **Static Site** (do **not** choose Web Service).
2. Connect your GitHub repository `Amanvishwakarma1/object-detection`.
3. Set the following required settings:
   - **Name**: `fireguard-ai`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist` *(Important: Vite outputs to `dist`, not `build`)*
4. Under **Redirects / Rewrites**, add the SPA rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
5. Click **Create Static Site**.

*(Note: A pre-configured [`render.yaml`](./render.yaml) is also provided in the repository for auto-configuration via Render Blueprints).*

---

## 🧩 Iframe Embedding

To embed the FireGuard AI inspection studio into an existing portal, use this responsive embed snippet:

```html
<iframe
  src="https://YOUR_DEPLOYED_APP_URL/#/embed"
  width="100%"
  height="750"
  style="border:0;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);"
  loading="lazy"
  title="FireGuard AI Inspection Studio"
  allow="camera;clipboard-read;clipboard-write"
></iframe>
```

---

## 🔒 Security & Privacy

- **No Private Secrets**: FireGuard AI communicates over public HTTPS endpoints without exposing private tokens.
- **Local Data Retention**: Inspection photographs and history records reside solely within the user's browser IndexedDB database.
- **Inference Scope**: Image payloads are passed only to the designated Hugging Face Space for YOLO object detection bounding box annotation.

---

## ⚖️ Regulatory Disclaimer

FireGuard AI assists qualified safety personnel in visually locating and logging safety equipment. Automated detection does **not** certify physical pressure levels, mechanical valve operation, expiration tags, or official OSHA/NFPA regulatory compliance. Physical hands-on inspection by certified professionals remains required by law.
