// Şizofreni (Sc) Alt Testi - Ölçek 8
// MMPI Klinik Ölçek - Şizofreni ve şizoid eğilimleri değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface ScScaleInterpretation {
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

export class ScScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş şizofreni ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): ScScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    // Kitapta Sc-Scale için açık kişisel faktör belirtilmemiş
    // Bu nedenle kişiselleştirilmiş notlar eklenmeyecek
    
    return baseInterpretation;
  }

  getInterpretation(tScore: number): ScScaleInterpretation {
    if (tScore >= 100) {
      return {
        tScore,
        level: '100 T Puanı Ve Üstü',
        description: 'Akut bozukluğun eşlik ettiği uzun süreli ciddi bir stresin sonucunda ortaya çıkar.',
        characteristics: [
          'Bu kişiler tipik olarak şizofren değildir',
          'Daha çok akut psikotik reaksiyon içine giren hastalardır',
          'Ayrıca kimlik krizindeki engellerle de bu ranja rastlanır',
          'T>95\'in üzerinde olan değerler akut durumsal stres ve ciddi özdeşim krizleri gösterir'
        ],
        clinicalSignificance: 'Akut psikotik reaksiyon - Kritik düzey'
      };
    } else if (tScore >= 75) {
      return {
        tScore,
        level: '75 T Puanı Ve Üstü',
        description: 'Yabancılaşma yaşayan ve doğru düşünemeyen bireyler tarafından verilir.',
        characteristics: [
          'Düşünce ve hareketlerde sıradan değildirler, olasılıkla sosyal açıdan çekiniktirler ve derin kişilerarası ilişki kuramazlar',
          'Kendilerinin kim olduğu konusunda oldukça bozuk düşünceleri vardır ve genellikle bu dünyaya ait olmadıklarını düşünürler',
          'İletişim kurmada sorunlar temeldir, dezorganize düşünceleri vardır ve bunların açık ve mantıklı düşünmesini engeller',
          'Bu bireylerin gerçek ile bağlantıları var gibi görünse de bu oldukça yüzeyseldir',
          'Kişilerarası ilişkiler yerine hayalleri ve fantezileri yeğlerler',
          'Aşağılık duyguları, kendinden hoşnutsuzluk ve yalnızlık duyguları içindedirler',
          'T puanı 80\'e yaklaştığında, mantıkla ve düşünmede tuhaflık belirginleşirler',
          'Gerçek şizoid düşünce süreci gözlenebilir',
          'Bunlara depresif özellikler ve psikomotor gerilime eşlik eder',
          'Bu davranışlar ve şizofrenik bir sürecin ya da şizoid bir uyumun ya da uzun süreli ciddi bir stresin sonucu olabilir'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-74 T Puanı',
        description: 'Bu yükselme değerlendirilirken profilin tümü ele alınmalıdır.',
        characteristics: [
          'Bir yükselmenin alt sınırında ve nevrotik profillerde yükselme varsa bu bireyin soyut konularla ilgilendiğini göstermektedir',
          'Eğer Si alt testi de yükselmişse diğerleri tarafından uzak ve anlaşılmaz kişiler olarak tanımlanmaktadır'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Normal aralık içinde değerler.',
        characteristics: [
          'Belirgin şizoid özellikler göstermez',
          'Uyumlu kişilik yapısı'
        ]
      };
    } else {
      return {
        tScore,
        level: '44 ve Altı T Puanı',
        description: 'Düşük puan alan bireyler.',
        characteristics: [
          'Arkadaşça, neşeli, duyarlı, güvenilirdir',
          'Dengeli, uyumludur',
          'Sorumluluk sahibidir, bağımlıdır',
          'İlişkilerde tutucudur, derin duygusal ilişkiler kurmaktan kaçınır',
          'İtaatkardır, uysal, otoriteyi açıkça kabul eder',
          'Temkinli ve geleneksel tutucudur, sorunlara yaklaşımında hayal gücünden yoksundur',
          'Pratiktir, somut düşünür',
          'Başarı, statü ve güçle ilgilidir',
          'Rekabet gerektiren durumlara girmekten gönülsüzdür'
        ]
      };
    }
  }
}

/**
 * Yüksek Sc Puanı Alan Bireyin Özellikleri (T: 80-100) (Graham 1987)
 */
export function getScHighScoreCharacteristics(): string[] {
  return [
    'Açık psikotik davranış gösterebilir',
    'Konfüzyonlardadır, dezorganize ve dezoryantedir',
    'Garip düşünce ve tutumları delüzyonları vardır',
    'Hallüsinasyonları vardır',
    'Yargılaması kötüdür',
    'Şizoid yaşam biçimi sergiler',
    'Kendini sosyal çevrenin dışında görür',
    'Kendini izole, yabancılaşmış, yanlış anlaşılmış hisseder',
    'Arkadaşları tarafından kabul görmediğini düşünür',
    'Yalnız ve ulaşılmazdır',
    'İnsanlarla ve yeni durumlarla karşılaşmaktan kaçınır',
    'Utangaç ve çekingendir',
    'Yaygın anksiyete yaşar',
    'Kendini öç alıcı, hostil, saldırgan hisseder',
    'Duygularını ifade edemez',
    'Strese, hayal ve fantezi dünyasına çekilerek tepki verir',
    'Gerçekle hayaliyi ayırma da sorun yaşar',
    'Kendi ile ilgili kuşkuları vardır',
    'Aşağılık, yetersizlik, tatminsizlik duyguları vardır',
    'Cinsellikle ilgili düşünsel uğraşları vardır, cinsel kimliğine ilişkin rol karmaşası yaşar',
    'Alışılmamış, olağandışı, garip ve tuhaftır',
    'Belirgin olmayan ve uzun süredir devam eden psikolojik sorunları vardır',
    'İnatçı, kaprisli, dik kafalıdır',
    'Cömert, sakin ve duygusaldır',
    'İmmatür ve impulsiftir',
    'Maceraperesttir',
    'Zekidir',
    'Vicdanlıdır',
    'Çok sinirlidir',
    'İlgi alanının genişliğine bağlı olarak dikkat toplaması güçtür',
    'Yaratıcıdır ve hayal gücü zengindir',
    'Soyut, belirsiz amaçları vardır',
    'Sorun çözümüne ilişkin temel bilgilerin farkında değildir'
  ];
}

/**
 * Düşük Sc Puanı Alan Bireyin Özellikleri
 */
export function getScLowScoreCharacteristics(): string[] {
  return [
    'Arkadaşça, neşeli, duyarlı, güvenilirdir',
    'Dengeli, uyumludur',
    'Sorumluluk sahibidir, bağımlıdır',
    'İlişkilerde tutucudur, derin duygusal ilişkiler kurmaktan kaçınır',
    'İtaatkardır, uysal, otoriteyi açıkça kabul eder',
    'Temkinli ve geleneksel tutucudur, sorunlara yaklaşımında hayal gücünden yoksundur',
    'Pratiktir, somut düşünür',
    'Başarı, statü ve güçle ilgilidir',
    'Rekabet gerektiren durumlara girmekten gönülsüzdür'
  ];
}

/**
 * Terapötik Özellikler (Yüksek Sc Puanı)
 */
export function getScTherapeuticCharacteristics(): string[] {
  return [
    'Psikoterapide prognozu kötüdür',
    'Terapistle anlamlı bir ilişki kurmak konusunda gönülsüzdür',
    'Pek çok hastadan daha uzun süre psikoterapide kalır',
    'Terapiste güven duyması zor olabilir',
    'Tıbbi yardım ve ilaç tedavisinde yararlanabilir'
  ];
}

/**
 * Genel Açıklama ve Madde Bilgisi
 */
export function getScScaleDescription(): string {
  return 'Madde sayısı 78. Şizofreni, bir aylık bir dönem boyunca bu sürenin önemli bir kesiminde hezeyanlar, hallüsinasyonlar, dezorganize konuşma, ileri derecede dezorganize ya da katatonik davranış, negatif semptomlar yani affektif donukluk, konuşamazlık belirtilerden ikisinin bulunmasıdır.';
}

/**
 * Ortalama Puanlar (K eklemeli - Savaşır verileri)
 */
export function getScScoreAverages(): { male: number; female: number } {
  return {
    male: 29.82,
    female: 31.06
  };
}

// Geriye uyumluluk için export objesi
export const scScaleInterpretation = {
  getInterpretation: (tScore: number) => new ScScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new ScScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getScHighScoreCharacteristics,
  getLowScoreCharacteristics: getScLowScoreCharacteristics,
  getTherapeuticCharacteristics: getScTherapeuticCharacteristics,
  getDescription: getScScaleDescription,
  getScoreAverages: getScScoreAverages,
  name: 'Şizofreni (Sc)',
  number: 8,
  description: getScScaleDescription()
};