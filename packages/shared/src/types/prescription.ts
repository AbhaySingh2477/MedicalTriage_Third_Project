// ── Prescription & Drug Types ───────────────────────

export interface Drug {
  id: string;
  rxnormCui: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  therapeuticClass: string;
}

export interface DrugAlternative extends Drug {
  similarityScore: number;
}

export interface Prescription {
  id: string;
  sessionId: string;
  patientId: string;
  doctorId: string;
  drugName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  prescribedAt: string;
}
