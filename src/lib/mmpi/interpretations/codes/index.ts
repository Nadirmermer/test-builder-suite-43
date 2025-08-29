// MMPI-1 Kod Yorumları - Merkezi İndeks
// Tüm kod yorumlarını toplar ve tek bir arayüz sağlar

import { MMPICodeResult } from './types';
import { hsCodeInterpretations } from './hs-codes';
import { dCodeInterpretations } from './d-codes';
import { hyCodeInterpretations } from './hy-codes';
import { pdCodeInterpretations } from './pd-codes';
import { applyConditionalInterpretation, PersonalInfo, TScores } from './conditional-interpreter';
import { mfCodeInterpretations } from './mf-codes';
import { paCodeInterpretations } from './pa-codes';
import { ptCodeInterpretations } from './pt-codes';
import { scCodeInterpretations } from './sc-codes';
import { maCodeInterpretations } from './ma-codes';
import { siCodeInterpretations } from './si-codes';

export const allMMPICodeInterpretations: Record<string, MMPICodeResult> = {
  ...hsCodeInterpretations,
  ...dCodeInterpretations,
  ...hyCodeInterpretations,
  ...pdCodeInterpretations,
  ...mfCodeInterpretations,
  ...paCodeInterpretations,
  ...ptCodeInterpretations,
  ...scCodeInterpretations,
  ...maCodeInterpretations,
  ...siCodeInterpretations
};

export * from './types';
export * from './hs-codes';
export * from './d-codes';
export * from './hy-codes';
export * from './pd-codes';
export * from './conditional-interpreter';
export * from './mf-codes';
export * from './pa-codes';
export * from './pt-codes';
export * from './sc-codes';
export * from './ma-codes';
export * from './si-codes';
export * from './code-generator';

/**
 * Belirli bir kodu alır
 */
export function getCodeInterpretation(code: string): MMPICodeResult | undefined {
  return allMMPICodeInterpretations[code];
}

/**
 * Alt teste göre kodları filtreler
 */
export function getCodesByScale(scale: string): Record<string, MMPICodeResult> {
  const filteredCodes: Record<string, MMPICodeResult> = {};
  
  Object.entries(allMMPICodeInterpretations).forEach(([key, value]) => {
    if (value.code.includes(scale)) {
      filteredCodes[key] = value;
    }
  });
  
  return filteredCodes;
}

/**
 * Koşullu kod yorumlarını uygular (Gelişmiş Versiyon)
 */
export function getPersonalizedCodeInterpretation(
  code: string,
  personalInfo?: PersonalInfo,
  tScores?: TScores
): MMPICodeResult | undefined {
  const baseInterpretation = getCodeInterpretation(code);
  
  if (!baseInterpretation) {
    return undefined;
  }

  // Koşullu yorumlama uygula
  return applyConditionalInterpretation(baseInterpretation, personalInfo, tScores);
}

/**
 * Verilen T-skorlarına göre uygulanabilir kodları bulur
 */
export function findApplicableCodes(
  tScores: TScores,
  personalInfo?: PersonalInfo
): MMPICodeResult[] {
  const applicableCodes: MMPICodeResult[] = [];
  
  // 65 T puanı ve üstündeki alt testleri bul
  const elevatedScales = Object.entries(tScores)
    .filter(([scale, score]) => score >= 65)
    .sort(([, a], [, b]) => b - a); // En yüksekten en düşüğe sıralanmış

  if (elevatedScales.length === 0) {
    return applicableCodes;
  }

  // 2-li, 3-lü, 4-lü kod kombinasyonlarını oluştur
  for (let i = 0; i < elevatedScales.length; i++) {
    for (let j = i + 1; j < elevatedScales.length; j++) {
      const scale1 = elevatedScales[i][0];
      const scale2 = elevatedScales[j][0];
      const score1 = elevatedScales[i][1];
      const score2 = elevatedScales[j][1];

      // 10 puan kuralı: Skorlar arası fark 10 puanı geçmemeli
      if (Math.abs(score1 - score2) <= 10) {
        // 2-li kod kontrol et
        const code2 = `${scale1}${scale2}`;
        const interpretation2 = getPersonalizedCodeInterpretation(code2, personalInfo, tScores);
        if (interpretation2) {
          applicableCodes.push(interpretation2);
        }

        // Ters sıra da kontrol et
        const codeReverse = `${scale2}${scale1}`;
        const interpretationReverse = getPersonalizedCodeInterpretation(codeReverse, personalInfo, tScores);
        if (interpretationReverse) {
          applicableCodes.push(interpretationReverse);
        }

        // 3-lü kodları kontrol et
        for (let k = j + 1; k < elevatedScales.length; k++) {
          const scale3 = elevatedScales[k][0];
          const score3 = elevatedScales[k][1];

          if (Math.abs(score1 - score3) <= 10) {
            const code3 = `${scale1}${scale2}${scale3}`;
            const interpretation3 = getPersonalizedCodeInterpretation(code3, personalInfo, tScores);
            if (interpretation3) {
              applicableCodes.push(interpretation3);
            }
          }
        }
      }
    }
  }

  return applicableCodes;
}