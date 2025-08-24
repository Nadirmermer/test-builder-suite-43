// Kadınlık-Erkeklik (Mf) Alt Testi - Ölçek 5
// MMPI Klinik Ölçek - Cinsel kimlikteki sapmaları değerlendirmek amacıyla geliştirilmiştir

export interface MfScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  additionalNotes?: string[];
  genderSpecific: boolean;
  gender: 'Erkek' | 'Kadin';
}

// Kadınlık-Erkeklik Ölçeği Yorumlama Sınıfı
export class MfScale {
  getInterpretation(tScore: number, gender: 'Erkek' | 'Kadin'): MfScaleInterpretation {
    if (gender === 'Erkek') {
      return this.getMfMaleInterpretation(tScore);
    } else {
      return this.getMfFemaleInterpretation(tScore);
    }
  }

  private getMfMaleInterpretation(tScore: number): MfScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: 'Çok Yüksek (T ≥ 80)',
        description: 'Erkek için çok yüksek Mf puanı, belirgin feminen ilgileri ve davranışları gösterir.',
        characteristics: [
          'Estetik ilgilere yönelik',
          'Sanatsal eğilimler',
          'Kültürel aktivitelere ilgi',
          'Geleneksel erkek rollerinden uzaklaşma',
          'Duygusal duyarlılık yüksek'
        ],
        genderSpecific: true,
        gender: 'Erkek',
        additionalNotes: [
          'Bu düzeyde cinsel kimlik karmaşası olabilir',
          'Psikiyatrik değerlendirme önerilir'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Yüksek (T: 70-79)',
        description: 'Feminen ilgilere sahip, geleneksel erkek rollerinden uzak davranışlar.',
        characteristics: [
          'Sanatsal ve estetik ilgiler',
          'Pasif, geri çekilmeyi tercih eder',
          'Rekabetçi olmayan',
          'Duygusal açıdan hassas',
          'Entelektüel aktiviteleri tercih eder'
        ],
        genderSpecific: true,
        gender: 'Erkek'
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Derecede Yüksek (T: 60-69)',
        description: 'Dengeli cinsiyet rolü, hem maskülen hem feminen özellikler.',
        characteristics: [
          'Entelektüel ilgiler',
          'Sanatsal yetenekler',
          'Duyarlı ve anlayışlı',
          'Estetik değerlere saygı',
          'Kültürel aktivitelere katılım'
        ],
        genderSpecific: true,
        gender: 'Erkek',
        additionalNotes: [
          'Bu düzeyde pozitif özellikler vardır',
          'Dengeli kişilik özelliği'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal Aralık (T: 45-59)',
        description: 'Geleneksel erkek rolü ile uyumlu davranışlar.',
        characteristics: [
          'Maskülen ilgiler',
          'Rekabetçi',
          'Agresif',
          'Bağımsız',
          'Liderlik özellikleri'
        ],
        genderSpecific: true,
        gender: 'Erkek'
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T < 45)',
        description: 'Aşırı maskülen davranışlar, geleneksel erkek rolüne katı bağlılık.',
        characteristics: [
          'Aşırı agresif',
          'Duyarsız',
          'Kaba davranış',
          'Feminen özelliklerden kaçınma',
          'Geleneksel erkek rolleri vurgusu'
        ],
        genderSpecific: true,
        gender: 'Erkek',
        additionalNotes: [
          'Aşırı maskülenlik kompanzatör olabilir',
          'Cinsel kimlik güvensizliği gizleme'
        ]
      };
    }
  }

  private getMfFemaleInterpretation(tScore: number): MfScaleInterpretation {
    if (tScore >= 80) {
      return {
        tScore,
        level: 'Çok Yüksek (T ≥ 80)',
        description: 'Kadın için çok yüksek Mf puanı, maskülen ilgileri ve davranışları gösterir.',
        characteristics: [
          'Geleneksel kadın rollerini reddeder',
          'Rekabetçi ve agresif',
          'Maskülen ilgiler',
          'Bağımsızlık vurgusu',
          'Otorite pozisyonlarını tercih eder'
        ],
        genderSpecific: true,
        gender: 'Kadin',
        additionalNotes: [
          'Bu düzeyde cinsel kimlik karmaşası olabilir',
          'Psikiyatrik değerlendirme önerilir'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Yüksek (T: 70-79)',
        description: 'Maskülen özellikler gösteren, geleneksel kadın rollerinden uzak.',
        characteristics: [
          'Bağımsız ve kendine güvenli',
          'Rekabetçi ruha sahip',
          'Liderlik özelikleri',
          'Maskülen ilgiler',
          'Agresif davranış eğilimleri'
        ],
        genderSpecific: true,
        gender: 'Kadin'
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Derecede Yüksek (T: 60-69)',
        description: 'Dengeli cinsiyet rolü, hem feminen hem maskülen özellikler.',
        characteristics: [
          'Bağımsız düşünce',
          'Kariyere odaklı',
          'Liderlik potansiyeli',
          'Entelektüel ilgiler',
          'Rekabetçi ama dengeli'
        ],
        genderSpecific: true,
        gender: 'Kadin',
        additionalNotes: [
          'Bu düzeyde pozitif özellikler vardır',
          'Modern kadın profili'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal Aralık (T: 45-59)',
        description: 'Geleneksel kadın rolü ile uyumlu davranışlar.',
        characteristics: [
          'Feminen ilgiler',
          'Duygusal duyarlılık',
          'Sosyal ilişkilerde başarılı',
          'Bakım verici rol',
          'Estetik değerlere ilgi'
        ],
        genderSpecific: true,
        gender: 'Kadin'
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T < 45)',
        description: 'Aşırı feminen davranışlar, geleneksel kadın rolüne katı bağlılık.',
        characteristics: [
          'Aşırı pasif',
          'Bağımlı davranış',
          'Geleneksel kadın rolleri vurgusu',
          'Maskülen özelliklerden kaçınma',
          'Submissif tutum'
        ],
        genderSpecific: true,
        gender: 'Kadin',
        additionalNotes: [
          'Aşırı feminen davranış problematik olabilir',
          'Bağımsızlık becerilerinin geliştirilmesi gerekebilir'
        ]
      };
    }
  }
}

