import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { testOturumuBaslat, cevapGuncelle, soruIndexGuncelle, testOturumuBitir, testSonucuKaydet } from '@/store/slices/testSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TestTanimi, TestOturumu, TestSonucu } from '@/types';
import { calculateMMSEScore, getMMSEInterpretation } from '@/utils/mmseUtils';
import { toast } from 'sonner';

interface MMSEInterfaceProps {
  test: TestTanimi;
  danisanId: number;
  onComplete: () => void;
}

export default function MMSEInterface({ test, danisanId, onComplete }: MMSEInterfaceProps) {
  const dispatch = useAppDispatch();
  const { aktifOturum } = useAppSelector((state) => state.testler);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!aktifOturum) {
      const yeniOturum: TestOturumu = {
        testId: test.id,
        danisanId,
        yontem: 'standart',
        cevaplar: {},
        aktifSoruIndex: 0,
        baslamaTarihi: new Date(),
        baslangicZamani: new Date()
      };
      dispatch(testOturumuBaslat(yeniOturum));
    }
  }, [test.id, danisanId, dispatch, aktifOturum]);

  const handleStartTest = () => {
    setShowInstructions(false);
    toast.success('Test başladı!');
  };

  const handleAnswer = (puan: number) => {
    if (!aktifOturum) return;

    const currentQuestion = test.sorular[currentQuestionIndex];
    dispatch(cevapGuncelle({ soruId: currentQuestion.id, puan }));

    if (currentQuestionIndex < test.sorular.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      dispatch(soruIndexGuncelle(nextIndex));
    } else {
      handleTestComplete();
    }
  };

  const handleTestComplete = async () => {
    if (!aktifOturum) return;

    try {
      // Cevapları güncel oturum verisiyle birleştir
      const tumCevaplar = { ...aktifOturum.cevaplar };
      
      // MMSE skorunu hesapla
      const mmseScore = calculateMMSEScore(tumCevaplar);
      const detayliYorum = getMMSEInterpretation(mmseScore.toplamPuan, mmseScore.altOlcekPuanlari);

      // Test sonucunu oluştur
      const testSonucu: Omit<TestSonucu, 'id'> = {
        danisanId,
        testId: test.id,
        testAdi: test.testAdi,
        tamamlanmaTarihi: new Date(),
        puan: mmseScore.toplamPuan,
        sonucYorumu: `${mmseScore.yorum} - ${detayliYorum}`,
        cevaplar: Object.entries(tumCevaplar).map(([soruId, puan]) => ({
          soruId,
          verilenPuan: puan
        })),
        altOlcekPuanlari: mmseScore.altOlcekPuanlari
      };

      await dispatch(testSonucuKaydet(testSonucu));
      dispatch(testOturumuBitir());
      
      toast.success('Test başarıyla tamamlandı!');
      onComplete();
    } catch (error) {
      console.error('Test sonucu kaydedilirken hata:', error);
      toast.error('Test sonucu kaydedilemedi');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      dispatch(soruIndexGuncelle(prevIndex));
    }
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-bold">
                {test.testAdi}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  {test.kisaAciklama}
                </p>
                <div className="bg-muted p-4 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Test Talimatları:</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {test.talimatlar}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <p><strong>Süre:</strong> Yaklaşık {test.sureDakika} dakika</p>
                    <p><strong>Soru Sayısı:</strong> {test.sorular.length} soru</p>
                    <p><strong>Puanlama:</strong> Her doğru cevap 1 puan (Toplam: 30 puan)</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleStartTest}
                  size="lg"
                  className="w-full max-w-md"
                >
                  Teste Başla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!aktifOturum) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Test hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = test.sorular[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.sorular.length) * 100;
  const currentAnswer = aktifOturum.cevaplar[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Soru {currentQuestionIndex + 1} / {test.sorular.length}
            </span>
            <span className="text-sm text-muted-foreground">
              %{Math.round(progress)} tamamlandı
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQuestion.metin}
            </CardTitle>
            {(currentQuestion as any).kategori && (
              <p className="text-sm text-muted-foreground capitalize">
                Kategori: {(currentQuestion as any).kategori.replace('_', ' ')}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="space-y-2">
              {currentQuestion.secenekler.map((secenek, index) => (
                <Button
                  key={index}
                  variant={currentAnswer === secenek.puan ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswer(secenek.puan)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      currentAnswer === secenek.puan 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`} />
                    <span>{secenek.metin}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Önceki Soru
              </Button>
              
              {currentQuestionIndex === test.sorular.length - 1 ? (
                <Button
                  onClick={handleTestComplete}
                  disabled={currentAnswer === undefined}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Testi Tamamla
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (currentAnswer !== undefined) {
                      const nextIndex = currentQuestionIndex + 1;
                      setCurrentQuestionIndex(nextIndex);
                      dispatch(soruIndexGuncelle(nextIndex));
                    }
                  }}
                  disabled={currentAnswer === undefined}
                >
                  Sonraki Soru
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}