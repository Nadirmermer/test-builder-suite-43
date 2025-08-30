// Sosyal İçedönüklük (Si) Alt Testi - Ölçek 0
// MMPI Klinik Ölçek - Sosyal içedönüklük ve ekstraversionu değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface SiScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  additionalNotes?: string[];
  personalizedNotes?: string[];
}

export class SiScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş sosyal içedönüklük ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadin';
    }
  ): SiScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    if (personalInfo.dogumTarihi) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null) {
        // Ergenler ve yüksekokul öğrencileri için özel durum
        if (yas >= 13 && yas <= 25 && tScore >= 40 && tScore <= 50) {
          personalizedNotes.push("Alt test Si'deki puanlar yaşla birlikte artar. Ergenler ve yüksekokul öğrencileri, genellikle 40 ile 50 T puanı arasında yer alırlar.");
        }
      }
    }

    // Evlilik uyumu için değerlendirme
    if (personalInfo.medeniDurum === 'Evli') {
      personalizedNotes.push("Alt test Si, evlilik ilişkileri üzerinde tahminler yapmaya yararlıdır. Alt test Si'de 20 puanlık bir farklılık olan çiftlerin, sosyal ilişkiler açısından evlilik çatışmalarına düşmeleri olasıdır.");
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): SiScaleInterpretation {
    if (tScore >= 70) {
      return {
        tScore,
        level: '70 T Puanı Ve Üstü',
        description: 'Sosyal açıdan beceriksiz olan kişilerdir. Sosyal ilişkilerde anksiyete yaşar ve ilişki kurmaktan kaçınırlar.',
        characteristics: [
          'Nevrotik üçlüde yükselme görülebilir',
          'Ayrıca bakınız, 2, 7 ve 8 alt testlerinin yükselmesi'
        ],
        additionalNotes: [
          'Alt test Si\'deki yükselmeye, alt test 4 ve 9\'daki yükselmeler de eşlik ediyorsa, eyleme vurukluğun bastırıldığı düşünülmelidir',
          'Alt test 2 ya da 7 özellikle alt test 8\'in eşlik ettiği durumlarda, ruminatik davranışların kuvvetlendiği görülür'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Bu kendini ortaya koymak istemeyen, yakın aile çevresinde rahat olan bireylerin profilidir.',
        characteristics: [
          'Çekingen, utangaç kişilerdir'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Sosyal ilişki kurmada başarılı olan bireylere işaret etmektedir.',
        characteristics: [
          'Normal sosyal işlev',
          'Uyumlu kişilerarası ilişkiler'
        ]
      };
    } else {
      return {
        tScore,
        level: '25-44 T Puanı',
        description: 'İyimser, manipülatif, yüzeysel ve hatta biraz uçuk bireylerdir.',
        characteristics: [
          'Dürtü kontrol sorunları vardır',
          'Diğerleri ile olmak isteyen, yalnız kalamayan bireyleri gösterir',
          'Çoğu kolay ilişki kurar, arkadaş canlısı ve meraklıdırlar',
          'Sosyal açıdan kabul görme, onaylanma konusunda gereksinimleri çok fazla olan bireylerdir'
        ]
      };
    }
  }
}

/**
 * Yüksek Si Puanı Alan Bireyin Özellikleri (Graham 1987)
 */
export function getSiHighScoreCharacteristics(): string[] {
  return [
    'Sosyal açıdan içe çekilmiştir',
    'Yalnızdır ya da çok az arkadaşla rahattır',
    'Ürkek, çekingen, temkinli, utangaçtır',
    'Karşı cinsten kişilerin olduğu ortamlarda rahat değildir',
    'Kendini küçük görür',
    'Anlaşılmaz zor biridir',
    'Diğerlerinin düşüncelerine duyarlıdır',
    'Diğer insanlarla ilişkiye giremediği için üzgündür',
    'Aşırı kontrollüdür, duygularını açıkça dile getirmekten hoşlanmaz',
    'İtaatkar, uysal ve boyun eğicidir',
    'Otoriteyi kabul etmede aşırıdır',
    'Ciddidir, kişisel temposu yavaştır',
    'Güvenli, bağımlıdır',
    'Temkinlidir, sorunlara yaklaşımı sıradandır',
    'Tutumlarında ve düşüncelerinde katı ve tutucudur',
    'Küçük fikirler üretmede bile güçlüğü vardır',
    'Çalışmayı sever',
    'Endişeye eğilimlidir, sinirli ve kaygılıdır',
    'Karamsardır',
    'Suçluluk duyguları, depresyon dönemleri yaşar'
  ];
}

/**
 * Düşük Si Puanı Alan Bireyin Özellikleri
 */
export function getSiLowScoreCharacteristics(): string[] {
  return [
    'Sosyaldir, dışadönüktür',
    'Açık yürekli, arkadaşça, konuşkandır',
    'Diğer insanlarla birlikte olmak için güçlü bir isteği vardır',
    'Kolay kaynaşır',
    'Zekidir, kendini ifade eder',
    'Aktif enerjik ve gayretlidir',
    'Güç, mevki ve tanınmak ister',
    'Mücadele edecek ortamlar arar',
    'İmpuls kontrolüyle ilgili sorunları vardır',
    'Eylemlerinin sonuçlarını düşünmeden davranır',
    'İmmatürdür, kendini düşünür',
    'Yüzeysel ve insanlarla ilişkileri yapmacıktır',
    'İnsanları kullanır ve fırsatçıdır',
    'Diğerlerinde hostilite ve öfke uyandırır'
  ];
}

/**
 * Si Alt Testinin Özel Özellikleri
 */
export function getSiSpecialCharacteristics(): string[] {
  return [
    'Psikolojik ve normal popülasyon için alt test Si\'de alınan yüksek puanlar benzer şekilde tanımlanır',
    'Sosyal olarak içedönük utangaç ve geri çekilmiş kişiler olarak değerlendirilir',
    'Alt test Si\'deki puanlar yaşla birlikte artar',
    'Ergenler ve yüksekokul öğrencileri, genellikle 40 ile 50 T puanı arasında yer alırlar',
    'Alt test Si, evlilik ilişkileri üzerinde tahminler yapmaya yararlıdır',
    'Alt test Si\'de 20 puanlık bir farklılık olan çiftlerin, sosyal ilişkiler açısından evlilik çatışmalarına düşmeleri olasıdır'
  ];
}

/**
 * Si Alt Testinin Diğer Testlerle İlişkileri
 */
export function getSiTestRelationships(): string[] {
  return [
    'Alt test Si\'deki yükselmeye, alt test 4 ve 9\'daki yükselmeler de eşlik ediyorsa, eyleme vurukluğun bastırıldığı düşünülmelidir',
    'Alt test 2 ya da 7 özellikle alt test 8\'in eşlik ettiği durumlarda, ruminatik davranışların kuvvetlendiği görülür',
    '049 Kodu: Psikiyatrik olgularda eyleme vurukluğun bastırılması',
    '027 (8) Kodu: Ruminatik davranışların kuvvetlenmesi'
  ];
}

/**
 * Genel Açıklama
 */
export function getSiScaleDescription(): string {
  return 'Sosyal İçedönüklük (Si) alt testi, kişinin sosyal etkileşime olan eğilimini ve sosyal durumlardan kaçınma ya da bunlara yaklaşma derecesini değerlendirmek amacıyla geliştirilmiştir. Bu ölçek introversion-extraversion boyutunu ölçer.';
}

/**
 * Ortalama Puanlar (Savaşır verileri)
 */
export function getSiScoreAverages(): { male: number; female: number } {
  return {
    male: 26.86,
    female: 29.88
  };
}

// Geriye uyumluluk için export objesi
export const siScaleInterpretation = {
  getInterpretation: (tScore: number) => new SiScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new SiScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getSiHighScoreCharacteristics,
  getLowScoreCharacteristics: getSiLowScoreCharacteristics,
  getSpecialCharacteristics: getSiSpecialCharacteristics,
  getTestRelationships: getSiTestRelationships,
  getDescription: getSiScaleDescription,
  getScoreAverages: getSiScoreAverages,
  name: 'Sosyal İçedönüklük (Si)',
  number: 0,
  description: getSiScaleDescription()
};