export function getMfMaleSpikeInterpretation(): MfScaleInterpretation {
  return {
    tScore: 75,
    level: 'Spike - Erkek',
    description: 'Erkekte Mf spike profili özel değerlendirme gerektirir.',
    characteristics: [
      'Estetik ve sanatsal ilgiler predominant',
      'Geleneksel maskülen rollerden belirgin uzaklaşma',
      'Cinsel kimlik konularında hassasiyet'
    ],
    genderSpecific: true,
    gender: 'Erkek',
    clinicalSignificance: 'Özel dikkat ve değerlendirme gerektirir'
  };
}

export function getMfFemaleSpikeInterpretation(): MfScaleInterpretation {
  return {
    tScore: 75,
    level: 'Spike - Kadın',
    description: 'Kadında Mf spike profili özel değerlendirme gerektirir.',
    characteristics: [
      'Maskülen ilgiler predominant',
      'Geleneksel feminen rollerden belirgin uzaklaşma',
      'Bağımsızlık ve otorite arayışı'
    ],
    genderSpecific: true,
    gender: 'Kadin',
    clinicalSignificance: 'Özel dikkat ve değerlendirme gerektirir'
  };
}

export function getMfHighScoreCharacteristics(): string[] {
  return [
    'Erkekler için:',
    '- Estetik ve sanatsal ilgiler',
    '- Pasif, geri çekilmeyi tercih eder', 
    '- Rekabetçi olmayan',
    '- Duygusal açıdan hassas',
    '- Entelektüel aktiviteleri tercih eder',
    'Kadınlar için:',
    '- Bağımsız ve kendine güvenli',
    '- Rekabetçi ruha sahip',
    '- Liderlik özellikleri',
    '- Maskülen ilgiler',
    '- Agresif davranış eğilimleri'
  ];
}

export function getMfLowScoreCharacteristics(): string[] {
  return [
    'Erkekler için:',
    '- Aşırı agresif',
    '- Duyarsız',
    '- Kaba davranış',
    '- Feminen özelliklerden kaçınma',
    '- Geleneksel erkek rolleri vurgusu',
    'Kadınlar için:',
    '- Aşırı pasif',
    '- Bağımlı davranış',
    '- Geleneksel kadın rolleri vurgusu',
    '- Maskülen özelliklerden kaçınma',
    '- Submissif tutum'
  ];
}