// ── Session Types ───────────────────────────────────

export type SessionStatus = 'active' | 'summarizing' | 'completed' | 'cancelled';

export interface AssessmentEntry {
  condition: string;
  probability: number;
  icd10Code?: string;
}

export interface SOAPSummary {
  subjective: string;
  objective: string;
  assessment: AssessmentEntry[];
  plan: string;
  metadata: {
    modelUsed: string;
    promptVersion: string;
    processingTimeMs: number;
    guardrailViolations: number;
  };
}

export interface SessionSummary {
  id: string;
  sessionId: string;
  soapSummary: SOAPSummary;
  extractedSymptoms: string[];
  redFlags: string[];
  urgencyScore: number;
  doctorApproved: boolean;
  aiGeneratedAt: string;
  doctorApprovedAt: string | null;
}

export interface Session {
  id: string;
  patientId: string;
  doctorId: string;
  status: SessionStatus;
  followUpCategory: string | null;
  startedAt: string;
  endedAt: string | null;
  summary?: SessionSummary;
}
