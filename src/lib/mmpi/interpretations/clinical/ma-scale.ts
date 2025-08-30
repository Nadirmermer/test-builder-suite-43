// Hipomani (Ma) Alt Testi - Ölçek 9
// MMPI Klinik Ölçek - Hipomani dönemlerini değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface MaScaleInterpretation {
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

export class MaScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş hipomani ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadin';
    }
  ): MaScaleInterpretation {
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
        // Gençlerde Ma yüksekliği normal
        if (yas <= 25 && tScore >= 60) {
          personalizedNotes.push("Gençlerde daha yüksek olabilir. Bu düzeydeki puanlar lise ya da lise mezunu öğrencilerde çok sıktır, çünkü bu bireylerde enerji düzeyinin yüksek olması beklenen bir durumdur.");
        }

        // Ergenler için özel durum
        if (yas >= 13 && yas <= 17 && tScore >= 70) {
          personalizedNotes.push("Ergenlerde bu yükselme, artmış hareketliliği gösterir. İmpulsif ve kontrolsüzdürler. Grandiözite ve çağrışımlarında artmalar vardır. İletişim güçlükleri ve suça eğilim görülebilir.");
        }

        // Orta yaş ve üstünde yüksek Ma
        if (yas >= 45 && tScore >= 70) {
          personalizedNotes.push("Orta yaş ve üstünde yüksek Ma puanları daha dikkat çekicidir ve değerlendirilmesi gerekir.");
        }

        // Yaşlılarda düşük Ma normal
        if (yas >= 65 && tScore <= 44) {
          personalizedNotes.push("Yaşlı insanlarda 9'un düşüklüğü beklenen bir durumdur, normal yaşlanma sürecini gösterir.");
        }

        // 45 yaş altında düşük Ma anormal
        if (yas < 45 && tScore <= 44) {
          personalizedNotes.push("45 yaş altında düşük olması beklenen bir durum değildir ve dikkat edilmesi gerekir.");
        }
      }
    }

    // Eğitim durumu faktörü
    if (personalInfo.egitimDurumu && ['Lise'].includes(personalInfo.egitimDurumu) && tScore >= 60) {
      personalizedNotes.push("Eğitim düzeyi etkili olabilir. Lise düzeyinde eğitim görmüşlerde yüksek enerji düzeyi daha normal kabul edilir.");
    }

    // Cinsiyet farkları genel olarak belirtilmiş
    if (personalInfo.cinsiyet && tScore >= 60) {
      personalizedNotes.push("Cinsiyete göre farklılık gösterebilir. Erkeklerde ortalama 19.96, kadınlarda ortalama 19.72 olarak bulunmuştur.");
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): MaScaleInterpretation {
    if (tScore >= 85) {
      return {
        tScore,
        level: '85 T Puanı Ve Üstü',
        description: 'Ajitasyon ya da manik dönem olabilir. Birey hiperaktiftir, davranışları yordanamaz, fikir uçuşmaları vardır.',
        characteristics: [
          'Kendilik değerlerini abartır',
          'Hiperaktivite',
          'Fikir uçuşmaları',
          'Yordanamaz davranışlar'
        ],
        clinicalSignificance: 'Manik episod - Kritik düzey'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-84 T Puanı',
        description: 'Enerjik, konuşkan, eylemi düşünceye tercih eden kişilerdir. İlgileri çok geniş bir alana yayılmıştır ve hemen gerçekleştirmek istedikleri çok sayıda projeleri vardır.',
        characteristics: [
          'Bu kişilerin çoğunda aktivite ve güç, abartılı düzeyde yüksektir, ancak projelerini tamamlayamazlar',
          'Tipik olarak davranışlarını, düşmanlık duygularını ve öfkelerini kontrol edemezler',
          'Gerçek manik özellik gösterebilirler fikir uçuşması, duygu durumda kaymalar ve değişmeler, büyüklük sanrıları ve hiperaktivite gibi'
        ]
      };
    } else if (tScore >= 60) {
      if (tScore >= 70) {
        return this.getInterpretation(tScore); // Bu durumda yukarıdaki case'e girer
      } else if (tScore >= 60) {
        return {
          tScore,
          level: '60-69 T Puanı',
          description: 'Hoş, enerjik, meraklı, sosyal, kolay ilişki kuran, ilgi alanları geniş kişilerdir.',
          characteristics: [
            'Bu hallerinden kendileri de memnundur',
            'İyimserlik, bağımsızlık ve kendine güven vardır'
          ]
        };
      }
    }
    
    if (tScore >= 60 && tScore <= 75) {
      return {
        tScore,
        level: '60-75 T Puanı',
        description: 'Enerjik, dışadönük ve aktif bireyleri gösterir. Bunlar diğerleri tarafından hoş ve yeterli olarak görülürler.',
        characteristics: [
          'Bu düzeydeki puanlar lise ya da lise mezunu öğrencilerde çok sıktır, çünkü bu bireylerde enerji düzeyinin yüksek olması beklenen bir durumdur',
          'Bu düzeyde puan alan kişiler onay ve statü kazanmak için çaba harcarlar',
          'Düşünce ve davranışlarında özgür olma eğilimleri vardır'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Normal aralığıdır. Puan normal aralıktan yükseldikçe mani düzeyinin arttığı düşünülür.',
        characteristics: [
          'Bu şekilde, puanlardaki artış maniye, giderek hipermaniye işaret eder',
          'Manik hastalar davranışlarından kolaylıkla tanınabildiği için, alt test daha çok ortalarda puan alan hastaların teşhisinde yardımcı olabilir'
        ]
      };
    } else {
      return {
        tScore,
        level: '21-44 T Puanı',
        description: 'Düşük enerji düzeyi, güdü azlığı ve hatta apatiyi gösterir. Bu geçici yorgunluk ya da hastalığa işaret etmektedir.',
        characteristics: [
          'Düşük puanların çoğunluğu, kronik açıdan düşük enerji düzeyinin belirtisidir',
          'Bireylerin kendilerine güvenleri azdır ve amaçları genellikle yoktur',
          'Sabahları kalkmak istemezler ve herhangi bir proje başlamakta kendilerini aşırı çaba göstermek zorunda hissederler',
          'Özellikle 2 alt testinin yükselmediği durumlarda depresyon düşünülmelidir'
        ],
        additionalNotes: [
          'Yaşlı insanlarda 9\'un düşüklüğü beklenen bir durumdur, normal yaşlanma sürecini gösterir',
          '45 yaş altında düşük olması beklenen bir durum değildir ve dikkat edilmesi gerekir'
        ]
      };
    }
  }
}

