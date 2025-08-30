// Temel veri modelleri - Core data models for PsikoTest

export type EgitimDurumu = 
  | 'Okuma yazma yok'
  | 'İlkokul'
  | 'Ortaokul'
  | 'Lise'
  | 'Önlisans'
  | 'Lisans'
  | 'Yüksek lisans'
  | 'Doktora'
  | 'Belirtmek istemiyorum';

export type MedeniDurum = 
  | 'Evli'
  | 'Bekar'
  | 'Boşanmış'
  | 'Dul'
  | 'Ayrı yaşıyor'
  | 'Belirtmek istemiyorum';

export interface Danisan {
  id?: number; // Auto-incremented by Dexie
  adSoyad: string;
  tcKimlikNo?: string;
  dogumTarihi?: string;
  cinsiyet?: 'Erkek' | 'Kadin' | 'Belirtmek istemiyorum';
  egitimDurumu?: EgitimDurumu;
  medeniDurum?: MedeniDurum;
  telefon?: string;
  adres?: string;
  notlar?: string;
  eklenmeTarihi: Date | string; // Date in DB, string in Redux state
}

// Yaş hesaplama yardımcı fonksiyonu
export function hesaplaYas(dogumTarihi: string | undefined): number | null {
  if (!dogumTarihi) return null;
  
  const dogum = new Date(dogumTarihi);
  const bugun = new Date();
  
  if (dogum > bugun) return null; // Gelecek tarih kontrolü
  
  let yas = bugun.getFullYear() - dogum.getFullYear();
  const ayFarki = bugun.getMonth() - dogum.getMonth();
  
  if (ayFarki < 0 || (ayFarki === 0 && bugun.getDate() < dogum.getDate())) {
    yas--;
  }
  
  return yas >= 0 ? yas : null;
}

export interface TestSonucu {
  id?: number;
  danisanId: number;
  testId: string; // e.g., "bde-01"
  testAdi: string;
  tamamlanmaTarihi: Date | string; // Date in DB, string in Redux state
  puan: number;
  sonucYorumu: string;
  cevaplar: { soruId: string; verilenPuan: number }[];
  altOlcekPuanlari?: Record<string, {
    toplamPuan: number;
    ortalamaPuan: number;
    ad: string;
    baskın?: boolean;
  }>;
  // MMPI özel sonuç alanları - Sadeleştirilmiş
  mmpiSonuclari?: {
    gecerlikOlcekleri: Record<string, {
      hammaddePuan: number;
      tSkoru: number;
    }>;
    klinikOlcekler: Record<string, {
      hammaddePuan: number;
      tSkoru: number;
    }>;
  };
}

// Test tanımlama için JSON şeması
export interface TestTanimi {
  id: string;
  testAdi: string;
  kisaAciklama: string;
  talimatlar: string;
  sorular: TestSorusu[];
  sonucYorumlari: SonucYorumu[];
  grafikTanimlari?: GrafikTanimi | null;
  kategori?: string;
  anahtar_kelimeler?: string[];
  sureDakika?: number;
  formTuru?: 'standart' | 'cinsiyete-ozel' | 'mmpi-profil';
  puanlamaTuru?: 'basit' | 'cinsiyete-ozel' | 'gorusmeci-degerlendirmesi' | 'coklu_alt_olcek' | 'mmpi-profil' | 'scl-90-r';
  formlar?: {
    Kadın?: TestSorusu[];
    Erkek?: TestSorusu[];
  };
  altOlcekler?: Record<string, AltOlcek>;
  puanlamaAnahtari?: Record<string, { dogru?: number[]; yanlis?: number[] }>;
  k_duzeltmesi?: Record<string, number>;
  t_skoru_tablolari?: {
  Erkek: Record<string, Record<string, number>>;
  Kadin: Record<string, Record<string, number>>;
};
}

export interface AltOlcek {
  ad: string;
  kisaAd?: string;
  aciklama?: string;
  sorular: string[] | number[];
  toplamSoru?: number;
}

export interface TestSorusu {
  id: string;
  metin: string;
  secenekler: TestSecenegi[];
}

// Soru tipi alias'ı geriye uyumluluk için
export type Soru = TestSorusu;

export interface TestSecenegi {
  metin: string;
  puan: number;
}

export interface SonucYorumu {
  aralik: [number, number];
  yorum: string;
  seviye?: 'minimal' | 'hafif' | 'orta' | 'siddetli';
}

export interface GrafikTanimi {
  tip: 'bar' | 'line' | 'pie';
  baslik: string;
  veriAlanlari: string[];
}

// UI durum modelleri
export interface UIState {
  loading: boolean;
  error: string | null;
  activeModal: string | null;
  darkMode: boolean;
}

// Test uygulama modları
export type TestUygulamaYontemi = 'standart' | 'hizli';

export interface TestOturumu {
  testId: string;
  danisanId: number;
  yontem: TestUygulamaYontemi;
  cevaplar: Record<string, number>;
  aktifSoruIndex: number;
  baslamaTarihi: Date | string; // Date when creating, string in Redux state
  baslangicZamani?: Date | string; // Add this for backward compatibility
}