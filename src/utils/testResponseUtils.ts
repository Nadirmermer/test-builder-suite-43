// Test cevap seçeneklerini analiz eden utility fonksiyonları

import { TestTanimi, TestSorusu } from '@/types';

export interface TestResponsePattern {
  optionCount: number;
  optionTexts: string[];
  optionValues: number[];
  isUniform: boolean; // Tüm sorularda aynı seçenekler mi?
  keyboardShortcuts: string[];
}

/**
 * Test için cevap desenini analiz eder
 */
export function analyzeTestResponsePattern(test: TestTanimi): TestResponsePattern {
  let allSorular: TestSorusu[] = [];
  
  // MMPI için özel durum
  if (test.id === 'mmpi') {
    return {
      optionCount: 2,
      optionTexts: ['DOĞRU', 'YANLIŞ'],
      optionValues: [1, 0],
      isUniform: true,
      keyboardShortcuts: ['D', 'Y']
    };
  }
  
  // Form türüne göre soruları topla
  if (test.formTuru === 'cinsiyete-ozel' && test.formlar) {
    // Kadın ve erkek formlarındaki tüm soruları birleştir
    const kadinSorular = test.formlar.Kadin || [];
    const erkekSorular = test.formlar.Erkek || [];
    allSorular = [...kadinSorular, ...erkekSorular];
  } else {
    allSorular = test.sorular || [];
  }
  
  if (allSorular.length === 0) {
    return {
      optionCount: 2,
      optionTexts: ['DOĞRU', 'YANLIŞ'],
      optionValues: [1, 0],
      isUniform: true,
      keyboardShortcuts: ['D', 'Y']
    };
  }
  
  // İlk sorunun seçeneklerini referans al
  const firstQuestion = allSorular[0];
  const refOptions = firstQuestion.secenekler;
  
  // Tüm sorularda aynı seçenekler var mı kontrol et
  let isUniform = true;
  for (const soru of allSorular) {
    if (soru.secenekler.length !== refOptions.length) {
      isUniform = false;
      break;
    }
    
    for (let i = 0; i < soru.secenekler.length; i++) {
      if (soru.secenekler[i].metin !== refOptions[i].metin || 
          soru.secenekler[i].puan !== refOptions[i].puan) {
        isUniform = false;
        break;
      }
    }
    
    if (!isUniform) break;
  }
  
  // Keyboard shortcuts oluştur
  const shortcuts = generateKeyboardShortcuts(refOptions.map(o => o.metin));
  
  return {
    optionCount: refOptions.length,
    optionTexts: refOptions.map(o => o.metin),
    optionValues: refOptions.map(o => o.puan),
    isUniform,
    keyboardShortcuts: shortcuts
  };
}

/**
 * Seçenek metinlerinden klavye kısayolları oluşturur
 */
function generateKeyboardShortcuts(optionTexts: string[]): string[] {
  const shortcuts: string[] = [];
  
  // Özel durumlar için tanımlı kısayollar
  const predefinedShortcuts: Record<string, string> = {
    'DOĞRU': 'D',
    'YANLIŞ': 'Y',
    'Hiç': '0',
    'Çok az': '1',
    'Orta derecede': '2',
    'Oldukça fazla': '3',
    'Aşırı düzeyde': '4',
    'Oldukça istekli': '1',
    'Çok istekli': '2',
    'Biraz istekli': '3',
    'Biraz isteksiz': '4',
    'Çok isteksiz': '5',
    'Tamamen isteksiz': '6'
  };
  
  // MMPI özel durumu: hem D/Y hem de 1/2 tuşlarını destekle
  const isMMPI = optionTexts.length === 2 && 
                 optionTexts.includes('DOĞRU') && 
                 optionTexts.includes('YANLIŞ');
  
  for (let i = 0; i < optionTexts.length; i++) {
    const text = optionTexts[i];
    
    if (isMMPI) {
      // MMPI için hem D/Y hem de 1/2 tuşlarını destekle
      if (text === 'DOĞRU') {
        shortcuts.push('D'); // D tuşu birincil
      } else if (text === 'YANLIŞ') {
        shortcuts.push('Y'); // Y tuşu birincil
      } else {
        shortcuts.push((i + 1).toString());
      }
    } else if (predefinedShortcuts[text]) {
      shortcuts.push(predefinedShortcuts[text]);
    } else {
      // Sayı tabanlı kısayol oluştur (1, 2, 3, ...)
      shortcuts.push((i + 1).toString());
    }
  }
  
  return shortcuts;
}

/**
 * Test tipine göre özel input ayarları döndürür
 */
export function getTestInputSettings(test: TestTanimi) {
  const pattern = analyzeTestResponsePattern(test);
  
  return {
    responsePattern: pattern,
    instructionText: generateInstructionText(pattern),
    inputModeText: generateInputModeText(pattern)
  };
}

/**
 * Cevap desenine göre talimat metni oluşturur
 */
function generateInstructionText(pattern: TestResponsePattern): string {
  if (pattern.optionCount === 2 && pattern.optionTexts.includes('DOĞRU') && pattern.optionTexts.includes('YANLIŞ')) {
    return 'DOĞRU için D, YANLIŞ için Y tuşuna basın';
  }
  
  let instruction = 'Cevaplar için: ';
  for (let i = 0; i < pattern.optionTexts.length; i++) {
    if (i > 0) instruction += ', ';
    instruction += `${pattern.optionTexts[i]} → ${pattern.keyboardShortcuts[i]}`;
  }
  
  return instruction;
}

/**
 * Input mode metni oluşturur
 */
function generateInputModeText(pattern: TestResponsePattern): string {
  if (pattern.optionCount === 2) {
    return '2 Seçenekli';
  } else if (pattern.optionCount <= 6) {
    return `${pattern.optionCount} Seçenekli`;
  } else {
    return 'Çoklu Seçenek';
  }
}

/**
 * Klavye girişini cevap değerine çevirir
 */
export function convertKeyboardInputToAnswer(
  input: string, 
  pattern: TestResponsePattern
): number | null {
  const upperInput = input.toUpperCase();
  const index = pattern.keyboardShortcuts.findIndex(shortcut => 
    shortcut.toUpperCase() === upperInput
  );
  
  if (index !== -1) {
    return pattern.optionValues[index];
  }
  
  return null;
}

/**
 * Cevap değerini seçenek indeksine çevirir
 */
export function convertAnswerToOptionIndex(
  answer: number,
  pattern: TestResponsePattern
): number {
  return pattern.optionValues.indexOf(answer);
}
