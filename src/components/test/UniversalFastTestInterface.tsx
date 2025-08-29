// Universal Hızlı Test Arayüzü - Tüm test türleri için numpad tarzı hızlı giriş

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
import { TestTanimi, Danisan, TestSorusu, TestOturumu } from '@/types';
import { testSonucuService, danisanService } from '@/lib/db';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateMMPIScores, toPublicResults } from '@/lib/mmpi';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { createDanisanUrl } from '@/utils/urlUtils';
import { testSonucuOzelPuanlamaIleKaydet } from '@/store/slices/testSlice';
import { getTestSorulari, getTestTalimatlar, isCinsiyetGerekli, isEgitimDurumuGerekli, isMedeniDurumGerekli, isYasGerekli } from '@/utils/testUtils';
import { getTestInputSettings, convertKeyboardInputToAnswer } from '@/utils/testResponseUtils';
import GenderSelectionModal from './GenderSelectionModal';
import EducationSelectionModal from './EducationSelectionModal';
import MaritalStatusSelectionModal from './MaritalStatusSelectionModal';

interface UniversalFastTestInterfaceProps {
  test: TestTanimi;
  danisanId: number;
  onComplete: () => void;
}

export default function UniversalFastTestInterface({ test, danisanId, onComplete }: UniversalFastTestInterfaceProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  
  const [danisan, setDanisan] = useState<Danisan | null>(null);
  const [testSorulari, setTestSorulari] = useState<TestSorusu[]>([]);
  const [testOturumu, setTestOturumu] = useState<TestOturumu | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGenderSelection, setShowGenderSelection] = useState(false);
  const [showEducationSelection, setShowEducationSelection] = useState(false);
  const [showMaritalStatusSelection, setShowMaritalStatusSelection] = useState(false);
  const [showAgeSelection, setShowAgeSelection] = useState(false);
  
  // Test response settings - dinamik cevap ayarları
  const [testInputSettings, setTestInputSettings] = useState<ReturnType<typeof getTestInputSettings> | null>(null);
  
  const [cevaplar, setCevaplar] = useState<Record<string, number>>({});
  const [bosCevaplar, setBosCevaplar] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Danışan bilgilerini ve test sorularını yükle
  useEffect(() => {
    const loadDanisanAndTest = async () => {
      try {
        const danisanData = await danisanService.getir(danisanId);
        if (danisanData) {
          setDanisan(danisanData);
          
          // Cinsiyet kontrolü yap
          if (isCinsiyetGerekli(test, danisanData)) {
            setShowGenderSelection(true);
            setLoading(false);
            return;
          }

          // Eğitim durumu kontrolü yap
          if (isEgitimDurumuGerekli(test, danisanData)) {
            setShowEducationSelection(true);
            setLoading(false);
            return;
          }

          // Medeni durum kontrolü yap
          if (isMedeniDurumGerekli(test, danisanData)) {
            setShowMaritalStatusSelection(true);
            setLoading(false);
            return;
          }

          // Yaş kontrolü yap
          if (isYasGerekli(test, danisanData)) {
            setShowAgeSelection(true);
            setLoading(false);
            return;
          }
          
          const sorular = getTestSorulari(test, danisanData);
          const talimatlar = getTestTalimatlar(test, danisanData);
          setTestSorulari(sorular);
          
          // Test input ayarlarını yükle
          const inputSettings = getTestInputSettings(test);
          setTestInputSettings(inputSettings);
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Danışan ve test bilgileri yüklenirken hata:', error);
        setLoading(false);
      }
    };

    loadDanisanAndTest();
  }, [danisanId, test]);

  // Gender selection completed handler
  const handleGenderSelectionComplete = async () => {
    const danisanData = await danisanService.getir(danisanId);
    if (danisanData) {
      setDanisan(danisanData);
      
      // Eğitim durumu kontrolü yap
      if (isEgitimDurumuGerekli(test, danisanData)) {
        setShowGenderSelection(false);
        setShowEducationSelection(true);
        return;
      }

      setShowGenderSelection(false);
      const sorular = getTestSorulari(test, danisanData);
      setTestSorulari(sorular);
      
      const inputSettings = getTestInputSettings(test);
      setTestInputSettings(inputSettings);
    }
  };

  // Education selection completed handler
  const handleEducationSelectionComplete = async () => {
    const danisanData = await danisanService.getir(danisanId);
    if (danisanData) {
      setDanisan(danisanData);
      setShowEducationSelection(false);
      
      const sorular = getTestSorulari(test, danisanData);
      setTestSorulari(sorular);
      
      const inputSettings = getTestInputSettings(test);
      setTestInputSettings(inputSettings);
    }
  };

  const toplamSoru = testSorulari.length;
  const cevaplanmisSoru = Object.keys(cevaplar).length;
  const bosCevapSayisi = bosCevaplar.size;
  const totalCevaplanan = cevaplanmisSoru + bosCevapSayisi;
  const progress = (totalCevaplanan / toplamSoru) * 100;

  // Zamanlayıcı
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Klavye navigasyonu - Dinamik test cevap sistemi
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const currentInput = inputRefs.current[focusedQuestion];
    if (!currentInput || !testInputSettings) return;

    const soru = testSorulari[focusedQuestion];
    if (!soru) return;

    const soruId = soru.id?.toString();
    if (!soruId) return;

    // Navigasyon tuşları
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (focusedQuestion > 0) {
        setFocusedQuestion(focusedQuestion - 1);
        setTimeout(() => {
          inputRefs.current[focusedQuestion - 1]?.focus();
          inputRefs.current[focusedQuestion - 1]?.select();
        }, 50);
      }
      e.preventDefault();
      return;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      if (focusedQuestion < toplamSoru - 1) {
        setFocusedQuestion(focusedQuestion + 1);
        setTimeout(() => {
          inputRefs.current[focusedQuestion + 1]?.focus();
          inputRefs.current[focusedQuestion + 1]?.select();
        }, 50);
      }
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      // Enter ile sonraki soruya geç
      if (focusedQuestion < toplamSoru - 1) {
        setFocusedQuestion(focusedQuestion + 1);
        setTimeout(() => {
          inputRefs.current[focusedQuestion + 1]?.focus();
        }, 50);
      }
      return;
    }

    // Tab tuşu ile boş cevaplı soruya git
    if (e.key === 'Tab') {
      e.preventDefault();
      if (bosCevaplar.size > 0) {
        const ilkBosCevap = Array.from(bosCevaplar)[0];
        const bosCevapIndex = testSorulari.findIndex(s => s.id === ilkBosCevap);
        if (bosCevapIndex !== -1) {
          setFocusedQuestion(bosCevapIndex);
          setTimeout(() => {
            inputRefs.current[bosCevapIndex]?.focus();
          }, 50);
        }
      }
      return;
    }

    // Boş cevap için B veya Space
    if (e.key === 'B' || e.key === 'b' || e.key === ' ') {
      setBosCevaplar(prev => new Set([...prev, soruId]));
      setCevaplar(prev => {
        const newState = { ...prev };
        delete newState[soruId];
        return newState;
      });
      // Otomatik olarak sonraki soruya geç
      if (focusedQuestion < toplamSoru - 1) {
        setFocusedQuestion(focusedQuestion + 1);
        setTimeout(() => {
          inputRefs.current[focusedQuestion + 1]?.focus();
          inputRefs.current[focusedQuestion + 1]?.select();
        }, 50);
      }
      e.preventDefault();
      return;
    }

    // Dinamik cevap seçenekleri
    const { responsePattern } = testInputSettings;
    const answerValue = convertKeyboardInputToAnswer(e.key, responsePattern);
    
    if (answerValue !== null) {
      setBosCevaplar(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(soruId);
        return newSet;
      });
      setCevaplar(prev => ({ ...prev, [soruId]: answerValue }));
      
      // Otomatik olarak sonraki soruya geç
      if (focusedQuestion < toplamSoru - 1) {
        setFocusedQuestion(focusedQuestion + 1);
        setTimeout(() => {
          inputRefs.current[focusedQuestion + 1]?.focus();
          inputRefs.current[focusedQuestion + 1]?.select();
        }, 50);
      }
      e.preventDefault();
    }
  }, [focusedQuestion, testSorulari, toplamSoru, testInputSettings, bosCevaplar]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // İlk input'a focus
  useEffect(() => {
    if (testSorulari.length > 0 && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [testSorulari]);

  const handleInputChange = (soruId: string, value: string) => {
    if (!testInputSettings) return;
    
    const { responsePattern } = testInputSettings;
    
    if (value === '' || value.toUpperCase() === 'B') {
      if (value.toUpperCase() === 'B') {
        // Boş işaretle
        setBosCevaplar(prev => new Set([...prev, soruId]));
        setCevaplar(prev => {
          const newState = { ...prev };
          delete newState[soruId];
          return newState;
        });
        
        // Otomatik olarak sonraki soruya geç
        const currentIndex = testSorulari.findIndex(s => s.id === soruId);
        if (currentIndex !== -1 && currentIndex < testSorulari.length - 1) {
          const nextIndex = currentIndex + 1;
          setFocusedQuestion(nextIndex);
          setTimeout(() => {
            inputRefs.current[nextIndex]?.focus();
            inputRefs.current[nextIndex]?.select();
          }, 50);
        }
      } else {
        // Boş string - cevabı temizle
        setCevaplar(prev => {
          const newState = { ...prev };
          delete newState[soruId];
          return newState;
        });
        setBosCevaplar(prev => {
          const newSet = new Set([...prev]);
          newSet.delete(soruId);
          return newSet;
        });
      }
      return;
    }
    
    const answerValue = convertKeyboardInputToAnswer(value, responsePattern);
    
    if (answerValue !== null) {
      setBosCevaplar(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(soruId);
        return newSet;
      });
      setCevaplar(prev => ({ ...prev, [soruId]: answerValue }));
      
      // Otomatik olarak sonraki soruya geç
      const currentIndex = testSorulari.findIndex(s => s.id === soruId);
      if (currentIndex !== -1 && currentIndex < testSorulari.length - 1) {
        const nextIndex = currentIndex + 1;
        setFocusedQuestion(nextIndex);
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus();
          inputRefs.current[nextIndex]?.select(); // Mevcutu seç
        }, 50);
      }
    } else {
      // Geçersiz giriş - cevabı temizle
      setCevaplar(prev => {
        const newState = { ...prev };
        delete newState[soruId];
        return newState;
      });
      setBosCevaplar(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(soruId);
        return newSet;
      });
    }
  };

  const handleSubmit = async () => {
    if (totalCevaplanan < toplamSoru) {
      toast({
        title: "Eksik Cevaplar",
        description: `${toplamSoru - totalCevaplanan} soruyu cevaplamanız gerekiyor.`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Test tipine göre özel puanlama kontrolü
      if (test.id === 'scl-90-r-semptom-tarama-listesi') {
        // SCL-90-R için özel puanlama - manual oturum objesi oluştur
        const manualOturum: TestOturumu = {
          testId: test.id,
          danisanId: danisanId,
          yontem: 'hizli',
          cevaplar: cevaplar,
          aktifSoruIndex: testSorulari.length - 1,
          baslamaTarihi: new Date().toISOString()
        };
        
        const resultAction = await dispatch(testSonucuOzelPuanlamaIleKaydet({
          oturum: manualOturum,
          test: test,
          cevaplar: cevaplar
        }));
        
        if (testSonucuOzelPuanlamaIleKaydet.fulfilled.match(resultAction)) {
          toast({
            title: "Test Tamamlandı",
            description: "SCL-90-R test sonuçları başarıyla kaydedildi."
          });
          navigate(createDanisanUrl(danisan!.adSoyad, danisan!.id!));
        }
      } else if (test.id === 'mmpi-2' || test.id === 'mmpi-2-rf') {
        // MMPI testleri için özel puanlama - bu kısım şimdilik basit
        const testSonucu = {
          danisanId: danisanId,
          testId: test.id,
          testAdi: test.testAdi,
          tamamlanmaTarihi: new Date().toISOString(),
          puan: Object.keys(cevaplar).length, // Basit puan hesaplama
          sonucYorumu: "MMPI test sonucu",
          cevaplar: Object.entries(cevaplar).map(([soruId, puan]) => ({
            soruId,
            verilenPuan: puan
          }))
        };

        await testSonucuService.ekle(testSonucu);
        
        toast({
          title: "Test Tamamlandı",
          description: "MMPI test sonuçları başarıyla kaydedildi."
        });
        navigate(createDanisanUrl(danisan!.adSoyad, danisan!.id!));
      } else {
        // Standart testler için normal puanlama
        const puanlar: Record<string, number> = {};
        
        if (test.altOlcekler) {
          for (const [altOlcekAdi, altOlcek] of Object.entries(test.altOlcekler)) {
            let toplam = 0;
            for (const soruId of altOlcek.sorular) {
              if (cevaplar[soruId.toString()]) {
                toplam += cevaplar[soruId.toString()];
              }
            }
            puanlar[altOlcekAdi] = toplam;
          }
        }

        const testSonucu = {
          danisanId: danisanId,
          testId: test.id,
          testAdi: test.testAdi,
          tamamlanmaTarihi: new Date().toISOString(),
          puan: Object.values(puanlar).reduce((a, b) => a + b, 0),
          sonucYorumu: "Test tamamlandı",
          cevaplar: Object.entries(cevaplar).map(([soruId, puan]) => ({
            soruId,
            verilenPuan: puan
          }))
        };

        await testSonucuService.ekle(testSonucu);
        
        toast({
          title: "Test Tamamlandı",
          description: "Test sonuçları başarıyla kaydedildi."
        });
        navigate(createDanisanUrl(danisan!.adSoyad, danisan!.id!));
      }
    } catch (error) {
      console.error('Test kaydedilirken hata:', error);
      toast({
        title: "Hata",
        description: "Test kaydedilirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Test yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (showGenderSelection && danisan) {
    return (
      <GenderSelectionModal
        test={test}
        danisan={danisan}
        onComplete={() => {
          setShowGenderSelection(false);
          // Test verilerini yeniden yükle
          const loadTestData = async () => {
            const updatedDanisan = await danisanService.getir(danisanId);
            if (updatedDanisan) {
              setDanisan(updatedDanisan);
              
              // Sırasıyla diğer kontrolleri yap
              if (isEgitimDurumuGerekli(test, updatedDanisan)) {
                setShowEducationSelection(true);
                return;
              }
              if (isMedeniDurumGerekli(test, updatedDanisan)) {
                setShowMaritalStatusSelection(true);
                return;
              }
              if (isYasGerekli(test, updatedDanisan)) {
                setShowAgeSelection(true);
                return;
              }
              
              const sorular = getTestSorulari(test, updatedDanisan);
              setTestSorulari(sorular);
              
              // Test input ayarlarını yükle
              const inputSettings = getTestInputSettings(test);
              setTestInputSettings(inputSettings);
              
              setLoading(false);
            }
          };
          loadTestData();
        }}
      />
    );
  }

  if (showEducationSelection && danisan) {
    return (
      <EducationSelectionModal
        test={test}
        danisan={danisan}
        onComplete={() => {
          setShowEducationSelection(false);
          // Test verilerini yeniden yükle ve sıradaki kontrolleri yap
          const loadTestData = async () => {
            const updatedDanisan = await danisanService.getir(danisanId);
            if (updatedDanisan) {
              setDanisan(updatedDanisan);
              
              // Sırasıyla diğer kontrolleri yap
              if (isMedeniDurumGerekli(test, updatedDanisan)) {
                setShowMaritalStatusSelection(true);
                return;
              }
              if (isYasGerekli(test, updatedDanisan)) {
                setShowAgeSelection(true);
                return;
              }
              
              const sorular = getTestSorulari(test, updatedDanisan);
              setTestSorulari(sorular);
              
              // Test input ayarlarını yükle
              const inputSettings = getTestInputSettings(test);
              setTestInputSettings(inputSettings);
              
              setLoading(false);
            }
          };
          loadTestData();
        }}
      />
    );
  }

  if (showMaritalStatusSelection && danisan) {
    return (
      <MaritalStatusSelectionModal
        test={test}
        danisan={danisan}
        onComplete={() => {
          setShowMaritalStatusSelection(false);
          // Test verilerini yeniden yükle ve yaş kontrolü yap
          const loadTestData = async () => {
            const updatedDanisan = await danisanService.getir(danisanId);
            if (updatedDanisan) {
              setDanisan(updatedDanisan);
              
              if (isYasGerekli(test, updatedDanisan)) {
                setShowAgeSelection(true);
                return;
              }
              
              const sorular = getTestSorulari(test, updatedDanisan);
              setTestSorulari(sorular);
              
              // Test input ayarlarını yükle
              const inputSettings = getTestInputSettings(test);
              setTestInputSettings(inputSettings);
              
              setLoading(false);
            }
          };
          loadTestData();
        }}
      />
    );
  }

  if (showAgeSelection && danisan) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Doğum Tarihi Gerekli</h2>
            <p className="text-muted-foreground">
              Bu test için doğum tarihi bilgisi gereklidir. 
              Lütfen danışan bilgilerini düzenleyerek doğum tarihini ekleyin.
            </p>
            <Button onClick={() => navigate(`/danisan/${danisan.id}`)}>
              Danışan Bilgilerini Düzenle
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitDialog(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <FiArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {test.testAdi} - Hızlı Giriş
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {danisan?.adSoyad}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {formatTime(elapsedTime)}
              </Badge>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || totalCevaplanan < toplamSoru}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? 'Kaydediliyor...' : 'Testi Tamamla'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              İlerleme
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {totalCevaplanan} / {toplamSoru}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Talimatlar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Alert className="mb-6">
          <FiInfo className="h-4 w-4" />
          <AlertDescription>
            <strong>Hızlı Giriş Talimatları:</strong> {testInputSettings?.instructionText || 'Klavye ile hızlı cevap verebilirsiniz.'} 
            {' '}Ok tuşları ile sorular arası gezinebilir, Enter ile sonraki soruya geçebilir, B tuşu ile boş bırakabilirsiniz.
          </AlertDescription>
        </Alert>

        {/* Sorular */}
        <div className="grid gap-4">
          {testSorulari.map((soru, index) => {
            const soruId = soru.id?.toString();
            const cevap = cevaplar[soruId] || '';
            const bosIsaretli = bosCevaplar.has(soruId);
            const isFocused = index === focusedQuestion;
            
            return (
              <Card key={soruId} className={`transition-all duration-200 ${
                isFocused ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 
                (cevap || bosIsaretli) ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
                'hover:shadow-md'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-gray-100 mb-3">
                        {soru.metin}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <Input
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          value={bosIsaretli ? 'B' : (cevap ? (testInputSettings?.responsePattern.optionTexts[testInputSettings.responsePattern.optionValues.indexOf(cevap)] || cevap) : '')}
                          onChange={(e) => handleInputChange(soruId, e.target.value)}
                          onFocus={(e) => {
                            setFocusedQuestion(index);
                            e.target.select(); // Mevcut değeri seç
                          }}
                          className="w-20 text-center"
                          placeholder={testInputSettings?.responsePattern.keyboardShortcuts.join('/') || '1-4'}
                        />
                        
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {testInputSettings?.instructionText || 'Klavye ile cevap verebilirsiniz'}
                        </div>
                        
                        {(cevap || bosIsaretli) && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            ✓ Cevaplanmış
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
      </div>

      {/* Exit Dialog */}
      <ConfirmationDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirm={() => navigate(createDanisanUrl(danisan!.adSoyad, danisan!.id!))}
        title="Testi Bırak"
        description="Test henüz tamamlanmadı. Çıkmak istediğinizden emin misiniz? Girilen cevaplar kaybedilecek."
        confirmText="Evet, Çık"
        cancelText="İptal"
        variant="destructive"
      />
    </div>
  );
}