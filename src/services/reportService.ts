// ============================================
// SatQuery AI - Report Service
// ============================================
// Future endpoint: POST /api/report

import { ReportData } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const USE_MOCK = true;

export async function generateReport(data: ReportData): Promise<Blob> {
  if (!USE_MOCK) {
    const response = await fetch(`${API_BASE}/api/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.blob();
  }

  // Generate a text-based mock report
  const reportContent = `
╔══════════════════════════════════════════════════════════╗
║                    SATQUERY AI                          ║
║          Remote Sensing Analysis Report                 ║
╠══════════════════════════════════════════════════════════╣

Report Generated: ${data.timestamp}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INPUT
  ${data.input}

QUERY
  ${data.query}

ANALYSIS TYPE
  ${data.analysisType}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESULT
  ${data.result}

EVIDENCE
  ${data.evidence}

CONFIDENCE
  ${data.confidence}% (Demo confidence)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTION PIPELINE
${data.executionSteps.map((s, i) => `  ${String(i + 1).padStart(2, '0')}. ${s} ✓`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIH 2026 | SIH26167 | Space Technology
Team: Code for Nation

╚══════════════════════════════════════════════════════════╝
  `.trim();

  return new Blob([reportContent], { type: 'text/plain' });
}

export function downloadReport(blob: Blob, filename: string = 'satquery-report.txt'): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
