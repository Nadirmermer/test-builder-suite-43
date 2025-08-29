// MMPI Kod Sistemi Tipleri

export interface MMPICodeResult {
  code: string;
  title: string;
  description: string;
  diagnosis?: string;
  characteristics: string[];
  additionalNotes?: string[];
  gender?: 'Erkek' | 'Kadın' | 'Tüm';
  ageGroup?: 'Ergen' | 'Genç Yetişkin' | 'Yetişkin' | 'Tüm';
  educationLevel?: 'İlköğretim' | 'Lise' | 'Üniversite' | 'Tüm';
  maritalStatus?: 'Bekar' | 'Evli' | 'Boşanmış' | 'Tüm';
}

export interface MMPICodeInterpretation {
  applicableCodes: MMPICodeResult[];
  elevatedScales: {
    scaleId: string;
    scaleName: string;
    tScore: number;
  }[];
  codeGenerationNotes: string[];
}

export interface ScalePair {
  primary: string;
  secondary: string;
  primaryScore: number;
  secondaryScore: number;
  withinRange: boolean; // ±10 puan aralığında mı
}

export interface GeneratedCode {
  code: string;
  type: 'spike' | 'two-point' | 'three-point' | 'four-point';
  scales: string[];
  scores: number[];
  isWithinRange: boolean;
  hasInterpretation: boolean;
}