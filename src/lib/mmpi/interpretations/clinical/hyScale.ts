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

export class HyScale {
  getInterpretation(tScore: number): HyScaleInterpretation {
    if (tScore >= 85) {
      return {
        tScore,
        level: 'Çok Yüksek (T  85)',
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
          'Konversif semptomların ele alınması',
          'Güven duygusunun geliştirilmesi',
          'İmmatürite düzeyinin çalışılması'
        ]
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Yüksek (T: 70-75)',
        description: 'Bu kişiler belki de çocuksudur, ilgi toplama, kabul edilme ve sevilme ihtiyacı içindedirler.',
        characteristics: [
          'Kabul edilme ve sevilme ihtiyacı yüksek',
          'Çocuksu davranışlar',
          'İlgi toplama eğilimi',
          'Duygusal dalgalanmalar',
          'Sosyal onay arayışı'
        ],
        clinicalSignificance: 'Yüksek düzey - Kabul edilme ihtiyacı ön planda',
        therapeuticImplications: [
          'Kabul edilme ihtiyacının sağlıklı şekilde karşılanması',
          'Olgunlaşma sürecinin desteklenmesi',
          'Sosyal beceri geliştirme'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Düzey (T: 60-69)',
        description: 'Bu bireylerde orta düzeyde histeri belirtileri görülebilir.',
        characteristics: [
          'Hafif çocuksu eğilimler',
          'Zaman zaman duygusal dalgalanmalar',
          'Sosyal onay arama',
          'Başkalarından ilgi bekleme'
        ],
        clinicalSignificance: 'Orta düzey - Hafif histeri belirtileri'
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal (T: 45-59)',
        description: 'Duygusal dengelilik ve uygun sosyal davranış.',
        characteristics: [
          'Duygusal dengeli',
          'Uygun sosyal davranış',
          'Olgun yaklaşım'
        ],
        clinicalSignificance: 'Normal aralık - Dengeli duygusal yaklaşım'
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T < 45)',
        description: 'Bu bireyler konvansiyonel, dar görüşlü ve katı olabilirler.',
        characteristics: [
          'Konvansiyonel yaklaşım',
          'Katı tutum',
          'Dar görüşlülük eğilimi',
          'Duygusal ifadede zorlanma'
        ],
        clinicalSignificance: 'Düşük düzey - Aşırı kontrollü duygusal yaklaşım',
        therapeuticImplications: [
          'Duygusal ifade becerilerinin geliştirilmesi',
          'Esneklik kazandırılması',
          'Olumlu kişilerarası ilişkilerin geliştirilmesi'
        ]
      };
    }
  }
}

export function getHySpikeInterpretation(): string {
  return 'Hy spike profili, bireyin kabul edilme ve sevilme ihtiyacının ön planda olduğunu gösterir.';
}

// Geriye uyumluluk için eski export objesi
export const hyScaleInterpretation = {
  getInterpretation: (tScore: number) => new HyScale().getInterpretation(tScore),
  getSpikeInterpretation: getHySpikeInterpretation,
  name: 'Histeri (Hy)',
  number: 3,
  description: 'Nevrotik bozukluklardan konversiyon histerisine tanı koymada yardımcı olmak amacıyla geliştirilmiştir'
};
