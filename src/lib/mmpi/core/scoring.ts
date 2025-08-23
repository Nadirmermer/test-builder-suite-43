// MMPI Ana Puanlama Motoru - Sadece Puan Hesaplama
// Ham puan ve T-skor hesaplama işlemlerini koordine eder

import { calculateAllRawScores } from './rawScoring';
import { convertRawScoresToTScores } from './turkishScoring';
import { normalizeGender } from '../utils/gender';

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