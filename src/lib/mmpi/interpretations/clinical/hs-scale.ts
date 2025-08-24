export interface HsScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
}

export class HsScale {
  getInterpretation(tScore: number): HsScaleInterpretation {
    if (tScore >= 84) {
      return {
        tScore,
        level: 'Çok Yüksek (T  84)',
        description: 'Yakınmaları bütün organ sistemlerine yayılmış olan kişilerde görülür.',
        characteristics: [
          'Ağrı, yorgunluk ve güçsüzlük sıklıkla vardır',
          'Somatik ilgiler somatik delüzyonlara dönmüş demektir',
          'Bu belki de şizofrenik bir epizodun başlangıcıdır',
          'Somatik delüzyonlar görülebilir',
          'Aşırı bedensel uğraşları vardır'
        ],
        clinicalSignificance: 'Şizofrenik episod başlangıcı olabilir'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Yüksek (T: 70-83)',
        description: 'Bedensel yakınmaları olan, vücut işlevlerine aşırı odaklanmış bireyler.',
        characteristics: [
          'Çok sayıda bedensel şikâyet',
          'Baş ağrıları, gastrointestinal yakınmalar',
          'Yorgunluk ve halsizlik',
          'Ağrı şikâyetleri yaygın',
          'Medikal tedavilere aşırı odaklanma'
        ]
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Derecede Yüksek (T: 60-69)',
        description: 'Sağlık konularında hafif endişeler, bedensel duyarlılık.',
        characteristics: [
          'Sağlık konularında duyarlılık',
          'Bazen bedensel yakınmalar',
          'Strese fiziksel tepkiler',
          'Sağlık bilincinde artış'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal Aralık (T: 45-59)',
        description: 'Sağlık konularında dengeli yaklaşım.',
        characteristics: [
          'Uygun sağlık bilinci',
          'Dengeli somatik farkındalık',
          'Fiziksel rahatsızlıklara normal tepki'
        ]
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T < 45)',
        description: 'Sağlık konularında az endişe, fiziksel belirtileri görmezden gelme eğilimi.',
        characteristics: [
          'Sağlık konularında az endişe',
          'Fiziksel belirtileri minimize etme',
          'Doktor ziyaretlerinden kaçınma',
          'Hastalık belirtilerini göz ardı etme'
        ]
      };
    }
  }
}

export function getHsSpikeInterpretation(): string {
  return 'Hs spike profili, bireyin bedensel yakınmalara aşırı odaklandığını gösterir.';
}
