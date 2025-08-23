// MMPI Geçerlik Değerlendirme Motoru - Resmi Türk Konfigürasyonları
// 15 ana konfigürasyon + özel durumlarla geçerlik belirler

import { validityConfigurations, kPlusProfile, fkIndexInterpretation, ValidityConfiguration } from '../data/validityConfigurations';

export interface ValidityAssessment {
  configuration: ValidityConfiguration | null;
  validity: 'valid' | 'limited' | 'invalid';
  interpretation: string;
  recommendations: string[];
  fkIndex?: {
    value: number;
    interpretation: string;
  };
  isKPlus?: boolean;
}

/**
 * T-skoru seviye belirleme - Geçerlik ve klinik ölçekler için
 */
export function determineLevel(tScore: number, scaleType: 'validity' | 'clinical'): 'normal' | 'elevated' | 'clinical' {
  if (scaleType === 'validity') {
    if (tScore >= 75) return 'clinical';
    if (tScore >= 65) return 'elevated';
    return 'normal';
  } else {
    if (tScore >= 75) return 'clinical';
    if (tScore >= 65) return 'elevated';
    return 'normal';
  }
}

/**
 * Geçerlik konfigürasyonu belirleme (Resmi 15 konfigürasyon)
 */
export function identifyValidityConfiguration(
  LScore: number,
  FScore: number,
  KScore: number,
  unansweredCount: number,
  clinicalScales: Record<string, { tScore: number }>
): ValidityAssessment {
  // F-K İndeksi hesapla
  const fkIndex = FScore - KScore;
  const fkInterpretation = getFKIndexInterpretation(fkIndex);
  
  // K+ Profili kontrolü
  const isKPlus = checkKPlusProfile(LScore, FScore, KScore, clinicalScales);
  
  // Konfigürasyon eşleştirme
  for (const config of validityConfigurations) {
    if (matchesConfiguration(LScore, FScore, KScore, unansweredCount, config)) {
      return {
        configuration: config,
        validity: config.validity,
        interpretation: config.interpretation,
        recommendations: config.recommendations,
        fkIndex: {
          value: fkIndex,
          interpretation: fkInterpretation
        },
        isKPlus
      };
    }
  }
  
  // Varsayılan değerlendirme (hiçbir konfigürasyona uymuyorsa)
  return {
    configuration: null,
    validity: determineBasicValidity(LScore, FScore, KScore, unansweredCount),
    interpretation: 'Standart geçerlik değerlendirmesi uygulandı.',
    recommendations: ['Detaylı klinik değerlendirme önerilir'],
    fkIndex: {
      value: fkIndex,
      interpretation: fkInterpretation
    },
    isKPlus
  };
}

/**
 * Konfigürasyon eşleştirme kontrolü
 */
function matchesConfiguration(
  LScore: number,
  FScore: number,
  KScore: number,
  unansweredCount: number,
  config: ValidityConfiguration
): boolean {
  const { criteria } = config;
  
  // L skoru kontrolü
  if (criteria.L) {
    if (criteria.L.min !== undefined && LScore < criteria.L.min) return false;
    if (criteria.L.max !== undefined && LScore > criteria.L.max) return false;
  }
  
  // F skoru kontrolü
  if (criteria.F) {
    if (criteria.F.min !== undefined && FScore < criteria.F.min) return false;
    if (criteria.F.max !== undefined && FScore > criteria.F.max) return false;
  }
  
  // K skoru kontrolü
  if (criteria.K) {
    if (criteria.K.min !== undefined && KScore < criteria.K.min) return false;
    if (criteria.K.max !== undefined && KScore > criteria.K.max) return false;
  }
  
  // Cevaplanmayan soru kontrolü
  if (criteria.unanswered) {
    if (criteria.unanswered.min !== undefined && unansweredCount < criteria.unanswered.min) return false;
    if (criteria.unanswered.max !== undefined && unansweredCount > criteria.unanswered.max) return false;
  }
  
  return true;
}

/**
 * K+ Profili kontrolü
 */
