// Depresyon (D) Alt Testi - Ölçek 2
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
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): DScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Eğitim durumu faktörü (kitapta açık belirtilen)
    if (personalInfo.egitimDurumu) {
      if (tScore >= 70) {
        if (personalInfo.egitimDurumu === 'Lise') {
          personalizedNotes.push("Lise öğrencilerinde 2'nin tek başına 70 T puanının üstünde olması genellikle klinik olarak daha az anlamlıdır.");
          personalizedNotes.push("Sıklıkla durumsal sorunlar ve genellikle karşı cinsle ilişkiler, ders çalışmada ya da mesleki seçenekler üzerindeki kaygıyı yansıtır.");
        } else if (personalInfo.egitimDurumu === 'Önlisans' || personalInfo.egitimDurumu === 'Lisans' || personalInfo.egitimDurumu === 'Yüksek lisans' || personalInfo.egitimDurumu === 'Doktora') {
          personalizedNotes.push("Depresyonun tek başına yüksek olduğu yüksekokul öğrencileri tipik olarak sorunlarının kökenine inme çabalarını reddederler.");
          personalizedNotes.push("Bunun yerine ebeveyn yerine geçen birinden öğüt almaya çalışırlar.");
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
          'Odaklanma ve düşünme yeteneği ciddi şekilde bozulmuştur',
          'Aşırı keder ve üzüntü hali vardır',
          'Bilişsel işlevlerde belirgin bozulma görülür'
        ],
        clinicalSignificance: 'Kritik depresyon düzeyi - Acil müdahale gerekli'
      };
    } else if (tScore >= 79) {
      return {
        tScore,
        level: '79 Ve Üstü T Puanı',
        description: 'Birey depresif ve kaygılıdır, benlik saygısı düşüktür. Genel olarak yaşama bakışı karamsardır.',
        characteristics: [
          'Tipik olarak ilgi alanları daralmış, morali bozuktur',
          'Kendisini işe yaramaz olarak görür',
          'Duyarlılıkları kendi depresyonlarına ve fonksiyon düzeylerine yönelmiştir',
          'Kendilerini soyutlama ile içe çekilme görülür',
          'Yüksek puanlar sıklıkla somatik belirtiler ve yakınmalarla bir arada bulunur',
          'Alt test 2\'de yükselme, kişinin o sıradaki işlev düzeyiyle ilgili rahatsızlığı ya da hoşnutsuzluğu hakkında bilgi verebilir',
          'Bu subjektif gerginlik anksiyete belirtisi olabileceği gibi gerçek bir depresif durumda olabilir'
        ],
        additionalNotes: [
          'Yüksek puanlar her zaman depresyon olarak tanımlanamaz, kişinin o an çevresinden gelen rahatsızlıklarını da yansıtabilir',
          'Değişme isteği ile birlikte iyi bir prognoz sağlar'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-79 T Puanı',
        description: 'Ciddi ve kendine güveni olmayan bireyleri gösterir. Klinik olarak belirgin depresyonu olan bireyi gösterir.',
        characteristics: [
          'Eğer o an durumsal baskılar yoksa ve özellikle L de yükselmiş ise bu bireyler, tipik olarak iyi ve kötü ya da doğru ve yanlış biçiminde düşünürler',
          'Bu bireyler en küçük bir şey karşısında bile endişe duyma eğilimi içindedirler',
          'Psikiyatrik hastalar bu ranjda yer alırlar',
          'Bu alanda bireyin yaşadığı huzursuzluk onun iyileşme için motive olduğunun göstergesidir'
        ],
        clinicalSignificance: 'Hastada depresyonun göstergeleri yoksa ve diğer alt testler yükselmemişse hastanın intihar eğilimi açısından değerlendirilmesi gerekmektedir'
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Bu bireylerde orta düzeyde depresyon, endişe ve karamsarlık göstergesi vardır.',
        characteristics: [
          'Bu duygudurum hali, durumsal bir krize bağlı olabileceği gibi kalıcı ve geri dönüşü olmayan bir durum da olabilir'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Bu bireyin yaşamında iyimserlik ve karamsarlık dengesini kurduğunun göstergesidir.',
        characteristics: [
          'Dengeli bir duygudurum hali vardır',
          'Yaşamda iyimserlik ve karamsarlık arasında denge kurmuştur'
        ]
      };
    } else {
      return {
        tScore,
        level: '28-44 T Puanı',
        description: 'Olasılıkla neşeli, meraklı, iyimser, aktif ve dışa dönüktürler.',
        characteristics: [
          'Bu durum bazen bu bireylerin kayıtsız gibi algılanmalarına neden olur',
          'Bu da diğerlerinde hostilite ortaya çıkarır'
        ],
        additionalNotes: [
          'Bakınız Si alt testinin düşüklüğü'
        ]
      };
    }
  }
}

/**
 * D Alt Testinde Yüksek Puan Alan Bir Birey (Graham 1987)
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
 * D Alt Testinde Düşük Puan Alan Birey
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
 * Alt Test 2 Tek Başına Yükselme Uyarısı
 */
export function getDAloneWarning(): string {
  return 'Alt test 2 tek başına T-70 değeri üzerinde bir yükselme görülüyorsa ve depresyona ilişkin açık davranışsal belirtiler yoksa, intihar riskine karşı dikkatli olmak gerekir.';
}

/**
 * Alt Test 2 Yorumlama Notu
 */
export function getDInterpretationNote(): string {
  return 'Alt test 2\'nin yorumlanması, birlikte yükselen diğer alt testlere göre değişmektedir. Depresyon çok farklı nedenlerden kaynaklanabilir ve bunlar ancak diğer alt testlerdeki yükselmelere bakılarak yorumlanabilir.';
}

// Geriye uyumluluk için export objesi
export const dScaleInterpretation = {
  getInterpretation: (tScore: number) => new DScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new DScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getDHighScoreCharacteristics,
  getLowScoreCharacteristics: getDLowScoreCharacteristics,
  getSpikeInterpretation: getDSpikeInterpretation,
  getAloneWarning: getDAloneWarning,
  getInterpretationNote: getDInterpretationNote,
  name: 'Depresyon (D)',
  number: 2,
  description: 'Depresyon belirtilerinin derecesini ölçmek amacıyla geliştirilmiştir. Depresyonda olan kişilerin ana belirtileri, karamsarlık, gelecekten ümitsizlik, kendini değersiz, işe yaramaz görme, suçluluk duyguları, hareketlerde ve düşüncede yavaşlama ve çeşitli bedensel yakınmalardır. Sıklıkla ölüm ve intiharlarla ilgili düşüncelerin yoğunluğu da dikkat çeker. Depresyon belirtileri başka birçok psikiyatrik tanı grubuna da eşlik edebilir.',
  itemCount: 60
};
