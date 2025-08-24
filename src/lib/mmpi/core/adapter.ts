// MMPI Sonuç Adaptörü - İç format ile UI format arası dönüşüm
import { MMPIResults } from './scoring';
import { TestSonucu } from '@/types';

// UI için mevcut TestSonucu.mmpiSonuclari formatı ile uyumlu tip
export interface MMPIOlcekSonucuTR {
  hammaddePuan: number;
  tSkoru: number;
}

export interface MMPISonuclariTR {
  gecerlikOlcekleri: Record<string, MMPIOlcekSonucuTR>;
  klinikOlcekler: Record<string, MMPIOlcekSonucuTR>;
}

/**
 * MMPIResults -> TestSonucu.mmpiSonuclari formatına dönüştür
 */
export function toPublicResults(results: MMPIResults): TestSonucu['mmpiSonuclari'] {
  // Geçerlik ölçekleri (sadece hammaddePuan, tSkoru)
  const gecerlikOlcekleri: TestSonucu['mmpiSonuclari']['gecerlikOlcekleri'] = {};
  for (const [key, val] of Object.entries(results.validityScales)) {
    gecerlikOlcekleri[key] = {
      hammaddePuan: val.rawScore,
      tSkoru: val.tScore
    };
  }

  // Klinik ölçekler (hammaddePuan, tSkoru)
  const klinikOlcekler: TestSonucu['mmpiSonuclari']['klinikOlcekler'] = {};
  for (const [key, val] of Object.entries(results.clinicalScales)) {
    klinikOlcekler[key] = {
      hammaddePuan: val.rawScore,
      tSkoru: val.tScore
    };
  }

  return {
    gecerlikOlcekleri,
    klinikOlcekler
  };
}

/**
 * TestSonucu.mmpiSonuclari formatından MMPIResults'a dönüştür
 */
export function fromPublicResults(publicResults: TestSonucu['mmpiSonuclari']): MMPIResults {
  if (!publicResults) {
    throw new Error('MMPI sonuçları bulunamadı');
  }
  
  const validityScales: MMPIResults['validityScales'] = {};
  for (const [key, val] of Object.entries(publicResults.gecerlikOlcekleri)) {
    validityScales[key] = {
      rawScore: val.hammaddePuan,
      tScore: val.tSkoru,
      scaleId: key,
      type: 'validity'
    };
  }

  const clinicalScales: MMPIResults['clinicalScales'] = {};
  for (const [key, val] of Object.entries(publicResults.klinikOlcekler)) {
    clinicalScales[key] = {
      rawScore: val.hammaddePuan,
      tScore: val.tSkoru,
      scaleId: key,
      type: 'clinical'
    };
  }

  return {
    validityScales,
    clinicalScales
  };
}