﻿// Depresyon (D) Alt Testi - Ölçek 2
// MMPI Klinik Ölçek - Depresyon belirtilerinin derecesini ölçmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface DScaleInterpretation {
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

export class DScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş depresyon ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadin';
    }
  ): DScaleInterpretation {
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
        // Lise öğrencileri için özel durum (14-18 yaş, Lise eğitimi)
        if (yas >= 14 && yas <= 18 && personalInfo.egitimDurumu === 'Lise' && tScore >= 70) {
          personalizedNotes.push("Lise öğrencilerinde 2'nin tek başına 70 T puanının üstünde olması genellikle klinik olarak daha az anlamlıdır ve sıklıkla durumsal sorunlar ve genellikle karşı cinsle ilişkiler, ders çalışmada ya da mesleki seçenekler üzerindeki kaygıyı yansıtır.");
        }
        
        // Yüksekokul/Üniversite öğrencileri için özel durum (18-25 yaş, üniversite eğitimi)
        if (yas >= 18 && yas <= 25 && 
            ['Önlisans', 'Lisans', 'Yüksek lisans', 'Doktora'].includes(personalInfo.egitimDurumu as string) && 
            tScore >= 70) {
          personalizedNotes.push("Depresyonun tek başına yüksek olduğu yüksekokul öğrencileri tipik olarak sorunlarının kökenine inme çabalarını reddederler ve bunun yerine ebeveyn yerine geçen birinden öğüt almaya çalışırlar.");
        }

        // 25 yaş üzeri için genel yorum
        if (yas > 25) {
          personalizedNotes.push("25 yaşın üzerindekilerde depresyon kodu daha sık görülmektedir.");
          
          // Yaş artışı ile cinsiyet farkı
          if (personalInfo.cinsiyet === 'Erkek') {
            personalizedNotes.push("Yaş arttıkça depresyon kodu erkeklerde kadınlardan daha fazla görülür.");
          }
        }

        // Ergenler için genel yorum
        if (yas >= 13 && yas <= 17) {
          personalizedNotes.push("Ergenlerde bu kod genellikle kötü arkadaş ilişkileri ile bağlantılıdır. Bu ergenler tipik olarak okul ortamında ve okul dışında çok az arkadaşı olan ve yalnız bireylerdir.");
          personalizedNotes.push("Genellikle pasif, uysal ve yumuşak başlıdırlar. Aile örüntülerinde, sıklıkla ilgisi sınırlı bir baba ve çok ilgili bir anne vardır.");
        }
      }
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): DScaleInterpretation {
    if (tScore >= 85) {
      return {
        tScore,
        level: '85 Ve Üstü T Puanı',
        description: 'Bir şeye odaklaşamayacak ya da açık bir biçimde düşünemeyecek kadar kederli olan bireyleri gösterir.',
        characteristics: [
          'Bir şeye odaklaşamama',
          'Açık bir biçimde düşünememe',
          'Aşırı kederli durum',
          'Ciddi depresif belirtiler'
        ],
        clinicalSignificance: 'Ciddi depresif episod - Kritik düzey'
      };
    } else if (tScore >= 79) {
      return {
        tScore,
        level: '79 Ve Üstü T Puanı',
        description: 'Birey depresif ve kaygılıdır, benlik saygısı düşüktür. Genel olarak yaşama bakışı karamsardır.',
        characteristics: [
          'Tipik olarak ilgi alanları daralmış, morali bozuktur ve kendisini işe yaramaz olarak görür',
          'Bu kişilerin duyarlılıkları kendi depresyonlarına ve fonksiyon düzeylerine yönelmiştir',
          'Aynı zamanda kendilerini soyutlama ile içe çekilme görülür',
          'Bu da değişme isteği ile birlikte iyi bir prognoz sağlar',
          'Yüksek puanlar sıklıkla somatik belirtiler ve yakınmalarla bir arada bulunur'
        ],
        additionalNotes: [
          'Alt test 2\'de yükselme, kişinin o sıradaki işlev düzeyiyle ilgili rahatsızlığı ya da hoşnutsuzluğu hakkında bilgi verebilir',
          'Bu subjektif gerginlik anksiyete belirtisi olabileceği gibi gerçek bir depresif durumda olabilir',
          'Yüksek puanlar her zaman depresyon olarak tanımlanamaz, kişinin o an çevresinden gelen rahatsızlıklarını da yansıtabilir'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı',
        description: 'Ciddi ve kendine güveni olmayan bireyleri gösterir. Eğer o an durumsal baskılar yoksa ve özellikle L de yükselmiş ise bu bireyler, tipik olarak iyi ve kötü ya da doğru ve yanlış biçiminde düşünürler.',
        characteristics: [
          'Klinik olarak belirgin depresyonu olan bireyi gösterir',
          'Bu bireyler en küçük bir şey karşısında bile endişe duyma eğilimi içindedirler',
          'Psikiyatrik hastalar bu ranjda yer alırlar',
          'Bu alanda bireyin yaşadığı huzursuzluk onun iyileşme için motive olduğunun göstergesidir'
        ],
        additionalNotes: [
          'Hastada depresyonun göstergeleri yoksa ve diğer alt testler yükselmemişse hastanın intihar eğilimi açısından değerlendirilmesi gerekmektedir'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Bu bireylerde orta düzeyde depresyon, endişe ve karamsarlık göstergesi vardır. Bu duygudurum hali, durumsal bir krize bağlı olabileceği gibi kalıcı ve geri dönüşü olmayan bir durum da olabilir.',
        characteristics: [
          'Orta düzeyde depresyon belirtileri',
          'Endişe ve karamsarlık',
          'Durumsal kriz veya kalıcı duygusal sorun olabilir'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Bu bireyin yaşamında iyimserlik ve karamsarlık dengesini kurduğunun göstergesidir.',
        characteristics: [
          'İyimserlik ve karamsarlık dengesi',
          'Normal duygusal denge',
          'Uyumlu kişilik yapısı'
        ]
      };
    } else {
      return {
        tScore,
        level: '28-44 T Puanı',
        description: 'Olasılıkla neşeli, meraklı, iyimser, aktif ve dışa dönüktürler (bakınız Si alt testinin düşüklüğü).',
        characteristics: [
          'Neşeli, meraklı, iyimser',
          'Aktif ve dışa dönük',
          'Bu durum bazen bu bireylerin kayıtsız gibi algılanmalarına neden olur',
          'Bu da diğerlerinde hostilite ortaya çıkarır'
        ]
      };
    }
  }
}

/**
 * Yüksek D Puanı Alan Bireyin Özellikleri (Graham 1987)
 */
export function getDHighScoreCharacteristics(): string[] {
  return [
    'Depresif, mutsuz, kederli ve sıkıntılıdır',
    'Gelecekten umutsuzdur',
    'Kendini aşağılamaktadır',
    'Suçluluk duyguları vardır',
    'Konuşmak istemez',
    'Ağlar',
    'Yavaş hareket eder',
    'Depresif tanısı konulabilir',
    'Somatik yakınmaları vardır',
    'Güçsüzlük, yorgunluk, enerji kaybından yakınır',
    'Ajite ve gergindir',
    'Kolay kızar',
    'Üzüntüye eğilimdir',
    'Kendisine güveni azalmıştır',
    'Okulda ya da işte başarısız olduğunu düşünür',
    'Kendini işe yaramaz ve iş görmez gibi görür',
    'İçe çekilmiş, utangaç, ürkek, yalnız kalmaya eğilimli ve ketumdur',
    'Soğuktur',
    'Kişilerarası ilişkilerden kaçınır, insanlarla fazla konuşmaz',
    'Temkinli ve gelenekseldir',
    'Karar vermede güçlük çeker',
    'Saldırgan değildir',
    'Aşırı kontrollüdür, dürtülerini inkar eder',
    'Hoş olmayan durumlardan kaçınır',
    'Yüzleştirmeden kaçınmak için ödün verir',
    'Huzursuzluğu nedeniyle psikoterapiye güdülenir',
    'Var olan stresi yatıştığında terapiyi sonlandırma eğilimindedir'
  ];
}

/**
 * Düşük D Puanı Alan Bireyin Özellikleri
 */
export function getDLowScoreCharacteristics(): string[] {
  return [
    'Gerginlik, anksiyete, suçluluk ve depresyondan arınmıştır',
    'Rahat ve huzurludur',
    'Kendine güvenlidir',
    'Duygusal açıdan dengeli ve tutarlıdır',
    'Pek çok durumda etkili davranır',
    'Neşeli ve iyimserdir',
    'Sözelleştirmede güçlüğü çok azdır',
    'Aktif, enerjik, uyanıktır',
    'Yarışmacıdır',
    'Sorumluluk alabilir',
    'Sosyal ortamlarda rahattır',
    'Liderlik rolünü üstlenir',
    'Zeki, esprili ve renklidir',
    'İlk bakışta olumlu bir izlenim yaratır',
    'İmpulsif değildir, kontrollüdür',
    'Ketlenmemiştir, kendini kolaylıkla ortaya koyabilir',
    'Diğer insanlarda kızgınlık ve düşmanlık uyandırır',
    'Otorite rolünde olan kişilerle çatışması vardır'
  ];
}

/**
 * Sadece D Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getDSpikeInterpretation(): string {
  return 'Sadece D alt testi 70 T puanının üstüne çıktığında birey reaktif bir depresyon yaşamaktadır. Yetersiz, güvensizdir, kendini cezalandırarak suçluluk duygularından kurtulma çabası içindedir ve çok fazla kaygılıdır, kendini eleştirir, sanki yaşadığı durum ya da bunu kontrol edememe için bir kefaret(ceza) ödeyecekmiş gibi. Birey depresif olduğunu (bu duygudurum başkaları için çok açık olabildiği halde) inkar edecektir. Psikoterapi prognozu genellikle kısa bir süre içinde iyidir ve hastalar yöneltici, yüzleştirici bir yaklaşıma yanıt verirler.';
}

/**
 * Özel Yorumlama Notları
 */
export function getDSpecialNotes(): string[] {
  return [
    'Alt test 2\'nin yorumlanması, birlikte yükselen diğer alt testlere göre değişmektedir',
    'Depresyon çok farklı nedenlerden kaynaklanabilir ve bunlar ancak diğer alt testlerdeki yükselmelere bakılarak yorumlanabilir',
    'Alt test 2 tek başına T-70 değeri üzerinde bir yükselme görülüyorsa ve depresyona ilişkin açık davranışsal belirtiler yoksa, intihar riskine karşı dikkatli olmak gerekir'
  ];
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getDScaleDescription(): string {
  return 'Madde sayısı 60. Bu alt test depresyon belirtilerinin derecesini ölçmek amacıyla geliştirilmiştir. Depresyonda olan kişilerin ana belirtileri, karamsarlık, gelecekten ümitsizlik, kendini değersiz, işe yaramaz görme, suçluluk duyguları, hareketlerde ve düşüncede yavaşlama ve çeşitli bedensel yakınmalardır. Sıklıkla ölüm ve intiharlarla ilgili düşüncelerin yoğunluğu da dikkat çeker. Depresyon belirtileri başka birçok psikiyatrik tanı grubuna da eşlik edebilir.';
}

/**
 * Ortalama Puanlar (Savaşır verileri)
 */
export function getDScoreAverages(): { male: number; female: number } {
  return {
    male: 20.63,
    female: 23.86
  };
}

/**
 * D Ölçeği İlişkisel Analiz Notları
 * Kitaptan alınan bilgilere dayanarak
 */
export function getDRelationshipNote(): string {
  return 'D ölçeğinde yüksek puan alan bireyler kişilerarası ilişkilerden kaçınır, insanlarla fazla konuşmaz. Kendini yönlendiren ebeveynlerine karşı olumsuz duyguları vardır. Huzursuzluğu nedeniyle psikoterapiye güdülenir ancak var olan stresi yatıştığında terapiyi sonlandırma eğilimindedir.';
}

// Geriye uyumluluk için export objesi
export const dScaleInterpretation = {
  getInterpretation: (tScore: number) => new DScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new DScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getDHighScoreCharacteristics,
  getLowScoreCharacteristics: getDLowScoreCharacteristics,
  getSpikeInterpretation: getDSpikeInterpretation,
  getSpecialNotes: getDSpecialNotes,
  getDescription: getDScaleDescription,
  getScoreAverages: getDScoreAverages,
  name: 'Depresyon (D)',
  number: 2,
  description: getDScaleDescription()
};