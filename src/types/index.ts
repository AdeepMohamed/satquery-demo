// ============================================
// SatQuery AI - Type Definitions
// ============================================

export type AnalysisMode = 'single' | 'grounding' | 'change' | 'fusion' | 'agent';

export type DemoScene = 'intro' | 'single' | 'grounding' | 'change' | 'fusion' | 'agent' | 'evidence' | 'impact';

export type NavTab = 'workspace' | 'analysis' | 'history' | 'reports';

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
