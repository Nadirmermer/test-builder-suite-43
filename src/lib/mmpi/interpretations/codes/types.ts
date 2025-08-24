// MMPI Kod Analizi Ortak Tip Tanımlamaları

export interface CodeTypeInterpretation {
  code: string;
  alternativeCode?: string;
  description: string;
  characteristics: string[];
  clinicalSignificance: string;
  possibleDiagnoses?: string[];
  therapeuticImplications?: string[];
  demographicNotes?: string[];
  additionalNotes?: string[];
  genderSpecific?: {
    male?: string[];
    female?: string[];
  };
}

export type ScaleValues = Record<string, { tScore: number; rawScore: number }>;
export type Gender = 'Erkek' | 'Kadin';