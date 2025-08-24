// MMPI Kütüphanesi - Sadece Puan Hesaplama ve Grafik
// Bu dosya, MMPI kütüphanesinin puan hesaplama fonksiyonlarını dışa aktarır

// Ana hesaplama motoru
export { calculateMMPIScores } from './core/scoring';
export type { MMPIResults, MMPIScaleResult } from './core/scoring';

// Format adaptörü - UI ile uyumluluk için
export { toPublicResults, fromPublicResults } from './core/adapter';
export type { MMPIOlcekSonucuTR, MMPISonuclariTR } from './core/adapter';

// Türk normları (grafik için gerekli)
export { turkishNorms, calculateTScore, applyKCorrection } from './data/turkishNorms';

// Temel veriler
export { mmpiQuestions } from './data/questions';
export { scoringKeys } from './data/scoringKeys';