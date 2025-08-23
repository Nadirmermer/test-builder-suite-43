// MMPI Ana Puanlama Motoru - Türk Normları
// Tüm hesaplama adımlarını koordine eder

import { calculateAllRawScores } from './rawScoring';
import { convertRawScoresToTScores, createScaleResult, determineProfileValidity } from './turkishScoring';
import { generateProfileCode, assessRisk, identifyValidityConfiguration, ValidityAssessment } from './validity';
import { normalizeGender } from '../utils/gender';
import { validateMMPIParameters, getUnansweredQuestions } from '../utils/validation';

export interface MMPIScaleResult {
  rawScore: number;
  tScore: number;
  level: 'normal' | 'elevated' | 'clinical';
  validity: 'valid' | 'borderline' | 'invalid';
}

export interface MMPIResults {
  validityScales: Record<string, MMPIScaleResult>;
  clinicalScales: Record<string, MMPIScaleResult>;
  profileCode: string;
  validityStatus: 'valid' | 'limited' | 'invalid';
  overallValidity: 'valid' | 'limited' | 'invalid';
  validityAssessment: ValidityAssessment;
  riskAssessment: {
    overall: 'low' | 'moderate' | 'high';
    areas: Record<string, string>;
  };
}

/**
 * Ana MMPI puanlama fonksiyonu - Yeniden yapılandırılmış
 */
