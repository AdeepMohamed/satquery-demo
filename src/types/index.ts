// ============================================
// SatQuery AI - Type Definitions
// ============================================

export type AnalysisMode = 'single' | 'grounding' | 'change' | 'fusion' | 'agent';

export type DemoScene =
  | 'intro'         // Scene 1: The Opening Hook (0:00 - 0:20)
  | 'problem'       // Scene 2: Remote Sensing Analysis is Complex (0:20 - 0:45)
  | 'overview'      // Scene 3: What is SatQuery AI? (0:45 - 1:10)
  | 'architecture'  // Scene 4: Core Architecture (1:10 - 1:45)
  | 'single'        // Scene 5: Single-Image Intelligence & Grounding (1:45 - 2:20)
  | 'grounding'     // Auxiliary grounding view
  | 'change'        // Scene 6: Bi-Temporal Change Analysis (2:20 - 3:00)
  | 'fusion'        // Scene 7: Multimodal Optical-SAR Fusion (3:00 - 3:40)
  | 'agent'         // Scene 8: Agentic AI Orchestration (3:40 - 4:15)
  | 'evidence'      // Scene 9: Trust + Evidence (4:15 - 4:40)
  | 'impact';       // Scene 10: Impact + Final Vision (4:40 - 5:00)

export interface VideoSceneConfig {
  id: DemoScene;
  sceneNumber: number;
  title: string;
  subtitle: string;
  timeRange: string;
  startTime: number;
  endTime: number;
  duration: number;
  voiceOver: string;
  onScreenText: string;
  keyVisual: string;
  badge?: string;
}

export type ProcessingStage = {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  duration?: number;
};

export type AnalysisResult = {
  answer: string;
  confidence: number;
  features: DetectedFeature[];
  executionSteps: string[];
  evidence: string[];
};

export type DetectedFeature = {
  name: string;
  color: string;
  percentage?: number;
  region?: { x: number; y: number; w: number; h: number };
};

export type DemoSceneData = {
  singleImage: {
    image: string;
    query: string;
    response: string;
    confidence: number;
    features: DetectedFeature[];
  };
  grounding: {
    image: string;
    query: string;
    response: string;
    confidence: number;
    boundingBox: { x: number; y: number; w: number; h: number };
    label: string;
  };
  change: {
    before: string;
    after: string;
    changeMap: string;
    query: string;
    response: string;
    confidence: number;
    statistics: {
      changeType: string;
      affectedRegion: string;
    };
  };
  fusion: {
    optical: string;
    sar: string;
    query: string;
    response: string;
    confidence: number;
    detectedRegions: DetectedFeature[];
  };
};

export type AgentTool = {
  id: string;
  name: string;
  icon: string;
  active: boolean;
};

export type ExecutionStep = {
  id: number;
  label: string;
  status: 'pending' | 'processing' | 'complete';
  tool?: string;
};

export type ReportData = {
  title: string;
  input: string;
  query: string;
  analysisType: string;
  result: string;
  evidence: string;
  confidence: number;
  executionSteps: string[];
  timestamp: string;
};

// Service types for future FastAPI integration
export type APIResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
  processingTime?: number;
};

export type AnalyzeRequest = {
  image: File | string;
  query: string;
  mode: AnalysisMode;
};

export type VQARequest = {
  image: File | string;
  question: string;
};

export type GroundingRequest = {
  image: File | string;
  query: string;
};

export type ChangeRequest = {
  beforeImage: File | string;
  afterImage: File | string;
  query: string;
};

export type FusionRequest = {
  opticalImage: File | string;
  sarImage: File | string;
  query: string;
};
