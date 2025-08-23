// MMPI Klinik Alt Ölçek Yorumlama Motoru - Resmi Türk Uygulama Kitabından

import { getHipokondriazisInterpretation, type HsInterpretation } from './hipokondriazis';
import { getDepresyonInterpretation, type DInterpretation } from './depresyon';
import { getHisteriInterpretation, type HyInterpretation } from './histeri';
import { getPsikopatikSapmaInterpretation, type PdInterpretation } from './psikopatikSapma';
import { getKadinlikErkeklikInterpretation, type MfInterpretation } from './kadinlikErkeklik';
import { getParanoyaInterpretation, type PaInterpretation } from './paranoya';
import { getPsikasteniInterpretation, type PtInterpretation } from './psikasteni';
import { getSizofreniInterpretation, type ScInterpretation } from './sizofreni';
import { getHipomaniInterpretation, type MaInterpretation } from './hipomani';
import { getSosyalIcedönüklükInterpretation, type SiInterpretation } from './sosyalIcedönüklük';
import { MMPIResults } from '../core/scoring';

export interface ClinicalScaleInterpretation {
  scaleId: string;
  scaleName: string;
  tScore: number;
  level: 'normal' | 'elevated' | 'clinical';
  interpretation: HsInterpretation | DInterpretation | HyInterpretation | PdInterpretation | MfInterpretation | PaInterpretation | PtInterpretation | ScInterpretation | MaInterpretation | SiInterpretation | any | null;
  isIsolatedElevation: boolean;
  clinicalSignificance: string;
}

export interface ComprehensiveClinicalInterpretation {
  scaleInterpretations: ClinicalScaleInterpretation[];
  profilePattern: string;
  primaryConcerns: string[];
  therapeuticRecommendations: string[];
  riskFactors: string[];
  prognosticIndicators: string[];
}

// Ölçek isimleri
const scaleNames: Record<string, string> = {
  Hs: 'Hipokondriazis',
  D: 'Depresyon',
  Hy: 'Histeri',
  Pd: 'Psikopatik Sapma',
  Mf: 'Maskülinite-Femininite',
  Pa: 'Paranoya',
  Pt: 'Psikastenik',
  Sc: 'Şizofreni',
  Ma: 'Hipomani',
  Si: 'Sosyal İçedönüklük'
};

/**
 * Tek ölçek yorumlama - yaş faktörü dahil
 */
export function interpretClinicalScale(
  scaleId: string,
  tScore: number,
  level: 'normal' | 'elevated' | 'clinical',
  isIsolatedElevation: boolean = false,
  age?: number,
  gender?: 'Erkek' | 'Kadin',
  educationLevel?: 'low' | 'high'
): ClinicalScaleInterpretation {
  
  let interpretation: HsInterpretation | DInterpretation | HyInterpretation | PdInterpretation | MfInterpretation | PaInterpretation | PtInterpretation | ScInterpretation | MaInterpretation | SiInterpretation | any | null = null;
  let clinicalSignificance = '';
  
  const isAdolescent = age !== undefined && age >= 13 && age <= 18;
  
  switch (scaleId) {
    case 'Hs':
      interpretation = getHipokondriazisInterpretation(tScore, isIsolatedElevation);
      clinicalSignificance = generateClinicalSignificance('Hs', tScore, isIsolatedElevation);
      break;
      
    case 'D':
      interpretation = getDepresyonInterpretation(tScore, isIsolatedElevation, isAdolescent);
      clinicalSignificance = generateClinicalSignificance('D', tScore, isIsolatedElevation, isAdolescent);
      break;
      
    case 'Hy':
      interpretation = getHisteriInterpretation(tScore, isIsolatedElevation);
      clinicalSignificance = generateClinicalSignificance('Hy', tScore, isIsolatedElevation, isAdolescent);
      break;
      
    case 'Pd':
      interpretation = getPsikopatikSapmaInterpretation(tScore, isIsolatedElevation, age);
      clinicalSignificance = generateClinicalSignificance('Pd', tScore, isIsolatedElevation, isAdolescent, age);
      break;
      
    case 'Mf':
      if (gender) {
        interpretation = getKadinlikErkeklikInterpretation(tScore, gender, isIsolatedElevation, age, educationLevel);
        clinicalSignificance = generateClinicalSignificance('Mf', tScore, isIsolatedElevation, isAdolescent, age, gender);
      }
      break;
      
    case 'Pa':
      interpretation = getParanoyaInterpretation(tScore, isIsolatedElevation);
      clinicalSignificance = generateClinicalSignificance('Pa', tScore, isIsolatedElevation, isAdolescent);
      break;
      
    case 'Pt':
      interpretation = getPsikasteniInterpretation(tScore, isIsolatedElevation);
      clinicalSignificance = generateClinicalSignificance('Pt', tScore, isIsolatedElevation, isAdolescent);
      break;
      
    case 'Sc':
      interpretation = getSizofreniInterpretation(tScore, isIsolatedElevation);
      clinicalSignificance = generateClinicalSignificance('Sc', tScore, isIsolatedElevation, isAdolescent);
      break;
      
    case 'Ma':
      interpretation = getHipomaniInterpretation(tScore, isIsolatedElevation, age);
      clinicalSignificance = generateClinicalSignificance('Ma', tScore, isIsolatedElevation, isAdolescent, age);
      break;
      
    case 'Si':
      interpretation = getSosyalIcedönüklükInterpretation(tScore, isIsolatedElevation, age);
      clinicalSignificance = generateClinicalSignificance('Si', tScore, isIsolatedElevation, isAdolescent, age);
      break;
      
    default:
      // Diğer ölçekler için temel yorumlama (henüz detaylandırılmamış)
      clinicalSignificance = generateBasicClinicalSignificance(scaleId, tScore, level);
  }
  
  return {
    scaleId,
    scaleName: scaleNames[scaleId] || scaleId,
    tScore,
    level,
    interpretation,
    isIsolatedElevation,
    clinicalSignificance
  };
}

