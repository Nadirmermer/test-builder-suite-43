// MMPI Hızlı Test Arayüzü - Tüm soruları listeler, numpad tarzı hızlı giriş

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiInfo } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { TestTanimi } from '@/types';
import { testSonucuService } from '@/lib/db';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateMMPIScores, toPublicResults } from '@/lib/mmpi';
import { useAppSelector } from '@/hooks/useRedux';
import { createDanisanUrl } from '@/utils/urlUtils';
import GenderSelectionModal from './GenderSelectionModal';

interface FastMMPIInterfaceProps {
  test: TestTanimi;
  danisanId: number;
  onComplete: () => void;
}

export default function FastMMPIInterface({ test, danisanId, onComplete }: FastMMPIInterfaceProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // MMPI cinsiyet kontrolü için danışan bilgisi - useAppSelector ekle
  const { selectedDanisan } = useAppSelector((state) => state.danisanlar);
  const danisan = selectedDanisan;
  const [showGenderSelection, setShowGenderSelection] = useState(!danisan?.cinsiyet);
  
  const [cevaplar, setCevaplar] = useState<Record<string, number>>({});
  const [bosCevaplar, setBosCevaplar] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const toplamSoru = test.sorular.length;
  const cevaplanmisSoru = Object.keys(cevaplar).length;
  const bosCevapSayisi = bosCevaplar.size;
  const totalCevaplanan = cevaplanmisSoru + bosCevapSayisi;
  const progress = (totalCevaplanan / toplamSoru) * 100;

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // LocalStorage ile ilerleme kaydetme
  const saveProgressToStorage = useCallback((cevaplar: Record<string, number>, bosCevaplar: Set<string>) => {
    const progressData = {
      danisanId,
      testId: test.id,
      cevaplar,
      bosCevaplar: Array.from(bosCevaplar),
      timestamp: Date.now()
    };
    localStorage.setItem(`mmpi_progress_${danisanId}`, JSON.stringify(progressData));
  }, [danisanId, test.id]);

  // İlerlemeyi localStorage'dan yükle
  useEffect(() => {
    const savedProgress = localStorage.getItem(`mmpi_progress_${danisanId}`);
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        // Son 24 saat içindeki ilerlemeyi kabul et
        if (Date.now() - progressData.timestamp < 24 * 60 * 60 * 1000) {
          setCevaplar(progressData.cevaplar);
          setBosCevaplar(new Set(progressData.bosCevaplar));
          toast({
            title: "İlerleme Yüklendi",
            description: `Daha önce ${Object.keys(progressData.cevaplar).length + progressData.bosCevaplar.length} soru cevaplanmıştı.`
          });
        }
      } catch (error) {
        console.error('İlerleme yükleme hatası:', error);
      }
    }
  }, [danisanId]);

  const handleCevap = useCallback((soruId: string, puan: number | 'bos') => {
    let newCevaplar = cevaplar;
    let newBosCevaplar = bosCevaplar;

    if (puan === 'bos') {
      newBosCevaplar = new Set(bosCevaplar).add(soruId);
      setBosCevaplar(newBosCevaplar);
      newCevaplar = { ...cevaplar };
      delete newCevaplar[soruId];
      setCevaplar(newCevaplar);
    } else {
      newCevaplar = {
        ...cevaplar,
        [soruId]: puan
      };
      setCevaplar(newCevaplar);
      newBosCevaplar = new Set(bosCevaplar);
      newBosCevaplar.delete(soruId);
      setBosCevaplar(newBosCevaplar);
    }
    
    // İlerlemeyi kaydet
    saveProgressToStorage(newCevaplar, newBosCevaplar);
  }, [cevaplar, bosCevaplar, saveProgressToStorage]);

  const handleInputChange = (soruId: string, value: string, index: number) => {
    if (value === '') {
      // Boş değer - cevabı sil
      setCevaplar(prev => {
        const newCevaplar = { ...prev };
        delete newCevaplar[soruId];
        return newCevaplar;
      });
      setBosCevaplar(prev => {
        const newBos = new Set(prev);
        newBos.delete(soruId);
        return newBos;
      });
      return;
    }
    
    // MMPI için özel input handling
    const lowerValue = value.toLowerCase();
    if (lowerValue === '1' || lowerValue === 'd') {
      handleCevap(soruId, 1);
      // Auto-advance: bir sonraki soruya geç
      const nextIndex = index + 1;
      if (nextIndex < toplamSoru) {
        setFocusedQuestion(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    } else if (lowerValue === '2' || lowerValue === 'y') {
      handleCevap(soruId, 0);
      // Auto-advance: bir sonraki soruya geç
      const nextIndex = index + 1;
      if (nextIndex < toplamSoru) {
        setFocusedQuestion(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    } else if (lowerValue === '3' || lowerValue === 'b') {
      handleCevap(soruId, 'bos');
      // Auto-advance: bir sonraki soruya geç
      const nextIndex = index + 1;
      if (nextIndex < toplamSoru) {
        setFocusedQuestion(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < toplamSoru) {
        setFocusedQuestion(nextIndex);
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus();
        }, 10);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < toplamSoru) {
        setFocusedQuestion(nextIndex);
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus();
        }, 10);
      } else {
        handleTestiTamamla();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index > 0) {
        setFocusedQuestion(index - 1);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 10);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index < toplamSoru - 1) {
        setFocusedQuestion(index + 1);
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    }
  };

  // İlk soruya odaklan
  useEffect(() => {
    if (test.sorular.length > 0 && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [test.sorular]);


  const handleTestiTamamla = async () => {
    if (totalCevaplanan < toplamSoru) {
      toast({
        title: "Eksik Cevaplar",
        description: `Henüz ${toplamSoru - totalCevaplanan} soru cevaplanmadı.`,
        variant: "destructive"
      });
      return;
    }

    // Cinsiyet bilgisini al (localStorage'dan veya danışan bilgilerinden)
    const cinsiyetBilgisi = (danisan?.cinsiyet === 'Erkek' || danisan?.cinsiyet === 'Kadın') 
      ? danisan.cinsiyet 
      : localStorage.getItem(`danisan_${danisanId}_cinsiyet`) as 'Erkek' | 'Kadın' || 'Erkek';

    setIsLoading(true);
    try {
      // MMPI puanlama motoru ile hesaplama
      const results = calculateMMPIScores(cevaplar, bosCevaplar, cinsiyetBilgisi === 'Kadın' ? 'Kadin' : 'Erkek');
      const mmpiSonuclari = toPublicResults(results);
      
      // Toplam T-skoru hesaplama (genel puan için)
      const toplamTSkoru = Object.values(mmpiSonuclari.klinikOlcekler)
        .reduce((sum, olcek) => sum + olcek.tSkoru, 0);
      
      await testSonucuService.ekle({
        danisanId,
        testId: test.id,
        testAdi: test.testAdi + " (Hızlı)",
        tamamlanmaTarihi: new Date(),
        puan: Math.round(toplamTSkoru / Object.keys(mmpiSonuclari.klinikOlcekler).length) || 50,
        sonucYorumu: 'MMPI test sonuçları hesaplandı.',
        cevaplar: [
          ...Object.entries(cevaplar).map(([soruId, verilenPuan]) => ({
            soruId,
            verilenPuan
          })),
          ...Array.from(bosCevaplar).map(soruId => ({
            soruId,
            verilenPuan: -1 // -1 = boş cevap işareti
          }))
        ],
        mmpiSonuclari
      });

      // İlerleme kaydını temizle
      localStorage.removeItem(`mmpi_progress_${danisanId}`);

      toast({
        title: "Test Tamamlandı", 
        description: "MMPI analizi başarıyla tamamlandı ve kaydedildi."
      });

      onComplete();
    } catch (error) {
      console.error('Test sonucu kaydetme hatası:', error);
      toast({
        title: "Hata",
        description: "Test sonucu kaydedilirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    if (danisan) {
      const url = createDanisanUrl(danisan.adSoyad, danisan.id);
      navigate(url);
    } else {
      navigate('/danisanlar');
    }
  };

  const handleGenderSelectionComplete = () => {
    setShowGenderSelection(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const estimateRemainingTime = () => {
    if (totalCevaplanan === 0 || elapsedTime === 0) return null;
    
    const averageTimePerQuestion = elapsedTime / totalCevaplanan;
    const remainingQuestions = toplamSoru - totalCevaplanan;
    const estimatedRemainingSeconds = remainingQuestions * averageTimePerQuestion;
    
    if (estimatedRemainingSeconds < 60) {
      return `~${Math.round(estimatedRemainingSeconds)}s kaldı`;
    } else {
      const minutes = Math.round(estimatedRemainingSeconds / 60);
      return `~${minutes}dk kaldı`;
    }
  };

  // Cinsiyet seçimi ekranı
  if (showGenderSelection && danisan) {
    return (
      <GenderSelectionModal
        test={test}
        danisan={danisan}
        onComplete={handleGenderSelectionComplete}
      />
    );
  }

  if (test.sorular.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Test bulunamadı</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 page-transition">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={handleExit}
              size={isMobile ? "sm" : "default"}
            >
              <FiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{test.testAdi}</h1>
              <p className="text-sm text-muted-foreground">Hızlı MMPI Giriş</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              ⏱️ {formatTime(elapsedTime)}
            </Badge>
            {estimateRemainingTime() && (
              <Badge variant="secondary" className="text-xs">
                🎯 {estimateRemainingTime()}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {totalCevaplanan} / {toplamSoru}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {bosCevapSayisi} boş
            </Badge>
            <Badge variant={totalCevaplanan === toplamSoru ? "default" : "outline"} className="text-xs">
              %{Math.round(progress)} Tamamlandı
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />

        {/* Test Talimatları */}
        <Alert>
          <FiInfo className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>MMPI Hızlı Giriş:</strong> 1/D=Doğru, 2/Y=Yanlış, 3/B=Bilmiyorum. Enter/Tab: sonraki soru, ↑↓ ok tuşları ile geçiş.
            <br />
            <strong>Yönerge:</strong> Her ifadeyi dikkatlice okuyun ve kendiniz için "DOĞRU" mu yoksa "YANLIŞ" mı olduğuna karar verin.
          </AlertDescription>
        </Alert>

        {/* Boş cevap uyarısı */}
        {bosCevapSayisi > 20 && (
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Uyarı:</strong> {bosCevapSayisi} soru boş. 30+ boş cevap testin geçersiz olmasına neden olur.
            </AlertDescription>
          </Alert>
        )}

        {/* Sorular - MMPI Hızlı Input Liste */}
        <div className="max-w-2xl mx-auto space-y-3">
          {test.sorular.map((soru, index) => {
            const isAnswered = cevaplar[soru.id] !== undefined;
            const isBos = bosCevaplar.has(soru.id);
            const isFocused = focusedQuestion === index;
            
            return (
              <Card 
                key={soru.id} 
                className={`transition-all duration-200 ${
                  isFocused ? 'ring-2 ring-primary' : ''
                } ${
                  isAnswered ? 'border-success bg-success/5' : 
                  isBos ? 'border-orange-500 bg-orange-500/5' : 
                  'border-muted'
                }`}
                onClick={() => {
                  setFocusedQuestion(index);
                  inputRefs.current[index]?.focus();
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      isAnswered ? 'bg-success text-success-foreground' :
                      isBos ? 'bg-orange-500 text-white' :
                      'bg-primary text-primary-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    
                    <p className="text-sm text-foreground leading-relaxed flex-1 min-w-0">{soru.metin}</p>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <Input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        value={
                          cevaplar[soru.id] === 1 ? 'D' : 
                          cevaplar[soru.id] === 0 ? 'Y' : 
                          bosCevaplar.has(soru.id) ? 'B' : ''
                        }
                        onChange={(e) => handleInputChange(soru.id, e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => {
                          setFocusedQuestion(index);
                          // İçeriği seç ki kullanıcı doğrudan yazabilsin
                          e.target.select();
                        }}
                        className={`w-16 h-16 text-center text-xl font-bold border-2 rounded-lg transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                          cevaplar[soru.id] === 1 ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-950/30 dark:border-green-600 dark:text-green-400' :
                          cevaplar[soru.id] === 0 ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-950/30 dark:border-red-600 dark:text-red-400' :
                          bosCevaplar.has(soru.id) ? 'bg-orange-100 border-orange-500 text-orange-800 dark:bg-orange-950/30 dark:border-orange-600 dark:text-orange-400' :
                          ''
                        }`}
                        placeholder="?"
                        maxLength={1}
                      />
                      <div className="text-xs text-muted-foreground text-center min-w-[60px]">
                        <div className="font-mono bg-muted/50 rounded px-2 py-1 mb-1">
                          <span className="text-green-600 font-semibold">1/D</span>
                          <span className="text-red-600 font-semibold mx-1">2/Y</span>
                          <span className="text-orange-600 font-semibold">3/B</span>
                        </div>
                        {isAnswered && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {cevaplar[soru.id] === 1 ? 'Doğru' : 'Yanlış'}
                          </Badge>
                        )}
                        {isBos && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Boş
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tamamla Butonu */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleTestiTamamla}
            disabled={totalCevaplanan < toplamSoru || isLoading}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
            size="lg"
          >
            {isLoading ? "Kaydediliyor..." : "Testi Tamamla"}
          </Button>
        </div>

        {/* Exit Confirmation Dialog */}
        <ConfirmationDialog
          open={showExitDialog}
          onOpenChange={setShowExitDialog}
          onConfirm={confirmExit}
          title="Testi Sonlandır"
          description="Testi sonlandırmak istediğinizden emin misiniz? Verdiğiniz cevaplar kaydedilmeyecektir."
          confirmText="Evet, Sonlandır"
          cancelText="Devam Et"
          variant="destructive"
        />
      </div>
    </div>
  );
}