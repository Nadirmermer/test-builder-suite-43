// K Ekleme Tablosu - Resmi MMPI Uygulama Kitabından
// Ham K puanından düzeltme değerlerini bulmak için kullanılır

export interface KCorrectionEntry {
  kRawScore: number;
  ratio5: number;  // 0.5K için (Hs)
  ratio4: number;  // 0.4K için (Pd)
  ratio2: number;  // 0.2K için (Ma)
  ratio10: number; // 1.0K için (Pt, Sc)
}

// Resmi K ekleme tablosu
export const kCorrectionLookupTable: KCorrectionEntry[] = [
  { kRawScore: 0, ratio5: 0, ratio4: 0, ratio2: 0, ratio10: 0 },
  { kRawScore: 1, ratio5: 1, ratio4: 1, ratio2: 0, ratio10: 1 },
  { kRawScore: 2, ratio5: 1, ratio4: 1, ratio2: 0, ratio10: 2 },
  { kRawScore: 3, ratio5: 2, ratio4: 2, ratio2: 1, ratio10: 3 },
  { kRawScore: 4, ratio5: 2, ratio4: 2, ratio2: 1, ratio10: 4 },
  { kRawScore: 5, ratio5: 3, ratio4: 2, ratio2: 1, ratio10: 5 },
  { kRawScore: 6, ratio5: 3, ratio4: 2, ratio2: 1, ratio10: 6 },
  { kRawScore: 7, ratio5: 4, ratio4: 3, ratio2: 1, ratio10: 7 },
  { kRawScore: 8, ratio5: 4, ratio4: 3, ratio2: 2, ratio10: 8 },
  { kRawScore: 9, ratio5: 5, ratio4: 4, ratio2: 2, ratio10: 9 },
  { kRawScore: 10, ratio5: 5, ratio4: 4, ratio2: 2, ratio10: 10 },
  { kRawScore: 11, ratio5: 6, ratio4: 4, ratio2: 2, ratio10: 11 },
  { kRawScore: 12, ratio5: 6, ratio4: 5, ratio2: 2, ratio10: 12 },
  { kRawScore: 13, ratio5: 7, ratio4: 5, ratio2: 3, ratio10: 13 },
  { kRawScore: 14, ratio5: 7, ratio4: 6, ratio2: 3, ratio10: 14 },
  { kRawScore: 15, ratio5: 8, ratio4: 6, ratio2: 3, ratio10: 15 },
  { kRawScore: 16, ratio5: 8, ratio4: 6, ratio2: 3, ratio10: 16 },
  { kRawScore: 17, ratio5: 9, ratio4: 7, ratio2: 3, ratio10: 17 },
  { kRawScore: 18, ratio5: 9, ratio4: 7, ratio2: 4, ratio10: 18 },
  { kRawScore: 19, ratio5: 10, ratio4: 8, ratio2: 4, ratio10: 19 },
  { kRawScore: 20, ratio5: 10, ratio4: 8, ratio2: 4, ratio10: 20 },
  { kRawScore: 21, ratio5: 11, ratio4: 8, ratio2: 4, ratio10: 21 },
  { kRawScore: 22, ratio5: 11, ratio4: 9, ratio2: 4, ratio10: 22 },
  { kRawScore: 23, ratio5: 12, ratio4: 9, ratio2: 5, ratio10: 23 },
  { kRawScore: 24, ratio5: 12, ratio4: 10, ratio2: 5, ratio10: 24 },
  { kRawScore: 25, ratio5: 13, ratio4: 10, ratio2: 5, ratio10: 25 },
  { kRawScore: 26, ratio5: 13, ratio4: 10, ratio2: 5, ratio10: 26 },
  { kRawScore: 27, ratio5: 14, ratio4: 11, ratio2: 5, ratio10: 27 },
  { kRawScore: 28, ratio5: 14, ratio4: 11, ratio2: 6, ratio10: 28 },
  { kRawScore: 29, ratio5: 15, ratio4: 12, ratio2: 6, ratio10: 29 },
  { kRawScore: 30, ratio5: 15, ratio4: 12, ratio2: 6, ratio10: 30 }
];

/**
 * K düzeltme değerini tablodan bul
 */
export function getKCorrectionValue(
  kRawScore: number,
  correctionRatio: 0.5 | 0.4 | 0.2 | 1.0
): number {
  // K puanını tablonun sınırları içinde tut
  const clampedKScore = Math.max(0, Math.min(30, kRawScore));
  const entry = kCorrectionLookupTable[clampedKScore];
  
  switch (correctionRatio) {
    case 0.5: return entry.ratio5;   // Hs için
    case 0.4: return entry.ratio4;   // Pd için
    case 0.2: return entry.ratio2;   // Ma için
    case 1.0: return entry.ratio10;  // Pt ve Sc için
    default: return 0;
  }
}

/**
 * Tüm düzeltme değerlerini al
 */
export function getAllKCorrectionValues(kRawScore: number): {
  ratio5: number;
  ratio4: number;
  ratio2: number;
  ratio10: number;
} {
  const clampedKScore = Math.max(0, Math.min(30, kRawScore));
  const entry = kCorrectionLookupTable[clampedKScore];
  
  return {
    ratio5: entry.ratio5,
    ratio4: entry.ratio4,
    ratio2: entry.ratio2,
    ratio10: entry.ratio10
  };
}