// MMPI-1 Koşullu Kod Yorumlayıcısı
// T-score, yaş, cinsiyet, eğitim durumu koşullarını değerlendirir

import { MMPICodeResult, MMPICodeConditions, TScoreCondition } from './types';
import { hesaplaYas } from '@/types';

export interface PersonalInfo {
  dogumTarihi?: string;
  medeniDurum?: string;
  egitimDurumu?: string;
  cinsiyet?: 'Erkek' | 'Kadın';
}

export interface TScores {
  [scale: string]: number; // "1": 75, "2": 68, "K": 45, vb.
}

/**
 * Koşullu kod yorumlarını uygular
 */
export function applyConditionalInterpretation(
  baseCode: MMPICodeResult,
  personalInfo?: PersonalInfo,
  tScores?: TScores
): MMPICodeResult {
  if (!baseCode.conditions && !baseCode.conditionalCharacteristics) {
    return baseCode;
  }

  const result: MMPICodeResult = { ...baseCode };
  const additionalCharacteristics: string[] = [];
  const additionalNotes: string[] = [];

  // T-Score koşullarını değerlendir
  if (baseCode.conditions?.tScoreConditions && tScores) {
    for (const condition of baseCode.conditions.tScoreConditions) {
      if (evaluateTScoreCondition(condition, tScores)) {
        additionalCharacteristics.push(condition.result);
      }
    }
  }

  // Yaş koşullarını değerlendir
  if (baseCode.conditions?.ageConditions && personalInfo?.dogumTarihi) {
    const yas = hesaplaYas(personalInfo.dogumTarihi);
    if (yas !== null) {
      for (const condition of baseCode.conditions.ageConditions) {
        if (evaluateAgeCondition(condition, yas)) {
          additionalNotes.push(condition.effect);
          if (condition.characteristics) {
            additionalCharacteristics.push(...condition.characteristics);
          }
        }
      }
    }
  }

  // Cinsiyet koşullarını değerlendir
  if (baseCode.conditions?.genderConditions && personalInfo?.cinsiyet) {
    for (const condition of baseCode.conditions.genderConditions) {
      if (condition.gender === personalInfo.cinsiyet) {
        additionalNotes.push(condition.effect);
        if (condition.characteristics) {
          additionalCharacteristics.push(...condition.characteristics);
        }
      }
    }
  }

  // Diğer alt test koşullarını değerlendir
  if (baseCode.conditions?.otherScaleConditions && tScores) {
    for (const condition of baseCode.conditions.otherScaleConditions) {
      if (evaluateOtherScaleCondition(condition, tScores)) {
        additionalNotes.push(condition.effect);
        if (condition.characteristics) {
          additionalCharacteristics.push(...condition.characteristics);
        }
      }
    }
  }

  // Sonuçları birleştir
  if (additionalCharacteristics.length > 0) {
    result.characteristics = [...result.characteristics, ...additionalCharacteristics];
  }

  if (additionalNotes.length > 0) {
    result.additionalNotes = [...(result.additionalNotes || []), ...additionalNotes];
  }

  return result;
}

/**
 * T-Score koşulunu değerlendirir
 */
function evaluateTScoreCondition(condition: TScoreCondition, tScores: TScores): boolean {
  if (!condition.scaleComparison) return false;

  const { scale1, scale2, operator, threshold = 0 } = condition.scaleComparison;
  const score1 = tScores[scale1];
  const score2 = tScores[scale2];

  if (score1 === undefined || score2 === undefined) return false;

  switch (operator) {
    case 'higher':
      return score1 > score2 + threshold;
    case 'lower':
      return score1 < score2 - threshold;
    case 'equal':
      return Math.abs(score1 - score2) <= threshold;
    case 'within_range':
      return Math.abs(score1 - score2) <= threshold;
    default:
      return false;
  }
}

/**
 * Yaş koşulunu değerlendirir
 */
function evaluateAgeCondition(condition: any, yas: number): boolean {
  const ageRange = condition.ageRange.toLowerCase();
  
  if (ageRange.includes('üzerinde') || ageRange.includes('üstü')) {
    const threshold = extractAgeFromRange(ageRange);
    return threshold ? yas > threshold : false;
  }
  
  if (ageRange.includes('altında') || ageRange.includes('aşağıda')) {
    const threshold = extractAgeFromRange(ageRange);
    return threshold ? yas < threshold : false;
  }
  
  if (ageRange.includes('arası')) {
    // "25-40 yaş arası" gibi durumlar için
    const matches = ageRange.match(/(\d+)-(\d+)/);
    if (matches) {
      const min = parseInt(matches[1]);
      const max = parseInt(matches[2]);
      return yas >= min && yas <= max;
    }
  }
  
  return false;
}

/**
 * Diğer alt test koşulunu değerlendirir
 */
function evaluateOtherScaleCondition(condition: any, tScores: TScores): boolean {
  const score = tScores[condition.scale];
  if (score === undefined) return false;

  switch (condition.operator) {
    case 'higher':
      return score > condition.threshold;
    case 'lower':
      return score < condition.threshold;
    case 'equal':
      return score === condition.threshold;
    default:
      return false;
  }
}

/**
 * Yaş aralığından sayıyı çıkarır
 */
function extractAgeFromRange(ageRange: string): number | null {
  const match = ageRange.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}
