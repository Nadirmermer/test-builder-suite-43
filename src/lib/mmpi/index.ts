// MMPI Kütüphanesi - Türk Normları Entegrasyonu
// Bu dosya, Türk normlarına göre yapılandırılmış MMPI kütüphanesinin tüm fonksiyonlarını dışa aktarır

// Ana hesaplama motoru - Türk normları ile
export { calculateMMPIScores, generateMMPISummary } from './core/scoring';
export type { MMPIResults, MMPIScaleResult } from './core/scoring';

// Geçerlik değerlendirme sistemi - Resmi konfigürasyonlar
export { identifyValidityConfiguration, determineLevel } from './core/validity';
export type { ValidityAssessment } from './core/validity';
export { validityConfigurations, kPlusProfile, fkIndexInterpretation } from './data/validityConfigurations';
export type { ValidityConfiguration } from './data/validityConfigurations';

// Klinik yorumlama motoru - Resmi Türk Kitabı
export { generateComprehensiveClinicalInterpretation, interpretClinicalScale } from './interpretations/clinicalInterpretation';
export type { ComprehensiveClinicalInterpretation, ClinicalScaleInterpretation } from './interpretations/clinicalInterpretation';
export { getHipokondriazisInterpretation } from './interpretations/hipokondriazis';
export { getDepresyonInterpretation } from './interpretations/depresyon';
export { getParanoyaInterpretation } from './interpretations/paranoya';
export { getPsikasteniInterpretation } from './interpretations/psikasteni';
export { getSizofreniInterpretation } from './interpretations/sizofreni';
export { getHipomaniInterpretation } from './interpretations/hipomani';
export { getSosyalIcedönüklükInterpretation } from './interpretations/sosyalIcedönüklük';

// Eski sistem uyumluluğu için (mevcut kullanımları bozmamak için)  
export { generateMMPIInterpretation } from './mmpiInterpretation';
export type { MMPIInterpretation } from './mmpiInterpretation';

// Format adaptörü - UI ile uyumluluk için
export { toPublicResults, fromPublicResults } from './adapter';
export type { MMPIOlcekSonucuTR, MMPISonuclariTR } from './adapter';


// Ham veri (gerekirse doğrudan erişim için)
export { mmpiQuestions } from './mmpiData';
export { scoringKeys, kCorrectionFactors } from './data/scoringKeys';
export { turkishNorms, kCorrectionRatios } from './data/turkishNorms';

// Yardımcı fonksiyonlar
export { normalizeGender, validateGender } from './utils/gender';
export { validateMMPIParameters, getUnansweredQuestions } from './utils/validation';