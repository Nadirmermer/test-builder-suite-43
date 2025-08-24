// Depresyon (D) Alt Testi - Ölçek 2
// MMPI Klinik Ölçek - Depresyon belirtilerinin derecesini ölçmek amacıyla geliştirilmiştir

export interface DScaleInterpretation {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  suicideRisk?: string;
}

export class DScale {
  getInterpretation(tScore: number): DScaleInterpretation {
    if (tScore >= 85) {
      return {
        tScore,
        level: 'Çok Yüksek (T  85)',
        description: 'Bir şeye odaklaşamayacak ya da açık bir biçimde düşünemeyecek kadar kederli olan bireyleri gösterir.',
        characteristics: [
          'Depresif, mutsuz, kederli ve sıkıntılıdır',
          'Gelecekten umutsuzdur',
          'Kendini aşağılamaktadır',
          'Suçluluk duyguları vardır',
          'Konuşmak istemez',
          'Ağlar',
          'Yavaş hareket eder',
          'Depresif tanısı konulabilir',
          'Somatik yakınmaları vardır',
          'Güçsüzlük, yorgunluk, enerji kaybından yakınır',
          'Ajite ve gergindir',
          'Kolay kızar',
          'Üzüntüye eğilimlidir',
          'Kendine güveni azalmıştır',
          'Okulda ya da işte başarısız olduğunu düşünür',
          'Kendini işe yaramaz ve iş görmez gibi görür',
          'İçe çekilmiş, utangaç, ürkek, yalnız kalmaya eğilimli ve ketumdur',
          'Soğuktur',
          'Kişilerarası ilişkilerden kaçınır, insanlarla fazla konuşmaz',
          'Temkinli ve gelenekseldir',
          'Karar vermede güçlük çeker',
          'Saldırgan değildir',
          'Aşırı kontrollüdür, dürtülerini inkâr eder',
          'Hoş olmayan durumlardan kaçınır',
          'Yüzleştirmeden kaçınmak için ödün verir',
          'Huzursuzluğu nedeniyle psikoterapiye güdülüdür',
          'Var olan stresi yatıştığında terapiyi sonlandırma eğilimindedir'
        ],
        clinicalSignificance: 'Kritik düzey - Ağır depresif belirti düzeyi',
        therapeuticImplications: [
          'Acil psikiyatrik değerlendirme gerekebilir',
          'İntihar riski değerlendirmesi yapılmalı',
          'Antidepresan tedavi değerlendirmesi',
          'Yoğun psikoterapötik müdahale'
        ],
        suicideRisk: 'Kritik - Düşünce ve odaklanma bozukluğu düzeyinde depresyon'
      };
    } else if (tScore >= 79) {
      return {
        tScore,
        level: 'Yüksek (T  79)',
        description: 'Birey depresif ve kaygılıdır, benlik saygısı düşüktür. Genel olarak yaşama bakışı karamsardır.',
        characteristics: [
          'Depresif ve kaygılıdır',
          'Benlik saygısı düşüktür',
          'Genel olarak yaşama bakışı karamsardır',
          'Tipik olarak ilgi alanları daralmış, morali bozuktur',
          'Kendisini işe yaramaz olarak görür',
          'Duyarlıkları kendi depresyonlarına ve fonksiyon düzeylerine yönelmiştir',
          'Kendilerini soyutlama ile içe çekilme görülür',
          'Negatif yüklemeler kendilerinden hoşnut olmama sonucunu doğurur',
          'Değişme isteğiyle birlikte iyi bir prognoz sağlar'
        ],
        clinicalSignificance: 'Yüksek düzey - Belirgin depresif bozukluk',
        therapeuticImplications: [
          'Klinik depresyon tanısı konulabilir',
          'Somatik belirtiler ve yakınmalarla bir arada bulunur',
          'Sübjektif gerginlik anksiyete belirtisi olabilir',
          'Gerçek bir depresif durum olabilir',
          'Kişinin o anda çevresinden gelen rahatsızlıklarını yansıtabilir'
        ],
        behavioralIndicators: [
          'İlgi alanları daralmış',
          'Morali bozuk',
          'Kendini işe yaramaz görür',
          'İçe çekilme ve soyutlama',
          'Değişim motivasyonu mevcut'
        ],
        suicideRisk: 'Yüksek - Depresif belirtiler ve işlevsellik bozukluğu'
      };
    } else if (tScore >= 70) {
      return {
        tScore,
        level: 'Ciddi (T: 70-79)',
        description: 'Ciddi ve kendine güveni olmayan bireyleri gösterir. Klinik olarak belirgin depresyonu olan bireyi gösterir.',
        characteristics: [
          'Ciddi ve kendine güveni olmayan bireyler',
          'En küçük bir şey karşısında bile endişe duyma eğilimi',
          'Psikiyatrik hastalar bu ranjda yer alır',
          'Bireyin yaşadığı huzursuzluk iyileşme için motive olduğunun göstergesi'
        ],
        clinicalSignificance: 'Ciddi düzey - Psikiyatrik müdahale gerekli',
        therapeuticImplications: [
          'Durumsal baskılar yoksa ve özellikle L de yükselmiş ise tipik olarak iyi ve kötü ya da doğru ve yanlış biçiminde düşünürler',
          'Psikiyatrik hasta kategorisinde',
          'İyileşme motivasyonu yüksek'
        ],
        behavioralIndicators: [
          'Endişe eğilimi yüksek',
          'Kendine güvensizlik',
          'Ciddi kişilik yapısı'
        ],
        suicideRisk: 'Değerlendirme gerekli - Hastada depresyonun göstergeleri yoksa ve diğer alt testler yükselmemişse hastanın intihar eğilimi açısından değerlendirilmesi gerekmektedir'
      };
    } else if (tScore >= 60) {
      return {
        tScore,
        level: 'Orta Düzey (T: 60-69)',
        description: 'Bu bireylerde orta düzeyde depresyon, endişe ve karamsarlık göstergesi vardır.',
        characteristics: [
          'Orta düzeyde depresyon',
          'Endişe ve karamsarlık göstergesi',
          'Bu duygudurum hali, durumsal bir krize bağlı olabilir',
          'Kalıcı ve geri dönüşü olmayan bir durum da olabilir'
        ],
        clinicalSignificance: 'Orta düzey - Gözlem ve destek gerekli',
        therapeuticImplications: [
          'Durumsal kriz değerlendirmesi',
          'Kalıcılık düzeyinin belirlenmesi',
          'Destekleyici müdahaleler'
        ],
        behavioralIndicators: [
          'Endişe ve karamsarlık belirtileri',
          'Durumsal ya da kalıcı duygudurum değişikliği'
        ]
      };
    } else if (tScore >= 45) {
      return {
        tScore,
        level: 'Normal (T: 45-59)',
        description: 'Bu, bireyin yaşamında iyimserlik ve karamsarlık dengesini kurduğunun göstergesidir.',
        characteristics: [
          'İyimserlik ve karamsarlık dengesi',
          'Yaşam dengesini kurmuş',
          'Uyumlu duygudurum'
        ],
        clinicalSignificance: 'Normal aralık - Dengeli duygudurum',
        therapeuticImplications: [
          'Özel müdahale gerekmiyor',
          'Mevcut dengenin korunması'
        ]
      };
    } else {
      return {
        tScore,
        level: 'Düşük (T: 28-44)',
        description: 'Olasılıkla neşeli, meraklı, iyimser, aktif ve dışa dönüktürler.',
        characteristics: [
          'Gerginlik, anksiyete, suçluluk ve depresyondan arınmıştır',
          'Rahat ve huzurludur',
          'Kendine güvenlidir',
          'Duygusal açıdan dengeli ve tutarlıdır',
          'Pek çok durumda etkili davranır',
          'Neşeli ve iyimserdir',
          'Sözelleştirmede güçlüğü çok azdır',
          'Aktif, enerjik, uyanıktır',
          'Yarışmacıdır',
          'Sorumluluk alabilir',
          'Sosyal ortamlarda rahattır',
          'Liderlik rolünü üstlenir',
          'Zeki, esprili ve renklidir',
          'İlk bakışta olumlu bir izlenim yaratır',
          'İmpulsif değildir, kontrollüdür',
          'Ketlenmemiştir, kendini kolaylıkla ortaya koyabilir',
          'Diğer insanlarda kızgınlık ve düşmanlık uyandırır',
          'Otorite rolünde olan kişilerle çatışması vardır'
        ],
        clinicalSignificance: 'Sağlıklı düzey - Yüksek işlevsellik',
        therapeuticImplications: [
          'Sağlıklı yaklaşımın sürdürülmesi',
          'Sosyal ilişkilerde dengelilik önemli'
        ],
        behavioralIndicators: [
          'Bu durum bazen bu bireylerin kayıtsız gibi algılanmalarına neden olur',
          'Bu da diğerlerinde hostilite ortaya çıkarır',
          'Si alt testinin düşüklüğü ile birlikte değerlendirilmeli'
        ]
      };
    }
  }
}

