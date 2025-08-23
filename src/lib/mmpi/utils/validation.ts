// MMPI Veri Doğrulama Yardımcıları
// MMPI hesaplamaları için veri doğrulama fonksiyonları

import { validateGender } from './gender';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * MMPI cevaplarını doğrula
 */
export function validateAnswers(answers: Record<string, number>): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };
  
  // Minimum soru sayısı kontrolü
  const answeredCount = Object.keys(answers).length;
  if (answeredCount < 566) {
    result.warnings.push(`Sadece ${answeredCount}/566 soru cevaplanmış`);
  }
  
  // Cevap değerlerini kontrol et
  for (const [questionId, answer] of Object.entries(answers)) {
    if (![0, 1].includes(answer)) {
      result.errors.push(`Soru ${questionId}: Geçersiz cevap değeri (${answer})`);
      result.isValid = false;
    }
  }
  
  return result;
}

/**
 * Cevaplanmayan soruları tespit et
 */
export function getUnansweredQuestions(
  answers: Record<string, number>,
  totalQuestions: number = 566
): Set<string> {
  const unansweredSet = new Set<string>();
  
  for (let i = 1; i <= totalQuestions; i++) {
    const questionId = i.toString();
    if (!(questionId in answers)) {
      unansweredSet.add(questionId);
    }
  }
  
  return unansweredSet;
}

/**
 * MMPI parametrelerini doğrula
 */
export function validateMMPIParameters(
  answers: Record<string, number>,
  gender?: string
): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };
  
  // Cevapları doğrula
  const answerValidation = validateAnswers(answers);
  result.errors.push(...answerValidation.errors);
  result.warnings.push(...answerValidation.warnings);
  
  if (!answerValidation.isValid) {
    result.isValid = false;
  }
  
  // Cinsiyet doğrulama
  if (!validateGender(gender)) {
    result.errors.push('Geçerli cinsiyet bilgisi gerekli (Erkek/Kadin)');
    result.isValid = false;
  }
  
  // Cevaplanmayan sorular kontrolü
  const unansweredQuestions = getUnansweredQuestions(answers);
  
  if (unansweredQuestions.size >= 30) {
    result.errors.push(`Çok fazla soru cevaplanmamış (${unansweredQuestions.size}). Test geçersiz.`);
    result.isValid = false;
  } else if (unansweredQuestions.size >= 10) {
    result.warnings.push(`${unansweredQuestions.size} soru cevaplanmamış. Profil tartışmalı.`);
  }
  
  return result;
}

/**
 * T-skor aralığını doğrula
 */
export function validateTScore(tScore: number): boolean {
  return tScore >= 30 && tScore <= 120;
}

/**
 * Ham puan aralığını doğrula
 */
export function validateRawScore(rawScore: number, scaleId: string): boolean {
  // Genel aralık kontrolü
  if (rawScore < 0) return false;
  
  // Ölçek-özel maksimum değerler (tahmini)
  const maxValues: Record<string, number> = {
    L: 15, F: 64, K: 30,
    Hs: 33, D: 57, Hy: 60, Pd: 50, Mf: 60, Pa: 40, Pt: 48, Sc: 78, Ma: 46, Si: 69
  };
  
  const maxValue = maxValues[scaleId];
  if (maxValue && rawScore > maxValue) {
    return false;
  }
  
  return true;
}