import { TestSonucu } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fromPublicResults } from '@/lib/mmpi';
import { normalizeGender } from '@/lib/mmpi/core/gender-utils';
import { HsScale, getHsSpikeInterpretation } from '@/lib/mmpi/interpretations/clinical/hs-scale';
import { DScale, getDSpikeInterpretation, getDRelationshipNote } from '@/lib/mmpi/interpretations/clinical/d-scale';
import { HyScale } from '@/lib/mmpi/interpretations/clinical/hy-scale';
import { PdScale } from '@/lib/mmpi/interpretations/clinical/pd-scale';
import { MfScale } from '@/lib/mmpi/interpretations/clinical/mf-scale';
import { PaScale, getPaSpikeInterpretation } from '@/lib/mmpi/interpretations/clinical/pa-scale';
import { PtScale, getPtSpikeInterpretation } from '@/lib/mmpi/interpretations/clinical/pt-scale';
import { ScScale } from '@/lib/mmpi/interpretations/clinical/sc-scale';
import { MaScale, getMaSpikeInterpretation, getMaInterpretationWarnings } from '@/lib/mmpi/interpretations/clinical/ma-scale';
import { SiScale } from '@/lib/mmpi/interpretations/clinical/si-scale';

interface MMPIClinicalScaleInterpretationProps {
  testSonucu: TestSonucu;
  danisanCinsiyet?: string; // Mf ölçeği için gerekli
}

interface ScaleResult {
  tScore: number;
  rawScore: number;
}

interface ClinicalInterpretationData {
  tScore: number;
  level: string;
  description: string;
  characteristics: string[];
  clinicalSignificance?: string;
  therapeuticImplications?: string[];
  behavioralIndicators?: string[];
  suicideRisk?: string; // D ölçeği için özel
  additionalNotes?: string[]; // Hy ve Pd ölçekleri için
  ageConsiderations?: string[]; // Pd ölçeği için özel
  genderSpecific?: boolean; // Mf ölçeği için özel
  gender?: 'Erkek' | 'Kadin'; // Mf ölçeği için özel
  psychoticFeatures?: string[]; // Pa ölçeği için özel
  therapyResponse?: string[]; // Pa ölçeği için özel
  profileConsiderations?: string[]; // Sc ölçeği için özel
  interpretationWarnings?: string[]; // Ma ölçeği için özel
  relationshipImplications?: string[]; // Si ölçeği için özel
}

