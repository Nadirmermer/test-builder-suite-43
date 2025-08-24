// MMPI Ana Puanlama Motoru - Sadece Puan Hesaplama
// Ham puan ve T-skor hesaplama işlemlerini koordine eder

import { calculateAllRawScores } from './rawScoring';
import { calculateTScore, applyKCorrection } from '../data/turkishNorms';
import { normalizeGender } from './gender-utils';

export interface MMPIScaleResult {
  rawScore: number;
  tScore: number;
  scaleId: string;
  type: 'validity' | 'clinical';
}

export interface MMPIResults {
  validityScales: Record<string, MMPIScaleResult>;
  clinicalScales: Record<string, MMPIScaleResult>;
}

/**
 * Ana MMPI puanlama fonksiyonu - Sadece puan hesaplama
 */
export function calculateMMPIScores(
  answers: Record<string, number>,
  unansweredQuestions: Set<string>,
  gender: 'Erkek' | 'Kadin'
): MMPIResults {
  // Cinsiyet normalizasyonu
  const normalizedGender = normalizeGender(gender);
  if (!normalizedGender) {
    throw new Error('Geçerli cinsiyet bilgisi gerekli');
  }
  
  // 1. Ham puanları hesapla
  const rawScores = calculateAllRawScores(answers, normalizedGender);
  
  // 2. T-skorlarını hesapla (Türk normlarına göre)
  const tScores = convertRawScoresToTScores(rawScores, normalizedGender);
  
  // 3. Geçerlik ölçekleri oluştur
  const validityScales: Record<string, MMPIScaleResult> = {};
  const validityScaleIds = ['L', 'F', 'K'];
  
  for (const scaleId of validityScaleIds) {
    const rawScore = rawScores[scaleId] || 0;
    const tScore = tScores[scaleId] || 50;
    
    validityScales[scaleId] = createScaleResult(rawScore, tScore, scaleId, 'validity');
  }
  
  // 4. Klinik ölçekleri oluştur
  const clinicalScales: Record<string, MMPIScaleResult> = {};
  const clinicalScaleIds = ['Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];
  
  for (const scaleId of clinicalScaleIds) {
    const rawScore = rawScores[scaleId] || 0;
    const tScore = tScores[scaleId] || 50;
    
    clinicalScales[scaleId] = createScaleResult(rawScore, tScore, scaleId, 'clinical');
  }

  return {
    validityScales,
    clinicalScales
  };
}

/**
 * MMPI ölçek sonucu oluştur
 */
function createScaleResult(
  rawScore: number,
  tScore: number,
  scaleId: string,
  type: 'validity' | 'clinical'
): MMPIScaleResult {
  return {
    rawScore,
    tScore,
    scaleId,
    type
  };
}

/**
 * Ham puanları T-skorlarına dönüştür (Türk normlarına göre)
 */
function convertRawScoresToTScores(
  rawScores: Record<string, number>,
  gender: 'Erkek' | 'Kadin'
): Record<string, number> {
  const tScores: Record<string, number> = {};
  const kRawScore = rawScores.K || 0;
  
  // Geçerlik ölçekleri (K-düzeltmesi yok)
  const validityScales = ['L', 'F', 'K'];
  for (const scaleId of validityScales) {
    const rawScore = rawScores[scaleId] || 0;
    tScores[scaleId] = calculateTScore(rawScore, gender, scaleId);
  }
  
  // Klinik ölçekler - doğru normKey kullanımı
  const clinicalScales = [
    { id: 'Hs', normKey: 'Hs+5K', hasKCorrection: true },
    { id: 'D', normKey: 'D', hasKCorrection: false },
    { id: 'Hy', normKey: 'Hy', hasKCorrection: false },
    { id: 'Pd', normKey: 'Pd+4K', hasKCorrection: true },
    { id: 'Mf', normKey: 'Mf', hasKCorrection: false },
    { id: 'Pa', normKey: 'Pa', hasKCorrection: false },
    { id: 'Pt', normKey: 'Pt+1K', hasKCorrection: true },
    { id: 'Sc', normKey: 'Sc+1K', hasKCorrection: true },
    { id: 'Ma', normKey: 'Ma+2K', hasKCorrection: true },
    { id: 'Si', normKey: 'Si', hasKCorrection: false }
  ];
  
  for (const scale of clinicalScales) {
    const rawScore = rawScores[scale.id] || 0;
    let adjustedScore = rawScore;
    
    // K-düzeltmesi uygula
    if (scale.hasKCorrection) {
      adjustedScore = applyKCorrection(rawScore, kRawScore, scale.id);
    }
    
    tScores[scale.id] = calculateTScore(adjustedScore, gender, scale.normKey);
  }
  
  return tScores;
}