/**
 * Depresyon Alt Testinde Sadece Yükselme (Spike) Yorumu
 */
export function getDSpikeInterpretation(): string {
  return `Sadece D alt testinin yükselmesi: Sadece D alt testi 70 T puanının üstüne çıktığında birey reaktif bir depresyon yaşamaktadır. Yetersiz, güvensizdir, kendini cezalandırarak suçluluk duygularından kurtulma çabası içindedir ve çok fazla kaygılıdır, kendini eleştirir, sanki yaşadığı durum ya da bunu kontrol edememe için bir kefaret (ceza) ödeyecekmiş gibi. Birey depresif olduğunu (bu duygudurum başkaları için çok açık olabildiği halde) inkâr edecektir. Psikoterapi prognozu genellikle kısa bir süre içinde iyidir ve bu tür hastalar yöneltici, yüzleştirici bir yaklaşıma iyi yanıt verirler.`;
}

/**
 * Lise Öğrencilerinde D Yükselmesi
 */
export function getDHighSchoolNote(): string {
  return 'Lise öğrencilerinde 2\'nin tek başına 70 T puanının üstünde olması genellikle klinik olarak daha az anlamlıdır ve sıklıkla durumsal sorunlar genellikle karşı cinsle ilişkiler, ders çalışmada ya da mesleki seçenekler üzerindeki kaygıyı yansıtır.';
}

