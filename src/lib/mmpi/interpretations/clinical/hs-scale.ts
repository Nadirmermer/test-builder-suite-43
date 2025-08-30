﻿// Hipokondriyazis (Hs) Alt Testi - Ölçek 1
// MMPI Klinik Ölçek - Hipokondriyak bireylerin kişilik özelliklerini değerlendirmek amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface HsScaleInterpretation {
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

export class HsScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş hipokondriyazis ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadin';
    }
  ): HsScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Yaş faktörü (kitapta açık belirtilen tek faktör)
    if (personalInfo.dogumTarihi) {
      const yas = hesaplaYas(personalInfo.dogumTarihi);
      
      if (yas !== null) {
        // 40 yaş üstü için açık belirtilen durum
        if (yas > 40 && tScore >= 60) {
          personalizedNotes.push("Hs alt testinin 40 yaşın üzerindekilerde daha çok yükseldiği belirtilmektedir.");
          personalizedNotes.push("Bu yaş grubunda yüksek puanlar daha normal kabul edilebilir.");
        }
        
        // Genç grup için açık belirtilen durum
        if (yas <= 30 && tScore >= 60) {
          personalizedNotes.push("Genç grupta Hs alt testi daha düşük olduğu belirtilmektedir.");
          personalizedNotes.push("Bu yaş grubunda yüksek puanlar daha dikkat çekicidir.");
        }
      }
    }

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): HsScaleInterpretation {
    if (tScore > 84) {
      return {
        tScore,
        level: '84\'ün Üzerinde T Puanı',
        description: 'Yakınmaları bütün organ sistemlerine yayılmış olan kişilerde görülür.',
        characteristics: [
          'Ağrı, yorgunluk ve güçsüzlük sıklıkla vardır',
          'Somatik ilgiler somatik delüzyonlara dönmüş demektir',
          'Bu belki de şizofrenik bir epizodun başlangıcıdır'
        ],
        clinicalSignificance: 'Şizofrenik episod başlangıcı olabilir - Kritik düzey'
      };
    } else if (tScore >= 75) {
      return {
        tScore,
        level: '75-84 T Puanı',
        description: 'Bedensel yakınmalar ile çok fazla uğraşan bireylerde ortaya çıkmaktadır.',
        characteristics: [
          'Genel olarak iş yapma istekleri azalmıştır',
          'Yakınmalarının bedensel kaynağını sürekli bir biçimde araştırırlar',
          'Sıklıkla benmerkezcilik ve narsisistiklerdir',
          'Sürekli şikâyet eder ve sızlanırlar',
          'Yakınmalarını diğerlerine kabul ettirme eğilimleri çok fazladır',
          'Bu nedenle aşırı talep edici bir tutum içindedirler',
          'Çevresindekileri rahatsız ederek öfkelerini ortaya çıkarırlar',
          'Tipik olarak inatçı, kötümser, genel olarak yaşamda mutsuz, tutkusuzdurlar ve güdülenmemişlerdir'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-74 T Puanı',
        description: 'Bu puanlar sıklıkla bu kişilerin hem şimdiki, hem de geçmiş yaşantıda fiziksel bozukluk gösterdiğine işaret etmektedir ve bu yükselmeye sıklıkla D alt testindeki yükselme eşlik eder.',
        characteristics: [
          'Sağlık konularına bu ilgi, basit olarak yapıcı bir ilgi olabilir ya da sağlığa aşırı duyarlılığı temsil eder',
          'Böyle kişiler kötümser olmaya ve yaşamlarını sıkıcı hale getirmeye eğilimlidirler'
        ],
        additionalNotes: [
          'Bedensel hastalığı olan bireylerde 85 T puanının üstünde bir yükselme bu bireylerin yaşadıkları güçsüzlüklere aşırı tepki verdiklerini ve kabul edilmez dürtülerini somatizasyon ile ifade ettiklerini göstermektedir'
        ]
      };
    } else if (tScore >= 50) {
      return {
        tScore,
        level: '50-59 T Puanı',
        description: 'Bu kişilerin beden konuları ile aşırı ilgilenmediği ve 2,6,7,8 ya da 0 alt testi 70\'in üstüne yükselmediği zaman günlük yaşam aktivitelerini yerine getirdiği söylenebilir.',
        characteristics: [
          'Bu kişiler sıklıkla yetenekli, sorumluluk sahibi, vicdanlı, dikkatli ve yargılamaları iyi olan kişilerdir',
          'Spesifik tıbbi hastalığı olan bireyler bu alanda yer almaktadır'
        ]
      };
    } else {
      return {
        tScore,
        level: '21-49 T Puanı',
        description: 'Bu durum şu kişilerde görülebilir. (a) Hastalığın hiç konu olmadığı ailelerde yetişen bireyler. (b) Şimdiye kadar hiç ağrı, acı ya da hastalık geçirmediği ile övünen kişilerde.',
        characteristics: [
          'Ayrıca bu kişiler hipokondriyak olarak hastalarını manipulatif bir yolla kullanan aile üyeleriyle yakından ilişkili olabilir, ancak burada normal acı ve ağrılarda inkâr edilir',
          'Özelliği olan bir örüntüde 2,6,7,8 ya da 0 alt testlerinin 70\'in üzerinde yer aldığı bir durumdur',
          'Çünkü bu konfigürasyonda düşük Hs alt testi sıklıkla birisinin bedeni ile ilgisinin olmadığını gösterir',
          'Bedensel yakınmaları ve genel sağlık durumları ile çok az ilgilenen kişilerdir',
          'Genellikle uyanık, iyimser, yeterli ve yaşamda etkin olan kişilerdir'
        ]
      };
    }
  }
}

