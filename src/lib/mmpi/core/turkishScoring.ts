// MMPI Türk Normları Puanlama Motoru
// Sadece T-skorlarını dönüştürür, hesaplama turkishNorms.ts'de

import { calculateTScore, applyKCorrection } from '../data/turkishNorms';
import { MMPIScaleResult } from './scoring';
import { determineLevel } from './validity';

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

/**
 * Geçerlik durumunu belirle (ölçek bazında) - L, F, K için farklı kurallar
 * @param tScore - T-skoru
 * @param scaleId - Ölçek kimliği
 * @returns Geçerlik durumu
 */
export function determineScaleValidity(tScore: number, scaleId: string): 'valid' | 'borderline' | 'invalid' {
  switch (scaleId) {
    case 'L':
      if (tScore >= 80) return 'invalid';
      if (tScore >= 70) return 'borderline';
      return 'valid';
      
    case 'F':
      if (tScore >= 100) return 'invalid';
      if (tScore >= 80) return 'borderline';
      return 'valid';
      
    case 'K':
      if (tScore >= 75 || tScore <= 35) return 'borderline';
      return 'valid';
      
    default:
      return 'valid';
  }
}

/**
 * Genel profil geçerliliğini belirle - Türk norm kriterlerine göre
 * @param LScore - L T-skoru
 * @param FScore - F T-skoru
 * @param KScore - K T-skoru
 * @param unansweredCount - Cevaplanmayan soru sayısı
 * @returns Profil geçerlik durumu
 */
export function determineProfileValidity(
  LScore: number,
  FScore: number,
  KScore: number,
  unansweredCount: number
): 'valid' | 'limited' | 'invalid' {
  // Cevaplanmayan soru kontrolü
  if (unansweredCount >= 30) return 'invalid';
  
  // Kritik geçerlik ölçeği kontrolü
  if (LScore >= 80 || FScore >= 100) return 'invalid';
  
  // Sınırlı geçerlik durumları
  if (unansweredCount >= 10 || 
      LScore >= 70 || 
      FScore >= 80 || 
      KScore >= 75 || 
      KScore <= 35) {
    return 'limited';
  }
  
  return 'valid';
}

/**
 * MMPI ölçek sonucu oluştur - Ham puan, T-skoru, seviye ve geçerlik bilgisiyle
 * @param rawScore - Ham puan
 * @param tScore - T-skoru
 * @param scaleId - Ölçek kimliği
 * @param scaleType - Ölçek tipi
 * @returns MMPI ölçek sonucu
 */
export function createScaleResult(
  rawScore: number,
  tScore: number,
  scaleId: string,
  scaleType: 'validity' | 'clinical'
): MMPIScaleResult {
  return {
    rawScore,
    tScore,
    level: determineLevel(tScore, scaleType),
    validity: scaleType === 'validity' ? 
      determineScaleValidity(tScore, scaleId) : 'valid'
  };
}