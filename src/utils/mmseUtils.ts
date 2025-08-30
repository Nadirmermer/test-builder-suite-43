// MMSE test için yardımcı fonksiyonlar
import { TestTanimi, EgitimDurumu } from '@/types';

export function getMMSETestByEducation(egitimDurumu: EgitimDurumu | undefined, testler: TestTanimi[]): TestTanimi | null {
  // Eğitim durumuna göre hangi MMSE testinin kullanılacağını belirle
  const isEgitimli = egitimDurumu && ![
    'Okuma yazma yok',
    'İlkokul',
    'Belirtmek istemiyorum'
  ].includes(egitimDurumu);

  const testId = isEgitimli ? 'mmse-egitimli' : 'mmse-egitimsiz';
  
  return testler.find(test => test.id === testId) || null;
}

export function calculateMMSEScore(cevaplar: Record<string, number>): {
  toplamPuan: number;
  altOlcekPuanlari: Record<string, { toplamPuan: number; ortalamaPuan: number; ad: string }>;
  seviye: string;
  yorum: string;
} {
  const altOlcekler = {
    yonelim: {
      ad: 'Yönelim',
      sorular: ['yonelim_yil', 'yonelim_mevsim', 'yonelim_ay', 'yonelim_gun_tarih', 'yonelim_gun_hafta', 'yonelim_zaman', 'yonelim_ulke', 'yonelim_sehir', 'yonelim_semt', 'yonelim_bina', 'yonelim_kat'],
      maksimum: 10
    },
    kayit: {
      ad: 'Kayıt Hafızası',
      sorular: ['kayit_masa', 'kayit_bayrak', 'kayit_elbise'],
      maksimum: 3
    },
    dikkat: {
      ad: 'Dikkat ve Hesaplama',
      sorular: ['dikkat_100_93', 'dikkat_93_86', 'dikkat_86_79', 'dikkat_79_72', 'dikkat_72_65', 'dikkat_pazar', 'dikkat_cumartesi', 'dikkat_cuma', 'dikkat_persembe', 'dikkat_carsamba'],
      maksimum: 5
    },
    hatirlama: {
      ad: 'Hatırlama',
      sorular: ['hatirlama_masa', 'hatirlama_bayrak', 'hatirlama_elbise'],
      maksimum: 3
    },
    lisan: {
      ad: 'Lisan',
      sorular: ['lisan_saat', 'lisan_kalem', 'lisan_tekrar', 'lisan_kagit_al', 'lisan_kagit_katla', 'lisan_kagit_birak', 'lisan_goz_kapat', 'lisan_goz_kapat_taklit', 'lisan_cumle_yaz', 'lisan_ev_cumle', 'lisan_sekil_ciz'],
      maksimum: 9
    }
  };

  let toplamPuan = 0;
  const altOlcekPuanlari: Record<string, { toplamPuan: number; ortalamaPuan: number; ad: string }> = {};

  // Her alt ölçek için puanları hesapla
  Object.entries(altOlcekler).forEach(([key, olcek]) => {
    let altOlcekPuan = 0;
    
    olcek.sorular.forEach(soruId => {
      if (cevaplar[soruId] !== undefined) {
        altOlcekPuan += cevaplar[soruId];
      }
    });

    altOlcekPuanlari[key] = {
      toplamPuan: altOlcekPuan,
      ortalamaPuan: altOlcekPuan / olcek.maksimum,
      ad: olcek.ad
    };

    toplamPuan += altOlcekPuan;
  });

  // Seviye ve yorum belirleme
  let seviye: string;
  let yorum: string;

  if (toplamPuan >= 24) {
    seviye = 'normal';
    yorum = 'Normal bilişsel işlev';
  } else if (toplamPuan >= 21) {
    seviye = 'hafif';
    yorum = 'Hafif Bilişsel Bozukluk (HBB)';
  } else if (toplamPuan >= 10) {
    seviye = 'orta';
    yorum = 'Orta derecede bilişsel bozukluk';
  } else {
    seviye = 'siddetli';
    yorum = 'Ağır bilişsel bozukluk';
  }

  return {
    toplamPuan,
    altOlcekPuanlari,
    seviye,
    yorum
  };
}

export function getMMSEInterpretation(puan: number, altOlcekPuanlari: Record<string, { toplamPuan: number; ortalamaPuan: number; ad: string }>): string {
  let yorumlar: string[] = [];

  // Genel değerlendirme
  if (puan >= 24) {
    yorumlar.push("Bilişsel işlevler normal aralıkta görünmektedir.");
  } else if (puan >= 21) {
    yorumlar.push("Hafif bilişsel bozukluk belirtileri gözlenmektedir. İleri değerlendirme önerilir.");
  } else if (puan >= 10) {
    yorumlar.push("Orta derecede bilişsel bozukluk mevcuttur. Detaylı nöropsikolojik değerlendirme gereklidir.");
  } else {
    yorumlar.push("Ağır bilişsel bozukluk bulguları mevcuttur. Acil tıbbi değerlendirme önerilir.");
  }

  // Öneriler
  if (puan < 24) {
    yorumlar.push("Bu sonuçlar yalnızca tarama amaçlıdır ve tek başına tanı koymak için yeterli değildir.");
    yorumlar.push("Anormal sonuçlar ileri nöropsikolojik testler yapılması gerektiğini gösterir.");
  }

  return yorumlar.join(' ');
}