/**
 * Yüksek Ma Puanı Alan Bireyin Özellikleri
 */
export function getMaHighScoreCharacteristics(): string[] {
  return [
    'Manik dönemde olabilir',
    'Aşırı, amaçsız aktiviteler gösterebilir',
    'Konuşması hızlanmıştır',
    'Hallüsinasyonları, büyüklük delüzyonları olabilir',
    'Duygusal açıdan labildir',
    'Konfüze olabilir',
    'Fikir uçuşmaları gösterebilir',
    'Enerjik ve konuşkandır',
    'Hareketi düşünceye tercih eder',
    'Geniş ilgi alanları vardır, pek çok aktiviteye girer',
    'Enerjisini uygun kullanmaz, projeleri tamamlayamaz',
    'Yaratıcı, girişken ve beceriklidir',
    'Ayrıntılara çok az ilgi gösterir',
    'Çabuk sıkılır, huzursuzdur, engellenme eşiği düşüktür',
    'İmpulslarını engellemede güçlüğü vardır',
    'Sinirlilik, hostilite dönemleri, agresif patlamaları olur',
    'Gerçekçi olmayan bir iyimserlik içindedir',
    'Büyük emellere sahiptir',
    'Kendi değerini de önemini abartır',
    'Kendi yeteneklerinin sınırlarını görmez',
    'Açık yürekli ve sosyaldir',
    'Diğer insanlarla olmayı sever',
    'İlk bakışta bıraktığı izlenim iyidir',
    'Arkadaş canlısıdır',
    'Kendine aşırı güvenir',
    'İnsan ilişkileri yüzeyseldir',
    'Manipulatif, aldatıcı ve güvenilmezdir',
    'Tatminsizlik duyguları gösterir',
    'Kendini üzgün, gergin, endişeli, kaygılı hisseder',
    'Depresyon epizodları olabilir',
    'Ajitedir, endişeye eğilimlidir',
    'Kendini yönlendiren ebeveynlerine karşı olumsuz duyguları vardır',
    'Okulda ya da işte sorunları vardır, suça yönelik davranışlar gösterir',
    'Kadınsa, geleneksel kadınlık rolünü reddedici olabilir',
    'Erkekse, homoseksüel dürtülerden endişe duyar',
    'Terapide prognozu kötüdür',
    'Psikoterapide çalışma direnç gösterir',
    'Psikoterapiye düzensiz aralıklarla gelir',
    'Psikoterapiyi erken sonlandırır',
    'Sorunları stereotipik bir biçimde tekrarlar',
    'Terapiste bağımlı olmayı sevmez',
    'Terapiste hostil ve agresif olabilir'
  ];
}

