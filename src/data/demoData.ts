// ============================================
// SatQuery AI - Demo Data Configuration
// ============================================
// Replace images in public/demo/ to update demo visuals.
// All responses are deterministic mock data.

import { DemoSceneData, ProcessingStage } from '@/types';

export const demoScenes: DemoSceneData = {
  singleImage: {
    image: '/demo/single-image.jpg',
    query: 'Describe this image.',
    response:
      'The scene contains predominantly agricultural and vegetated areas covering approximately 60% of the visible region, with scattered built-up zones concentrated in the southeastern quadrant. A minor water body is detected along the western boundary, consistent with seasonal irrigation infrastructure.',
    confidence: 92,
    features: [
      { name: 'Agriculture', color: '#22c55e', percentage: 42 },
      { name: 'Vegetation', color: '#16a34a', percentage: 28 },
      { name: 'Built-up Area', color: '#f59e0b', percentage: 18 },
      { name: 'Water Body', color: '#3b82f6', percentage: 8 },
      { name: 'Barren Land', color: '#a3a3a3', percentage: 4 },
    ],
  },

  grounding: {
    image: '/demo/grounding.jpg',
    query: 'Where is the built-up area?',
    response:
      'The built-up area is concentrated in the southeastern quadrant of the image, spanning approximately 18% of the total visible region. The settlement pattern indicates a semi-urban cluster with medium-density residential structures.',
    confidence: 90,
    boundingBox: { x: 55, y: 50, w: 35, h: 40 },
    label: 'BUILT-UP REGION',
  },

  change: {
    before: '/demo/before.jpg',
    after: '/demo/after.jpg',
    changeMap: '/demo/change-map.jpg',
    query: 'What changed between these two images?',
    response:
      'Significant built-up expansion detected in the central-eastern region. Agricultural land has been converted to urban development, with an estimated 15% increase in impervious surface area between 2022 and 2025. New road infrastructure is also visible connecting the expanded settlement.',
    confidence: 88,
    statistics: {
      changeType: 'Built-up expansion',
      affectedRegion: 'Central-eastern zone',
    },
  },

  fusion: {
    optical: '/demo/optical.jpg',
    sar: '/demo/sar.jpg',
    query:
      'Use optical and SAR imagery to identify built-up and water regions.',
    response:
      'Multimodal analysis combining optical reflectance and SAR backscatter reveals distinct water bodies in the northwestern sector (low SAR return, dark optical signature) and built-up regions in the central zone (high SAR return, bright optical signature). The fusion approach resolves ambiguities present in individual modalities.',
    confidence: 89,
    detectedRegions: [
      {
        name: 'Water Region',
        color: '#3b82f6',
        region: { x: 10, y: 15, w: 30, h: 25 },
      },
      {
        name: 'Built-up Region',
        color: '#f59e0b',
        region: { x: 45, y: 40, w: 40, h: 35 },
      },
    ],
  },
};

export const processingPipeline: ProcessingStage[] = [
  { id: 'validate', label: 'Input Validation', status: 'pending', duration: 400 },
  { id: 'query', label: 'Query Understanding', status: 'pending', duration: 600 },
  { id: 'classify', label: 'Task Classification', status: 'pending', duration: 500 },
  { id: 'select', label: 'Model Selection', status: 'pending', duration: 400 },
  { id: 'analyze', label: 'Specialist Analysis', status: 'pending', duration: 1200 },
  { id: 'evidence', label: 'Evidence Generation', status: 'pending', duration: 800 },
  { id: 'validation', label: 'Validation', status: 'pending', duration: 500 },
  { id: 'response', label: 'Final Response', status: 'pending', duration: 300 },
];

export const agentTools = [
  { id: 'vqa', name: 'VQA', icon: 'MessageSquare' },
  { id: 'caption', name: 'Captioning', icon: 'FileText' },
  { id: 'grounding', name: 'Grounding', icon: 'Target' },
  { id: 'change', name: 'Change Detection', icon: 'GitCompare' },
  { id: 'fusion', name: 'Optical-SAR Fusion', icon: 'Layers' },
];

export const demoChapters = [
  { id: 'intro', label: 'INTRO', number: '01', shortcut: '1' },
  { id: 'single', label: 'SINGLE IMAGE', number: '02', shortcut: '2' },
  { id: 'grounding', label: 'GROUNDING', number: '03', shortcut: '3' },
  { id: 'change', label: 'CHANGE', number: '04', shortcut: '4' },
  { id: 'fusion', label: 'OPTICAL + SAR', number: '05', shortcut: '5' },
  { id: 'agent', label: 'AGENT TRACE', number: '06', shortcut: '6' },
  { id: 'evidence', label: 'EVIDENCE', number: '07', shortcut: '7' },
  { id: 'impact', label: 'IMPACT', number: '08', shortcut: '8' },
] as const;

export const querySuggestions = [
  'Describe this image',
  'Where is the built-up area?',
  'Highlight the water body',
  'What changed between these images?',
  'Did the built-up area increase?',
  'Use optical and SAR to identify water and built-up regions',
];

export const impactAreas = [
  {
    title: 'AGRICULTURE',
    description: 'Crop monitoring, yield prediction, and land use classification',
    icon: 'Sprout',
  },
  {
    title: 'DISASTER RESPONSE',
    description: 'Flood mapping, damage assessment, and rapid response',
    icon: 'AlertTriangle',
  },
  {
    title: 'URBAN PLANNING',
    description: 'Settlement detection, expansion tracking, and infrastructure',
    icon: 'Building2',
  },
  {
    title: 'FORESTRY',
    description: 'Deforestation monitoring and canopy cover analysis',
    icon: 'Trees',
  },
  {
    title: 'WATER RESOURCES',
    description: 'Water body mapping, wetland monitoring, and change detection',
    icon: 'Droplets',
  },
  {
    title: 'ENVIRONMENTAL MONITORING',
    description: 'Climate impact assessment and ecological health tracking',
    icon: 'Globe',
  },
];

export const demoDatasets = [
  {
    id: 'scene-01',
    title: 'Demo Scene 01',
    subtitle: 'Agricultural Region',
    type: 'single',
    thumbnail: '/demo/single-image.jpg',
  },
  {
    id: 'scene-02',
    title: 'Demo Scene 02',
    subtitle: 'Urban Expansion',
    type: 'change',
    thumbnail: '/demo/before.jpg',
  },
  {
    id: 'scene-03',
    title: 'Demo Scene 03',
    subtitle: 'Water + Built-up',
    type: 'single',
    thumbnail: '/demo/grounding.jpg',
  },
  {
    id: 'scene-04',
    title: 'Demo Scene 04',
    subtitle: 'Optical + SAR',
    type: 'fusion',
    thumbnail: '/demo/optical.jpg',
  },
];
