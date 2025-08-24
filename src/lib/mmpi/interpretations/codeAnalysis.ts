// MMPI Kod Analizi - Ana Koordinatör Dosyası
// Kod interpretasyonlarını ayrı modüllerden import eder ve koordine eder

import { normalizeGender } from '../utils/gender';
import { CodeTypeInterpretation } from './codes/types';
import { getSingleCodeInterpretation } from './codes/singleCodes';
import { getTwoPointCodeInterpretation } from './codes/twoCodes';
import { getThreePointCodeInterpretation } from './codes/threeCodes';
import { getFourPointCodeInterpretation } from './codes/fourCodes';
import { getFivePointCodeInterpretation } from './codes/fiveCodes';

// Re-export types for external use
export type { CodeTypeInterpretation } from './codes/types';

/**
 * MMPI Kod Tiplerini Analiz Etme
 * @param clinicalScales - Klinik ölçeklerin T-skorları
 * @param gender - Kullanıcının cinsiyeti (bazı kodlar için gerekli)
 * @returns Tespit edilen kod tipleri
 */
export function analyzeCodeTypes(
  clinicalScales: Record<string, { tScore: number; rawScore: number }>, 
  gender?: 'Erkek' | 'Kadin'
): CodeTypeInterpretation[] {
  const codeTypes: CodeTypeInterpretation[] = [];
  
  // T-skorları 70+ olan ölçekleri bul
  const elevatedScales = Object.entries(clinicalScales)
    .filter(([_, scale]) => scale.tScore >= 70)
    .sort((a, b) => b[1].tScore - a[1].tScore) // En yüksekten düşüğe sırala
    .map(([scaleId, _]) => scaleId);

  // Ölçek ID'lerini numaraya çevir
  const scaleToNumber: Record<string, string> = {
    'Hs': '1', 'D': '2', 'Hy': '3', 'Pd': '4', 'Mf': '5',
    'Pa': '6', 'Pt': '7', 'Sc': '8', 'Ma': '9', 'Si': '0'
  };

  const elevatedNumbers = elevatedScales.map(scale => scaleToNumber[scale]).filter(Boolean);

  if (elevatedNumbers.length === 0) return codeTypes;

  // Tekli kodları kontrol et (sadece bir ölçek yüksek)
  if (elevatedNumbers.length === 1) {
    const singleCode = elevatedNumbers[0];
    const interpretation = getSingleCodeInterpretation(singleCode, clinicalScales, gender);
    if (interpretation) {
      codeTypes.push(interpretation);
    }
  }

  // İkili kodları kontrol et
  if (elevatedNumbers.length >= 2) {
    const twoPointCode = elevatedNumbers.slice(0, 2).join('');
    const interpretation = getTwoPointCodeInterpretation(twoPointCode, clinicalScales, gender);
    if (interpretation) {
      if (Array.isArray(interpretation)) {
        codeTypes.push(...interpretation);
      } else {
        codeTypes.push(interpretation);
      }
    }
  }

  // Üçlü kodları kontrol et
  if (elevatedNumbers.length >= 3) {
    const threePointCode = elevatedNumbers.slice(0, 3).join('');
    const interpretation = getThreePointCodeInterpretation(threePointCode, clinicalScales, gender);
    if (interpretation) {
      codeTypes.push(interpretation);
    }
  }

  // Dörtlü kodları kontrol et
  if (elevatedNumbers.length >= 4) {
    const fourPointCode = elevatedNumbers.slice(0, 4).join('');
    const interpretation = getFourPointCodeInterpretation(fourPointCode, clinicalScales, gender);
    if (interpretation) {
      codeTypes.push(interpretation);
    }
  }

  // Beşli kodları kontrol et
  if (elevatedNumbers.length >= 5) {
    const fivePointCode = elevatedNumbers.slice(0, 5).join('');
    const interpretation = getFivePointCodeInterpretation(fivePointCode, clinicalScales, gender);
    if (interpretation) {
      codeTypes.push(interpretation);
    }
  }

  return codeTypes;
}

// Ana export objesi
export const mmpiCodeAnalysis = {
  analyzeCodeTypes,
  name: 'MMPI Kod Analizi',
  description: 'MMPI kod kombinasyonlarının yorumlanması - Modüler yapıda organize edilmiştir'
};