function checkKPlusProfile(
  LScore: number,
  FScore: number,
  KScore: number,
  clinicalScales: Record<string, { tScore: number }>
): boolean {
  // Hiçbir klinik test 70T üstünde olmamalı
  const clinicalAbove70 = Object.values(clinicalScales).filter(scale => scale.tScore >= 70);
  if (clinicalAbove70.length > 0) return false;
  
  // 6 ya da daha çok klinik test 60T altında olmalı
  const clinicalBelow60 = Object.values(clinicalScales).filter(scale => scale.tScore <= 60);
  if (clinicalBelow60.length < 6) return false;
  
  // K, F'den en az 5T puan yüksek olmalı
  if ((KScore - FScore) < 5) return false;
  
  // L ve K, F'den yüksek olmalı
  if (LScore <= FScore || KScore <= FScore) return false;
  
  return true;
}

/**
 * F-K İndeksi yorumlama
 */
function getFKIndexInterpretation(fkIndex: number): string {
  if (fkIndex === 0) return fkIndexInterpretation.fakeGood.interpretation;
  if (fkIndex >= 16) return fkIndexInterpretation.extreme.interpretation;
  if (fkIndex >= 9) return fkIndexInterpretation.fakeBad.interpretation;
  if (fkIndex >= 8) return fkIndexInterpretation.moderate.interpretation;
  return fkIndexInterpretation.valid.interpretation;
}

/**
 * Temel geçerlik durumu belirleme (fallback)
 */
function determineBasicValidity(
  LScore: number,
  FScore: number,
  KScore: number,
  unansweredCount: number
): 'valid' | 'limited' | 'invalid' {
  // "?" Testi kontrolü - 30 ve üzeri geçersiz
  if (unansweredCount >= 30) {
    return 'invalid';
  }
  
  // Geçerlik kuralları
  if (FScore >= 100 || LScore >= 80) {
    return 'invalid';
  } else if (FScore >= 80 || LScore >= 70 || KScore >= 75 || unansweredCount >= 10) {
    return 'limited';
  }
  
  return 'valid';
}

/**
 * Profil kodu oluşturma (Welch kodu)
 */
export function generateProfileCode(clinicalScales: Record<string, { tScore: number }>): string {
  const elevatedScales = Object.entries(clinicalScales)
    .filter(([_, result]) => result.tScore >= 65)
    .sort(([, a], [, b]) => b.tScore - a.tScore)
    .map(([scaleId]) => scaleId);
  
  if (elevatedScales.length === 0) {
    return 'NORMAL';
  }
  
  return elevatedScales.slice(0, 3).join('-');
}

/**
 * Risk değerlendirmesi
 */
export function assessRisk(
  clinicalScales: Record<string, { tScore: number }>,
  unansweredCount: number
): {
  overall: 'low' | 'moderate' | 'high';
  areas: Record<string, string>;
} {
  const elevatedClinicalScales = Object.entries(clinicalScales)
    .filter(([_, result]) => result.tScore >= 75)
    .map(([scaleId]) => scaleId);
  
  const overallRisk = elevatedClinicalScales.length >= 3 ? 'high' :
                     elevatedClinicalScales.length >= 1 ? 'moderate' : 'low';
  
  const riskAreas: Record<string, string> = {};
  
  if (elevatedClinicalScales.length > 0) {
    riskAreas.clinicalElevations = `${elevatedClinicalScales.join(', ')} ölçeklerinde yüksek puanlar`;
  }
  
  // '?' Testi değerlendirmesi
  if (unansweredCount > 30) {
    riskAreas.unanswered = `${unansweredCount} soru cevaplanmadı - Profil geçersiz`;
  } else if (unansweredCount >= 10) {
    riskAreas.unanswered = `${unansweredCount} soru cevaplanmadı - Profil tartışmalı`;
  } else if (unansweredCount >= 5) {
    riskAreas.unanswered = `${unansweredCount} soru cevaplanmadı - Hafif şüphecilik`;
  }
  
  return {
    overall: overallRisk,
    areas: riskAreas
  };
}