// MMPI Üçlü Kod Interpretasyonları

import { CodeTypeInterpretation, ScaleValues, Gender } from './types';

/**
 * Üçlü Kod Yorumlamaları
 */
export function getThreePointCodeInterpretation(
  code: string, 
  scales: ScaleValues, 
  gender?: Gender
): CodeTypeInterpretation | null {
  switch (code) {
    case '123': {
      return {
        code: '123',
        description: '123 Kodu',
        characteristics: [
          'Uzun süreli gerginlik, yetersizlik ve stres altında semptom geliştirme eğilimini gösterir',
          'Semptomlar konversif niteliktedir',
          'Bastırma ve inkârı kullanırlar',
          'Olumsuz duygularını psikosomatik semptomlarla gösterirler'
        ],
        clinicalSignificance: 'Konversif semptomlar ve psikosomatik belirtiler'
      };
    }

    case '127': {
      return {
        code: '127',
        description: '127 Kodu',
        characteristics: [
          '123\'teki kod tipinin özelliklerine ek olarak anksiyete, gerilim, korku, atılgan olamama, yetersizlik duyguları vardır',
          'Kişilerarası ilişkilerde bağımlılıkta artma vardır',
          'Genel olarak buna psikofizyolojik hastalıklar eklenir',
          'Sırt ve göğüs ağrıları ve epigastrik yakınmalar vardır',
          'Kronik işsizlik ve alkol bağımlılığı ortaya çıkabilir'
        ],
        clinicalSignificance: 'Artmış anksiyete ve bağımlılık ile karakterize',
        additionalNotes: [
          'Özellikle K 50 T puanından düşükse bu kişiler, günlük stres ve sorumluluklarla başa çıkamazlar'
        ],
        genderSpecific: {
          male: [
            'Bu profili veren erkekler kendilerinden daha güçlü kadınlarla evlenirler',
            'Bu ilişki ile bağımlılık rolünü sürdürmeye çalışırlar'
          ]
        }
      };
    }

    case '132':
    case '312': {
      return {
        code: code,
        alternativeCode: code === '132' ? '312' : '132',
        description: '132/312 Kodları',
        characteristics: [
          '13/31 kod tipindeki özelliklere ek olarak bu kişiler, özellikle zayıflık ve yorgunluktan yakınırlar ve stres yaşarlar (Eğer 9 alt testi daha düşükse)',
          'Kendilerinde depresif duygudurum olduğunu inkâr etseler de davranışlarında sıklıkla depresif özellikler vardır',
          'Bu kişiler uyumlu ve pasiftirler (Özellikle 4 alt testi düşükse)',
          'Diğerlerinin ilgisi karşısında endişe yaşarlar (Si alt testinde düşüklük varsa)'
        ],
        clinicalSignificance: '13/31 kod tipindeki özelliklere ek olarak zayıflık, yorgunluk ve gizli depresif özellikler',
        additionalNotes: [
          'Eğer 9 alt testi daha düşükse zayıflık ve yorgunluk daha belirgindir',
          'Eğer 4 alt testi düşükse uyumlu ve pasif özellikler ön plana çıkar',
          'Si alt testinde düşüklük varsa diğerlerinin ilgisi karşısında endişe yaşarlar'
        ]
      };
    }

    case '134':
    case '314': {
      return {
        code: code,
        alternativeCode: code === '134' ? '314' : '134',
        description: '134/314 Kodları',
        characteristics: [
          'Bu bireylerde belirgin olan özellikler inatçılık, züppelik hatta kendini beğenmişliktir',
          'Somatizasyon yakınmaları bu özellikleri nedeniyle ikinci planda kalmaktadır',
          'Diğer yönleriyle 13/31 kodlarındaki özellikler bu bireylere de uygundur',
          'Bağımlılık, bağımsızlık çatışmaları vardır; ancak böyle kişiler diğerlerinden yabancılaştıkları konusunda çok endişe yaşamazlar'
        ],
        clinicalSignificance: 'İnatçılık, züppelik ve kendini beğenmişlik ile karakterize 13/31 varyasyonu',
        additionalNotes: [
          'Eğer profil Konversiyon vadisine uygunsa somatik yakınmalar dönemsel patlamalar ya da pasif agresif bir tarzda ifade edilir'
        ]
      };
    }

    case '136':
    case '316': {
      return {
        code: code,
        alternativeCode: code === '136' ? '316' : '136',
        description: '136/316 Kodları',
        characteristics: [
          'Bedensel semptomların (özellikle mide ve baş ağrısı) stres durumlarında ortaya çıkmasına karşın bu kişiler, diğerlerinden gelen istekler karşısında gergin ve aşırı duyarlıdırlar',
          'Bu bireyler benmerkezcil ve narsisistiktir ayrıca katı ve inatçı olma eğilimi içindedirler',
          'Sıklıkla bu profil veren erkek hastalar rekabetçi, şüpheci, çabuk kızan ve diğerlerini kontrol etmeyi isteyen bireylerdir',
          'Davranışlarını benmerkezcil olarak rasyonalize etme eğilimindedir, diğer insanlarla ilişkilerinde içgörüleri azdır ve onlardan beklentileri çok fazladır'
        ],
        clinicalSignificance: 'Benmerkezcil, narsisistik özellikler ve bedensel semptomlar kombinasyonu',
        additionalNotes: [
          'Pa alt testi Hy alt testinden 10 T puanından daha yüksekse şüphecilik ve kızgınlık oldukça belirgindir, olasılıkla erken paranoid şizofreniden şüphelenilir',
          'Hy alt testi, Pa alt testinden 10 ya da daha fazla T puanı yüksekse paranoid özellikler daha az belirgin olmak üzere fiziksel yakınmalar ön plana çıkabilir'
        ],
        genderSpecific: {
          male: [
            'Erkek hastalar rekabetçi, şüpheci, çabuk kızan ve diğerlerini kontrol etmeyi isteyen bireylerdir'
          ]
        }
      };
    }

    case '137': {
      return {
        code: '137',
        description: '137 Kodu',
        characteristics: [
          'Bu profili veren kişiler esnek değillerdir ve değişiklikler onları rahatsız eder',
          'Genellikle iş ve para konularında değerlendirmeleri gerçekçi değildir',
          'Yaşamlarını eğer evliyseler eşleri yönetir',
          'İş uyumları da bozuktur',
          'Bu kişiler psikoterapiye istekli ve bağlı olabilirler, ancak kendilerindeki saldırganlığı ve diğerlerine yönelik düşmancıl duyguları kabul etmek istemezler (özellikle alt test 4 düşükse)',
          'Anksiyete atakları çok sık olmamasına karşın özellikle sağlık ile ilgili konularda fobiler çok görülür'
        ],
        clinicalSignificance: 'Esneklik eksikliği, gerçekçi olmayan değerlendirmeler ve sağlık fobileri',
        additionalNotes: [
          'Eğer Ma alt testi de yükselmişse ve/ya da K alt testi 50 T puanından düşükse bunlar daha da belirgindir'
        ],
        therapeuticImplications: [
          'Psikoterapiye istekli ve bağlı olabilirler',
          'Saldırganlık ve düşmancıl duyguları kabul etme konusunda direnç gösterirler',
          'Özellikle alt test 4 düşükse bu direnç daha belirgindir'
        ]
      };
    }

    case '138':
    case '318': {
      return {
        code: code,
        alternativeCode: code === '138' ? '318' : '138',
        description: '138/318 Kodları',
        characteristics: [
          'Bu kişilerde duygudurum ve inançlar çok hızlı değişmektedir, din ve dinle ilgili delüzyonlar ortaya çıkabilir',
          'Bunlara ek olarak belirsiz somatik yakınmaları ve oldukça garip fikir ve inançları vardır',
          'Zaman zaman major konversiyon reaksiyonları ve hipokondriyak uğraşlar, şizofrenik reaksiyonları önleyebilir',
          'Bu gruptaki kişilerin çoğunluğuna borderline kişilik bozukluğu tanısı konabilir',
          'Ayrıca bunların çocukluk yaşantılarında ruhsal hastalık öyküsü olan bir aile ve/ya da duygusal yoksunlukların olduğu bir dönem vardır',
          'Bu kişiler yapılandırılmış durumlarda daha iyi işlev göşterirler, yapılanmamış durumlarda ise garip semptomlar ortaya çıkmaktadır'
        ],
        clinicalSignificance: 'Hızla değişen duygudurum, delüzyonlar ve borderline kişilik bozukluğu',
        possibleDiagnoses: ['Borderline kişilik bozukluğu'],
        genderSpecific: {
          male: [
            'Erkeklerde homoseksüellikle ilgili korkular yaygındır, hatta buna karşı çıkmak için maskulen işler seçerler'
          ]
        }
      };
    }

    case '139': {
      return {
        code: '139',
        description: '139 Kodu',
        characteristics: [
          'Başağrısı, görme ve işitme yakınmaları, titreme ve koordinasyon bozuklukları ve çok sayıda somatik yakınmalar kişiyi rahatsız etmektedir',
          'Bu kişilerde engellenme eşiği oldukça düşüktür, sinirlidirler ve öfke patlamaları vardır',
          'Eğer 4 alt testinde yükselme varsa ve K alt testi düşmüşse mücadeleci ve yıkıcı kişi olurlar',
          'Kişilerarası ilişkilerinde de öfke ön plandadır ve boşanmalar oldukça sık görülür',
          'Bu kişilerin genellikle mükemmelliği isteyen öyküleri vardır ve ailelerine ilgileri azdır',
          'Alkol alımından sonra düşmanlık duyguları ön plana çıkar'
        ],
        clinicalSignificance: 'Çoklu somatik yakınmalar, düşük engellenme eşiği ve öfke patlamaları',
        possibleDiagnoses: [
          'Somatoform bozukluk',
          'Organik beyin sendromu'
        ],
        additionalNotes: [
          'Bu kod, çok sık olarak kişilik bozuklukları ya da travmaya eşlik eden kronik beyin sendromu olan olgularda görülür',
          'Seyrek olarak anksiyete bozuklukları ile birliktedir'
        ]
      };
    }

    default:
      return null;
  }
}