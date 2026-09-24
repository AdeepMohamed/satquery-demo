// ============================================
// SatQuery AI - Analysis Service
// ============================================
// Mock service layer. Replace with FastAPI calls for production.
// Future endpoint: POST /api/analyze

import { AnalysisResult, AnalysisMode, ProcessingStage } from '@/types';
import { demoScenes, processingPipeline } from '@/data/demoData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const USE_MOCK = true; // Toggle to false when FastAPI backend is ready

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateProcessingPipeline(
  onStageUpdate: (stages: ProcessingStage[]) => void
): Promise<void> {
  const stages = processingPipeline.map((s) => ({ ...s }));

  for (let i = 0; i < stages.length; i++) {
    stages[i].status = 'processing';
    onStageUpdate([...stages]);
    await delay(stages[i].duration || 500);
    stages[i].status = 'complete';
    onStageUpdate([...stages]);
    await delay(100);
  }
}

export async function analyzeImage(
  mode: AnalysisMode,
  _query: string
): Promise<AnalysisResult> {
  if (!USE_MOCK) {
    const response = await fetch(`${API_BASE}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, query: _query }),
    });
    return response.json();
  }

  // Mock response based on mode
  await delay(200);
  switch (mode) {
    case 'single':
      return {
        answer: demoScenes.singleImage.response,
        confidence: demoScenes.singleImage.confidence,
        features: demoScenes.singleImage.features,
        executionSteps: [
          'Input validated',
          'Query classified as DESCRIPTION',
          'Captioning model selected',
          'Scene analysis complete',
          'Response validated',
        ],
        evidence: [
          'Multi-class land cover detected',
          'Spectral signature analysis',
          'Spatial distribution mapped',
        ],
      };
    case 'grounding':
      return {
        answer: demoScenes.grounding.response,
        confidence: demoScenes.grounding.confidence,
        features: [
          {
            name: demoScenes.grounding.label,
            color: '#f59e0b',
            region: demoScenes.grounding.boundingBox,
          },
        ],
        executionSteps: [
          'Input validated',
          'Query classified as GROUNDING',
          'Grounding model selected',
          'Region detection complete',
          'Response validated',
        ],
        evidence: [
          'Spatial region highlighted',
          'Bounding coordinates computed',
          'Grounding evidence attached',
        ],
      };
    case 'change':
      return {
        answer: demoScenes.change.response,
        confidence: demoScenes.change.confidence,
        features: [
          { name: 'Built-up Expansion', color: '#ef4444', percentage: 15 },
          { name: 'Agricultural Loss', color: '#f59e0b', percentage: 12 },
        ],
        executionSteps: [
          'Input validated',
          'Query classified as CHANGE ANALYSIS',
          'Change detector selected',
          'Grounding model selected',
          'Temporal difference computed',
          'Evidence generated',
          'Response validated',
        ],
        evidence: [
          'Temporal difference detected',
          'Spatial region highlighted',
          'Grounding evidence attached',
        ],
      };
    case 'fusion':
      return {
        answer: demoScenes.fusion.response,
        confidence: demoScenes.fusion.confidence,
        features: demoScenes.fusion.detectedRegions,
        executionSteps: [
          'Input validated',
          'Query classified as MULTIMODAL FUSION',
          'Optical-SAR fusion pipeline selected',
          'Optical features extracted',
          'SAR features extracted',
          'Modality fusion complete',
          'Evidence generated',
          'Response validated',
        ],
        evidence: [
          'Optical evidence extracted',
          'SAR backscatter analyzed',
          'Fused interpretation generated',
        ],
      };
    default:
      return {
        answer: 'Analysis complete.',
        confidence: 85,
        features: [],
        executionSteps: ['Input validated', 'Analysis complete'],
        evidence: ['General analysis performed'],
      };
  }
}
