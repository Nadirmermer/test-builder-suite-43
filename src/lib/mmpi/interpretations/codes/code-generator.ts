// MMPI Kod Üretici - Klinik ölçeklerden kod oluşturur

import { GeneratedCode, ScalePair } from './types';
import { hsCodeInterpretations } from './hs-codes';
import { dCodeInterpretations } from './d-codes';
import { hyCodeInterpretations } from './hy-codes';
import { pdCodeInterpretations } from './pd-codes';
import { mfCodeInterpretations } from './mf-codes';
import { paCodeInterpretations } from './pa-codes';
import { ptCodeInterpretations } from './pt-codes';
import { scCodeInterpretations } from './sc-codes';
import { maCodeInterpretations } from './ma-codes';
import { siCodeInterpretations } from './si-codes';

// Klinik ölçek ID'lerini sayısal karşılıklarına çevir
const scaleToNumber: Record<string, string> = {
  'Hs': '1', // Hipokondriazis
  'D': '2',  // Depresyon
  'Hy': '3', // Histeri
  'Pd': '4', // Psikopatik Sapma
  'Mf': '5', // Kadınlık-Erkeklik
  'Pa': '6', // Paranoya
  'Pt': '7', // Psikasteni
  'Sc': '8', // Şizofreni
  'Ma': '9', // Hipomani
  'Si': '0'  // Sosyal İçe Dönüklük
};

const numberToScale: Record<string, string> = {
  '1': 'Hs', '2': 'D', '3': 'Hy', '4': 'Pd', '5': 'Mf',
  '6': 'Pa', '7': 'Pt', '8': 'Sc', '9': 'Ma', '0': 'Si'
};

export class MMPICodeGenerator {
  /**
   * MMPI sonuçlarından kodları üretir
   * @param clinicalScales - Klinik ölçek sonuçları
   * @returns Üretilen kodlar listesi
   */
  generateCodes(clinicalScales: Record<string, { tScore: number; rawScore: number }>): GeneratedCode[] {
    // 65+ T puanı olan ölçekleri al ve sırala
    const elevatedScales = Object.entries(clinicalScales)
      .filter(([_, scale]) => scale.tScore >= 65)
      .map(([scaleId, scale]) => ({
        scaleId,
        tScore: scale.tScore,
        number: scaleToNumber[scaleId]
      }))
      .filter(scale => scale.number) // Geçerli ölçekleri al
      .sort((a, b) => b.tScore - a.tScore); // En yüksekten düşüğe sırala

    if (elevatedScales.length === 0) {
      return [];
    }

    const codes: GeneratedCode[] = [];

    // 1. Spike (tek ölçek) kodları
    if (elevatedScales.length === 1) {
      const scale = elevatedScales[0];
      codes.push({
        code: scale.number,
        type: 'spike',
        scales: [scale.scaleId],
        scores: [scale.tScore],
        isWithinRange: false,
        hasInterpretation: this.hasCodeInterpretation(scale.number)
      });
    }

    // 2. İkili kodları oluştur
    if (elevatedScales.length >= 2) {
      // Ana ikili kod (en yüksek iki)
      const primaryPair = elevatedScales.slice(0, 2);
      const mainTwoPointCode = primaryPair.map(s => s.number).join('');
      codes.push({
        code: mainTwoPointCode,
        type: 'two-point',
        scales: primaryPair.map(s => s.scaleId),
        scores: primaryPair.map(s => s.tScore),
        isWithinRange: Math.abs(primaryPair[0].tScore - primaryPair[1].tScore) <= 10,
        hasInterpretation: this.hasCodeInterpretation(mainTwoPointCode)
      });

      // Ters kod da ekle (21 ise 12 de)
      const reverseCode = primaryPair.map(s => s.number).reverse().join('');
      if (reverseCode !== mainTwoPointCode) {
        codes.push({
          code: reverseCode,
          type: 'two-point',
          scales: primaryPair.map(s => s.scaleId).reverse(),
          scores: primaryPair.map(s => s.tScore).reverse(),
          isWithinRange: Math.abs(primaryPair[0].tScore - primaryPair[1].tScore) <= 10,
          hasInterpretation: this.hasCodeInterpretation(reverseCode)
        });
      }

      // ±10 puan aralığındaki diğer kombinasyonlar
      for (let i = 0; i < elevatedScales.length; i++) {
        for (let j = i + 1; j < elevatedScales.length; j++) {
          const scale1 = elevatedScales[i];
          const scale2 = elevatedScales[j];
          
          if (Math.abs(scale1.tScore - scale2.tScore) <= 10) {
            const code = scale1.number + scale2.number;
            const reverseCode = scale2.number + scale1.number;
            
            // Zaten eklenmemiş ise ekle
            if (!codes.some(c => c.code === code)) {
              codes.push({
                code: code,
                type: 'two-point',
                scales: [scale1.scaleId, scale2.scaleId],
                scores: [scale1.tScore, scale2.tScore],
                isWithinRange: true,
                hasInterpretation: this.hasCodeInterpretation(code)
              });
            }
            
            if (!codes.some(c => c.code === reverseCode)) {
              codes.push({
                code: reverseCode,
                type: 'two-point',
                scales: [scale2.scaleId, scale1.scaleId],
                scores: [scale2.tScore, scale1.tScore],
                isWithinRange: true,
                hasInterpretation: this.hasCodeInterpretation(reverseCode)
              });
            }
          }
        }
      }
    }

    // 3. Üçlü kodlar
    if (elevatedScales.length >= 3) {
      const topThree = elevatedScales.slice(0, 3);
      const threePointCode = topThree.map(s => s.number).join('');
      codes.push({
        code: threePointCode,
        type: 'three-point',
        scales: topThree.map(s => s.scaleId),
        scores: topThree.map(s => s.tScore),
        isWithinRange: this.isWithinRangeGroup(topThree.map(s => s.tScore)),
        hasInterpretation: this.hasCodeInterpretation(threePointCode)
      });
    }

    // 4. Dörtlü kodlar
    if (elevatedScales.length >= 4) {
      const topFour = elevatedScales.slice(0, 4);
      const fourPointCode = topFour.map(s => s.number).join('');
      codes.push({
        code: fourPointCode,
        type: 'four-point',
        scales: topFour.map(s => s.scaleId),
        scores: topFour.map(s => s.tScore),
        isWithinRange: this.isWithinRangeGroup(topFour.map(s => s.tScore)),
        hasInterpretation: this.hasCodeInterpretation(fourPointCode)
      });
    }

    return codes;
  }

