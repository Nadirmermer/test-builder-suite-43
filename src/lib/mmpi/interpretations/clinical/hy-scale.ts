// Histeri (Hy) Alt Testi - Ölçek 3
// MMPI Klinik Ölçek - Nevrotik bozuklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir

import { hesaplaYas, MedeniDurum, EgitimDurumu } from '@/types';

export interface HyScaleInterpretation {
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

export class HyScale {
  /**
   * Kişisel bilgileri dahil eden gelişmiş histeri ölçeği yorumlaması
   */
  getPersonalizedInterpretation(
    tScore: number,
    personalInfo?: {
      dogumTarihi?: string;
      medeniDurum?: MedeniDurum;
      egitimDurumu?: EgitimDurumu;
      cinsiyet?: 'Erkek' | 'Kadın';
    }
  ): HyScaleInterpretation {
    // Temel yorumu al
    const baseInterpretation = this.getInterpretation(tScore);
    
    if (!personalInfo) {
      return baseInterpretation;
    }

    // Kişiselleştirilmiş notları oluştur
    const personalizedNotes: string[] = [];

    // Bu alt testte kitapta açık belirtilen yaş, eğitim, medeni hal veya cinsiyet faktörleri bulunmamaktadır
    // Sadece T puanı aralıklarına göre yorumlama yapılmaktadır

    return {
      ...baseInterpretation,
      personalizedNotes: personalizedNotes.length > 0 ? personalizedNotes : undefined
    };
  }

