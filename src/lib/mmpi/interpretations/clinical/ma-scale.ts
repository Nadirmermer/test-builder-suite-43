// Hipomani (Ma) Alt Testi - Ölçek 9
// MMPI Klinik Ölçek - Hipomani olağandışı ve sürekli, taşkın ya da huzursuz bir duygudurum döneminin en az bir haftadır olmasıdır

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
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): MaScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Yaş faktörü (kitapta açık belirtilen)
    if (personalInfo.dogumTarihi && tScore >= 70) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null && yas < 18) {
        personalizedNotes.push("Ergenlerde bu yükselme, artmış hareketliliği gösterir.");
        personalizedNotes.push("İmpulsif ve kontrolsüzdürler.");
        personalizedNotes.push("Grandiözite ve çağrışımlarında artmalar vardır.");
        personalizedNotes.push("İletişim güçlükleri ve suça eğilim görülebilir.");
      }
    }

    // Yaş faktörü (kitapta açık belirtilen)
    if (personalInfo.dogumTarihi && tScore < 45) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null && yas > 45) {
        personalizedNotes.push("Yaşlı insanlarda 9'un düşüklüğü beklenen bir durumdur, normal yaşlanma sürecini gösterir.");
      } else if (yas !== null && yas <= 45) {
        personalizedNotes.push("45 yaş altında düşük olması beklenen bir durum değildir ve dikkat edilmesi gerekir.");
      }
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
        description: 'Ajitasyon ya da manik dönem olabilir.',
        characteristics: [
          'Birey hiperaktiftir, davranışları yordanamaz',
          'Fikir uçuşmaları vardır',
          'Kendilik değerlerini abartır'
        ],
        clinicalSignificance: 'Manik dönem - Hiperaktivite ve yordanamaz davranışlar'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-84 T Puanı',
        description: 'Enerjik, konuşkan, eylemi düşünceye tercih eden kişilerdir.',
        characteristics: [
          'İlgileri çok geniş bir alana yayılmıştır',
          'Hemen gerçekleştirmek istedikleri çok sayıda projeleri vardır',
          'Bu kişilerin çoğunda aktivite ve güç, abartılı düzeyde yüksektir',
          'Ancak projelerini tamamlayamazlar',
          'Tipik olarak davranışlarını, düşmanlık duygularını ve öfkelerini kontrol edemezler',
          'Gerçek manik özellik gösterebilirler',
          'Fikir uçuşması, duygu durumda kaymalar ve değişmeler, büyüklük sanrıları ve hiperaktivite gibi'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-75 T Puanı',
        description: 'Enerjik, dışadönük ve aktif bireyleri gösterir.',
        characteristics: [
          'Bunlar diğerleri tarafından hoş ve yeterli olarak görülürler',
          'Bu düzeydeki puanlar lise ya da lise mezunu öğrencilerde çok sıktır',
          'Çünkü bu bireylerde enerji düzeyinin yüksek olması beklenen bir durumdur',
          'Bu düzeyde puan alan kişiler onay ve statü kazanmak için çaba harcarlar',
          'Düşünce ve davranışlarında özgür olma eğilimleri vardır'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Normal aralığıdır.',
        characteristics: [
          'Puan normal aralıktan yükseldikçe mani düzeyinin arttığı düşünülür',
          'Bu şekilde, puanlardaki artış maniye, giderek hipermaniye işaret eder',
          'Manik hastalar davranışlarından kolaylıkla tanınabildiği için, alt test daha çok ortalarda puan alan hastaların teşhisinde yardımcı olabilir'
        ]
      };
    } else {
      return {
        tScore,
        level: '21-44 T Puanı',
        description: 'Düşük enerji düzeyi, güdü azlığı ve hatta apatiyi gösterir.',
        characteristics: [
          'Bu geçici yorgunluk ya da hastalığa işaret etmektedir',
          'Düşük puanların çoğunluğu, kronik açıdan düşük enerji düzeyinin belirtisidir',
          'Bireylerin kendilerine güvenleri azdır ve amaçları genellikle yoktur',
          'Sabahları kalkmak istemezler ve herhangi bir proje başlamakta kendilerini aşırı çaba göstermek zorunda hissederler',
          'Özellikle 2 alt testinin yükselmediği durumlarda depresyon düşünülmelidir'
        ]
      };
    }
  }
}

/**
 * Ma Alt Testinde Yüksek Puan Alan Bir Birey
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
    'Psikoterapide oruma direnç gösterir',
    'Psikoterapiye düzensiz aralıklarla gelir',
    'Psikoterapiyi erken sonlandırır',
    'Sorunları stereotipik bir biçimde tekrarlar',
    'Terapiste bağımlı olmayı sevmez',
    'Terapiste hostil ve agresif olabilir'
  ];
}

/**
 * Ma Alt Testinde Düşük Alan Bir Birey
 */
export function getMaLowScoreCharacteristics(): string[] {
  return [
    'Düşüş enerji ve aktivite seviyesi vardır',
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
 * Ma Alt Testi Genel Özellikleri
 */
export function getMaGeneralCharacteristics(): string[] {
  return [
    'Hipomani olağandışı ve sürekli, taşkın ya da huzursuz bir duygudurum döneminin en az bir haftadır olmasıdır'
  ];
}

// Geriye uyumluluk için export objesi
export const maScaleInterpretation = {
  getInterpretation: (tScore: number) => new MaScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new MaScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getMaHighScoreCharacteristics,
  getLowScoreCharacteristics: getMaLowScoreCharacteristics,
  getSpikeInterpretation: getMaSpikeInterpretation,
  getGeneralCharacteristics: getMaGeneralCharacteristics,
  name: 'Hipomani (Ma)',
  number: 9,
  description: 'Hipomani olağandışı ve sürekli, taşkın ya da huzursuz bir duygudurum döneminin en az bir haftadır olmasıdır.',
  itemCount: 48
};