  /**
   * Bir grup skorun ±10 puan aralığında olup olmadığını kontrol eder
   */
  private isWithinRangeGroup(scores: number[]): boolean {
    if (scores.length < 2) return false;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    return (max - min) <= 10;
  }

  /**
   * Kod için yorum olup olmadığını kontrol eder
   */
  private hasCodeInterpretation(code: string): boolean {
    const allCodeMaps = [
        hsCodeInterpretations,
        dCodeInterpretations,
        hyCodeInterpretations,
        pdCodeInterpretations,
        mfCodeInterpretations,
        paCodeInterpretations,
        ptCodeInterpretations,
        scCodeInterpretations,
        maCodeInterpretations,
        siCodeInterpretations
    ];
    
    return allCodeMaps.some(codeMap => code in codeMap);
  }

  /**
   * Kod tipini belirler
   */
  getCodeType(code: string): 'spike' | 'two-point' | 'three-point' | 'four-point' {
    switch (code.length) {
      case 1: return 'spike';
      case 2: return 'two-point';
      case 3: return 'three-point';
      case 4: return 'four-point';
      default: return 'two-point';
    }
  }

  /**
   * Kodu ölçek isimlerine çevirir
   */
  codeToScaleNames(code: string): string[] {
    return code.split('').map(num => {
      const scaleId = numberToScale[num];
      return scaleId ? this.getScaleName(scaleId) : num;
    });
  }

  /**
   * Ölçek ID'sini Türkçe isime çevirir
   */
  private getScaleName(scaleId: string): string {
    const names: Record<string, string> = {
      'Hs': 'Hipokondriazis',
      'D': 'Depresyon',
      'Hy': 'Histeri', 
      'Pd': 'Psikopatik Sapma',
      'Mf': 'Kadınlık-Erkeklik',
      'Pa': 'Paranoya',
      'Pt': 'Psikasteni',
      'Sc': 'Şizofreni',
      'Ma': 'Hipomani',
      'Si': 'Sosyal İçe Dönüklük'
    };
    return names[scaleId] || scaleId;
  }
}