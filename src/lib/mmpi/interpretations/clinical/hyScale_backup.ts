// Histeri (Hy) Alt Testi - Ölçek 3
// MMPI Klinik Ölçek - Nevrotik bozukluklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir

export interface HyScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  additionalNotes?: string[];
}

/**
 * Histeri (Hy) Alt Testi T-Skor Yorumlaması
 * @param tScore - T-Skor değeri
 * @returns Yorumlama bilgisi
 */
export function getHyInterpretation(tScore: number): HyScaleInterpretation {
  if (tScore >= 85) {
    return {
      tScore,
      level: 'Çok Yüksek (T ≥ 85)',
      description: 'Aşırı immatür, benmerkezcil ve bağımlı kişilerdir.',
      characteristics: [
        'Bastırma savunma mekanizmasını kullanmaları şaşırtıcıdır',
        'Bu içgörü eksikliği olduğunun göstergesidir',
        'Semptomlar gerçek organik patolojiye uymamaktadır',
        'Genellikle kroniktir ve ciddî rijidite vardır'
      ],
      clinicalSignificance: 'Kritik düzey - Ciddi immatürite ve organik patolojiye uymayan semptomlar',
      therapeuticImplications: [
        'Kronik ve rijit durum nedeniyle uzun süreli tedavi gerekir',
        'İçgörü eksikliği nedeniyle psikolojik yorumlara dirençli',
        'Bastırma mekanizmasının aşırı kullanımı ele alınmalı'
      ]
    };
  } else if (tScore >= 76) {
    return {
      tScore,
      level: 'Çok Yüksek (T: 76-84)',
      description: '70-75 T puanında bildirilen özelliklere ek olarak bu bireyler uzun süredir devam eden gerginliğe bağlı konversif semptomlar geliştirmişlerdir.',
      characteristics: [
        'Semptomlar baş ağrısı, sırt ağrısı, göğüs ağrısı, zayıflık, baş dönmesi ve baygınlıktır',
        'Uzun süredir devam eden güven duymama',
        'İmmatürite belirgin',
        'Organize olmuş bedensel yakınmaları vardır'
      ],
      clinicalSignificance: 'Konversif semptomlar ve organize bedensel yakınmalar gelişmiş',
      therapeuticImplications: [
        'Konversif semptomların ele alınması gerekir',
        'Uzun süreli güven duymama probleminin çözülmesi',
        'Organize bedensel yakınmaların psikolojik temelinin açıklanması'
      ]
    };
  } else if (tScore >= 70) {
    return {
      tScore,
      level: 'Yüksek (T: 70-75)',
      description: 'Birey bastırma ve inkârı çok fazla kullanan, çok fazla itaat eden (uyan), saf ve çocuksu biçimde benmerkezcil, anksiyete ile bağlantılı somatik yakınmaları olan ya da bunların hepsine sahip bir kişidir.',
      characteristics: [
        'Histeroid mekanizmaları kullanır ve bunlarla ikincil kazanç elde eder',
        'Çok fazla sevgi, kabul ve destek isteyebilirler',
        'Çok aktif (yüzeysel olsa da) sosyal yaşamları vardır',
        'Davranışları konusunda içgörüleri oldukça azdır',
        'Açık bir biçimde teşhirci ve seksüel ya da saldırganlık düzeyinde dışa vuran davranışları olabilir',
        'İnkâr ve bastırmayı aşırı bir biçimde kullanırlar',
        'Sevilmeye olan güçlü gereksinime bağlı olarak, bağlanma gerektiren durumlarda verdikleri ilk tepki genellikle coşkulu olacaktır',
        'Kendilerinden istenenler konusunda kızgın ve kinci olurlar',
        'Genellikle pasif biçimde dirençlidirler, sızlanıp, yakınırlar',
        'Kendilerini bu durumdan uzaklaştıracak somatik şikâyetleri olur'
      ],
      clinicalSignificance: 'Histeroid mekanizmalar ve ikincil kazanç elde etme belirgin',
      therapeuticImplications: [
        'İkincil kazanç mekanizmalarının ele alınması',
        'İçgörü geliştirme konusunda sabırlı yaklaşım',
        'Pasif dirençle başa çıkma stratejileri',
        'Somatik şikayetlerin psikolojik temelinin açıklanması'
      ]
    };
  } else if (tScore >= 60) {
    return {
      tScore,
      level: 'Orta Yüksek (T: 60-69)',
      description: 'Burada iki farklı örüntü vardır:',
      characteristics: [
        '1. Eğer Hs\'nin yükselmesi Hy ile aynı düzeyde ise ve D alt testi, 1 ve 3 alt testinden 10 T puanı düşükse histerik kişiye işaret etmektedir. Stres sırasında somatizasyona sığınma görülebilir.',
        '2. Eğer Hy alt testi Hs alt testinde 10 T puanı yüksekse histerik özellikler belirgindir. Bu bireyler kendine odaklaşmıştır, kendilerini olduğundan farklı ve mükemmel kişiler olarak görmek isterler. Kişilerarası ilişkilerde içgörü azlığı vardır.'
      ],
      clinicalSignificance: 'Histerik özelliklerin varlığı, diğer ölçeklerle birlikte değerlendirilmeli',
      therapeuticImplications: [
        'Somatizasyon eğiliminin ele alınması',
        'Kendine odaklanma ve mükemmellik algısının düzeltilmesi',
        'Kişilerarası ilişkilerde içgörü geliştirme'
      ]
    };
  } else if (tScore >= 45) {
    return {
      tScore,
      level: 'Normal Aralık (T: 45-59)',
      description: 'Bu alana özgü bir tanımlama yoktur.',
      characteristics: [
        'Normal aralıktaki Hy puanları özel bir klinik anlam taşımaz'
      ]
    };
  } else {
    return {
      tScore,
      level: 'Düşük (T: 24-44)',
      description: 'Kendilerini sürekli eleştirirler.',
      characteristics: [
        'Olumlu kişilerarası ilişkileri inkâr etme eğilimi vardır',
        'Si alt testinde yükselme, bireyin diğer insanlardan kaçma eğiliminde olduğunu göstermektedir'
      ],
      clinicalSignificance: 'Öz-eleştiri ve sosyal geri çekilme eğilimi',
      therapeuticImplications: [
        'Öz-eleştiri düzeyinin azaltılması',
        'Olumlu kişilerarası ilişkilerin geliştirilmesi',
        'Sosyal katılımın artırılması'
      ]
    };
  }
}

