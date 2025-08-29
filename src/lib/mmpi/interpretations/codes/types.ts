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
  // Koşullu mantık için yeni alanlar
  conditions?: MMPICodeConditions;
  // Dinamik özellikler (T-score koşullarına bağlı)
  conditionalCharacteristics?: ConditionalCharacteristic[];
  // Dinamik tanılar
  conditionalDiagnosis?: ConditionalDiagnosis[];
}

// Koşullu mantık interface'leri
export interface MMPICodeConditions {
  // T-score koşulları: "Alt test 4, test 6'dan yüksek olduğunda"
  tScoreConditions?: TScoreCondition[];
  // Yaş koşulları: "25 yaşın üzerindekilerde daha sık"
  ageConditions?: AgeCondition[];
  // Cinsiyet koşulları: "erkeklerde kadınlardan daha fazla"
  genderConditions?: GenderCondition[];
  // Eğitim koşulları: "eğitim düzeyi düşük olan erkeklerde"
  educationConditions?: EducationCondition[];
  // Diğer alt test koşulları: "K 50 T puanından düşükse"
  otherScaleConditions?: OtherScaleCondition[];
}

export interface TScoreCondition {
  condition: string; // "Alt test 4, test 6'dan yüksek olduğunda"
  result: string; // "aile ve iş güçlükleri tipiktir"
  scaleComparison?: {
    scale1: string; // "4"
    scale2: string; // "6"  
    operator: 'higher' | 'lower' | 'equal' | 'within_range';
    threshold?: number; // 5T puanı fark gibi
  };
}

export interface ConditionalCharacteristic {
  condition: string;
  characteristics: string[];
}

export interface ConditionalDiagnosis {
  condition: string;
  diagnosis: string;
}

export interface AgeCondition {
  ageRange: string; // "25 yaşın üzerinde", "40 yaşın altında"
  effect: string;
  characteristics?: string[];
}

export interface GenderCondition {
  gender: 'Erkek' | 'Kadın';
  effect: string;
  characteristics?: string[];
}

export interface EducationCondition {
  educationLevel: 'İlköğretim' | 'Lise' | 'Üniversite';
  effect: string;
  characteristics?: string[];
}

export interface OtherScaleCondition {
  scale: string; // "K", "L", "F", "Si", vb.
  threshold: number; // 50, 70, vb.
  operator: 'higher' | 'lower' | 'equal';
  effect: string;
  characteristics?: string[];
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