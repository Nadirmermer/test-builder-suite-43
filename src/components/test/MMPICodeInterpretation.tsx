import { TestSonucu } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fromPublicResults } from '@/lib/mmpi';
import { generateMMPICodes, generateSpikeAnalysis, SCALE_NAMES } from '@/lib/mmpi/interpretations/codes';
import { Code, BookOpen, AlertTriangle } from 'lucide-react';

interface MMPICodeInterpretationProps {
  testSonucu: TestSonucu;
}

export default function MMPICodeInterpretation({ testSonucu }: MMPICodeInterpretationProps) {
  if (!testSonucu.mmpiSonuclari) {
    return null;
  }

  const mmpiResults = fromPublicResults(testSonucu.mmpiSonuclari);
  
  // Kod analizi yap
  const codeResults = generateMMPICodes(mmpiResults.clinicalScales);
  const spikeAnalysis = generateSpikeAnalysis(mmpiResults.clinicalScales);
  
  // Yüksek skorlu ölçekleri göster
  const elevatedScales = Object.entries(mmpiResults.clinicalScales)
    .filter(([_, scale]) => scale.tScore >= 65)
    .sort(([,a], [,b]) => b.tScore - a.tScore)
    .map(([scaleId, scale]) => ({
      scaleId,
      scaleName: SCALE_NAMES[scaleId.replace('Hs', '1').replace('D', '2').replace('Hy', '3').replace('Pd', '4').replace('Mf', '5').replace('Pa', '6').replace('Pt', '7').replace('Sc', '8').replace('Ma', '9').replace('Si', '0')] || scaleId,
      tScore: scale.tScore
    }));

  if (elevatedScales.length === 0 && codeResults.primaryCodes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            MMPI Kod Analizi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Hiçbir klinik ölçek 65 T-puanını aşmadığı için kod analizi yapılamamıştır. 
              Bu durum genel olarak normal profil aralığını gösterir.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          MMPI Kod Analizi
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          65+ T-puanı alan klinik ölçeklerin kombinasyon yorumları
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Yüksek Skorlu Ölçekler */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Yüksek Skorlu Ölçekler (T ≥ 65)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {elevatedScales.map((scale, index) => (
              <div key={scale.scaleId} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium text-sm">{scale.scaleName}</p>
                  <p className="text-xs text-muted-foreground">Sıralama: {index + 1}</p>
                </div>
                <Badge variant={scale.tScore >= 80 ? "destructive" : scale.tScore >= 70 ? "default" : "secondary"}>
                  {Math.round(scale.tScore)}T
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Spike Analizi */}
        {spikeAnalysis.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">Spike Profili Tespit Edildi</p>
                <div className="flex flex-wrap gap-2">
                  {spikeAnalysis.map((spike, index) => (
                    <Badge key={index} variant="destructive">
                      {spike}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm">
                  Sadece bir ölçeğin belirgin şekilde yüksek olması, o ölçeğin özelliklerinin ön plana çıktığını gösterir.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Birincil Kodlar */}
        {codeResults.primaryCodes.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Birincil Kod Kombinasyonları
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {codeResults.primaryCodes.map((code, index) => (
                <Badge key={index} variant="default" className="text-sm font-mono">
                  {code}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* İkincil Kodlar */}
        {codeResults.secondaryCodes.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">İkincil Kod Kombinasyonları</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {codeResults.secondaryCodes.slice(0, 6).map((code, index) => (
                <Badge key={index} variant="secondary" className="text-sm font-mono">
                  {code}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Kod Yorumları */}
        {codeResults.interpretations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Kod Yorumları</h4>
            <Accordion type="single" collapsible className="w-full">
              {codeResults.interpretations.map((interpretation, index) => (
                <AccordionItem key={index} value={`code-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {interpretation.code}
                      </Badge>
                      <span className="text-sm">
                        {interpretation.diagnosis.join(' • ')}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      
                      {/* Ana Açıklama */}
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <p className="font-semibold mb-2">Kod {interpretation.code} Profili</p>
                        <p className="leading-relaxed">{interpretation.description}</p>
                      </div>

                      {/* Tanı */}
                      <div>
                        <h5 className="font-semibold mb-2">Olası Tanılar:</h5>
                        <div className="flex flex-wrap gap-2">
                          {interpretation.diagnosis.map((diagnosis, diagIndex) => (
                            <Badge key={diagIndex} variant="destructive">
                              {diagnosis}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Özellikler */}
                      {interpretation.characteristics && interpretation.characteristics.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-2">Karakteristik Özellikler:</h5>
                          <ul className="space-y-1 list-disc pl-5">
                            {interpretation.characteristics.map((characteristic, charIndex) => (
                              <li key={charIndex}>{characteristic}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Uyarılar */}
                      {interpretation.warnings && interpretation.warnings.length > 0 && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-semibold">Önemli Uyarılar</p>
                              <ul className="space-y-1 list-disc pl-5 text-sm">
                                {interpretation.warnings.map((warning, warnIndex) => (
                                  <li key={warnIndex}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Yaş Faktörleri */}
                      {interpretation.ageFactors && interpretation.ageFactors.length > 0 && (
                        <Alert>
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-semibold">Yaş Faktörleri</p>
                              <ul className="space-y-1 list-disc pl-5 text-sm">
                                {interpretation.ageFactors.map((factor, factorIndex) => (
                                  <li key={factorIndex}>{factor}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Cinsiyet Faktörleri */}
                      {interpretation.genderFactors && interpretation.genderFactors.length > 0 && (
                        <Alert>
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-semibold">Cinsiyet Faktörleri</p>
                              <ul className="space-y-1 list-disc pl-5 text-sm">
                                {interpretation.genderFactors.map((factor, factorIndex) => (
                                  <li key={factorIndex}>{factor}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Terapötik Sonuçlar */}
                      {interpretation.therapeuticImplications && interpretation.therapeuticImplications.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-2">Terapötik Sonuçlar:</h5>
                          <ul className="space-y-1 list-disc pl-5">
                            {interpretation.therapeuticImplications.map((implication, implIndex) => (
                              <li key={implIndex}>{implication}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Bilgi Notu */}
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Kod Sistemi Hakkında</p>
              <p className="text-sm">
                MMPI kod sistemi, 65+ T-puanı alan klinik ölçeklerin kombinasyonlarından oluşur. 
                En yüksek puan alan ölçek en başa yazılır. 10 puan aralığında olan ölçekler birlikte kodlanabilir.
                Bu kodlar, belirli kişilik paternleri ve psikolojik durumlar için standardize edilmiş yorumlar sağlar.
              </p>
            </div>
          </AlertDescription>
        </Alert>

      </CardContent>
    </Card>
  );
}