/**
 * Histeri (Hy) Yüksek Puan Alan Bireyin Özellikleri (Graham 1987)
 */
export function getHyHighScoreCharacteristics(): string[] {
  return [
    'Strese fiziksel semptomlar geliştirerek tepki verir ve sorumluluktan kaçar',
    'Baş ağrısı, göğüs ağrıları, güçsüzlük, taşikardi, anksiyete atakları vardır',
    'Semptomlar bir görünür, bir kaybolur',
    'Semptomlarının nedenlerine ilişkin içgörü azdır',
    'Kendi güdü ve duygularını anlamaz',
    'Üzüntüye eğilimlidir',
    'Gerginlik, anksiyete, depresyon belirtileri göstermez',
    'Nadiren delüzyonlar, hallüsinasyonlar, hezeyanlardan yakınır',
    'Psikotik tanısı konulamaz',
    'Eğer psikiyatrik hastaysa sıklıkla konversiyon bozukluğu tanısı konulur',
    'Psikolojik açıdan gelişmemiş, çocuksu ve immatürdür',
    'Kendine odaklıdır, narsisistik, ben-merkezcildir',
    'Diğerlerinden ilgi ve sevgi bekler',
    'İlgi ve sevgiyi alabilmek için dolaylı ve baştan çıkarıcı yollar kullanır',
    'Hostilite ve kızgınlığını açık olarak ifade etmez',
    'Sosyal açıdan katılımcıdır',
    'Dost canlısı, konuşkan, gayretli ve ataktır',
    'Kişilerarası ilişkilerinde yüzeysel ve çocuksudur',
    'İnsanlarla kendi çıkarları için ilgilenir',
    'Zaman zaman önemsemediği ve anlamaya çalışmadığı cinsel açıdan eyleme vuruk davranışlar sergiler',
    'Başlangıçta tedaviye isteklidir',
    'Doğrudan verilen akıl ya da önerilere uyar',
    'Kendi davranışının nedenlerine ilişkin içgörü kazanması yavaştır',
    'Psikolojik yorumlara ve tedaviye dirençlidir',
    'Okulda ya da işte başarısız olacağına ilişkin endişe taşır',
    'Evlilikle ilgili mutsuz yaşantıları vardır',
    'Sosyal grup tarafından kabul görmediği hissini duyar',
    'Otorite figürleriyle sorunu vardır',
    'Aile öyküsünde reddedici baba figürü bulunur'
  ];
}

