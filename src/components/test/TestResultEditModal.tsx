// Test Sonucu Düzenleme Modalı
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FiSave, FiX } from 'react-icons/fi';
import { TestSonucu, TestTanimi } from '@/types';
import { getTestInputSettings, convertAnswerToOptionIndex } from '@/utils/testResponseUtils';

interface TestResultEditModalProps {
  testSonucu: TestSonucu;
  test: TestTanimi; // Test tanımını ekledik
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedResult: TestSonucu) => void;
}

export default function TestResultEditModal({
  testSonucu,
  test,
  open,
  onOpenChange,
  onSave
}: TestResultEditModalProps) {
  // Test tanımı yüklenene kadar modal açılmasın
  if (!test) {
    return null;
  }
  const [editedAnswers, setEditedAnswers] = useState<Record<string, number>>(
    Object.fromEntries(
      testSonucu.cevaplar.map(c => [c.soruId, c.verilenPuan])
    )
  );

  // Test response pattern'ini al
  const [testInputSettings, setTestInputSettings] = useState<ReturnType<typeof getTestInputSettings> | null>(null);

  useEffect(() => {
    const inputSettings = getTestInputSettings(test);
    setTestInputSettings(inputSettings);
  }, [test]);

  const handleAnswerChange = (soruId: string, puan: number) => {
    setEditedAnswers(prev => ({
      ...prev,
      [soruId]: puan
    }));
  };

  const handleSave = () => {
    const updatedResult: TestSonucu = {
      ...testSonucu,
      cevaplar: testSonucu.cevaplar.map(c => ({
        ...c,
        verilenPuan: editedAnswers[c.soruId] ?? c.verilenPuan
      }))
    };
    onSave(updatedResult);
    onOpenChange(false);
  };

  const getQuestionText = (soruId: string) => {
    // MMPI sorularını dinamik import ile al
    if (testSonucu.testId === 'mmpi') {
      // Import başka bir dosyada yapılmış olduğu için burada sabit text dönelim
      // Gerçek soru metni için API çağrısı ya da başka bir çözüm kullanılabilir
      return `MMPI Soru ${soruId}`;
    }
    return `Soru ${soruId}`;
  };

  const getAnswerOptions = () => {
    if (!testInputSettings) {
      return [
        { value: 0, label: '0' },
        { value: 1, label: '1' }
      ];
    }

    const { responsePattern } = testInputSettings;
    const options = responsePattern.optionTexts.map((text, index) => ({
      value: responsePattern.optionValues[index],
      label: text
    }));

    // Boş seçeneği ekle
    options.push({ value: -1, label: 'Boş' });
    
    return options;
  };

  const answerOptions = getAnswerOptions();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Test Cevaplarını Düzenle</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {testSonucu.testAdi} - {testSonucu.cevaplar.length} soru
          </p>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {testSonucu.cevaplar.map((cevap, index) => (
              <Card key={cevap.soruId} className="border-l-4 border-l-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Soru {parseInt(cevap.soruId)} ({index + 1})</span>
                    <Badge variant="outline" className="text-xs">
                      Mevcut: {cevap.verilenPuan === -1 ? 'Boş' : 
                        answerOptions.find(opt => opt.value === cevap.verilenPuan)?.label || cevap.verilenPuan}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getQuestionText(cevap.soruId)}
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={editedAnswers[cevap.soruId]?.toString()}
                    onValueChange={(value) => handleAnswerChange(cevap.soruId, parseInt(value))}
                    className="flex flex-wrap gap-4"
                  >
                    {answerOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.value.toString()} 
                          id={`${cevap.soruId}-${option.value}`}
                        />
                        <Label 
                          htmlFor={`${cevap.soruId}-${option.value}`}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Değişiklikler sonrası test yeniden puanlanacaktır
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <FiX className="h-4 w-4 mr-2" />
              İptal
            </Button>
            <Button onClick={handleSave}>
              <FiSave className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}