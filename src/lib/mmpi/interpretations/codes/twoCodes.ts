// MMPI İkili Kod Interpretasyonları

import { CodeTypeInterpretation, ScaleValues, Gender } from './types';

/**
 * İkili Kod Yorumlamaları
 */
export function getTwoPointCodeInterpretation(
  code: string, 
  scales: ScaleValues, 
  gender?: Gender
): CodeTypeInterpretation | CodeTypeInterpretation[] | null {
  switch (code) {
    case '12':
    case '21': {
      return {
        code: code,
        alternativeCode: code === '12' ? '21' : '12',
        description: '12/21 Kodu',
        characteristics: [
          'Değersizlik duyguları ve yetersizlik yaşayan bireylerdir',
          'Bedensel yakınmalar çok fazladır',
          'Genellikle duygusal olarak çok zor durumda olan kişilerdir',
          'Çevrelerindeki kişilerin ilgisini çekebilmek için çok çabaları',
          'Günlük yaşam aktivitelerini yerine getirmede güçlük çekerler'
        ],
        clinicalSignificance: 'Depresif duygudurumun somatik yakınmalarla ifade edilmesi',
        genderSpecific: {
          male: [
            'Erkeklerde öfke ve düşmanlık duyguları genellikle kendi içlerine döner',
            'Fiziksel ve zihinsel çöküntü yaşadıkları için bu duygularını ifade etme gücü yoktur',
            'Karşı cins ile ilişkilerinde oldukça çekingenler',
            'Üniversite öncesi ergenler: utangaçlıklarını obsesyonlar ya da sosyal izolasyon biçiminde gösterirler',
            'Bağımlılık ve karamsarlık belirgindir ve arkadaşları azdır',
            'Aile öykülerinde sıklıkla ayrılıklar ya da boşanma vardır'
          ]
        }
      };
    }

    case '13':
    case '31': {
      // Yüksek K ve diğer özel durumları kontrol et
      const interpretations: CodeTypeInterpretation[] = [];
      
      // Ana 13/31 kodu
      const baseCode: CodeTypeInterpretation = {
        code: code,
        alternativeCode: code === '13' ? '31' : '13',
        description: '13/31 Kodu',
        characteristics: [
          'Bu hastalar genellikle immatur, benmerkezcil ve bağımlıdırlar',
          'Histerik özellikler ve bastırma savunma mekanizmasına gösterirler',
          'Dikkat ve ilgi çekmeyi isterler ve bunu oldukça manipulatif bir biçimde yaparlar',
          'Psikolojik sorunlarını somatik yakınmalar haline dönüştürürler',
          'Psikolojik etkenlerin olabileceğini kabul etmezler',
          'Stres altında fiziksel semptomlar gösterirler'
        ],
        clinicalSignificance: 'Bu alt test hem normal, hem de psikiyatrik hastalarda görülür',
        additionalNotes: [
          'Yakınmalarında genellikle ikincil kazanç vardır (Histeriden çok hipokondriyak özellikler gösterirler)',
          'Bedensel yakınmaları spesifik ve net olmamakla beraber genellikle baş ağrısı, göğüs ağrısı, sırt ağrısı, uyuşma, el ve ayaklarda aşırı titreme şeklindedir',
          'Sıklıkla yorgunluk, baş dönmesi, uyuşukluk ve titreme görülür',
          'Bu kişilerde yemek yemekten rahatsızlık ve bulantı gibi yakınmalar olabilir, bazen anoreksiya ve bulimiya görülür'
        ],
        therapeuticImplications: [
          'Terapi sırasında sorunlarına hemen çözüm isterler',
          'Semptomların temelinde yatan psikolojik nedenleri kabul etmedikleri için geleneksel psikoterapiye dirençlidir',
          'Terapide kesin cevaplar ve çözümler isterler',
          'Bu gerçekleşmezse terapiyi başlangıç aşamasında sonlandırırlar',
          'Terapistin kendilerinin aşırı ilgi beklentilerini hemen doyuramadığını düşünürlerse de terapiyi sonlandırırlar',
          'İçgörüleri yoktur',
          'Davranışlarının ve fiziksel yakınmalarının psikolojik kaynaklı olduğuna ilişkin yorumlara çok dirençlidirler',
          'Hastalardaki bedensel semptomlar onlara ikincil kazanç sağlar',
          'Diğer ikincil kazançları sorumluluk ve görevden kaçmadır'
        ],
        demographicNotes: [
          '13/31 kodu ile birlikte 2 ve 7 alt testleri normal sınırlar içinde ise bastırma, inkâr, rasyonalizasyon ve projeksiyon mekanizmalarını aşırı bir biçimde kullanırlar',
          'Nadiren olumsuz kızgınlık duyguları gösterirler ve bu duyguları ile yüzleşmekten kaçınırlar ya da pasif agresif bir biçimde davranırlar',
          'Karşı cinsten kişilerle ilişki kurma, bu bireyler için bir gereksinim olsa da genellikle zordur ve bu konuda genelde başarısız olurlar',
          '13/31 kodu ile birlikte 2, 7, 8 ve 9 alt testleri yükselmiş ve K alt testi düşmüşse hastada gerginlik, anksiyete, karar vermede güçlük ve depresyon olabilir',
          'Sorunların varlığına rağmen bu kişiler semptomlarından rahatsızlık duymazlar',
          'Semptomlarda kısmî azalma bile günlük yaşamlarını devam ettirme imkânı verir',
          'Kendilerini normal ve sorumluluk sahibi olarak sunabilirler',
          'Psikolojik değerlendirmede kendilerini normal olarak tanımlama eğilimleri vardır',
          '13/31 kodu ile birlikte L ve K alt testleri de yükselirse, kendileri ile uğraşılmasından kızgınlık duydukları anlaşılmalıdır',
          '13 kodunu veren kişilerde hipokondriyak özellikler belirgindir',
          '31 kodunu veren kişilerde ise stres durumları ile karşılaşıldığında bedensel yakınmalar ortaya çıkar, immatür ve bağımlı özellikler gösterirler'
        ]
      };
      
      interpretations.push(baseCode);
      
      // Yüksek K durumu kontrolü
      if (scales.K && scales.K.tScore >= 70 && 
          scales.scale2 && scales.scale2.tScore < 70 &&
          scales.scale7 && scales.scale7.tScore < 70 &&
          scales.scale8 && scales.scale8.tScore < 70 &&
          scales.F && scales.F.tScore < 50) {
        
        const highKCode: CodeTypeInterpretation = {
          code: '13/31',
          description: '13/31 Kodu, Yüksek K - Özellikle 2, 7 ve 8 testlerinin T puanı 70\'in ve F alt testi T puanı 50\'nin altında ise bu bireyler kendilerini normal, sorumluluk sahibi, yardımsever ve sempatik olarak sunmaya çalışan kişilerdir.',
          clinicalSignificance: 'Kendini iyi gösterme çabası olan, sorumlu ve yardımsever görünmeye çalışan kişilik yapısı',
          characteristics: [
            'Kendini normal, sorumluluk sahibi olarak sunma',
            'Yardımsever ve sempatik görünme çabası',
            'Bedensel semptomları yetersizlik, değersizlik olarak yaşama',
            'Geleneksel psikoterapötik müdahalelerden yarar sağlayamama',
            'Profesyonellere güven duyma ihtiyacı'
          ],
          therapeuticImplications: [
            'Geleneksel psikoterapötik müdahaleler etkisiz olabilir',
            'Profesyonellere güven duydukları zaman tedaviyle iyileşebilirler',
            'Güven ilişkisi kurulması öncelikli',
            'Bedensel semptomların altındaki yetersizlik duygularına odaklanma'
          ],
          genderSpecific: {
            male: [
              'Kendini iyi gösterme çabası',
              'Bedensel semptomları değersizlik olarak yaşama'
            ],
            female: [
              'Kendini iyi gösterme çabası',
              'Bedensel semptomları değersizlik olarak yaşama'
            ]
          }
        };
        interpretations.push(highKCode);
      }

      // Düşük 2 Kodu kontrolü
      if (scales.scale2 && scales.scale2.tScore < 65) {
        const lowTwoCode: CodeTypeInterpretation = {
          code: '13/31',
          description: '13/31 Kodu/ Düşük 2 Kodu - Bu tür profil veren bireyler, histerik kişilik özellikleri taşır ve klasik psikosomatik semptomlar gösterirler.',
          clinicalSignificance: 'Histerik kişilik özellikleri ve klasik psikosomatik semptomlar',
          characteristics: [
            'Histerik kişilik özellikleri',
            'Klasik psikosomatik semptomlar',
            'Dramatik davranış kalıpları',
            'Duygusal dalgalanmalar'
          ],
          therapeuticImplications: [
            'Histerik özelliklerin ele alınması',
            'Psikosomatik semptomların psikolojik temellerinin keşfi',
            'Duygusal düzenleme becerilerinin geliştirilmesi'
          ]
        };
        interpretations.push(lowTwoCode);
      }
      
      return interpretations.length > 1 ? interpretations : [baseCode];
    }

    case '14':
    case '41': {
      return {
        code: code,
        alternativeCode: code === '14' ? '41' : '14',
        description: '14/41 Kodu',
        characteristics: [
          'Erkeklerde kadınlardan daha sık görülür',
          'Benmerkezcil, karamsar ve sızlanan kişilerdir',
          'Bu hastaların hipokondriyak uyumları kroniktir',
          'Hipokondriyak yakınmaları, özgün olmayan baş ağrıları biçimindedir',
          'Sosyal açıdan dışadönük olarak görülmelerine karşın karşı cinsle ilişkilerinde oldukça rahatsızlık yaşarlar',
          'Aile içi ilişkilerde isyankârdırlar, ancak bu duygularını ifade edemezler',
          'Genel olarak aşırı alkol alımı tabloda görülür',
          'Karşı cinsle ilişki sorunları tanımlarlar',
          'Okul ve iş başarıları düşüktür',
          'Kısa süreli semptomatik tedaviye iyi yanıt vermekle birlikte uzun süreli tedavide kalamazlar'
        ],
        clinicalSignificance: 'Kronik hipokondriyak uyum ve karşı cins ilişki sorunları',
        possibleDiagnoses: [
          'Alkolizm',
          'Daha seyrek olarak kadınlarda maskeli depresyon'
        ],
        additionalNotes: [
          'Çok genel olarak görülen üçlü kodlar 143/413 ve 142/412 dir',
          'Alt test 3 de birlikte yükselmişse, aile ve evlilik sorunları, kızgınlık ve sosyal yetersizlik duyguları ile birlikte bağımlılık ve bağımsızlık çatışmaları ön plana çıkmıştır',
          'Sorunlarının psikolojik kökenli olabileceğini inkâr ettikleri için tedaviye dirençlidirler'
        ],
        genderSpecific: {
          male: [
            'Erkeklerde kadınlardan daha sık görülür'
          ],
          female: [
            'Kadınlarda daha seyrek olarak maskeli depresyon görülür'
          ]
        }
      };
    }

    case '146': {
      return {
        code: '146',
        description: '146 Kodu',
        characteristics: [
          'Antisosyal ya da impuls kontrolünde güçlüğü olan kişilerdir',
          'Kötümser, katı, kolay ilişki kurulamayan, başkalarından gelen eleştirilere aşırı duyarlık gösteren bireylerdir',
          'Çevrelerini şaşırtacak derecede düşmanlık gösterirler'
        ],
        clinicalSignificance: 'Antisosyal özellikler ve impuls kontrol problemleri'
      };
    }

    case '1469': {
      return {
        code: '1469',
        description: '1469 Kodu',
        characteristics: [
          'Kızgın, tepkisel insanlardır',
          'Aşırı biçimde karşılarındaki kişiyi suçlarlar',
          'Hostil, huzursuz, alıcı, şüpheci, narsisistik, benmerkezcil kişilerdir',
          'Duygusal anlamda kararsızlık, anksiyete, gerginlik, manipulatif, impulsif özellikler, eyleme vuruk davranışlar görülmektedir',
          'İş başarısızlığı ve aile içi ilişki güçlükleri belirgindir'
        ],
        clinicalSignificance: 'Hostilite, impulsivite ve kişilerarası ilişki problemleri'
      };
    }

    case '15':
    case '51': {
      return {
        code: code,
        alternativeCode: code === '15' ? '51' : '15',
        description: '15/51 Kodu',
        characteristics: [
          'Yetişkin erkekler yakınan, telâşlı ve eleştiren ve temel olarak pasif bir yaşam biçimine sahiptir',
          'Somatik alanda sorunlar getirirler',
          'Genel olarak açık eyleme vuruk davranış yoktur',
          'Nadiren açık çatışma ve kararsızlık gösterirler',
          'Aslında hem kadınlarda, hem de erkeklerde nadir olarak rastlanan bir koddur',
          'Çok genel olarak erkeklerde 2, 3, 4 alt testlerinin de birlikte yükseldiği görülür'
        ],
        clinicalSignificance: 'Pasif yaşam biçimi ve somatik problemler',
        genderSpecific: {
          male: [
            'Yetişkin erkekler yakınan, telâşlı ve eleştiren ve temel olarak pasif bir yaşam biçimine sahiptir',
            'Genel olarak açık eyleme vuruk davranış yoktur',
            'Genç erkekler, genellikle kadınsı ve pasif olarak tanımlanır'
          ],
          female: [
            'Bu kodda kadın hasta daha az görülmektedir',
            'Orta ve üst sosyoekonomik düzeyden gelen ve eğitimli kadınlarda karamsarlık yakınmaları oldukça fazladır',
            'Bağımlı gibi görünseler de kişilerarası ilişkilerinde yarışmacı ve saldırgan olma eğilimleri vardır',
            'Bunları kontrol edebilmek için somatizasyon yakınmaları getirirler',
            'Eğitim düzeyi düşük kadınlarda saldırganlık daha azdır'
          ]
        },
        additionalNotes: [
          'Ergenlerde ise çatışmalarını ya da sorunlarını ifade etme güçlükleri vardır',
          'Sıklıkla kendilerinde bedensel hastalık olduğunu kabul ederler ve diğerleri ile bunu kullanarak ilişki kurarlar',
          'Aslında çocukluk döneminde geçirdikleri bedensel hastalıkları vardır',
          '15/51 kodunu yorumlarken 5 alt testini bırakarak yükselen üçüncü alt teste bakmak gereklidir'
        ]
      };
    }

    case '16':
    case '61': {
      return {
        code: code,
        alternativeCode: code === '16' ? '61' : '16',
        description: '16/61 Kodu',
        characteristics: [
          'Bu bireyler katı, inatçı, eleştiriye aşırı duyarlı ve diğerlerini suçlama eğiliminde olan kişilerdir',
          'Bu bireyler her şeyi baştan savarlar, savunucudurlar ve duygusal ilişkiden endişe duyarlar',
          'Genel olarak öfkelerini, rasyonalizasyonu ve yansıtmayı kullanarak gösterirler',
          'Kontrollerinin çok fazla olmasına karşın bu gruptaki bireylerde (özellikle ergenlerde) şiddetli öfke patlamaları görülmektedir'
        ],
        clinicalSignificance: 'Katı, inatçı kişilik yapısı ve öfke kontrol problemleri',
        additionalNotes: [
          'Alt test 8 de yüksəlmişse alışılmamış somatik uğraşların varlığı dikkate alınmalı, belki de somatik delüzyonların olabileceği düşünülmelidir',
          'Bazı bireyler bedensel uğraşlarıyla "psikotik bir dönemden" kurtulmaya gayret ederler',
          '16/61 profilleri her iki cins için de oldukça nadirdir',
          'Eğer bu tip bir profil elde edilmişse erkeklerde 2 ve 4\'ün, kadınlarda ise 3 ve 8\'in olduğu üçlü bir yükselme vardır'
        ]
      };
    }

    case '17':
    case '71': {
      return {
        code: code,
        alternativeCode: code === '17' ? '71' : '17',
        description: '17/71 Kodu',
        characteristics: [
          'Bu hastaların bedensel yakınmaları onların yaşadığı gerilim ve kaygıyı yansıtmaktadır',
          'Yüksek enerji düzeyi ve ajitasyonla birlikte çoklu somatik semptomlar görülebilir',
          'Böyle kişiler gerilimle ilgili birçok yakınma ile birlikte kronik olarak gergin ve kaygılıdırlar',
          'Genel olarak bedensel işlevlerdeki bozuklukları ile obsesif bir biçimde uğraşırlar',
          'Bu kişiler sağlıklarına dikkat etme konusunda dirençlidir'
        ],
        clinicalSignificance: 'Kronik gerginlik, kaygı ve somatik obsesyonlar',
        additionalNotes: [
          'Bu kod erkeklerde kadınlardan daha fazladır',
          'Her iki cins için de 172/712 ve 173/713 kodları sık görülür'
        ],
        genderSpecific: {
          male: [
            'Erkeklerde kadınlardan daha fazla görülür'
          ]
        }
      };
    }

    case '18':
    case '81': {
      return {
        code: code,
        alternativeCode: code === '18' ? '81' : '18',
        description: '18/81 Kodu',
        characteristics: [
          'Bu hastaların düşmanlık ve saldırganlık duyğuları vardır, ancak bu duygularını uygun bir biçimde ifade edemezler',
          'Beden işlevleri ve bedensel hastalıklara ilişkin delüzyonel düşüncelerini açıkça gösterirler',
          'Genellikle bizar tabiatlı somatik yakınmaları bulunan kişilerdir',
          'Somatik hezeyanları olabilir',
          'Ayrıca somatik yakınmaları, gerçek psikotik yaşantının ortaya çıkmasına karşı savunmaları yansıtıyor olabilir',
          'Bu kişilerde karşı cinsin üyelerine ilişkin hostilite vardır',
          'Diğerlerine karşı güvensizlik, kendini onlardan kopmuş gibi hissetme, bu bireylerde uzaklaşma ve izolasyon ortaya çıkarabilir',
          'Özellikle stres altında bu kişilerde şaşkınlık ve düşüncede konfüzyon olabilir',
          'Somatik uğraşları gerçek ile bağlantılarını koparabilir',
          'Öfke ve hostilite duyguları belirgindir, ancak bunu açıkça ifade edemezler'
        ],
        clinicalSignificance: 'Somatik delüzyonlar ve hostilite ile karakterize psikotik özellikler',
        possibleDiagnoses: [
          'Eğer F alt testi de yükselmişse şizofreni',
          'Pre-psikotik bozukluk tanısı da düşünülmelidir'
        ],
        therapeuticImplications: [
          'Tedavi sürecinde basit müdahaleler bu hastalara yetmez',
          'Kişilerarası ilişkilerinde de içgörü sağlamaya yönelik yaklaşımlarla da yarar sağlanamaz'
        ],
        additionalNotes: [
          'Genel olarak üçlü kodlar 182/812, 183/813 ve 187/817\'dir',
          'Bu kod tipini veren ergenlerin okul başarısı düşüktür, unutkanlık oldukça fazladır',
          'Baş ağrısı ve mide ağrısı gibi somatik yakınmaları vardır',
          'Arkadaşları azdır',
          'Hem okulda, hem de sosyal yaşamda uyumları bozuktur',
          'Madde bağımlılığı ya da intihar girişimleri olabilir',
          'Bu örüntüyü gösteren ergenlerin 2/3\'ü boşanmış ailelerden gelmiştir'
        ]
      };
    }
    
    default:
      return null;
  }
}