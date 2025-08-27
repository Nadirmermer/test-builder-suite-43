// Test yardımcı fonksiyonları

import { TestTanimi, TestSorusu, Danisan } from '@/types';

/**
 * Danışanın cinsiyetine göre uygun test sorularını döndürür
 */
export function getTestSorulari(test: TestTanimi, danisan: Danisan): TestSorusu[] {
  // Eğer test cinsiyete özgü değilse, normal soruları döndür
  if (test.formTuru !== 'cinsiyete-ozel') {
    return test.sorular;
  }

  // Cinsiyete özgü test için uygun formu seç
  if (!test.formlar) {
    console.warn(`Test ${test.id} cinsiyete özgü olarak tanımlanmış ama formlar bulunamadı`);
    return test.sorular;
  }

  // Danışanın cinsiyetine göre formu seç
  const cinsiyet = danisan.cinsiyet;
  
  if (cinsiyet === 'Kadın' && test.formlar.Kadın) {
    return test.formlar.Kadın;
  } else if (cinsiyet === 'Erkek' && test.formlar.Erkek) {
    return test.formlar.Erkek;
  } else {
    // Cinsiyet belirtilmemişse veya uygun form yoksa, varsayılan olarak erkek formunu kullan
    console.warn(`Danışan cinsiyeti "${cinsiyet}" için uygun form bulunamadı, erkek formu kullanılıyor`);
    return test.formlar.Erkek || test.formlar.Kadın || test.sorular;
  }
}

/**
 * Test için uygun talimatları döndürür
 */
export function getTestTalimatlar(test: TestTanimi, danisan: Danisan): string {
  if (test.formTuru === 'cinsiyete-ozel') {
    const cinsiyetInfo = danisan.cinsiyet === 'Kadın' ? 'kadın formu' : 'erkek formu';
    return `${test.talimatlar}\n\nNot: Bu test için ${cinsiyetInfo} kullanılmaktadır.`;
  }
  return test.talimatlar;
}

/**
 * Cinsiyete özgü test için cinsiyet gereksinimini kontrol eder
 */
export function isCinsiyetGerekli(test: TestTanimi, danisan: Danisan): boolean {
  if (test.formTuru !== 'cinsiyete-ozel') {
    return false;
  }
  
  return !danisan.cinsiyet || danisan.cinsiyet === 'Belirtmek istemiyorum';
}

/**
 * SCL-90-R testi için özel puanlama fonksiyonu
 */
export function calculateSCL90RScore(cevaplar: (number | undefined)[], test: TestTanimi) {
  if (!test.altOlcekler) {
    return null;
  }

  const altOlcekSonuclari = Object.entries(test.altOlcekler).map(([key, altOlcek]) => {
    let toplamPuan = 0;
    let cevaplananSoru = 0;

    altOlcek.sorular.forEach(soruNo => {
      const soruIndex = typeof soruNo === 'number' ? soruNo - 1 : parseInt(soruNo) - 1;
      const cevap = cevaplar[soruIndex];
      if (cevap !== undefined && typeof cevap === 'number') {
        toplamPuan += cevap;
        cevaplananSoru++;
      }
    });

    // Alt ölçek puanı = Toplam puan / Soru sayısı
    const ortalamaPuan = cevaplananSoru > 0 ? toplamPuan / altOlcek.toplamSoru : 0;

    let seviye = '';
    let renk = '';
    
    if (ortalamaPuan < 0.5) {
      seviye = 'Normal';
      renk = '#22c55e'; // yeşil
    } else if (ortalamaPuan < 1.0) {
      seviye = 'Orta';
      renk = '#f59e0b'; // sarı
    } else {
      seviye = 'Yüksek';
      renk = '#ef4444'; // kırmızı
    }

    return {
      ad: altOlcek.ad,
      kisaAd: altOlcek.kisaAd,
      hamPuan: toplamPuan,
      ortalamaPuan: Number(ortalamaPuan.toFixed(2)),
      seviye,
      renk,
      aciklama: altOlcek.aciklama
    };
  });

  // GSO (Genel Semptom Ortalaması) hesaplama
  const toplamPuan = cevaplar.reduce((sum, cevap) => sum + (cevap || 0), 0);
  const cevaplananSoruSayisi = cevaplar.filter(c => c !== undefined).length;
  const gso = cevaplananSoruSayisi > 0 ? toplamPuan / 90 : 0;

  let genel_seviye = '';
  if (gso < 0.5) {
    genel_seviye = 'Normal - Belirgin ruhsal sorun bulunmamaktadır';
  } else if (gso < 1.0) {
    genel_seviye = 'Orta - Hafif düzeyde belirtiler, takip önerilir';
  } else {
    genel_seviye = 'Yüksek - Belirgin belirtiler, profesyonel değerlendirme önerilir';
  }

  return {
    altOlcekler: altOlcekSonuclari,
    toplamPuan,
    gso: Number(gso.toFixed(2)),
    genelSeviye: genel_seviye,
    cevaplananSoru: cevaplananSoruSayisi,
    toplamSoru: 90
  };
}