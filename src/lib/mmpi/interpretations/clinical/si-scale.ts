// Sosyal İçe Dönüklük (Si) Alt Testi - Ölçek 0
// MMPI Klinik Ölçek - Standart MMPI profiline eklenmiş bir alt testtir. İçedönüklük (Introversion) ve dışadönüklük (Entraversion) üzerinde çok çalışılmış bir kişilik boyutudur. Bu alt test içedönüklüğün yalnızca bir boyutunu, sosyal ilişkilerdeki içe dönüklüğü ölçmeyi amaçlamaktadır. Diğer alt testlerden daha farklı olarak geliştirilmiştir

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
   * Kişisel bilgileri dahil eden gelişmiş sosyal içe dönüklük ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): SiScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Yaş faktörü (kitapta açık belirtilen)
    if (personalInfo.dogumTarihi) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null) {
        if (yas < 18) {
          personalizedNotes.push("Ergenler ve yüksekokul öğrencileri, genellikle 40 ile 50 T puanı arasında yer alırlar.");
        }
      }
    }

    // Medeni hal faktörü (kitapta açık belirtilen)
    if (personalInfo.medeniDurum && personalInfo.medeniDurum === 'Evli') {
      personalizedNotes.push("Alt test Si, evlilik ilişkileri üzerinde tahminler yapmaya yararlıdır.");
      personalizedNotes.push("Alt test Si'de 20 puanlık bir farklılık olan çiftlerin, sosyal ilişkiler açısından evlilik çatışmalarına düşmeleri olasıdır.");
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
        description: 'Sosyal açıdan beceriksiz olan kişilerdir.',
        characteristics: [
          'Sosyal ilişkilerde anksiyete yaşar ve ilişki kurmaktan kaçınırlar',
          'Nevrotik üçlüde yükselme görülebilir',
          'Ayrıca bakınız, 2, 7 ve 8 alt testlerinin yükselmesi'
        ],
        clinicalSignificance: 'Sosyal anksiyete - İlişki kurmaktan kaçınma'
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
          'Normal sosyal beceriler',
          'Dengeli sosyal etkileşim'
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
 * Si Alt Testinde Yüksek Puan Alan Birey (Graham 1987)
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
 * Si Alt Testinde Düşük Puan Alan Bir Birey
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
 * Si Alt Testi Genel Özellikleri ve Notlar
 */
export function getSiGeneralCharacteristics(): string[] {
  return [
    'Psikolojik ve normal popülasyon için alt test Si\'de alınan yüksek puanlar benzer şekilde tanımlanır',
    'Sosyal olarak içedönük utangaç ve geri çekilmiş kişiler olarak değerlendirilir',
    'Alt test Si\'deki puanlar yaşla birlikte artar',
    'Alt test Si, evlilik ilişkileri üzerinde tahminler yapmaya yararlıdır',
    'Alt test Si\'de 20 puanlık bir farklılık olan çiftlerin, sosyal ilişkiler açısından evlilik çatışmalarına düşmeleri olasıdır',
    'Alt test Si\'deki yükselmeye, alt test 4 ve 9\'daki yükselmeler de eşlik ediyorsa, eyleme vurukluğun bastırıldığı düşünülmelidir',
    'Alt test 2 ya da 7 özellikle alt test 8\'in eşlik ettiği durumlarda, ruminatik davranışların kuvvetlendiği görülür'
  ];
}

// Geriye uyumluluk için export objesi
export const siScaleInterpretation = {
  getInterpretation: (tScore: number) => new SiScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new SiScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getSiHighScoreCharacteristics,
  getLowScoreCharacteristics: getSiLowScoreCharacteristics,
  getGeneralCharacteristics: getSiGeneralCharacteristics,
  name: 'Sosyal İçe Dönüklük (Si)',
  number: 0,
  description: 'Standart MMPI profiline eklenmiş bir alt testtir. İçedönüklük (Introversion) ve dışadönüklük (Entraversion) üzerinde çok çalışılmış bir kişilik boyutudur. Bu alt test içedönüklüğün yalnızca bir boyutunu, sosyal ilişkilerdeki içe dönüklüğü ölçmeyi amaçlamaktadır. Diğer alt testlerden daha farklı olarak geliştirilmiştir.',
  itemCount: 70
};