/**
 * Kapsamlı klinik yorumlama
 */
export function generateComprehensiveClinicalInterpretation(
  results: MMPIResults,
  age?: number
): ComprehensiveClinicalInterpretation {
  
  const scaleInterpretations: ClinicalScaleInterpretation[] = [];
  const primaryConcerns: string[] = [];
  const therapeuticRecommendations: string[] = [];
  const riskFactors: string[] = [];
  const prognosticIndicators: string[] = [];
  
  // Klinik anlamlı yükselmeleri tespit et
  const elevatedScales = Object.entries(results.clinicalScales)
    .filter(([_, result]) => result.tScore >= 65)
    .sort(([, a], [, b]) => b.tScore - a.tScore);
  
  const clinicalScales = Object.entries(results.clinicalScales);
  
  // Her ölçeği yorumla
  for (const [scaleId, scaleResult] of clinicalScales) {
    const isIsolated = elevatedScales.length === 1 && elevatedScales[0][0] === scaleId;
    
    const scaleInterpretation = interpretClinicalScale(
      scaleId,
      scaleResult.tScore,
      scaleResult.level,
      isIsolated,
      age
    );
    
    scaleInterpretations.push(scaleInterpretation);
    
    // T ≥ 65 olan ölçekler için birincil kaygıları ekle
    if (scaleResult.tScore >= 65) {
      primaryConcerns.push(`${scaleNames[scaleId]}: T=${scaleResult.tScore}`);
      
      // Ölçek-özel risk faktörleri ve önerileri ekle
      addScaleSpecificRecommendations(
        scaleId, 
        scaleResult.tScore, 
        isIsolated,
        therapeuticRecommendations,
        riskFactors,
        prognosticIndicators
      );
    }
  }
  
  // Profil paterni belirle
  const profilePattern = generateProfilePattern(elevatedScales);
  
  return {
    scaleInterpretations,
    profilePattern,
    primaryConcerns,
    therapeuticRecommendations,
    riskFactors,
    prognosticIndicators
  };
}

