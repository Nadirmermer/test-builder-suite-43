// MMPI Kod Sistemi Türleri

export interface MMPICodeInterpretation {
  code: string;
  diagnosis: string[];
  description: string;
  characteristics: string[];
  warnings?: string[];
  ageFactors?: string[];
  genderFactors?: string[];
  therapeuticImplications?: string[];
}

export interface MMPICodeResult {
  primaryCodes: string[];
  secondaryCodes: string[];
  interpretations: MMPICodeInterpretation[];
}

// Alt ölçek haritalama
export const SCALE_CODE_MAP: Record<string, string> = {
  'Hs': '1',
  'D': '2', 
  'Hy': '3',
  'Pd': '4',
  'Mf': '5',
  'Pa': '6',
  'Pt': '7',
  'Sc': '8',
  'Ma': '9',
  'Si': '0'
};

// Ters haritalama (kod -> ölçek)
export const CODE_SCALE_MAP: Record<string, string> = {
  '1': 'Hs',
  '2': 'D',
  '3': 'Hy', 
  '4': 'Pd',
  '5': 'Mf',
  '6': 'Pa',
  '7': 'Pt',
  '8': 'Sc',
  '9': 'Ma',
  '0': 'Si'
};

export const SCALE_NAMES: Record<string, string> = {
  '1': 'Hipokondriazis',
  '2': 'Depresyon',
  '3': 'Histeri',
  '4': 'Psikopatik Sapma',
  '5': 'Kadınlık-Erkeklik',
  '6': 'Paranoya',
  '7': 'Psikasteni',
  '8': 'Şizofreni',
  '9': 'Hipomani',
  '0': 'Sosyal İçedönüklük'
};