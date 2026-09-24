import { VideoSceneConfig } from '@/types';

export const videoScriptTimeline: VideoSceneConfig[] = [
  {
    id: 'intro',
    sceneNumber: 1,
    title: 'THE OPENING HOOK',
    subtitle: 'Earth to Satellite to AI Interface',
    timeRange: '0:00 – 0:20',
    startTime: 0,
    endTime: 20,
    duration: 20,
    voiceOver:
      'Every day, satellites capture enormous amounts of information about our planet. But turning these images into meaningful insights still requires specialized tools, complex workflows, and expert knowledge. What if we could simply ask the satellite image a question? Introducing SatQuery AI.',
    onScreenText:
      'SatQuery AI — An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis',
    keyVisual: 'Earth → satellite orbit → high-res Sentinel-2 image → futuristic UI',
    badge: 'SIH26167 • Space Technology',
  },
  {
    id: 'problem',
    sceneNumber: 2,
    title: 'THE PROBLEM',
    subtitle: 'Remote Sensing Analysis is Complex',
    timeRange: '0:20 – 0:45',
    startTime: 20,
    endTime: 45,
    duration: 25,
    voiceOver:
      'Remote sensing analysis is inherently multimodal. A single task may require visual question answering, image captioning, object grounding, change detection, or analysis across different sensors. Today, these capabilities are often handled through separate models and specialized workflows. This creates complexity between the image, the question, the model, and the final interpretation. SatQuery AI brings them together.',
    onScreenText:
      'Multiple Models • Multiple Tools • Complex Workflow → SatQuery AI brings them together',
    keyVisual: 'Fragmented specialist toolboxes (VQA, Captioning, Grounding, Change, SAR)',
    badge: 'Industry Bottleneck',
  },
  {
    id: 'overview',
    sceneNumber: 3,
    title: 'WHAT IS SATQUERY AI?',
    subtitle: 'Ask in Natural Language',
    timeRange: '0:45 – 1:10',
    startTime: 45,
    endTime: 70,
    duration: 25,
    voiceOver:
      'SatQuery AI provides a unified natural-language interface for remote sensing analysis. The user uploads satellite imagery and simply asks a question in natural language. Instead of manually selecting the required model, SatQuery AI understands the query, identifies the required task, and automatically chooses the appropriate analysis pipeline.',
    onScreenText: 'Upload → Ask → Analyze → Explain',
    keyVisual: 'GeoTIFF upload → "What land cover is visible?" → Instant semantic highlights',
    badge: 'Vision-Language Assistant',
  },
  {
    id: 'architecture',
    sceneNumber: 4,
    title: 'CORE ARCHITECTURE',
    subtitle: 'Understand → Route → Analyze → Validate',
    timeRange: '1:10 – 1:45',
    startTime: 70,
    endTime: 105,
    duration: 35,
    voiceOver:
      'The architecture follows a simple but powerful pipeline. First, the system validates the input and understands the user’s query. Next, an agentic router determines which specialist capability is required. The selected model performs the analysis, generates visual evidence, and passes the result through a validation stage. Finally, SatQuery AI returns the answer together with supporting visual evidence, confidence information, and an execution summary.',
    onScreenText: 'Understand ↓ Select ↓ Execute ↓ Validate ↓ Explain',
    keyVisual: 'End-to-End Multimodal VLA Pipeline with Active Agentic Router',
    badge: 'System Architecture',
  },
  {
    id: 'single',
    sceneNumber: 5,
    title: 'SINGLE IMAGE ANALYSIS',
    subtitle: 'Single-Image Intelligence',
    timeRange: '1:45 – 2:20',
    startTime: 105,
    endTime: 140,
    duration: 35,
    voiceOver:
      'For single-image analysis, SatQuery AI can answer questions directly about the scene. It can generate descriptions, answer visual questions, and identify relevant regions. For example, a user can ask what is present in an image, where a particular feature is located, or which land-cover elements are visible. The response is connected to visual evidence rather than being only a text prediction.',
    onScreenText: 'VQA • Captioning • Grounding',
    keyVisual: 'Query: "Describe this image" → Query: "Where is the built-up area?" → Bounding Box',
    badge: 'Interactive Demo 1',
  },
  {
    id: 'change',
    sceneNumber: 6,
    title: 'BI-TEMPORAL CHANGE ANALYSIS',
    subtitle: 'What Changed? Where?',
    timeRange: '2:20 – 3:00',
    startTime: 140,
    endTime: 180,
    duration: 40,
    voiceOver:
      'SatQuery AI also supports bi-temporal analysis. Two images acquired at different times can be compared to understand what changed and where the change occurred. The system can answer change-based questions such as whether built-up areas increased, decreased, or remained unchanged. Where suitable reference masks are available, the workflow can additionally support spatial change visualization.',
    onScreenText: 'BEFORE ↓ AFTER ↓ CHANGE — What changed? Where did it change?',
    keyVisual: '2022 vs 2025 Side-by-side → Interactive Wipe Slider → Change Mask (+15%)',
    badge: 'Hero Demo: Change Detection',
  },
  {
    id: 'fusion',
    sceneNumber: 7,
    title: 'OPTICAL + SAR FUSION',
    subtitle: 'Multimodal Optical–SAR Fusion',
    timeRange: '3:00 – 3:40',
    startTime: 180,
    endTime: 220,
    duration: 40,
    voiceOver:
      'Remote sensing does not rely on a single sensor. Optical imagery provides rich visual and spectral information, while SAR provides complementary information that can be especially useful under conditions where optical imagery is limited. SatQuery AI therefore supports co-registered optical and SAR inputs and combines their complementary information for multimodal reasoning.',
    onScreenText: 'OPTICAL + SAR • Complementary Information • Joint Analysis',
    keyVisual: 'Sentinel-2 RGB + Sentinel-1 Radar Speckle → Fusion Engine → Dual Validation',
    badge: 'Sensor Fusion Differentiator',
  },
  {
    id: 'agent',
    sceneNumber: 8,
    title: 'AGENTIC AI ORCHESTRATION',
    subtitle: 'Agentic AI Orchestration',
    timeRange: '3:40 – 4:15',
    startTime: 220,
    endTime: 255,
    duration: 35,
    voiceOver:
      'The key intelligence lies in the orchestration layer. SatQuery AI does not depend on one model for every task. The agentic router identifies the user’s intent, selects the required tools, executes them in the appropriate sequence, and combines their outputs. This turns multiple specialist models into one intelligent analysis system.',
    onScreenText: 'One Query ↓ Multiple Specialists ↓ One Unified Answer',
    keyVisual: 'Complex Query → Router Splitting to Change + Grounding + VQA → Sequential Trace',
    badge: 'Agentic Routing',
  },
  {
    id: 'evidence',
    sceneNumber: 9,
    title: 'TRUST + EVIDENCE',
    subtitle: 'Evidence-Grounded Results',
    timeRange: '4:15 – 4:40',
    startTime: 255,
    endTime: 280,
    duration: 25,
    voiceOver:
      'For remote sensing applications, producing an answer is not enough. The system must also show how that answer was produced. SatQuery AI therefore provides visual evidence, confidence information, and an observable execution summary. This makes the analysis easier to inspect, understand, and use in downstream workflows.',
    onScreenText: 'Answer + Evidence + Confidence + Trace',
    keyVisual: 'Evidence Gallery (T1, T2, Δ Mask) + 88% Confidence + Report Generation',
    badge: 'Explainable AI',
  },
  {
    id: 'impact',
    sceneNumber: 10,
    title: 'IMPACT + FINAL VISION',
    subtitle: 'From Satellite Data to Actionable Insight',
    timeRange: '4:40 – 5:00',
    startTime: 280,
    endTime: 300,
    duration: 20,
    voiceOver:
      'SatQuery AI is designed to make advanced remote sensing analysis more accessible through natural language. Its multimodal architecture can support applications across agriculture, disaster response, urban development, forestry, water resources, and environmental monitoring. Our vision is simple: transform satellite imagery from data that must be interpreted manually into information that can be queried, explained, and explored interactively. SatQuery AI — ask the image, understand the Earth.',
    onScreenText:
      'SATQUERY AI — Ask the Image. Understand the Earth.\nSIH 2026 — SIH26167 | Space Technology | Team: Problem Assassins',
    keyVisual: '6 Domain Impact Showcase → Cinematic Finale & SIH 2026 Credentials',
    badge: 'SIH Grand Finale',
  },
];

export const TOTAL_VIDEO_DURATION_SECONDS = 300; // 5 minutes exactly

export function getSceneConfigById(id: string): VideoSceneConfig | undefined {
  return videoScriptTimeline.find((scene) => scene.id === id);
}

export function getSceneConfigByTime(seconds: number): VideoSceneConfig {
  const clamped = Math.max(0, Math.min(seconds, TOTAL_VIDEO_DURATION_SECONDS - 0.1));
  const found = videoScriptTimeline.find(
    (scene) => clamped >= scene.startTime && clamped < scene.endTime
  );
  return found || videoScriptTimeline[0];
}