function generateClinicalSignificance(
  scaleId: string, 
  tScore: number, 
  isIsolated: boolean,
  isAdolescent: boolean = false,
  age?: number,
  gender?: 'Erkek' | 'Kadin'
): string {
  switch (scaleId) {
    case 'Hs':
      if (tScore >= 84) return 'Somatik delüzyonlar riski, şizofrenik epizod başlangıcı olasılığı';
      if (tScore >= 75) return 'Belirgin hipokondriyak özellikler, aşırı talep edici tutum';
      if (tScore >= 65) return 'Bedensel yakınmalara aşırı odaklanma, somatizasyon riski';
      if (tScore < 30) return 'Bedensel yakınmaları inkâr etme eğilimi';
      return 'Normal sağlık kaygıları';
      
    case 'D':
      if (isIsolated && tScore >= 70) {
        if (isAdolescent) {
          return 'Durumsal kaygılar (akademik, sosyal ilişkiler), genellikle geçici';
        }
        return 'Reaktif depresyon, iyi prognoz, tedaviye iyi yanıt';
      }
      if (tScore >= 85) return 'Ağır depresif semptomlar, işlevsellik bozukluğu';
      if (tScore >= 79) return 'Klinik depresyon, değişim motivasyonu var';
      if (tScore >= 70) return 'İntihar riski değerlendirmesi gerekli';
      if (tScore < 30) return 'Aşırı iyimserlik, diğerlerinde irritasyon yaratabilir';
      return 'Normal duygudurum dengesi';
      
    case 'Hy':
      if (isIsolated && tScore >= 70) {
        return 'İzole Hy yükselmesi - kabul edilme ihtiyacı ve reddedilme korkusu';
      }
      if (tScore >= 85) return 'Aşırı immatürite, kronik rijidite, içgörü eksikliği';
      if (tScore >= 76) return 'Konversiyon semptomları, uzun süreli güvensizlik';
      if (tScore >= 70) return 'Histeroid mekanizmalar, ikincil kazanç belirgin';
      if (tScore >= 60) return 'Histerik özellikler, somatizasyon riski';
      if (tScore < 45) return 'Aşırı öz-eleştiri, sosyal ilişkileri inkâr';
      return 'Normal histeri düzeyi';
      
    case 'Pd':
      if (age !== undefined) {
        if (age < 25 && tScore >= 70) {
          return 'Ergenlik döneminde normal olabilir (kimlik gelişimi)';
        } else if (age >= 25 && tScore >= 80) {
          return 'Patolojik antisosyal davranış, kötü prognoz';
        } else if (age >= 40 && tScore >= 70) {
          return 'Kalıcı kişilerarası sorunlar ve antisosyal davranış';
        } else if (age >= 60 && tScore >= 70) {
          return 'Apatik yabancılaşma düzeyi';
        }
      }
      if (isIsolated && tScore >= 70) {
        return 'İzole Pd yükselmesi - antisosyal kişilik özellikleri güçlü';
      }
      if (tScore >= 80) return 'Klinik psikopatik özellikler, antisosyal davranış';
      if (tScore >= 70) return 'Antisosyal eğilimler, impulsivite, Ma/Si düzeyleri önemli';
      if (tScore >= 60) return 'Risk alma, enerji yüksek, engellenme durumunda antisosyal risk';
      if (tScore < 45) return 'Aşırı pasiflik, sosyal geleneklere katı bağlılık';
      return 'Normal impulsivite ve sosyal uyum';
      
    case 'Mf':
      if (gender === 'Erkek') {
        if (isIsolated && tScore >= 75) {
          return 'İzole Mf yükselmesi - cinsel kimlik faktörleri, kültürel değerlendirme gerekli';
        }
        if (tScore >= 80) return 'Geleneksel erkeksi rolle özdeşim sorunu, cinsel kimlik çatışması';
        if (tScore >= 70) return 'Estetik/sanatsal ilgiler, sosyal duyarlılık (eğitimlilerde normal)';
        if (tScore >= 60) return 'Üniversite/sanat eğitimi ile uyumlu (demografik değerlendirme)';
        if (tScore <= 40) return 'Aşırı maskülen davranış, cinsel kimlik güvensizliği';
        return 'Normal erkeksi ilgiler';
      } else { // Kadın
        if (tScore >= 65) return 'Geleneksel kadın rolü reddi, atılganlık (14-19 yaş normaldir)';
        if (tScore >= 60) return 'Aktif, atılgan ve yarışmacı';
        if (tScore <= 40) return 'Geleneksel kadın rolü (eğitim düzeyine göre yorumlanmalı)';
        return 'Normal kadınsı ilgiler';
      }
    case 'Pa':
      if (tScore >= 80) return 'Açık paranoid bozukluk, psikotik özellikler';
      if (tScore >= 70) return 'Belirgin paranoid eğilimler, hostilite';
      if (tScore >= 60) return 'Orta düzeyde paranoid eğilimler';
      if (tScore < 35) return 'Paradoksal paranoid bozukluk olasılığı';
      return 'Normal paranoid eğilim';
      
    case 'Pt':
      if (tScore >= 84) return 'Ağır anksiyete, obsesif-kompulsif özellikler';
      if (tScore >= 75) return 'Belirgin anksiyete ve mükemmeliyetçilik';
      if (tScore >= 60) return 'Orta düzeyde anksiyete ve endişe';
      if (tScore < 30) return 'Çok düşük anksiyete, motivasyon eksikliği olasılığı';
      return 'Normal anksiyete düzeyi';
      
    case 'Sc':
      if (tScore >= 100) return 'Akut psikotik reaksiyon, kimlik krizi';
      if (tScore >= 75) return 'Psikotik düşünce bozukluğu, yabancılaşma';
      if (tScore >= 60) return 'Şizoid özellikler, örtük psikoz araştırılmalı';
      if (tScore < 30) return 'Aşırı konservatif, hayal gücü eksikliği';
      return 'Normal soyut düşünce';
      
    case 'Ma':
      if (tScore >= 85) return 'Akut manik dönem, ajitasyon';
      if (tScore >= 70) return 'Belirgin hipomanik özellikler';
      if (tScore >= 60) return 'Sağlıklı enerji düzeyi';
      if (tScore < 30) return 'Düşük enerji, olası depresyon';
      return 'Normal enerji düzeyi';
      
    case 'Si':
      if (tScore >= 70) return 'Ciddi sosyal anksiyete ve beceriksizlik';
      if (tScore >= 60) return 'Orta düzeyde sosyal çekingenlik';
      if (tScore < 30) return 'Aşırı sosyal ihtiyaç, dürtü kontrolü problemleri';
      return 'Normal sosyal işlevsellik';
      
    default:
      return 'Genel değerlendirme gerekli';
  }
}
function generateBasicClinicalSignificance(
  scaleId: string,
  tScore: number,
  level: 'normal' | 'elevated' | 'clinical'
): string {
  const scaleName = scaleNames[scaleId] || scaleId;
  
  if (level === 'clinical') {
    return `${scaleName} ölçeğinde klinik anlamlı yükselme (T=${tScore}). Detaylı değerlendirme gerekli.`;
  } else if (level === 'elevated') {
    return `${scaleName} ölçeğinde yükseltilmiş puanlar (T=${tScore}). İzlem önerilir.`;
  }
  return `${scaleName} ölçeğinde normal değerler (T=${tScore}).`;
}

