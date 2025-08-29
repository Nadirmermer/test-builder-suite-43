import { TestSonucu } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fromPublicResults } from '@/lib/mmpi';
import { MMPICodeGenerator, getCodeInterpretation, GeneratedCode, MMPICodeResult } from '@/lib/mmpi/interpretations/codes';
import { Code2, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface MMPICodeInterpretationProps {
  testSonucu: TestSonucu;
}

export default function MMPICodeInterpretation({ testSonucu }: MMPICodeInterpretationProps) {
  if (!testSonucu.mmpiSonuclari) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">MMPI sonuçları bulunmuyor</p>
        </CardContent>
      </Card>
    );
  }

  const mmpiResults = fromPublicResults(testSonucu.mmpiSonuclari);
  const codeGenerator = new MMPICodeGenerator();
  
  // Kodları üret
  const generatedCodes = codeGenerator.generateCodes(mmpiResults.clinicalScales);
  
  // Yükselmiş ölçekleri al (65+ T puanı)
  const elevatedScales = Object.entries(mmpiResults.clinicalScales)
    .filter(([_, scale]) => (scale as any).tScore >= 65)
    .map(([scaleId, scale]) => ({
      scaleId,
      tScore: (scale as any).tScore,
      scaleName: getScaleName(scaleId)
    }))
    .sort((a, b) => b.tScore - a.tScore);

  // Yorumlanabilir kodlar
  const interpretableCodes = generatedCodes.filter(code => code.hasInterpretation);
  const nonInterpretableCodes = generatedCodes.filter(code => !code.hasInterpretation);

  return (
    <div className="space-y-6">
      {/* Özet Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600 bg-orange-100 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Yükselmiş Ölçek</p>
                <p className="font-semibold text-lg">{elevatedScales.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Code2 className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Üretilen Kod</p>
                <p className="font-semibold text-lg">{generatedCodes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600 bg-green-100 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Yorumlanabilir</p>
                <p className="font-semibold text-lg">{interpretableCodes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {elevatedScales.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            65 T puanı ve üzerinde klinik ölçek bulunamadı. MMPI kodları oluşturulamıyor.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Yükselmiş Ölçekler */}
          <Card>
            <CardHeader>
              <CardTitle>Yükselmiş Klinik Ölçekler (65+ T Puanı)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Kodlar bu ölçeklerin kombinasyonlarından oluşturulmuştur
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {elevatedScales.map((scale, index) => (
                  <Badge key={scale.scaleId} variant="secondary" className="text-sm">
                    {scale.scaleName} (T: {scale.tScore})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Yorumlanabilir Kodlar */}
          {interpretableCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Yorumlanabilir MMPI Kodları</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Bu kodlar için kitaptan alınan detaylı yorumlar mevcuttur
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {interpretableCodes.map((code, index) => {
                    const interpretation = getCodeInterpretation(code.code);
                    return (
                      <AccordionItem value={`interpretable-${index}`} key={code.code}>
                        <AccordionTrigger>
                          <div className="flex justify-between items-center w-full pr-4">
                            <div className="flex items-center gap-3">
                              <Badge variant="default" className="font-mono text-base px-3 py-1">
                                {code.code}
                              </Badge>
                              <span className="font-semibold">
                                {interpretation?.title || `${getCodeTypeName(code.type)} Kodu`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {getCodeTypeName(code.type)}
                              </Badge>
                              {code.isWithinRange && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                  ±10 Aralık
                                </Badge>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {interpretation ? (
                            <CodeInterpretationDisplay 
                              interpretation={interpretation}
                              generatedCode={code}
                            />
                          ) : (
                            <p className="text-muted-foreground">Yorum bulunamadı.</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* Diğer Kodlar */}
          {nonInterpretableCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Diğer Üretilen Kodlar</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Bu kodlar için henüz detaylı yorum eklenmemiştir
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {nonInterpretableCodes.map((code, index) => (
                    <div key={code.code} className="flex flex-col items-center p-3 border rounded-lg">
                      <Badge variant="outline" className="font-mono text-lg mb-2">
                        {code.code}
                      </Badge>
                      <p className="text-xs text-muted-foreground text-center">
                        {getCodeTypeName(code.type)}
                      </p>
                      <p className="text-xs text-center mt-1">
                        {code.scales.map(scale => getScaleName(scale)).join('-')}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        T: {code.scores.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

// Kod yorumu görüntüleme bileşeni
function CodeInterpretationDisplay({ 
  interpretation, 
  generatedCode 
}: { 
  interpretation: MMPICodeResult; 
  generatedCode: GeneratedCode;
}) {
  return (
    <div className="space-y-4 text-sm">
      {/* Temel Bilgiler */}
      <div className="bg-secondary/30 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <p className="font-semibold text-muted-foreground">Ölçekler:</p>
            <p>{generatedCode.scales.map(scale => getScaleName(scale)).join(' - ')}</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">T-Skorları:</p>
            <p>{generatedCode.scores.join(', ')}</p>
          </div>
        </div>
        
        {interpretation.diagnosis && (
          <Alert className="mb-3">
            <AlertDescription>
              <strong>Olası Tanı:</strong> {interpretation.diagnosis}
            </AlertDescription>
          </Alert>
        )}
        
        <p className="leading-relaxed">{interpretation.description}</p>
      </div>

      {/* Kişilik Özellikleri */}
      {interpretation.characteristics && interpretation.characteristics.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Kişilik Özellikleri:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {interpretation.characteristics.map((characteristic, index) => (
              <li key={index}>{characteristic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ek Notlar */}
      {interpretation.additionalNotes && interpretation.additionalNotes.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Ek Notlar:</h4>
          <ul className="space-y-1 list-disc pl-5">
            {interpretation.additionalNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Demografik Bilgiler */}
      <div className="flex flex-wrap gap-2 pt-2 border-t">
        {interpretation.gender && interpretation.gender !== 'Tüm' && (
          <Badge variant="outline">{interpretation.gender}</Badge>
        )}
        {interpretation.ageGroup && interpretation.ageGroup !== 'Tüm' && (
          <Badge variant="outline">{interpretation.ageGroup}</Badge>
        )}
        {interpretation.educationLevel && interpretation.educationLevel !== 'Tüm' && (
          <Badge variant="outline">{interpretation.educationLevel}</Badge>
        )}
        {interpretation.maritalStatus && interpretation.maritalStatus !== 'Tüm' && (
          <Badge variant="outline">{interpretation.maritalStatus}</Badge>
        )}
      </div>
    </div>
  );
}

// Yardımcı fonksiyonlar
function getScaleName(scaleId: string): string {
  const names: Record<string, string> = {
    'Hs': 'Hipokondriazis (1)',
    'D': 'Depresyon (2)',
    'Hy': 'Histeri (3)',
    'Pd': 'Psikopatik Sapma (4)',
    'Mf': 'Kadınlık-Erkeklik (5)',
    'Pa': 'Paranoya (6)',
    'Pt': 'Psikasteni (7)',
    'Sc': 'Şizofreni (8)',
    'Ma': 'Hipomani (9)',
    'Si': 'Sosyal İçe Dönüklük (0)'
  };
  return names[scaleId] || scaleId;
}

function getCodeTypeName(type: GeneratedCode['type']): string {
  const types: Record<GeneratedCode['type'], string> = {
    'spike': 'Tek Ölçek',
    'two-point': 'İkili Kod',
    'three-point': 'Üçlü Kod',
    'four-point': 'Dörtlü Kod'
  };
  return types[type];
}