/**
 * Yüksekokul Öğrencilerinde D Yükselmesi
 */
export function getDCollegeNote(): string {
  return 'Depresyonun tek başına yüksek olduğu yüksekokul öğrencileri tipik olarak sorunlarının kökenine inme çabalarını reddederler ve bunun yerine ebeveyn yerine geçen birinden öğüt almaya çalışırlar.';
}

/**
 * Diğer Alt Testlerle İlişki Notu
 */
export function getDRelationshipNote(): string {
  return 'Alt test 2\'nin yorumlanması, birlikte yükselen diğer alt testlere göre değişmektedir. Depresyon çok farklı nedenlerden kaynaklanabilir ve bunlar ancak diğer alt testlerdeki yükselmelere bakılarak yorumlanabilir. Alt test 2 tek başına T-70 değeri üzerinde bir yükselme gösteriyorsa ve depresyona ilişkin açık davranışsal belirtiler yoksa, intihar riskine karşı dikkatli olmak gerekir.';
}

// Geriye uyumluluk için eski export objesi
export const dScaleInterpretation = {
  getInterpretation: (tScore: number) => new DScale().getInterpretation(tScore),
  getSpikeInterpretation: getDSpikeInterpretation,
  getHighSchoolNote: getDHighSchoolNote,
  getCollegeNote: getDCollegeNote,
  getRelationshipNote: getDRelationshipNote,
  name: 'Depresyon (D)',
  number: 2,
  description: 'Depresyon belirtilerinin derecesini ölçmek amacıyla geliştirilmiştir. Depresyonda olan kişilerin ana belirtileri, karamsarlık, gelecekten ümitsizlik, kendini değersiz görme, suçluluk duyguları, hareketlerde ve düşüncede yavaşlama ve çeşitli bedensel yakınmalardır.'
};