/**
 * Düşük Ma Puanı Alan Bireyin Özellikleri
 */
export function getMaLowScoreCharacteristics(): string[] {
  return [
    'Düşük enerji ve aktivite seviyesi vardır',
    'Uyuşuk, apatik, kayıtsızdır',
    'Motive etmesi güçtür',
    'Kronik yorgunluk, fiziksel tükenmişlik hisseder',
    'Deprese, anksiyeteli ve gergindir',
    'Güvenilir ve sorumluluk sahibidir',
    'Sorunlara pratik ve mantıksal bir biçimde yaklaşır',
    'Kendine güvensizdir',
    'Samimi, sakin ve alçak gönüllüdür',
    'İçeçekilmiş, ketumdur',
    'Başkalarınca pek tanınmaz',
    'Aşırı kontrollüdür, duygularını açıkça ortaya koymak istemez',
    'Erkekse ev ve ailesi ile ilgilidir, düzen kurmayı sever',
    'Hastanede yatan psikiyatrik hastaysa prognozu iyidir'
  ];
}

/**
 * Sadece Ma Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getMaSpikeInterpretation(): string {
  return 'Yalnızca alt test 9\'u kullanarak bir yoruma gitmek güçtür. Diğer klinik alt testlerdeki yükselmelerle bu enerji artışın nedeni araştırılmalıdır. Alt test 9\'la birlikte yükseltmiş bir hastadan farklıdır. Bunlara ek olarak beyin hasarı olan bir hasta hiperaktivite ve tepkisel davranışlar gösterebilir. Yine bu hastalarda duygusal tepkiler depresyon şeklinde ortaya çıkabilir.';
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getMaScaleDescription(): string {
  return 'Madde sayısı 48. Hipomani olağandışı ve sürekli, taşkın ya da huzursuz bir duygudurum döneminin en az bir haftadır olmasıdır.';
}

/**
 * Ortalama Puanlar (K Eklemeli - Savaşır verileri)
 */
export function getMaScoreAverages(): { male: number; female: number } {
  return {
    male: 19.96,
    female: 19.72
  };
}

/**
 * Ma Ölçeği Yorumlama Uyarıları
 * Kitaptan alınan bilgilere dayanarak
 */
export function getMaInterpretationWarnings(): string[] {
  return [
    'Yalnızca alt test 9\'u kullanarak bir yoruma gitmek güçtür.',
    'Diğer klinik alt testlerdeki yükselmelerle bu enerji artışın nedeni araştırılmalıdır.',
    'Alt test 9\'la birlikte yükseltmiş bir hastadan farklıdır.',
    'Beyin hasarı olan bir hasta hiperaktivite ve tepkisel davranışlar gösterebilir.',
    'Bu hastalarda duygusal tepkiler depresyon şeklinde ortaya çıkabilir.'
  ];
}

// Geriye uyumluluk için export objesi
export const maScaleInterpretation = {
  getInterpretation: (tScore: number) => new MaScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new MaScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getMaHighScoreCharacteristics,
  getLowScoreCharacteristics: getMaLowScoreCharacteristics,
  getSpikeInterpretation: getMaSpikeInterpretation,
  getDescription: getMaScaleDescription,
  getScoreAverages: getMaScoreAverages,
  name: 'Hipomani (Ma)',
  number: 9,
  description: getMaScaleDescription()
};