function addScaleSpecificRecommendations(
  scaleId: string,
  tScore: number,
  isIsolated: boolean,
  therapeuticRecommendations: string[],
  riskFactors: string[],
  prognosticIndicators: string[]
): void {
  
  switch (scaleId) {
    case 'Hs':
      if (tScore >= 70) {
        therapeuticRecommendations.push('Somatik yakınmalara yönelik medikal değerlendirme');
        therapeuticRecommendations.push('Psikoterapi motivasyonu düşük - sabırlı yaklaşım gerekli');
        riskFactors.push('Tedavi uyumsuzluğu riski');
        riskFactors.push('Terapist ile çatışma riski');
        prognosticIndicators.push('Sınırlı içgörü - prognoz temkinli');
      }
      break;
      
    case 'D':
      if (isIsolated && tScore >= 70) {
        therapeuticRecommendations.push('Yöneltici, yüzleştirici terapi yaklaşımı');
        therapeuticRecommendations.push('Kısa süreli terapi uygun olabilir');
        prognosticIndicators.push('İyi prognoz beklentisi');
      } else if (tScore >= 70) {
        therapeuticRecommendations.push('İntihar riski değerlendirmesi yapılmalı');
        therapeuticRecommendations.push('Motivasyon yüksek - terapiye iyi katılım beklenir');
        riskFactors.push('İntihar riski');
        prognosticIndicators.push('Değişim motivasyonu var');
      }
      break;
      
    case 'Hy':
      if (tScore >= 70) {
        therapeuticRecommendations.push('Başlangıçta istekli görünse de psikolojik yorumlara dirençli');
        therapeuticRecommendations.push('Doğrudan verilen akıl ve önerilere uyar');
        therapeuticRecommendations.push('İçgörü kazanması için sabırlı yaklaşım gerekli');
        riskFactors.push('Tedavi uyumsuzluğu riski (ikincil kazanç)');
        riskFactors.push('Evlilik ve otorite figürleriyle sorunlar');
        if (tScore >= 85) {
          prognosticIndicators.push('Kronik seyir ve rijidite beklenir');
        } else {
          prognosticIndicators.push('İçgörü kazanması yavaş ama mümkün');
        }
      }
      break;
      
    case 'Pd':
      if (tScore >= 70) {
        therapeuticRecommendations.push('Prognoz kötü - değişim motivasyonu sınırlı');
        therapeuticRecommendations.push('Yapılandırılmış, sınırları net terapi yaklaşımı');
        therapeuticRecommendations.push('Yaş faktörü kritik - ergenlik normal, 25+ patolojik');
        riskFactors.push('Tedavi sonlandırma riski yüksek');
        riskFactors.push('Antisosyal davranış riski');
        riskFactors.push('Yasal sorunlar olasılığı');
        if (tScore >= 80) {
          prognosticIndicators.push('Çok kötü prognoz - kalıcı antisosyal davranış');
        } else {
          prognosticIndicators.push('Yaş ve durumsal faktörlere bağlı prognoz');
        }
      }
      break;
      
    case 'Mf':
      if (tScore >= 65 || tScore <= 40) {
        therapeuticRecommendations.push('Cinsel kimlik ve rol konuları değerlendirilmeli');
        therapeuticRecommendations.push('Kültürel ve eğitim faktörleri dikkate alınmalı');
        therapeuticRecommendations.push('Yaş faktörü önemli (ergenlik normal)');
        if (tScore >= 65) {
          prognosticIndicators.push('Rol reddi - uyum sorunları olasılığı');
        } else {
          prognosticIndicators.push('Aşırı geleneksel roller - esneklik sınırlı');
        }
      }
      break;
      
    case 'Pa':
      if (tScore >= 80) {
        therapeuticRecommendations.push('Psikoterapiye yanıtı kötü - sabırlı yaklaşım gerekli');
        therapeuticRecommendations.push('Duygusal sorunları hakkında konuşmak istemez');
        riskFactors.push('Terapistle ilişki kurmakta güçlük');
        riskFactors.push('Psikotik dekompensasyon riski');
        prognosticIndicators.push('Kötü prognoz - kronik paranoid özellikler');
      } else if (tScore >= 70) {
        therapeuticRecommendations.push('Aşırı savunucu tutum - yavaş ilerleme beklenir');
        riskFactors.push('Hostilite ve çatışma riski');
        prognosticIndicators.push('Sınırlı içgörü - prognoz temkinli');
      }
      break;
      
    case 'Sc':
      if (tScore >= 100) {
        therapeuticRecommendations.push('Tıbbi yardım ve ilaç tedavisinden yararlanabilir');
        riskFactors.push('Akut psikotik reaksiyon riski');
        prognosticIndicators.push('Şizofren değil - akut stres reaksiyonu');
      } else if (tScore >= 75) {
        therapeuticRecommendations.push('Terapistle anlamlı ilişki kurmakta gönülsüz');
        riskFactors.push('Gerçek psikotik düşünce bozukluğu');
        prognosticIndicators.push('Prognozu kötüdür');
      }
      break;
      
    case 'Ma':
      if (tScore >= 85) {
        therapeuticRecommendations.push('Psikoterapiye düzensiz aralıklarla gelir');
        riskFactors.push('Ajitasyon ve manik dönem riski');
        prognosticIndicators.push('Sorunları stereotipik bir biçimde tekrarlar');
      } else if (tScore >= 70) {
        therapeuticRecommendations.push('Psikoterapide yoruma direnç gösterir');
        therapeuticRecommendations.push('Psikoterapiyi erken sonlandırma eğilimi');
        prognosticIndicators.push('Terapide prognozu kötüdür');
      }
      break;
      
    case 'Si':
      if (tScore >= 70) {
        therapeuticRecommendations.push('Sosyal beceri eğitimi gerekebilir');
        riskFactors.push('Sosyal anksiyete ve beceriksizlik');
        prognosticIndicators.push('Nevrotik üçlüde yükselme görülebilir');
      } else if (tScore < 30) {
        therapeuticRecommendations.push('İmpuls kontrolü konusunda çalışma gerekebilir');
        riskFactors.push('Dürtü kontrolü problemleri');
      }
      break;
      
    case 'Pt':
      if (tScore >= 84) {
        therapeuticRecommendations.push('Anksiyetelerinin semptomatik tedavisi öncelikli');
        therapeuticRecommendations.push('Kısa psikoterapiye iyi yanıt vermez');
        riskFactors.push('Günlük işlevsellik ciddi bozulma');
        prognosticIndicators.push('Uzun süreli tedavi gereksinimi');
      } else if (tScore >= 75) {
        therapeuticRecommendations.push('Entellektüalize ve rasyonalize eder');  
        therapeuticRecommendations.push('Yorumlara direnç gösterir');
        prognosticIndicators.push('Yavaş ama kalıcı gelişme beklenir');
      }
      break;
  }
}

function generateProfilePattern(elevatedScales: Array<[string, any]>): string {
  if (elevatedScales.length === 0) {
    return 'Normal profil - klinik anlamlı yükselme yok';
  }
  
  const scaleIds = elevatedScales.map(([id]) => id).slice(0, 3);
  const primaryPattern = scaleIds.join('-');
  
  // Özel profil kombinasyonları
  if (scaleIds.includes('Hs') && scaleIds.includes('D') && scaleIds.includes('Hy')) {
    return `Nevrotik Üçlü (${primaryPattern}) - Somatik ve depresif yakınmalar`;
  }
  
  return `Birincil yükselme: ${primaryPattern}`;
}