const renderClinicalInterpretation = (data: ClinicalInterpretationData | null) => {
  if (!data) return <p>Bu T-skor aralığı için özel bir yorum bulunmamaktadır.</p>;

  return (
    <div className="space-y-4 text-sm">
      <div className="bg-secondary/30 p-3 rounded-lg">
        <p className="font-semibold text-base mb-2">{data.level}</p>
        <p className="leading-relaxed">{data.description}</p>
      </div>

      {data.clinicalSignificance && (
        <Alert>
          <AlertDescription>
            <strong>Klinik Anlam:</strong> {data.clinicalSignificance}
          </AlertDescription>
        </Alert>
      )}

      {data.suicideRisk && (
        <Alert variant="destructive">
          <AlertDescription>
            <strong>İntihar Riski:</strong> {data.suicideRisk}
          </AlertDescription>
        </Alert>
      )}

      {data.characteristics && data.characteristics.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Kişilik Özellikleri:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {data.characteristics.map((characteristic, index) => (
              <li key={index}>{characteristic}</li>
            ))}
          </ul>
        </div>
      )}

      {data.behavioralIndicators && data.behavioralIndicators.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Davranışsal Göstergeler:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {data.behavioralIndicators.map((indicator, index) => (
              <li key={index}>{indicator}</li>
            ))}
          </ul>
        </div>
      )}

      {data.therapeuticImplications && data.therapeuticImplications.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Terapötik Sonuçlar:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {data.therapeuticImplications.map((implication, index) => (
              <li key={index}>{implication}</li>
            ))}
          </ul>
        </div>
      )}

      {data.psychoticFeatures && data.psychoticFeatures.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Psikotik Özellikler</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.psychoticFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.therapyResponse && data.therapyResponse.length > 0 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Tedavi Yanıtı</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.therapyResponse.map((response, index) => (
                  <li key={index}>{response}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.profileConsiderations && data.profileConsiderations.length > 0 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Profil Değerlendirme Kriterleri</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.profileConsiderations.map((consideration, index) => (
                  <li key={index}>{consideration}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.interpretationWarnings && data.interpretationWarnings.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Yorumlama Uyarıları</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.interpretationWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.relationshipImplications && data.relationshipImplications.length > 0 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">İlişki ve Evlilik Etkileri</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.relationshipImplications.map((implication, index) => (
                  <li key={index}>{implication}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.ageConsiderations && data.ageConsiderations.length > 0 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Yaş Faktörü Değerlendirmesi</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {data.ageConsiderations.map((consideration, index) => (
                  <li key={index}>{consideration}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.genderSpecific && data.gender && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Cinsiyet Spesifik Değerlendirme</p>
              <p className="text-sm">Bu yorum <strong>{data.gender === 'Erkek' ? 'erkek' : 'kadın'}</strong> bireylere özeldir. Mf ölçeği cinsiyet açısından farklı yorumlamalar içerir.</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {data.additionalNotes && data.additionalNotes.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Ek Notlar:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {data.additionalNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function MMPIClinicalScaleInterpretation({ testSonucu, danisanCinsiyet }: MMPIClinicalScaleInterpretationProps) {
  if (!testSonucu.mmpiSonuclari) {
    return null;
  }

  const mmpiResults = fromPublicResults(testSonucu.mmpiSonuclari);
  
  // Cinsiyet bilgisini al (Mf ölçeği için gerekli)
  const gender = normalizeGender(danisanCinsiyet);

  // Klinik ölçek isimleri
  const clinicalScaleNames: Record<string, string> = {
    Hs: 'Hipokondriazis (1)',
    D: 'Depresyon (2)',
    Hy: 'Histeri (3)',
    Pd: 'Psikopatik Sapma (4)',
    Mf: 'Kadınlık-Erkeklik (5)',
    Pa: 'Paranoya (6)',
    Pt: 'Psikasteni (7)',
    Sc: 'Şizofreni (8)',
    Ma: 'Hipomani (9)',
    Si: 'Sosyal İçe Dönüklük (0)'
  };

  // Yorumlanabilir ölçekler - TÜM KLİNİK ÖLÇEKLERİ TAMAMLANDI! 🎉
  const interpretableScales = ['Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];

  // Spike analizi - sadece bir ölçeğin 70+ olması
  const elevatedScales = Object.entries(mmpiResults.clinicalScales)
    .filter(([_, scale]) => (scale as ScaleResult).tScore >= 70);
  
  const isHsSpike = elevatedScales.length === 1 && elevatedScales[0][0] === 'Hs';
  const isDSpike = elevatedScales.length === 1 && elevatedScales[0][0] === 'D';
  const isPaSpike = elevatedScales.length === 1 && elevatedScales[0][0] === 'Pa';
  const isPtSpike = elevatedScales.length === 1 && elevatedScales[0][0] === 'Pt';

  const isMaSpike = elevatedScales.length === 1 && elevatedScales[0][0] === 'Ma';


  return (
    <div className="space-y-6">
      {/* Hs Spike Uyarısı */}
      {isHsSpike && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Hipokondriazis Spike Profili Tespit Edildi</p>
              <p className="text-sm">{getHsSpikeInterpretation()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* D Spike Uyarısı */}
      {isDSpike && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Depresyon Spike Profili Tespit Edildi</p>
              <p className="text-sm">{getDSpikeInterpretation()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Pa Spike Uyarısı */}
      {isPaSpike && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Paranoya Spike Profili Tespit Edildi</p>
              <p className="text-sm">{getPaSpikeInterpretation()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Pt Spike Uyarısı */}
      {isPtSpike && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Psikasteni Spike Profili Tespit Edildi</p>
              <p className="text-sm">{getPtSpikeInterpretation()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}



      {/* Ma Spike Uyarısı */}
      {isMaSpike && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Hipomani Spike Profili Tespit Edildi</p>
              <p className="text-sm">{getMaSpikeInterpretation()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Ma Yorumlama Uyarıları */}
      {mmpiResults.clinicalScales.Ma.tScore >= 60 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Hipomani Alt Testi - Yorumlama Uyarıları</p>
              <ul className="space-y-1 list-disc pl-5 text-sm">
                {getMaInterpretationWarnings().map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}





      {/* D İlişkisel Analiz Notu */}
      {mmpiResults.clinicalScales.D.tScore >= 70 && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Depresyon Alt Testi - Önemli Not</p>
              <p className="text-sm">{getDRelationshipNote()}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Klinik Ölçek Yorumları */}
      <Card>
        <CardHeader>
          <CardTitle>Klinik Ölçekler Yorumlaması</CardTitle>
          <p className="text-sm text-muted-foreground">
            Kişilik ve psikolojik özelliklere ilişkin detaylı yorumlar
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(mmpiResults.clinicalScales).map(([scaleId, scaleData], index) => {
              const scale = scaleData as ScaleResult;
              const hasInterpretation = interpretableScales.includes(scaleId);
              
              let interpretation = null;
              if (hasInterpretation) {
                if (scaleId === 'Hs') {
                  const hsScale = new HsScale();
                  interpretation = hsScale.getInterpretation(scale.tScore);
                } else if (scaleId === 'D') {
                  const dScale = new DScale();
                  interpretation = dScale.getInterpretation(scale.tScore);
                } else if (scaleId === 'Hy') {
                  const hyScale = new HyScale();
                  interpretation = hyScale.getInterpretation(scale.tScore);
                } else if (scaleId === 'Pd') {
                  const pdScale = new PdScale();
                  interpretation = pdScale.getInterpretation(scale.tScore);
                } else if (scaleId === 'Mf') {
                  // Mf ölçeği cinsiyet gerektirir
                  if (gender === 'Erkek' || gender === 'Kadin') {
                    const mfScale = new MfScale();
                    interpretation = mfScale.getInterpretation(scale.tScore, gender as 'Erkek' | 'Kadin');
                  } else {
                    interpretation = {
                      tScore: scale.tScore,
                      level: 'Cinsiyet Bilgisi Gerekli',
                      description: 'Mf ölçeği yorumlanması için cinsiyet bilgisi gereklidir.',
                      characteristics: ['Lütfen danışan bilgilerinde cinsiyet bilgisini belirtin'],
                      clinicalSignificance: 'Yorum yapılamıyor - Cinsiyet bilgisi eksik'
                    };
                  }
                } else if (scaleId === 'Pa') {
                  // Pa ölçeği yorumlaması
                  const paScale = new PaScale();
                  const paResult = paScale.getInterpretation(scale.tScore);
                  interpretation = {
                    tScore: scale.tScore,
                    level: paResult.level,
                    description: paResult.description,
                    characteristics: paResult.characteristics,
                    // psychoticFeatures: paResult.psychoticFeatures,
                    // therapyResponse: paResult.therapyResponse,
                    additionalNotes: paResult.additionalNotes
                  };
                } else if (scaleId === 'Pt') {
                  // Pt ölçeği yorumlaması
                  const ptScale = new PtScale();
                  const ptResult = ptScale.getInterpretation(scale.tScore);
                  interpretation = {
                    tScore: scale.tScore,
                    level: ptResult.level,
                    description: ptResult.description,
                    characteristics: ptResult.characteristics,
                    // therapyResponse: ptResult.therapyResponse,
                    additionalNotes: ptResult.additionalNotes
                  };
                } else if (scaleId === 'Sc') {
                  // Sc ölçeği yorumlaması
                  const scScale = new ScScale();
                  const scResult = scScale.getInterpretation(scale.tScore);
                  interpretation = {
                    tScore: scale.tScore,
                    level: scResult.level,
                    description: scResult.description,
                    characteristics: scResult.characteristics,
                    // psychoticFeatures: scResult.psychoticFeatures,
                    // therapyResponse: scResult.therapyResponse,
                    additionalNotes: scResult.additionalNotes
                    // profileConsiderations: scResult.profileConsiderations
                  };
                } else if (scaleId === 'Ma') {
                  // Ma ölçeği yorumlaması
                  const maScale = new MaScale();
                  const maResult = maScale.getInterpretation(scale.tScore);
                  interpretation = {
                    tScore: scale.tScore,
                    level: maResult.level,
                    description: maResult.description,
                    characteristics: maResult.characteristics,
                    // therapyResponse: maResult.therapyResponse,
                    additionalNotes: maResult.additionalNotes
                    // interpretationWarnings: maResult.interpretationWarnings
                  };
                } else if (scaleId === 'Si') {
                  // Si ölçeği yorumlaması
                  const siScale = new SiScale();
                  const siResult = siScale.getInterpretation(scale.tScore);
                  interpretation = {
                    tScore: scale.tScore,
                    level: siResult.level,
                    description: siResult.description,
                    characteristics: siResult.characteristics,
                    additionalNotes: siResult.additionalNotes
                    // ageConsiderations: siResult.ageConsiderations,
                    // relationshipImplications: siResult.relationshipImplications
                  };
                }
              }

              return (
                <AccordionItem value={`clinical-${index}`} key={scaleId}>
                  <AccordionTrigger>
                    <div className="flex justify-between items-center w-full pr-4">
                      <span className="font-semibold">
                        {clinicalScaleNames[scaleId] || scaleId}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Ham: {scale.rawScore}</Badge>
                        <Badge variant="secondary">T: {scale.tScore}</Badge>
                        <Badge 
                          variant={
                            scale.tScore >= 70 ? 'destructive' : 
                            scale.tScore >= 65 ? 'secondary' : 
                            'default'
                          }
                        >
                          {scale.tScore >= 70 ? 'Klinik' : 
                           scale.tScore >= 65 ? 'Yükseltilmiş' : 'Normal'}
                        </Badge>
                        {hasInterpretation && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Yorumlanabilir
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {hasInterpretation ? (
                      renderClinicalInterpretation(interpretation)
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Bu ölçek için henüz detaylı yorumlama eklenmemiştir.</p>
                        <p className="text-sm mt-2">
                          T-Skor: {scale.tScore} - Ham Puan: {scale.rawScore}
                        </p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}