export function calculateMMPIScores(
  answers: Record<string, number>,
  unansweredQuestions: Set<string>,
  gender: 'Erkek' | 'Kadin'
): MMPIResults {
  // Parametreleri doğrula
  const validation = validateMMPIParameters(answers, gender);
  if (!validation.isValid) {
    console.error('MMPI parametreleri geçersiz:', validation.errors);
  }
  
  // Cinsiyet normalizasyonu
  const normalizedGender = normalizeGender(gender);
  if (!normalizedGender) {
    throw new Error('Geçerli cinsiyet bilgisi gerekli');
  }
  
  // "?" Testi kontrolü - 30 ve üzeri geçersiz
  if (unansweredQuestions.size >= 30) {
    const invalidValidityAssessment: ValidityAssessment = {
      configuration: null,
      validity: 'invalid',
      interpretation: `Test geçersiz: ${unansweredQuestions.size} soru boş (≥30)`,
      recommendations: ['Test tekrar verilmeli', 'Hasta durumu değerlendirildikten sonra yeniden test'],
      fkIndex: { value: 0, interpretation: 'Geçersiz profil' }
    };
    
    return {
      validityScales: {},
      clinicalScales: {},
      profileCode: 'INVALID',
      validityStatus: 'invalid',
      overallValidity: 'invalid',
      validityAssessment: invalidValidityAssessment,
      riskAssessment: {
        overall: 'high',
        areas: { 
          validity: `Test geçersiz: ${unansweredQuestions.size} soru boş (≥30)`,
          unanswered: `Profil geçersiz - çok fazla soru cevaplanmadı`
        }
      }
    };
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
  
  // 5. Profil kodu oluştur
  const profileCode = generateProfileCode(clinicalScales);
  
  // 6. Resmi geçerlik konfigürasyonu belirleme
  const LScore = validityScales.L?.tScore || 50;
  const FScore = validityScales.F?.tScore || 50;
  const KScore = validityScales.K?.tScore || 50;
  
  const validityAssessment = identifyValidityConfiguration(
    LScore, 
    FScore, 
    KScore, 
    unansweredQuestions.size, 
    clinicalScales
  );
  
  const overallValidity = validityAssessment.validity;

  // 7. Risk değerlendirmesi
  const riskAssessment = assessRisk(clinicalScales, unansweredQuestions.size);

  return {
    validityScales,
    clinicalScales,
    profileCode,
    validityStatus: overallValidity,
    overallValidity,
    validityAssessment,
    riskAssessment
  };
}

/**
 * MMPI sonuçları için özet oluşturma (Türk normları + Resmi konfigürasyonlar)
 */
export function generateMMPISummary(results: MMPIResults): string {
  const { validityAssessment, overallValidity, clinicalScales, validityScales } = results;
  
  let summary = `MMPI Profil Kodu: ${results.profileCode}\n\n`;
  
  // Geçerlik konfigürasyonu değerlendirmesi
  if (validityAssessment.configuration) {
    summary += `Geçerlik Konfigürasyonu: ${validityAssessment.configuration.name}\n`;
    summary += `Yorumlama: ${validityAssessment.interpretation}\n`;
    
    if (validityAssessment.configuration.clinicalImplications) {
      summary += `Klinik Anlam: ${validityAssessment.configuration.clinicalImplications}\n`;
    }
    
    summary += '\n';
  }
  
  // F-K İndeksi değerlendirmesi
  if (validityAssessment.fkIndex) {
    summary += `F-K İndeksi: ${validityAssessment.fkIndex.value} (${validityAssessment.fkIndex.interpretation})\n`;
  }
  
  // K+ Profili kontrolü
  if (validityAssessment.isKPlus) {
    summary += `K+ Profili tespit edildi: Utangaç, kaygılı ve ketlenmiş kişilik özellikleri\n`;
  }
  
  summary += '\n';
  
  // Genel geçerlik durumu
  if (overallValidity === 'invalid') {
    summary += 'MMPI profili geçersiz kabul edilmiştir. Test sonuçları güvenilir değildir. Klinik yorumlama yapılamaz.\n\n';
    
    // Öneriler
    if (validityAssessment.recommendations.length > 0) {
      summary += 'Öneriler:\n';
      validityAssessment.recommendations.forEach(rec => {
        summary += `• ${rec}\n`;
      });
    }
    
    return summary;
  }
  
  // Geçerlik ölçekleri analizi
  const validityIssues = [];
  if (validityScales.L?.tScore >= 70) {
    validityIssues.push(`Yüksek L puanı (T=${validityScales.L.tScore}, sahte iyi görünme)`);
  }
  if (validityScales.F?.tScore >= 80) {
    validityIssues.push(`Yüksek F puanı (T=${validityScales.F.tScore}, aşırı şikayetçi tutum)`);
  }
  if (validityScales.K?.tScore >= 75) {
    validityIssues.push(`Yüksek K puanı (T=${validityScales.K.tScore}, kendini koruyucu tutum)`);
  }
  
  // Geçerlik durumu raporu
  if (overallValidity === 'limited') {
    summary += 'Profil geçerliliği sınırlıdır - dikkatli yorumlama gerekir.\n';
    if (validityIssues.length > 0) {
      summary += `Geçerlik sorunları: ${validityIssues.join(', ')}\n`;
    }
  } else {
    summary += 'Profil geçerli ve yorumlanabilir.\n';
  }
  
  // Klinik anlamlı yükselmeleri tespit et
  const elevatedScales = Object.entries(clinicalScales)
    .filter(([_, result]) => result.tScore >= 65)
    .sort(([, a], [, b]) => b.tScore - a.tScore)
    .map(([scaleId, result]) => {
      const level = result.tScore >= 70 ? 'klinik' : 'yükseltilmiş';
      return `${scaleId} (T=${result.tScore}, ${level})`;
    });
  
  // Klinik bulgular
  if (elevatedScales.length === 0) {
    summary += '\nKlinik ölçeklerde anlamlı yükselme saptanmamıştır. Profil normal sınırlar içindedir.\n';
  } else {
    summary += `\nYükseltilmiş ölçekler: ${elevatedScales.join(', ')}.\n`;
    
    // Risk değerlendirmesi
    const riskLevel = results.riskAssessment.overall;
    if (riskLevel === 'high') {
      summary += 'Yüksek risk profili - detaylı klinik değerlendirme önerilir.\n';
    } else if (riskLevel === 'moderate') {
      summary += 'Orta düzey risk - takip önerilir.\n';
    }
  }
  
  // Konfigürasyon önerileri
  if (validityAssessment.recommendations.length > 0) {
    summary += '\nÖneriler:\n';
    validityAssessment.recommendations.forEach(rec => {
      summary += `• ${rec}\n`;
    });
  }
  
  return summary;
}