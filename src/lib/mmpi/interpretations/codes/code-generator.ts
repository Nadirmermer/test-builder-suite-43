// MMPI Kod Üretici
// T-skorlarından kod kombinasyonları üretir

import { SCALE_CODE_MAP, MMPICodeResult } from './types';
import { getCodeInterpretation } from './code-interpretations';

export interface ScaleScore {
  scaleId: string;
  tScore: number;
}

/**
 * MMPI kod analizi yapar
 * @param clinicalScales Klinik ölçek sonuçları
 * @returns Kod analizi sonuçları
 */
export function generateMMPICodes(clinicalScales: Record<string, { tScore: number; rawScore: number }>): MMPICodeResult {
  // 1. 65+ T-skoru olan ölçekleri bul
  const elevatedScales: ScaleScore[] = Object.entries(clinicalScales)
    .filter(([_, scale]) => scale.tScore >= 65)
    .map(([scaleId, scale]) => ({
      scaleId,
      tScore: scale.tScore
    }))
    .sort((a, b) => b.tScore - a.tScore); // En yüksek önce

  if (elevatedScales.length === 0) {
    return {
      primaryCodes: [],
      secondaryCodes: [],
      interpretations: []
    };
  }

  // 2. Kod kombinasyonları oluştur
  const codes = generateCodeCombinations(elevatedScales);
  
  // 3. Yorumları getir
  const interpretations = codes.map(code => getCodeInterpretation(code)).filter(Boolean);

  return {
    primaryCodes: codes.slice(0, 3), // İlk 3 kod birincil
    secondaryCodes: codes.slice(3), // Geri kalanlar ikincil
    interpretations
  };
}

/**
 * Kod kombinasyonları oluşturur
 */
function generateCodeCombinations(elevatedScales: ScaleScore[]): string[] {
  const codes: string[] = [];
  
  // Kod numaralarına çevir
  const scaleNumbers = elevatedScales.map(scale => SCALE_CODE_MAP[scale.scaleId]);
  
  // 2'li kombinasyonlar
  if (elevatedScales.length >= 2) {
    for (let i = 0; i < Math.min(elevatedScales.length, 4); i++) {
      for (let j = i + 1; j < Math.min(elevatedScales.length, 4); j++) {
        // 10 puan aralığında mı kontrol et
        const scoreDiff = Math.abs(elevatedScales[i].tScore - elevatedScales[j].tScore);
        if (scoreDiff <= 10) {
          codes.push(scaleNumbers[i] + scaleNumbers[j]);
          codes.push(scaleNumbers[j] + scaleNumbers[i]); // Ters sıralama da
        }
      }
    }
  }

  // 3'lü kombinasyonlar
  if (elevatedScales.length >= 3) {
    for (let i = 0; i < Math.min(elevatedScales.length, 3); i++) {
      for (let j = i + 1; j < Math.min(elevatedScales.length, 3); j++) {
        for (let k = j + 1; k < Math.min(elevatedScales.length, 3); k++) {
          // İlk ikisinin 10 puan aralığında olup olmadığını kontrol et
          const scoreDiff1 = Math.abs(elevatedScales[i].tScore - elevatedScales[j].tScore);
          const scoreDiff2 = Math.abs(elevatedScales[j].tScore - elevatedScales[k].tScore);
          
          if (scoreDiff1 <= 10 && scoreDiff2 <= 10) {
            codes.push(scaleNumbers[i] + scaleNumbers[j] + scaleNumbers[k]);
          }
        }
      }
    }
  }

  // 4'lü kombinasyonlar
  if (elevatedScales.length >= 4) {
    const first4 = elevatedScales.slice(0, 4);
    const first4Numbers = first4.map(scale => SCALE_CODE_MAP[scale.scaleId]);
    
    // Tüm skorlar birbirine yakın mı kontrol et
    const allClose = first4.every((scale, index) => {
      if (index === 0) return true;
      return Math.abs(scale.tScore - first4[index - 1].tScore) <= 10;
    });
    
    if (allClose) {
      codes.push(first4Numbers.join(''));
    }
  }

  // Tekrarları kaldır ve sırala
  return [...new Set(codes)].sort();
}

/**
 * Tek ölçek spike analizi
 */
export function generateSpikeAnalysis(clinicalScales: Record<string, { tScore: number; rawScore: number }>): string[] {
  const elevatedScales = Object.entries(clinicalScales)
    .filter(([_, scale]) => scale.tScore >= 70);

  if (elevatedScales.length === 1) {
    const scaleCode = SCALE_CODE_MAP[elevatedScales[0][0]];
    return [`${scaleCode} Spike`];
  }

  return [];
}