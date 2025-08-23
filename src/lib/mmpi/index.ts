// MMPI Kütüphanesi - Sadece Puan Hesaplama ve Grafik
// Bu dosya, MMPI kütüphanesinin puan hesaplama fonksiyonlarını dışa aktarır

// Ana hesaplama motoru
export { calculateMMPIScores } from './core/scoring';
export type { MMPIResults, MMPIScaleResult } from './core/scoring';

// Format adaptörü - UI ile uyumluluk için
export { toPublicResults, fromPublicResults } from './adapter';
export type { MMPIOlcekSonucuTR, MMPISonuclariTR } from './adapter';

// Türk normları (grafik için gerekli)
export { turkishNorms, calculateTScore, applyKCorrection } from './data/turkishNorms';

// Temel veriler
export { mmpiQuestions } from './mmpiData';
export { scoringKeys } from './data/scoringKeys';