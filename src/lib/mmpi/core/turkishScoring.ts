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
    { id: 'Hs', normKey: 'Hs+5K (1)', hasKCorrection: true },
    { id: 'D', normKey: 'D (2)', hasKCorrection: false },
    { id: 'Hy', normKey: 'Hy (3)', hasKCorrection: false },
    { id: 'Pd', normKey: 'Pd+4K (4)', hasKCorrection: true },
    { id: 'Mf', normKey: 'Mf (5)', hasKCorrection: false },
    { id: 'Pa', normKey: 'Pa (6)', hasKCorrection: false },
    { id: 'Pt', normKey: 'Pt+1K (7)', hasKCorrection: true },
    { id: 'Sc', normKey: 'Sc+1K (8)', hasKCorrection: true },
    { id: 'Ma', normKey: 'Ma+2K (9)', hasKCorrection: true },
    { id: 'Si', normKey: 'Si (10)', hasKCorrection: false }
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

// Geçerlik değerlendirme fonksiyonları kaldırıldı - Sadece puan hesaplaması