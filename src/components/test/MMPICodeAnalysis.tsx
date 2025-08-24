import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, BarChart, Brain, Lightbulb, Shield, TrendingUp, Users } from 'lucide-react';
import { CodeTypeInterpretation } from "@/lib/mmpi/interpretations/codes/analyzer";

interface MMPICodeAnalysisProps {
  codeTypes: CodeTypeInterpretation[];
}

export const MMPICodeAnalysis: React.FC<MMPICodeAnalysisProps> = ({ codeTypes }) => {
  if (codeTypes.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            MMPI Kod Analizi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              T-skoru 70+ olan klinik ölçek bulunmadığı için kod analizi yapılamadı.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            MMPI Kod Analizi
          </CardTitle>
          <p className="text-sm text-gray-600">
            Yüksek ölçeklerin kombinasyonlarına dayalı detaylı kişilik analizi
          </p>
        </CardHeader>
      </Card>

      {codeTypes.map((codeType, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-sm font-bold">
                  {codeType.code}
                </Badge>
                {codeType.alternativeCode && (
                  <Badge variant="outline" className="text-xs">
                    {codeType.alternativeCode.slice(0, 50)}...
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              {codeType.description}
            </p>
          </CardHeader>
          
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {/* Temel Özellikler */}
              <AccordionItem value="characteristics">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Temel Kişilik Özellikleri
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {codeType.characteristics.map((characteristic, idx) => (
                      <li key={idx} className="text-gray-700">
                        {characteristic}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Klinik Önem */}
              <AccordionItem value="clinical">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Klinik Önem ve Değerlendirme
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Alert>
                      <AlertDescription className="text-sm">
                        {codeType.clinicalSignificance}
                      </AlertDescription>
                    </Alert>
                    
                    {codeType.possibleDiagnoses && codeType.possibleDiagnoses.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Olası Tanılar:</h4>
                        <div className="flex flex-wrap gap-1">
                          {codeType.possibleDiagnoses.map((diagnosis, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {diagnosis}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Tedavi Önerileri */}
              {codeType.therapeuticImplications && codeType.therapeuticImplications.length > 0 && (
                <AccordionItem value="therapy">
                  <AccordionTrigger className="text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Tedavi ve Terapi Önerileri
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {codeType.therapeuticImplications.map((implication, idx) => (
                        <li key={idx} className="text-gray-700">
                          {implication}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Demografik Notlar */}
              {codeType.demographicNotes && codeType.demographicNotes.length > 0 && (
                <AccordionItem value="demographics">
                  <AccordionTrigger className="text-sm">
                    Demografik Özellikler ve Yaş Grupları
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {codeType.demographicNotes.map((note, idx) => (
                        <li key={idx} className="text-gray-700">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Ek Notlar */}
              {codeType.additionalNotes && codeType.additionalNotes.length > 0 && (
                <AccordionItem value="additional">
                  <AccordionTrigger className="text-sm">
                    Ek Bilgiler ve Özel Durumlar
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {codeType.additionalNotes.map((note, idx) => (
                        <li key={idx} className="text-gray-700">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Cinsiyet Özel Durumları */}
              {codeType.genderSpecific && (
                <AccordionItem value="gender">
                  <AccordionTrigger className="text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Cinsiyet Özel Durumları
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {codeType.genderSpecific.male && codeType.genderSpecific.male.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-blue-700">Erkekler için:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {codeType.genderSpecific.male.map((note, idx) => (
                              <li key={idx} className="text-gray-700">
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {codeType.genderSpecific.female && codeType.genderSpecific.female.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-pink-700">Kadınlar için:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {codeType.genderSpecific.female.map((note, idx) => (
                              <li key={idx} className="text-gray-700">
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};