/**
 * Yüksek Hs Puanı Alan Bireyin Özellikleri (Graham 1987)
 */
export function getHsHighScoreCharacteristics(): string[] {
  return [
    'Aşırı bedensel uğraşları vardır',
    'Somatik delüzyonlar (eğer T>80) görülebilir',
    'Somatik semptomlar genellikle belirsizdir, eğer belirginse temelde mide ve karın bölgesine ilişkindir',
    'Kronik yorgunluk, ağrı ve güçsüzlükten yakınır',
    'Somatoform, depresyon yada anksiyete bozukluğu tanısı konulabilir',
    'Açık anksiyete belirtisi göstermez',
    'Kendisine odaklaşmış, bencil, narsisistiktir',
    'Karamsar, yıkıcı, alaycı bir yapısı vardır',
    'Doyumsuz ve mutsuzdur',
    'Diğerlerini bıktırır, yakınır, sızlanır',
    'Diğerlerine bağımlı ve eleştiricidir',
    'Düşmanlığını dolaylı yollardan ifade eder',
    'Psikopatik davranışları azdır',
    'Donuk ve ilgisizdir',
    'Sözelleştirmede başarısızdır',
    'Uzun süreden beri devam eden sorunları vardır',
    'Uyumunda herhangi bir bozukluk olmamasına karşın, etkinliği azalmış gibi davranır',
    'Semptomları için tıbbi açıklamalar ve tedaviler ister',
    'Psikoterapi ya da danışmanlığa içgörü eksikliği ve alaycı tavrıyla çok iyi yanıt vermez',
    'Terapisti eleştirir',
    'Terapistin kendine ilgi ve desteği vermediğini düşündüğünde terapiyi sonlandırma eğilimindedir'
  ];
}

/**
 * Düşük Hs Puanı Alan Bireyin Özellikleri
 */
export function getHsLowScoreCharacteristics(): string[] {
  return [
    'Somatik uğraşları yoktur',
    'İyimserdir',
    'Duyarlıdır',
    'İç görüsü vardır',
    'Günlük yaşamda oldukça etkindir'
  ];
}

/**
 * Sadece Hs Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getHsSpikeInterpretation(): string {
  return 'Bu hastalar belirsiz fiziksel yakınmalar getirir ve bunları diğer kişileri kontrol ve manipüle etmek için kullanırlar. Bu hastalar her şeyi kötü gören, sızlanan, ilgi çekmek isteyen kişilerdir ve genellikle olumsuz ve karasızdırlar. Bu hastalara müdahaleler genellikle fazla güven vermez.';
}

/**
 * Ek Klinik Bilgiler
 */
export function getHsClinicalNotes(): string[] {
  return [
    'Ciddi bedensel hastalığı olan bireylerde de bu alt testte yükselme vardır, ancak bu psikiyatrik hastalar kadar yüksek değildir',
    'Hipokondriyak tanısı konulan hastaların semptomları uzun sürelidir, değişmeye dirençlidir ve bu, artık strese tepkiden farklı bir şeydir',
    'Bu bireyler önerilen tedaviyi uygulamaz ve sık sık doktor doktor gezerler',
    'Hs alt testinin 40 yaşın üzerindekilerde daha çok yükseldiği ancak genç grupta daha düşük olduğu belirtilmektedir'
  ];
}

// Geriye uyumluluk için export objesi
export const hsScaleInterpretation = {
  getInterpretation: (tScore: number) => new HsScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new HsScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getHsHighScoreCharacteristics,
  getLowScoreCharacteristics: getHsLowScoreCharacteristics,
  getSpikeInterpretation: getHsSpikeInterpretation,
  getClinicalNotes: getHsClinicalNotes,
  name: 'Hipokondriyazis (Hs)',
  number: 1,
  description: 'Hipokondriyak bireylerin kişilik özelliklerini değerlendirmek amacıyla geliştirilmiştir. Bilindiği gibi hipokondriazis kişinin vücut semptomlarını yanlış yorumlamasına bağlı olarak ciddi bir hastalığı olacağı korkusunu ya da ciddi bir hastalığı olduğu düşüncesini taşıyıp durmasıdır. Bunlar bedensel hiçbir hastalıkları olmadığı halde birçok hastalık belirtisini kendilerinde bulur ve endişelenirler.'
};