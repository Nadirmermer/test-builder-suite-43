// MMPI Türk Normları Puanlama Motoru
// Sadece T-skorlarını dönüştürür, hesaplama turkishNorms.ts'de

import { calculateTScore, applyKCorrection } from '../data/turkishNorms';
import { MMPIScaleResult } from './scoring';

/**
 * Ham puanları T-skorlarına dönüştür (Türk normlarına göre)
 * @param rawScores - Ham puanlar
 * @param gender - Cinsiyet
 * @returns T-skorları
 */
export function convertRawScoresToTScores(
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
  
  // Klinik ölçekler
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