  getInterpretation(tScore: number): HyScaleInterpretation {
    if (tScore >= 85) {
      return {
        tScore,
        level: '85 T Puanı Ve Üstü',
        description: 'Aşırı immatür, benmerkezcil ve bağımlı kişilerdir.',
        characteristics: [
          'Bastırma, savunma mekanizmasını kullanmaları şaşırtıcıdır',
          'Bu iç görü eksikliğinin olduğunun göstergesidir',
          'Semptomlar gerçek organik patolojiye uymamaktadır',
          'Genellikle kroniktir'
        ],
        clinicalSignificance: 'Aşırı immatürite ve benmerkezcilik - Kritik düzey'
      };
    } else if (tScore >= 76) {
      return {
        tScore,
        level: '76-85 T Puanı',
        description: '70-75 T puanında bildirilen özelliklere ek olarak bu bireyler uzun süredir devam eden gerginliğe bağlı konversif semptomlar geliştirmişlerdir.',
        characteristics: [
          'Semptomlar baş ağrısı, sırt ağrısı, göğüs ağrısı, zayıflık, baş dönmesi ve baygınlıktır',
          'Uzun süredir devam eden güven duymama, immatürite ve organize olmuş bedensel yakınmaları vardır'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: '70-75 T Puanı',
        description: 'Birey bastırma ve inkarı çok fazla kullanan, çok fazla itaat eden(uyan), saf ve çocuksu biçimde benmerkezcil, anksiyete ile bağlantılı somatik yakınmaları olan ya da bunların hepsine sahip bir kişidir.',
        characteristics: [
          'Histeroid mekanizmaları kullanır ve destek isteyebilirler',
          'Çok aktif iç görüleri oldukça azdır',
          'Bu bireylerin bazıları, açık bir biçimde teşhirci ve seksüel ya da saldırganlık düzeyinde dışavuran davranışları olabilir',
          'Bu sırada inkar ve bastırmayı aşırı bir biçimde kullanırlar',
          'Sevilmeye olan güçlü gereksinime bağlı olarak bağlanma gerektiren durumlarda verdikleri ilk tepki genellikle coşkulu olacaktır',
          'Ancak, hemen ya da daha sonra, kendilerinden istenen konusunda kızgın ve kinci olurlar',
          'Genellikle pasif biçimde dirençlidirler, sızlanıp yakınırlar',
          'Kendilerini bu durumdan uzaklaştıracak somatik şikayetleri olur'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: '60-69 T Puanı',
        description: 'Burada iki farklı örüntü vardır:',
        characteristics: [
          'Eğer Hs\'nin yükselmesi Hy ile aynı düzeyde ise ve D alt testi, 1 ve 3 alt testinden 10 T puanı düşük ise histerik kişiye işaret etmektedir',
          'Stres sırasında somatizasyona sığınma görülebilir',
          'Eğer Hy alt testi Hs alt testinde 10 T puanın yüksekse histerik özellikler belirgindir',
          'Bu bireyler kendine odaklaşmıştır, kendilerini olduğundan farklı ve mükemmel kişiler olarak görmek isterler',
          'Kişilerarası ilişkilerde iç görü azlığı vardır'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: '45-59 T Puanı',
        description: 'Bu alana özgü bir tanımlama yoktur.',
        characteristics: [
          'Bu T puanı aralığında özel bir tanımlama bulunmamaktadır'
        ]
      };
    } else {
      return {
        tScore,
        level: '24-44 T Puanı',
        description: 'Kendilerini sürekli eleştirirler.',
        characteristics: [
          'Olumlu kişilerarası ilişkileri inkar etme eğilimi vardır',
          'Si alt testinde yükselme, bireyin diğer insanlardan kaçma eğiliminde olduğunu göstermektedir'
        ]
      };
    }
  }
}

/**
 * Hy Alt Testinde Yüksek Puan Alan Birey
 */
export function getHyHighScoreCharacteristics(): string[] {
  return [
    'Strese fiziksel semptomlar geliştirerek tepki verir ve sorumluluktan kaçar',
    'Baş ağrısı, göğüs ağrıları, taşikardi, anksiyete atakları vardır',
    'Semptomlar bir görünür, bir kaybolur. Semptomlarının nedenlerine ilişkin iç görü azdır',
    'Kendi güdü ve duygularını anlamaz',
    'Üzüntüye eğilimlidir',
    'Gerginlik, anksiyete, depresyon belirtileri göstermez',
    'Nadiren delüzyonlar, hallüsinasyonlar, hezeyanlardan yakınır',
    'Psikotik tanısı konulamaz',
    'Eğer psikiyatrik hastaysa sıklıkla konversiyon bozukluğu tanısı konulur',
    'Psikolojik açıdan gelişmemiş, çocuksu ve immatürdür',
    'Kendine odaklıdır, narsisistir, ben-merkezcildir',
    'Diğerlerinden ilgi ve sevgi bekler',
    'İlgi ve sevgiyi alabilmek için dolaylı ve baştan çıkarıcı yollar kullanır',
    'Hostilite ve kızgınlığını açık olarak ifade etmez',
    'Sosyal açıdan katılımcıdır',
    'Dost canlısı, konuşkan, gayretli ve ataktır',
    'Kişilerarası ilişkilerde yüzeysel ve çocuksudur',
    'İnsanlarla kendi çıkarları için ilgilenir',
    'Zaman zaman önemsemediği ve anlamaya çalışmadığı cinsel açıdan eyleme vuruk davranışlar sergiler',
    'Başlangıçta tedaviye isteklidir',
    'Doğrudan verilen akıl ya da önerilere uyar',
    'Kendi davranışının nedenlerine ilişkin iç görü kazanması yavaştır',
    'Psikolojik yorumlara ve tedaviye dirençlidir',
    'Okulda ya da işte başarısız olacağına ilişkin endişe taşır',
    'Evlilikle ilgili mutsuz yaşantıları vardır',
    'Sosyal grup tarafından kabul görmediği hissini duyar',
    'Otorite figürleriyle sorunu vardır',
    'Aile öyküsünde reddedici baba figürü bulunur'
  ];
}

/**
 * Hy Alt Testinde Düşük Puan Alan Birey
 */
export function getHyLowScoreCharacteristics(): string[] {
  return [
    'Temkinli, geleneksel ve uysaldır',
    'Maceracı ve çalışkan değildir',
    'İlgi alanları daralmıştır',
    'Sosyal kalıtımı sınırlıdır',
    'Lider olma rolünden kaçar',
    'Arkadaş canlısı değildir, anlaşılması zor biridir',
    'Kuşkucudur, diğer insanlara güvenmez',
    'Gerçekçidir, mantıklıdır, sorunları aşama aşama çözer'
  ];
}

/**
 * Sadece Hy Alt Testinin Yükselmesi (Spike) Yorumu
 */
export function getHySpikeInterpretation(): string {
  return 'Sadece 3\'ün yüksek olduğu ve diğer hiçbir alt testin 70 T puanının üstünde olmadığı durumda, bireyin kabul edilme ve sevilmeye gereksinimi fazladır. Ait olduğu grup tarafından reddedilme olasılığına yönelik endişe yaşar, kızgınlık ve kendini ortaya koymayı içerme yüzleşme durumlarıyla (akademik ortamlar gibi) uğraşırken çok rahatsız olur. Tartışmada iyimserliklerini ve diğer insanlarla olan iyi ilişkilerini vurgularlar ve kendilerinde doğal olmayan ya da sapkın davranışları en aza indirgerler.';
}

/**
 * Hy Alt Testi Genel Özellikleri
 */
export function getHyGeneralCharacteristics(): string[] {
  return [
    'Fizik bir neden olmadan bir organının işlevinin kaybedilmesi biçiminde bir hastalıktır',
    'Genel bir çocuksuluk, çabuk sinirlenme, neşelenme, psikolojik semptomları ret, sorumluluktan kaçma gibi özellikleri vardır',
    'Bu grup hastalarda ikincil kazançlar çok fazladır',
    'MMPI\'da çok değişik tipte soruların toplandığı bir alt testtir'
  ];
}

// Geriye uyumluluk için export objesi
export const hyScaleInterpretation = {
  getInterpretation: (tScore: number) => new HyScale().getInterpretation(tScore),
  getPersonalizedInterpretation: (tScore: number, personalInfo?: any) => new HyScale().getPersonalizedInterpretation(tScore, personalInfo),
  getHighScoreCharacteristics: getHyHighScoreCharacteristics,
  getLowScoreCharacteristics: getHyLowScoreCharacteristics,
  getSpikeInterpretation: getHySpikeInterpretation,
  getGeneralCharacteristics: getHyGeneralCharacteristics,
  name: 'Histeri (Hy)',
  number: 3,
  description: 'Fizik bir neden olmadan bir organının işlevinin kaybedilmesi biçiminde bir hastalıktır. Bu alt test nevrotik bozuklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir. Genel bir çocuksuluk, çabuk sinirlenme, neşelenme, psikolojik semptomları ret, sorumluluktan kaçma gibi özellikleri vardır. Bu grup hastalarda ikincil kazançlar çok fazladır. MMPI\'da çok değişik tipte soruların toplandığı bir alt testtir.',
  itemCount: 60
};
