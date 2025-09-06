import { TestSonucu, Danisan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fromPublicResults } from '@/lib/mmpi';
import {
  cannotSayInterpretation,
  lScaleInterpretation,
  fScaleInterpretation,
  kScaleInterpretation,
  carelessnessScaleInterpretation,
  analyzeValidityConfiguration,
  analyzeValidityConfigurationWithPersonalInfo,
  getKCorrectionSuggestion,
  analyzeKPlusProfile,
  calculateFKIndex
} from '@/lib/mmpi/interpretations';

interface MMPIValidityScaleInterpretationProps {
  testSonucu: TestSonucu;
  danisan?: Danisan;
}

interface InterpretationItem {
  scaleName: string;
  rawScore: number;
  tScore: number | null;
  data: InterpretationData | null;
  validity?: 'geçerli' | 'şüpheli' | 'geçersiz';
}

interface InterpretationData {
  level?: string;
  description?: string;
  interpretation?: string;
  points?: string[];
  validity?: 'geçerli' | 'şüpheli' | 'geçersiz';
  clinicalImplications?: string[];
  recommendations?: string[];
  personalizedNotes?: string[];
  reasonsForLeavingBlank?: {
    title: string;
    reasons: string[];
  };
  whatToDo?: {
    title: string;
    steps: string[];
  };
}

