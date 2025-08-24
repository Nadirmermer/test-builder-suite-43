// MMPI Dörtlü Kod Interpretasyonları

import { CodeTypeInterpretation, ScaleValues, Gender } from './types';

/**
 * Dörtlü Kod Yorumlamaları
 */
export function getFourPointCodeInterpretation(
  code: string, 
  scales: ScaleValues, 
  gender?: Gender
): CodeTypeInterpretation | null {
  // T-skor farkı kontrolü için yardımcı fonksiyon
  const getScoreDifference = (scale1: string, scale2: string): number => {
    const scaleMap: Record<string, string> = {
      '1': 'Hs', '2': 'D', '3': 'Hy', '4': 'Pd', '5': 'Mf', 
      '6': 'Pa', '7': 'Pt', '8': 'Sc', '9': 'Ma', '0': 'Si'
    };
    const score1 = scales[scaleMap[scale1]]?.tScore || 0;
    const score2 = scales[scaleMap[scale2]]?.tScore || 0;
    return Math.abs(score1 - score2);
  };

  switch (code) {
    case '1234': {
      // Alt test 1 ve 2 diğerlerinden 5 T puanı yüksekse 2134'e yönlendir
      const scoreDiff12vs34 = Math.min(
        getScoreDifference('1', '3'), getScoreDifference('1', '4'),
        getScoreDifference('2', '3'), getScoreDifference('2', '4')
      );
      
      if (scoreDiff12vs34 >= 5) {
        // 2134 koduna yönlendir - bu daha sonra ayrı kod olarak da eklenebilir
        return {
          code: '1234',
          alternativeCode: '2134',
          description: '1234 Kodu (1 ve 2 alt testleri diğerlerinden 5 T puanı yüksek olduğunda 2134\'e bakılır)',
          characteristics: [
            'Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz kişilerdir',
            'Bağımlılık, bağımsızlık çatışması yaşarlar',
            'Atılgan davranışlarla zayıflıklarını kapatma çabasına girerler',
            'Rahatlamak için alkole sığınırlar, ancak içtikleri zaman kavga ederler',
            'Özellikle güçlü bağımlılık gereksinimleri engellenmiştir'
          ],
          clinicalSignificance: 'Zayıflık, çatışma ve yetersizlik ile karakterize olan kod tipi',
          possibleDiagnoses: [
            'Pasif-agresif kişilik',
            'Anksiyete ya da psikofizyolojik reaksiyon'
          ],
          genderSpecific: {
            male: [
              'Bu profili veren erkekler kadınlara karşı düşmanlık duyguları gösterirler',
              'Sıklıkla fiziksel şiddet yani dayak vardır',
              'Anneye bağımlılık özlemleri',
              'Anneleri tarafından reddedilme korkusu ile çatışma gösterirler'
            ],
            female: [
              'Kadınlarda karakter bozukluğu, pasif-agresif kişilik',
              'Kimseye güven duymama',
              'Duygularını ifade etme güçlüğü ya da nasıl ifade edeceğini bilememe görülür',
              'Psikoterapide savunucudurlar, motivasyonları düşüktür'
            ]
          }
        };
      } else {
        // Normal 1234 kodu
        return {
          code: '1234',
          description: '1234 Kodu',
          characteristics: [
            'Zayıf, korkak, stres ve sorumluluklar ile başa çıkmada yetersiz kişilerdir',
            'Bağımlılık, bağımsızlık çatışması yaşarlar',
            'Atılgan davranışlarla zayıflıklarını kapatma çabasına girerler',
            'Rahatlamak için alkole sığınırlar, ancak içtikleri zaman kavga ederler',
            'Özellikle güçlü bağımlılık gereksinimleri engellenmiştir'
          ],
          clinicalSignificance: 'Zayıflık, çatışma ve yetersizlik ile karakterize olan kod tipi',
          possibleDiagnoses: [
            'Pasif-agresif kişilik',
            'Anksiyete ya da psikofizyolojik reaksiyon'
          ],
          genderSpecific: {
            male: [
              'Bu profili veren erkekler kadınlara karşı düşmanlık duyguları gösterirler',
              'Sıklıkla fiziksel şiddet yani dayak vardır',
              'Anneye bağımlılık özlemleri',
              'Anneleri tarafından reddedilme korkusu ile çatışma gösterirler'
            ],
            female: [
              'Kadınlarda karakter bozukluğu, pasif-agresif kişilik',
              'Kimseye güven duymama',
              'Duygularını ifade etme güçlüğü ya da nasıl ifade edeceğini bilememe görülür',
              'Psikoterapide savunucudurlar, motivasyonları düşüktür'
            ]
          }
        };
      }
    }
    
    case '1236': {
      return {
        code: '1236',
        description: '1236 Kodu',
        characteristics: [
          'Somatik yakınmalar, depresyon ve paranoid eğilimler bir arada görülür',
          'Şüpheci ve güvensiz yaklaşım sergilerler',
          'Bedensel semptomları olan ancak bunların altında yatan paranoid düşünceleri bulunan bireylerdir'
        ],
        clinicalSignificance: 'Somatik yakınmalar ve paranoid eğilimlerin kombinasyonu'
      };
    }

    case '1237': {
      return {
        code: '1237',
        description: '1237 Kodu',
        characteristics: [
          'Yüksek anksiyete, somatik yakınmalar ve depresyon kombinasyonu',
          'Kaygı bozuklukları ön planda olan karma nevrotik tablo',
          'Fiziksel ve psikolojik semptomların iç içe geçtiği karmaşık durum'
        ],
        clinicalSignificance: 'Karma nevrotik bozukluk'
      };
    }

    case '1342': {
      return {
        code: '1342',
        description: '1342 Kodu',
        characteristics: [
          'Bu tür profil veren bireyler bağımlı, immatür kişilerdir',
          'Otistik dönemleri olabilir',
          'Psikiyatrik olarak depresyon, anksiyete, sinirlilik görülebilir',
          'Anksiyetelerini azaltmak için başağrısı, uykusuzluk gibi somatik yakınmalarda bulunurlar'
        ],
        clinicalSignificance: 'Bağımlı, immatür kişilik yapısı ile somatik yakınmalar'
      };
    }

    case '1382': {
      return {
        code: '1382',
        description: '1382 Kodu',
        characteristics: [
          '138\'deki yoruma ek olarak dikkate değer depresyon, konfüzyonel düşünce, alkol alımı ve intihar etme düşünceleri vardır',
          'Böyle bireyler sıklıkla yalnızdır ya da evli iseler evlilik uyumları bozuktur',
          'Sürekli olarak bir işten başka bir işe geçerler'
        ],
        clinicalSignificance: '138 koduna ek olarak şiddetli depresyon ve sosyal uyumsuzluk',
        additionalNotes: [
          'İntihar riski değerlendirilmelidir',
          'Alkol kullanım bozukluğu eşlik edebilir'
        ]
      };
    }

    default:
      return null;
  }
}