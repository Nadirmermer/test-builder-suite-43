// MMPI Ham Puan Hesaplama Motoru
// Bu dosya, cevaplardan ham puanları hesaplar (cinsiyet-duyarlı)

import { scoringKeys } from '../data/scoringKeys';

/**
 * Belirli bir ölçek için ham puan hesapla
 */
export function calculateRawScore(
  scaleId: string,
  answers: Record<string, number>,
  gender?: 'Erkek' | 'Kadin'
): number {
  const scale = scoringKeys[scaleId as keyof typeof scoringKeys];
  if (!scale) return 0;
  
  // Mf ölçeği için cinsiyet zorunlu
  if (scaleId === 'Mf' && !gender) {
    console.warn('Mf ölçeği için cinsiyet bilgisi gerekli');
    return 0;
  }
  
  let score = 0;
  
  // Doğru puanlanan sorular
  if ('dogru' in scale) {
    let trueQuestions;
    
    if (typeof scale.dogru === 'object' && !Array.isArray(scale.dogru) && gender) {
      // Cinsiyet-özel (Mf için)
      trueQuestions = scale.dogru[gender] || [];
    } else if (Array.isArray(scale.dogru)) {
      trueQuestions = scale.dogru;
    } else {
      trueQuestions = [];
    }
    
    for (const questionId of trueQuestions) {
      if (answers[questionId.toString()] === 1) {
        score++;
      }
    }
  }
  
  // Yanlış puanlanan sorular
  if ('yanlis' in scale) {
    let falseQuestions;
    
    if (typeof scale.yanlis === 'object' && !Array.isArray(scale.yanlis) && gender) {
      // Cinsiyet-özel (Mf için)
      falseQuestions = scale.yanlis[gender] || [];
    } else if (Array.isArray(scale.yanlis)) {
      falseQuestions = scale.yanlis;
    } else {
      falseQuestions = [];
    }
    
    for (const questionId of falseQuestions) {
      if (answers[questionId.toString()] === 0) {
        score++;
      }
    }
  }
  
  return score;
}

/**
 * Tüm ölçekler için ham puanları hesapla
 */
export function calculateAllRawScores(
  answers: Record<string, number>,
  gender: 'Erkek' | 'Kadin'
): Record<string, number> {
  const scales = ['L', 'F', 'K', 'Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];
  const rawScores: Record<string, number> = {};
  
  for (const scaleId of scales) {
    rawScores[scaleId] = calculateRawScore(scaleId, answers, gender);
  }
  
  return rawScores;
}