const renderInterpretation = (data: InterpretationData | null) => {
  if (!data) return <p>Bu puan aralığı için özel bir yorum bulunmamaktadır.</p>;

  return (
    <div className="space-y-4 text-sm">
      {data.level && <p className="font-semibold">Seviye: {data.level}</p>}
      {data.description && <p>{data.description}</p>}
      {data.interpretation && <p>{data.interpretation}</p>}
      
      {data.points && Array.isArray(data.points) && (
        <ul className="space-y-2 list-disc pl-5">
          {data.points.map((point: string, index: number) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {data.reasonsForLeavingBlank && (
        <div>
          <h4 className="font-semibold mt-4">{data.reasonsForLeavingBlank.title}</h4>
          <ul className="space-y-2 list-disc pl-5 mt-2">
            {data.reasonsForLeavingBlank.reasons.map((reason: string, index: number) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {data.whatToDo && (
        <div>
          <h4 className="font-semibold mt-4">{data.whatToDo.title}</h4>
          <ul className="space-y-2 list-disc pl-5 mt-2">
            {data.whatToDo.steps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {data.clinicalImplications && (
        <div>
          <h4 className="font-semibold mt-4">Klinik Sonuçlar:</h4>
          <ul className="space-y-2 list-disc pl-5 mt-2">
            {data.clinicalImplications.map((implication: string, index: number) => (
              <li key={index}>{implication}</li>
            ))}
          </ul>
        </div>
      )}

      {data.recommendations && (
        <div>
          <h4 className="font-semibold mt-4">Öneriler:</h4>
          <ul className="space-y-2 list-disc pl-5 mt-2">
            {data.recommendations.map((recommendation: string, index: number) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {data.personalizedNotes && (
        <div>
          <h4 className="font-semibold mt-4 text-blue-700">🔸 Kişisel Bilgilerinize Göre Özel Notlar:</h4>
          <ul className="space-y-2 list-disc pl-5 mt-2 bg-blue-50 p-3 rounded-md">
            {data.personalizedNotes.map((note: string, index: number) => (
              <li key={index} className="text-blue-800">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function MMPIValidityScaleInterpretation({ testSonucu, danisan }: MMPIValidityScaleInterpretationProps) {
  if (!testSonucu.mmpiSonuclari) {
    return null;
  }

  const mmpiResults = fromPublicResults(testSonucu.mmpiSonuclari);
  const unansweredCount = testSonucu.cevaplar?.filter(c => c.verilenPuan === -1).length || 0;

  // MMPI cevaplarını dikkatsizlik analizi için hazırla
  const mmpiResponses: Record<number, boolean> = {};
  if (testSonucu.cevaplar) {
    testSonucu.cevaplar.forEach(cevap => {
      const soruNumarasi = parseInt(cevap.soruId);
      if (!isNaN(soruNumarasi) && cevap.verilenPuan !== -1) {
        // 1 = Doğru, 0 = Yanlış olarak varsayıyoruz
        mmpiResponses[soruNumarasi] = cevap.verilenPuan === 1;
      }
    });
  }

  // Dikkatsizlik alt testi hesaplama
  const carelessnessScore = carelessnessScaleInterpretation.calculateScore(mmpiResponses);
  const carelessnessInterpretation = carelessnessScaleInterpretation.getInterpretation(carelessnessScore);

  // Kişiselleştirilmiş yorumlar için danışan bilgilerini hazırla
  const personalInfo = danisan ? {
    dogumTarihi: danisan.dogumTarihi,
    medeniDurum: danisan.medeniDurum,
    egitimDurumu: danisan.egitimDurumu,
    cinsiyet: danisan.cinsiyet as 'Erkek' | 'Kadin'
  } : undefined;

  // Geçerlik konfigürasyonu analizi
  const lTScore = mmpiResults.validityScales.L.tScore;
  const fTScore = mmpiResults.validityScales.F.tScore;
  const kTScore = mmpiResults.validityScales.K.tScore;
  
  const validityConfig = personalInfo ? 
    analyzeValidityConfigurationWithPersonalInfo(lTScore, fTScore, kTScore, personalInfo, mmpiResults.clinicalScales) :
    analyzeValidityConfiguration(lTScore, fTScore, kTScore, mmpiResults.clinicalScales);
  const kCorrectionSuggestion = getKCorrectionSuggestion(kTScore, fTScore);
  const kPlusProfile = analyzeKPlusProfile(lTScore, fTScore, kTScore, mmpiResults.clinicalScales);
  const fkIndex = calculateFKIndex(fTScore, kTScore);

  // Bu bölüm kaldırıldı - configurations.ts'ye entegre edilecek

  const interpretations: InterpretationItem[] = [
    {
      scaleName: 'Bir Şey Diyemem (?)',
      rawScore: unansweredCount,
      tScore: null,
      data: personalInfo ? 
        cannotSayInterpretation.getPersonalizedInterpretation(unansweredCount, personalInfo) :
        cannotSayInterpretation.getInterpretation(unansweredCount),
    },
    {
      scaleName: 'Yalan (L)',
      rawScore: mmpiResults.validityScales.L.rawScore,
      tScore: mmpiResults.validityScales.L.tScore,
      data: personalInfo ? 
        lScaleInterpretation.getPersonalizedInterpretation(mmpiResults.validityScales.L.tScore, personalInfo) :
        lScaleInterpretation.getInterpretation(mmpiResults.validityScales.L.tScore),
    },
    {
      scaleName: 'Sıklık (F)',
      rawScore: mmpiResults.validityScales.F.rawScore,
      tScore: mmpiResults.validityScales.F.tScore,
      data: personalInfo ? 
        fScaleInterpretation.getPersonalizedInterpretation(mmpiResults.validityScales.F.tScore, personalInfo) :
        fScaleInterpretation.getInterpretationByTScore(mmpiResults.validityScales.F.tScore),
    },
    {
      scaleName: 'Düzeltme (K)',
      rawScore: mmpiResults.validityScales.K.rawScore,
      tScore: mmpiResults.validityScales.K.tScore,
      data: personalInfo ? 
        kScaleInterpretation.getPersonalizedInterpretation(mmpiResults.validityScales.K.tScore, personalInfo) :
        kScaleInterpretation.getInterpretationByTScore(mmpiResults.validityScales.K.tScore),
    },
    {
      scaleName: 'Dikkatsizlik (DIKKAT)',
      rawScore: carelessnessScore,
      tScore: null,
      data: carelessnessInterpretation,
      validity: carelessnessInterpretation.validity,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dikkatsizlik Alt Testi Uyarısı */}
      {carelessnessInterpretation.validity === 'geçersiz' && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertDescription className="text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-destructive">
                ⚠️ KRİTİK: Yüksek Dikkatsizlik Tespit Edildi (Puan: {carelessnessScore}/12)
              </div>
              <p className="text-destructive/90">
                {carelessnessInterpretation.interpretation}
              </p>
              <div className="text-xs text-destructive/80 border-t border-destructive/20 pt-2">
                <strong>Önemli:</strong> Bu düzeydeki dikkatsizlik puanı test sonuçlarının geçersiz olduğunu gösterir. 
                Tüm diğer analizler dikkatli yorumlanmalı ve tercihen test tekrarlanmalıdır.
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {carelessnessInterpretation.validity === 'şüpheli' && (
        <Alert className="border-yellow-500 bg-yellow-50">
          <AlertDescription className="text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-yellow-700">
                ⚠️ DİKKAT: Şüpheli Dikkatsizlik Düzeyi (Puan: {carelessnessScore}/12)
              </div>
              <p className="text-yellow-700/90">
                {carelessnessInterpretation.interpretation}
              </p>
              <div className="text-xs text-yellow-600 border-t border-yellow-200 pt-2">
                <strong>Öneri:</strong> Test geçerliği şüpheli. Diğer geçerlik göstergeleri ile birlikte değerlendirilmeli.
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* F-K Endeksi Analizi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>F-K Endeksi Analizi</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">F-K = {fkIndex.value}</Badge>
              <Badge 
                variant={
                  fkIndex.validity === 'geçerli' ? 'default' :
                  fkIndex.validity === 'sahte-iyilik' ? 'secondary' :
                  fkIndex.validity === 'sahte-kötülük' ? 'destructive' :
                  'destructive'
                }
              >
                {fkIndex.validity.charAt(0).toUpperCase() + fkIndex.validity.slice(1)}
              </Badge>
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            F-K Endeksi = F Puanı - K Puanı ({fTScore} - {kTScore} = {fkIndex.value})
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {fkIndex.description && (
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="font-semibold text-sm">{fkIndex.description}</p>
            </div>
          )}
          
          <p className="text-sm leading-relaxed">{fkIndex.interpretation}</p>
          
          {fkIndex.clinicalImplications && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Olası Açıklamalar:</h4>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                {fkIndex.clinicalImplications.map((implication, index) => (
                  <li key={index}>{implication}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground border-t pt-3">
            <p><strong>Referans Aralıklar:</strong></p>
            <p>• 0 ve altı: Sahte-iyilik</p>
            <p>• 1-9: Geçerli profil</p>
            <p>• 8-11: Sorunları abartma (tedaviye açık)</p>
            <p>• 16+: Kritik düzey (dikkatli değerlendirme gerekli)</p>
          </div>
        </CardContent>
      </Card>

      {/* K+ Profil Analizi */}
      {kPlusProfile.isKPlusProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-warning">K+ Profili Tespit Edildi</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tek anlamlı yükselme K alt testinde gözlenen özel profil türü (Mark ve Seeman, 1963)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{kPlusProfile.interpretation}</p>
            
            {kPlusProfile.characteristics && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Kişilik Özellikleri:</h4>
                <ul className="space-y-1 list-disc pl-5 text-sm">
                  {kPlusProfile.characteristics.map((characteristic, index) => (
                    <li key={index}>{characteristic}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {kPlusProfile.clinicalImplications && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Klinik Sonuçlar:</h4>
                <ul className="space-y-1 list-disc pl-5 text-sm">
                  {kPlusProfile.clinicalImplications.map((implication, index) => (
                    <li key={index}>{implication}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Geçerlik Konfigürasyonu Analizi */}
      {validityConfig && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-primary">{validityConfig.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{validityConfig.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{validityConfig.interpretation}</p>
            
            {validityConfig.additionalNotes && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Ek Notlar:</h4>
                <ul className="space-y-1 list-disc pl-5 text-sm">
                  {validityConfig.additionalNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validityConfig.clinicalImplications && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Olası Nedenler:</h4>
                <ul className="space-y-1 list-disc pl-5 text-sm">
                  {validityConfig.clinicalImplications.map((implication, index) => (
                    <li key={index}>{implication}</li>
                  ))}
                </ul>
              </div>
            )}

            {validityConfig.personalizedNotes && (
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="font-semibold text-sm mb-2 text-blue-700">🔸 Kişisel Bilgilerinize Göre Özel Notlar:</h4>
                <ul className="space-y-1 list-disc pl-5 text-sm text-blue-800">
                  {validityConfig.personalizedNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* K Düzeltme Önerisi */}
      {kCorrectionSuggestion && (
        <Alert>
          <AlertDescription className="text-sm">
            <strong>K Düzeltme Uyarısı:</strong> {kCorrectionSuggestion}
          </AlertDescription>
        </Alert>
      )}

      {/* Bireysel Ölçek Yorumları */}
      <Card>
        <CardHeader>
          <CardTitle>Geçerlik Ölçekleri Yorumlaması</CardTitle>
          <p className="text-sm text-muted-foreground">
            Testin geçerliğine ilişkin alt testlerin bireysel yorumları.
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {interpretations.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="font-semibold">{item.scaleName}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Ham: {item.rawScore}</Badge>
                      {item.tScore !== null && <Badge variant="secondary">T: {item.tScore}</Badge>}
                      {item.validity && (
                        <Badge 
                          variant={
                            item.validity === 'geçerli' ? 'default' :
                            item.validity === 'şüpheli' ? 'secondary' :
                            'destructive'
                          }
                          className="text-xs"
                        >
                          {item.validity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderInterpretation(item.data)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Geçerlik konfigürasyonları burada gösterilecek */}
    </div>
  );
}
