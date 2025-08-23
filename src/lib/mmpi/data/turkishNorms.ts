// MMPI Türk Normları - Resmi Uygulama Kitabından
// T = 50 + 10*(X - M)/SD formülü ile hesaplama

import { getKCorrectionValue } from '../utils/kCorrectionTable';

export interface NormData {
  M: number;  // Ortalama
  SD: number; // Standart sapma
}

export interface GenderNorms {
  [scaleId: string]: NormData;
}

export interface TurkishNorms {
  Erkek: GenderNorms;
  Kadin: GenderNorms;
}

// Resmi Türk normları (MMPI Uygulama Kitabından)
export const turkishNorms: TurkishNorms = {
  Erkek: {
    // Geçerlik ölçekleri
    L: { M: 6.45, SD: 2.74 },
    F: { M: 8.3, SD: 4.62 },
    K: { M: 13.98, SD: 4.65 },
    
    // Klinik ölçekler (K-düzeltmeli)
    'Hs+5K': { M: 13.19, SD: 4.07 },  // Hs + 0.5*K
    D: { M: 20.63, SD: 4.76 },
    Hy: { M: 19.31, SD: 4.71 },
    'Pd+4K': { M: 22.22, SD: 4.45 },  // Pd + 0.4*K
    Mf: { M: 29.21, SD: 3.82 },
    Pa: { M: 11.12, SD: 4.03 },
    'Pt+1K': { M: 27.9, SD: 6.3 },   // Pt + 1.0*K
    'Sc+1K': { M: 29.82, SD: 9.05 }, // Sc + 1.0*K
    'Ma+2K': { M: 19.96, SD: 4.4 },  // Ma + 0.2*K
    Si: { M: 25.86, SD: 7.97 }
  },
  
  Kadin: {
    // Geçerlik ölçekleri
    L: { M: 6, SD: 2.25 },
    F: { M: 9.38, SD: 5.16 },
    K: { M: 11.82, SD: 3.8 },
    
    // Klinik ölçekler (K-düzeltmeli)
    'Hs+5K': { M: 15.89, SD: 4.88 },  // Hs + 0.5*K
    D: { M: 23.86, SD: 5.08 },
    Hy: { M: 18.12, SD: 5.31 },
    'Pd+4K': { M: 22.84, SD: 4.51 },  // Pd + 0.4*K
    Mf: { M: 32.98, SD: 3.67 },
    Pa: { M: 11.93, SD: 4.17 },
    'Pt+1K': { M: 29.2, SD: 6.59 },   // Pt + 1.0*K
    'Sc+1K': { M: 31.06, SD: 8.2 },   // Sc + 1.0*K
    'Ma+2K': { M: 19.72, SD: 4.36 },  // Ma + 0.2*K
    Si: { M: 29.88, SD: 7.52 }
  }
};

// K ekleme oranları (resmi kitaptan)
export const kCorrectionRatios = {
  Hs: 0.5,  // +0.5K
  Pd: 0.4,  // +0.4K  
  Pt: 1.0,  // +1.0K
  Sc: 1.0,  // +1.0K
  Ma: 0.2   // +0.2K
} as const;

// K ekleme tablosu kaldırıldı - utils/kCorrectionTable.ts'den kullanılacak

/**
 * T-skoru hesaplama (Türk normlarına göre)
 * T = 50 + 10*(X - M)/SD
 */
export function calculateTScore(
  rawScore: number,
  gender: 'Erkek' | 'Kadin',
  scaleKey: string
): number {
  const norms = turkishNorms[gender];
  const normData = norms[scaleKey];
  
  if (!normData) {
    console.warn(`Norm verisi bulunamadı: ${scaleKey}, ${gender}`);
    return 50; // Varsayılan ortalama
  }
  
  const tScore = 50 + (10 * (rawScore - normData.M) / normData.SD);
  
  // T-skoru sınırları (30-120) - ondalık sayı olarak hesapla
  const boundedScore = Math.max(30, Math.min(120, tScore));
  return Math.round(boundedScore * 10) / 10; // Bir ondalık basamak
}

/**
 * K-düzeltmeli ham puanı hesapla (Resmi tablo kullanarak)
 */
export function applyKCorrection(
  rawScore: number,
  kRawScore: number,
  scaleId: string
): number {
  const ratio = kCorrectionRatios[scaleId as keyof typeof kCorrectionRatios];
  if (!ratio) return rawScore;
  
  const kAddition = getKCorrectionValue(kRawScore, ratio);
  return rawScore + kAddition;
}