/**
 * Histeri (Hy) Düşük Puan Alan Bireyin Özellikleri
 */
export function getHyLowScoreCharacteristics(): string[] {
  return [
    'Temkinli, geleneksel ve uysaldır',
    'Maceracı ve çalışkan değildir',
    'İlgi alanları daralmıştır',
    'Sosyal katılımı sınırlıdır',
    'Lider olma rolünden kaçar',
    'Arkadaş canlısı değildir, anlaşılması zor biridir',
    'Kuşkucudur, diğer insanlara güvenmez',
    'Gerçekçidir, mantıklıdır, sorunları aşama aşama çözer',
    'Yaşama bakışı donuktur'
  ];
}

/**
 * Sadece Hy Alt Testinin Yükselmesi Durumu
 */
export function getHySpikeInterpretation(): HyScaleInterpretation {
  return {
    tScore: 70, // Örnek değer
    level: 'Sadece Hy Yükselmesi',
    description: 'Sadece 3\'ün yüksek olduğu ve diğer hiçbir alt testin 70 T puanının üstünde olmadığı durumda, bireyin kabul edilme ve sevilmeye gereksinimi fazladır.',
    characteristics: [
      'Ait olduğu grup tarafından reddedilme olasılığına yönelik endişe yaşar',
      'Kızgınlık ve kendini ortaya koymayı içeren yüzleşme durumlarıyla (akademik ortamlar gibi) uğraşırken çok rahatsız olur',
      'Tartışmalarda iyimserliklerini ve diğer insanlarla olan iyi ilişkilerini vurgularlar',
      'Kendilerinde doğal olmayan ya da sapkın davranışları en aza indirgerler'
    ],
    clinicalSignificance: 'İzole Hy yükselmesi - Kabul edilme ve sevilme ihtiyacı ön planda',
    therapeuticImplications: [
      'Kabul edilme ihtiyacının ele alınması',
      'Reddedilme korkularının çalışılması',
      'Yüzleşme durumlarıyla başa çıkma becerilerinin geliştirilmesi',
      'Gerçekçi öz-değerlendirme becerilerinin kazandırılması'
    ]
  };
}

/**
 * Histeri (Hy) Alt Testi Genel Tanımı
 */
export function getHyGeneralDescription(): string {
  return 'Histeri, fizik bir neden olmadan bir organın işlevinin kaybedilmesi biçiminde bir hastalıktır. Bu alt test nevrotik bozukluklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir. Genel bir çocuksuluk, çabuk sinirlenme, neşelenme, psikolojik semptomları red, sorumluktan kaçma gibi özellikleri vardır. Bu grup hastalarda ikincil kazançlar çok fazladır. MMPI\'da çok değişik tipte soruların toplandığı bir alt testtir.';
}

// Export all functions for easy access
export const hyScale = {
  getInterpretation: getHyInterpretation,
  getHighScoreCharacteristics: getHyHighScoreCharacteristics,
  getLowScoreCharacteristics: getHyLowScoreCharacteristics,
  getSpikeInterpretation: getHySpikeInterpretation,
  getGeneralDescription: getHyGeneralDescription,
  name: 'Histeri (Hy) Alt Testi',
  scaleNumber: 3,
  description: 'Nevrotik bozukluklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir'
};

// Ana export objesi - sadece yorumlama fonksiyonları  
export const hyScaleInterpretation = {
  getInterpretation: getHyInterpretation,
  getSpikeInterpretation: getHySpikeInterpretation,
  getHighScoreCharacteristics: getHyHighScoreCharacteristics,
  getLowScoreCharacteristics: getHyLowScoreCharacteristics,
  getGeneralDescription: getHyGeneralDescription,
  name: 'Histeri (Hy)',
  number: 3,
  description: 'Nevrotik bozukluklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir'
};