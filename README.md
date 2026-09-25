# SatQuery AI — Demo UI

> **An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries**

**SIH 2026 | SIH26167 | Space Technology | Team: Code for Nation**

---

## Quick Start

```bash
cd satquery-app
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## 🎬 5-Minute Automated Video Demo Mode

Click the prominent glowing **`▶ RUN 5-MIN DEMO`** button in the top navigation or press **`Space`** to launch the automated 5-minute video presentation.

The application will run automatically from **00:00 to 05:00**, timed scene-by-scene according to your official Smart India Hackathon script:

| Scene | Time | Scene Title | Key Visuals & Interactions |
|:---:|:---:|:---|:---|
| **1** | `0:00–0:20` | **The Opening Hook** | Earth globe → Sentinel-2 orbit → High-res zoom → "Ask your satellite image anything" → SatQuery AI emblem |
| **2** | `0:20–0:45` | **The Problem** | Remote sensing complexity: 5 fragmented isolated models (VQA, Captioning, Grounding, Change, SAR) vs Unified SatQuery AI |
| **3** | `0:45–1:10` | **What is SatQuery AI?** | Natural language interface, GeoTIFF ingestion, auto-typed query, instant semantic segmentation highlights |
| **4** | `1:10–1:45` | **Core Architecture** | Understand → Route → Analyze → Validate (interactive VLA pipeline with data pulse animation to 5 specialist models) |
| **5** | `1:45–2:20` | **Single-Image Intelligence** | Demo 1: "Describe this image" → Demo 2: "Where is the built-up area?" (animated cyan bounding box) |
| **6** | `2:20–3:00` | **Bi-Temporal Change Analysis** | 2022 vs 2025 comparison → Automated wipe slider sweep → Real Change Map (+15% urban expansion) |
| **7** | `3:00–3:40` | **Multimodal Optical–SAR Fusion** | Real Optical RGB + Real SAR radar speckle imagery → Multimodal fusion engine → Dual-sensor consensus |
| **8** | `3:40–4:15` | **Agentic AI Orchestration** | Query: "What changed in the built-up area and show me where?" → Router splits to Change + Grounding + VQA → Live 6-step trace checkmarks |
| **9** | `4:15–4:40` | **Trust + Evidence** | Answer panel, visual evidence gallery (thumbnails: T1, T2, Δ change mask), 88% confidence ring, live report generation |
| **10** | `4:40–5:00` | **Impact + Final Vision** | Fast sequence across 6 domains (Agriculture, Water, Urban, Forestry, Disaster, Environment) → Grand SIH 2026 Finale Screen |

### Keyboard Shortcuts for Video Recording

| Key | Action |
|:---:|:---|
| **`Space`** | **Play / Pause 5-minute automated demo** |
| **`1` – `9`, `0`** | **Direct jump to Scene 1 through 10** (`0` = Scene 10) |
| **`←` / `→`** | Previous / Next scene |
| **`R`** | Restart demo from 00:00 |
| **`V`** | **Toggle Voiceover Subtitles / Teleprompter HUD** (Read while recording!) |
| **`F`** | **Toggle Fullscreen mode** |
| **`P`** | Toggle presentation mode |
| **`Escape`** | Exit presentation & stop auto-play |

---

## Replacing Demo Images

All demo images are stored in `public/demo/`:

| File | Usage |
|------|-------|
| `single-image.jpg` | Single image analysis scene |
| `grounding.jpg` | Visual grounding scene |
| `before.jpg` | Change detection — before (2022) |
| `after.jpg` | Change detection — after (2025) |
| `change-map.jpg` | Change detection — change map overlay |
| `optical.jpg` | Fusion — optical image |
| `sar.jpg` | Fusion — SAR image |

**Note:** The current UI uses procedural SVG satellite images embedded in the components. The files in `public/demo/` are ready for when you want to use real satellite imagery. To use actual images:

1. Replace the files in `public/demo/` with your real satellite images
2. Update the procedural SVG components with `<img>` or `<Image>` tags loading from `public/demo/`

---

## Demo Data Configuration

All mock responses, queries, and confidence values are centralized in:

```
src/data/demoData.ts
```

Edit this file to update:
- Demo queries and AI responses
- Confidence values
- Detected features
- Processing pipeline stages
- Agent tool definitions
- Impact areas

---

## Demo Sequence (Auto-Play)

The auto-play feature cycles through these 8 scenes:

1. **Intro** — Landing page with project title
2. **Single Image** — Image description and feature detection
3. **Grounding** — "Where is the built-up area?" localization
4. **Change** — Bi-temporal change analysis (hero scene)
5. **Optical + SAR** — Multimodal fusion demonstration
6. **Agent Trace** — Agentic router visualization
7. **Evidence** — Validated results and report generation
8. **Impact** — Application areas and project info

Each scene transitions automatically every 12 seconds in auto-play mode.

---

## Future FastAPI Backend Integration

The service layer is ready for connecting to a Python FastAPI backend.

### Service Files

```
src/services/
  analysisService.ts   — Main analysis + processing pipeline
  reportService.ts     — Report generation + download
```

### Expected Backend Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/analyze` | POST | Main analysis dispatcher |
| `/api/vqa` | POST | Visual question answering |
| `/api/caption` | POST | Image captioning |
| `/api/grounding` | POST | Visual grounding |
| `/api/change` | POST | Change detection |
| `/api/fusion` | POST | Optical + SAR fusion |
| `/api/report` | POST | Report generation |

### How to Connect

1. Set the environment variable:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. In `src/services/analysisService.ts`, change:
   ```typescript
   const USE_MOCK = false;
   ```

3. Implement the FastAPI endpoints matching the request/response types in `src/types/index.ts`

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Design system + animations
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page (scene state machine)
├── components/
│   ├── layout/
│   │   ├── StarField.tsx
│   │   └── TopNav.tsx
│   ├── dashboard/
│   │   └── DashboardView.tsx
│   ├── analysis/
│   │   ├── SingleImageScene.tsx
│   │   ├── GroundingScene.tsx
│   │   ├── ChangeScene.tsx
│   │   └── FusionScene.tsx
│   ├── agent/
│   │   └── AgentTraceScene.tsx
│   ├── evidence/
│   │   └── EvidenceScene.tsx
│   ├── visualization/
│   │   ├── ProcessingAnimation.tsx
│   │   └── ConfidenceRing.tsx
│   └── demo/
│       ├── LandingScreen.tsx
│       ├── DemoControlBar.tsx
│       └── ImpactScene.tsx
├── services/
│   ├── analysisService.ts
│   └── reportService.ts
├── data/
│   └── demoData.ts
├── types/
│   └── index.ts
└── public/
    └── demo/             # Replace with real satellite images
```

---

## Tech Stack

- **Next.js 16** + React 19
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **Recharts** — (Available for charts if needed)

---

## Design Resolution

Optimized for **1920 × 1080** full-screen recording. Works on smaller screens but prioritizes 16:9 desktop presentation.

---

*Built for Smart India Hackathon 2026*
