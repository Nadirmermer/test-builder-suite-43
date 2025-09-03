import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiClock, FiCheck, FiX, FiAlertCircle, FiSkipForward, FiCommand, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import DemographicInfoModal from './DemographicInfoModal';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { testleriYukle, testSonucuKaydet } from '@/store/slices/testSlice';
import { danisanService } from '@/lib/db';
import { TestTanimi, Danisan, TestSorusu } from '@/types';
import { getTestSorulari, isCinsiyetGerekli, isEgitimDurumuGerekli, isMedeniDurumGerekli, isYasGerekli } from '@/utils/testUtils';
import { createDanisanUrl } from '@/utils/urlUtils';
import { calculateMMPIScores, toPublicResults } from '@/lib/mmpi';
import { useToast } from '@/hooks/use-toast';
import { danisanGetir } from '@/store/slices/danisanSlice';

// Test cevap patterni analizi için tipler
interface TestResponsePattern {
  type: 'binary' | 'scale' | 'custom';
  options: {
    value: number;
    text: string;
    shortcut: string;
    color: string;
  }[];
  allowEmpty: boolean;
}

// Test analizi fonksiyonu
function analyzeTestPattern(test: TestTanimi, testSorulari: TestSorusu[]): TestResponsePattern {
  if (testSorulari.length === 0) {
    return {
      type: 'binary',
      options: [
        { value: 1, text: 'DOĞRU', shortcut: 'D', color: 'bg-green-100 text-green-800 border-green-300' },
        { value: 0, text: 'YANLIŞ', shortcut: 'Y', color: 'bg-red-100 text-red-800 border-red-300' }
      ],
      allowEmpty: true
    };
  }

  const firstQuestion = testSorulari[0];
  const options = firstQuestion.secenekler;

  // MMPI özel durumu
  if (test.id === 'mmpi' || (options.length === 2 && 
      options.some(o => o.metin === 'DOĞRU') && 
      options.some(o => o.metin === 'YANLIŞ'))) {
    return {
      type: 'binary',
      options: [
        { value: 1, text: 'DOĞRU', shortcut: '1/D', color: 'bg-green-100 text-green-800 border-green-300' },
        { value: 0, text: 'YANLIŞ', shortcut: '2/Y', color: 'bg-red-100 text-red-800 border-red-300' }
      ],
      allowEmpty: true
    };
  }

  // SCL-90-R gibi ölçekli testler
  if (options.length >= 4 && options.some(o => o.metin.includes('Hiç'))) {
    return {
      type: 'scale',
      options: options.map((option, index) => ({
        value: option.puan,
        text: option.metin,
        shortcut: index.toString(),
        color: `bg-blue-${100 + index * 100} text-blue-800 border-blue-300`
      })),
      allowEmpty: false
    };
  }

  // Genel çoklu seçim
  return {
    type: 'custom',
    options: options.map((option, index) => ({
      value: option.puan,
      text: option.metin,
      shortcut: (index + 1).toString(),
      color: `bg-gray-100 text-gray-800 border-gray-300`
    })),
    allowEmpty: false
  };
}

export default function FastTestInterface() {
  const { testId, danisanId } = useParams<{ testId: string; danisanId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // Redux state
  const { mevcutTestler } = useAppSelector((state) => state.testler);
  const test = mevcutTestler.find(t => t.id === testId);

  // Component state
  const [danisan, setDanisan] = useState<Danisan | null>(null);
  const [testSorulari, setTestSorulari] = useState<TestSorusu[]>([]);
  const [testPattern, setTestPattern] = useState<TestResponsePattern | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [emptyAnswers, setEmptyAnswers] = useState<Set<string>>(new Set());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDemographicModal, setShowDemographicModal] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  // Test verilerini yükle
  useEffect(() => {
    if (mevcutTestler.length === 0) {
      dispatch(testleriYukle());
    }
  }, [dispatch, mevcutTestler.length]);

  // Danışan ve test verilerini yükle
  useEffect(() => {
    const loadTestData = async () => {
      if (!test || !danisanId) return;

      try {
        const danisanData = await danisanService.getir(parseInt(danisanId));
        if (!danisanData) {
          toast({
            title: "Hata",
            description: "Danışan bulunamadı",
            variant: "destructive"
          });
          return;
        }

        setDanisan(danisanData);

        // Demografik bilgi kontrolü - birleşik modal ile
        const hasExistingDemo = (
          isCinsiyetGerekli(test, danisanData) ||
          isEgitimDurumuGerekli(test, danisanData) ||
          isMedeniDurumGerekli(test, danisanData) ||
          isYasGerekli(test, danisanData)
        );
        
        if (hasExistingDemo) {
          setShowDemographicModal(true);
          setLoading(false);
          return;
        }

        // Test sorularını yükle
        const sorular = getTestSorulari(test, danisanData);
        setTestSorulari(sorular);

        // Test patternini analiz et
        const pattern = analyzeTestPattern(test, sorular);
        setTestPattern(pattern);

        setLoading(false);
      } catch (error) {
        console.error('Test verileri yüklenirken hata:', error);
        toast({
          title: "Hata",
          description: "Test verileri yüklenirken bir hata oluştu",
          variant: "destructive"
        });
      }
    };

    loadTestData();
  }, [test, danisanId, toast]);

  // Demografik bilgi modal'ı tamamlandığında çağrılacak fonksiyon
  const handleDemographicComplete = async () => {
    const danisanData = await danisanService.getir(parseInt(danisanId!));
    if (danisanData) {
      setDanisan(danisanData);
      // Redux store'u da güncelle
      await dispatch(danisanGetir(parseInt(danisanId!)));
      setShowDemographicModal(false);
      
      // Test sorularını yükle
      const sorular = getTestSorulari(test!, danisanData);
      setTestSorulari(sorular);

      // Test patternini analiz et
      const pattern = analyzeTestPattern(test!, sorular);
      setTestPattern(pattern);

      setLoading(false);
    }
  };

  // Timer
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // Input focus ve navigation scroll
  useEffect(() => {
    if (!loading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
    
    // Navigation scroll
    if (navigationRef.current) {
      const button = navigationRef.current.querySelector(`[data-question="${currentQuestionIndex}"]`) as HTMLElement;
      if (button) {
        button.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentQuestionIndex, loading]);

  // Klavye olayları
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!testPattern || loading) return;

    // ESC - Çıkış
    if (e.key === 'Escape') {
      setShowExitDialog(true);
      return;
    }

    // Enter - Sonraki soru (boş cevap ile)
    if (e.key === 'Enter') {
      if (testPattern.allowEmpty) {
        const currentQuestionId = testSorulari[currentQuestionIndex]?.id?.toString();
        if (currentQuestionId) {
          setEmptyAnswers(prev => new Set([...prev, currentQuestionId]));
          setAnswers(prev => {
            const newAnswers = { ...prev };
            delete newAnswers[currentQuestionId];
            return newAnswers;
          });
          goToNextQuestion();
        }
      }
      e.preventDefault();
      return;
    }

    // B, 3 veya Space - Boş cevap
    if ((e.key === 'b' || e.key === 'B' || e.key === '3' || e.key === ' ') && testPattern.allowEmpty) {
      const currentQuestionId = testSorulari[currentQuestionIndex]?.id?.toString();
      if (currentQuestionId) {
        setEmptyAnswers(prev => new Set([...prev, currentQuestionId]));
        setAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[currentQuestionId];
          return newAnswers;
        });
        goToNextQuestion();
      }
      e.preventDefault();
      return;
    }

    // Arrow keys - Navigasyon
    if (e.key === 'ArrowUp' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowDown' && currentQuestionIndex < testSorulari.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      e.preventDefault();
      return;
    }

    // Ctrl+S - Kaydet
    if (e.ctrlKey && e.key === 's') {
      handleSave();
      e.preventDefault();
      return;
    }

    // Cevap tuşları - çoklu kısayol desteği
    let matchedOption = null;
    
    for (const option of testPattern.options) {
      const shortcuts = option.shortcut.split('/');
      if (shortcuts.some(shortcut => shortcut.toLowerCase() === e.key.toLowerCase())) {
        matchedOption = option;
        break;
      }
    }

    if (matchedOption) {
      const currentQuestionId = testSorulari[currentQuestionIndex]?.id?.toString();
      if (currentQuestionId) {
        setAnswers(prev => ({ ...prev, [currentQuestionId]: matchedOption.value }));
        setEmptyAnswers(prev => {
          const newSet = new Set(prev);
          newSet.delete(currentQuestionId);
          return newSet;
        });
        goToNextQuestion();
      }
      e.preventDefault();
    }
  }, [testPattern, currentQuestionIndex, testSorulari, loading]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Popup dışı tıklama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showKeyboardShortcuts) {
        const popup = document.querySelector('[data-keyboard-shortcuts-popup]');
        if (popup && !popup.contains(event.target as Node)) {
          setShowKeyboardShortcuts(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showKeyboardShortcuts]);

  // Sonraki soruya geç
  const goToNextQuestion = () => {
    if (currentQuestionIndex < testSorulari.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Soruya git
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    
    // Hızlı navigasyonda mevcut soruyu görünür yap
    setTimeout(() => {
      if (navigationRef.current) {
        const button = navigationRef.current.querySelector(`[data-question="${index}"]`) as HTMLElement;
        if (button) {
          button.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }
    }, 100);
  };

  // Kaydet
  const handleSave = async () => {
    if (!test || !danisan) return;

    const totalAnswered = Object.keys(answers).length + emptyAnswers.size;
    const unansweredCount = testSorulari.length - totalAnswered;

    // Boş bırakılmasına izin verilmeyen testlerde kontrol
    if (!testPattern?.allowEmpty && unansweredCount > 0) {
      toast({
        title: "Eksik Cevaplar",
        description: `${unansweredCount} soru cevaplanmamış. Lütfen tüm soruları cevaplayın.`,
        variant: "destructive"
      });
      
      // İlk cevaplanmamış soruya git
      const firstUnanswered = testSorulari.findIndex(soru => {
        const soruId = soru.id?.toString();
        return soruId && !answers[soruId] && !emptyAnswers.has(soruId);
      });
      
      if (firstUnanswered !== -1) {
        setCurrentQuestionIndex(firstUnanswered);
      }
      return;
    }

    try {
      // MMPI testleri için özel puanlama kontrolü
      if (test.id === 'mmpi-2' || test.id === 'mmpi-2-rf' || test.puanlamaTuru === 'mmpi-profil') {
        // Cinsiyet bilgisini kontrol et
        const cinsiyetBilgisi = danisan?.cinsiyet;
        if (!cinsiyetBilgisi || cinsiyetBilgisi === 'Belirtmek istemiyorum') {
          toast({
            title: "Eksik Bilgi",
            description: "MMPI testi için cinsiyet bilgisi gereklidir.",
            variant: "destructive"
          });
          return;
        }

        // MMPI puanlama motoru ile hesaplama
        const results = calculateMMPIScores(answers, emptyAnswers, cinsiyetBilgisi === 'Kadin' ? 'Kadin' : 'Erkek');
        const mmpiSonuclari = toPublicResults(results);

        // Toplam T-skoru hesaplama (genel puan için)
        const toplamTSkoru = Object.values(mmpiSonuclari.klinikOlcekler)
          .reduce((sum, olcek) => sum + olcek.tSkoru, 0);

        const testSonucu = {
          testId: test.id,
          danisanId: danisan.id!,
          cevaplar: [
            ...Object.entries(answers).map(([soruId, verilenPuan]) => ({
              soruId,
              verilenPuan
            })),
            ...Array.from(emptyAnswers).map(soruId => ({
              soruId,
              verilenPuan: -1 // -1 = boş cevap işareti
            }))
          ],
          tamamlanmaTarihi: new Date(),
          testAdi: test.testAdi + " (Hızlı Giriş)",
          danisanAdi: danisan.adSoyad,
          sure: elapsedTime,
          puan: Math.round(toplamTSkoru / Object.keys(mmpiSonuclari.klinikOlcekler).length) || 50,
          sonucYorumu: 'MMPI test sonuçları hesaplandı.',
          mmpiSonuclari
        };

        await dispatch(testSonucuKaydet(testSonucu));

        toast({
          title: "Test Tamamlandı",
          description: "MMPI test sonuçları başarıyla hesaplandı ve kaydedildi.",
        });

        navigate(createDanisanUrl(danisan.adSoyad, danisan.id!));
        return;
      }

      // Diğer testler için standart puanlama
      const cevaplarArray = Object.entries(answers).map(([soruId, puan]) => ({
        soruId,
        verilenPuan: puan
      }));
      
      const testSonucu = {
        testId: test.id,
        danisanId: danisan.id!,
        cevaplar: cevaplarArray,
        tamamlanmaTarihi: new Date(),
        testAdi: test.testAdi,
        danisanAdi: danisan.adSoyad,
        sure: elapsedTime,
        puan: Object.values(answers).reduce((sum, val) => sum + val, 0),
        sonucYorumu: `Test ${Math.round(progress)}% tamamlandı`
      };

      await dispatch(testSonucuKaydet(testSonucu));

      toast({
        title: "Başarılı",
        description: "Test sonucu kaydedildi",
      });

      navigate(createDanisanUrl(danisan.adSoyad, danisan.id!));
    } catch (error) {
      console.error('Test kaydedilirken hata:', error);
      toast({
        title: "Hata",
        description: "Test kaydedilirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  // Yükleniyor
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Test yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Test bulunamadı
  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-xl font-medium">Test bulunamadı</h3>
          <p className="text-muted-foreground">Belirtilen test mevcut değil.</p>
        </div>
      </div>
    );
  }

  // Demografik bilgi modal'ını göster
  if (showDemographicModal && danisan) {
    return (
      <DemographicInfoModal
        test={test}
        danisan={danisan}
        onComplete={handleDemographicComplete}
      />
    );
  }

  // Ana arayüz
  const totalQuestions = testSorulari.length;
  const answeredQuestions = Object.keys(answers).length;
  const emptyQuestions = emptyAnswers.size;
  const totalAnswered = answeredQuestions + emptyQuestions;
  const progress = (totalAnswered / totalQuestions) * 100;
  const currentQuestion = testSorulari[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = testSorulari[questionIndex]?.id?.toString();
    if (!questionId) return 'unanswered';
    
    if (answers[questionId] !== undefined) return 'answered';
    if (emptyAnswers.has(questionId)) return 'empty';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-100 text-green-800 border-green-300';
      case 'empty': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitDialog(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex-shrink-0"
              >
                <FiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {test.testAdi}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  {danisan?.adSoyad} - Hızlı Giriş
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="relative hidden sm:flex"
              >
                <FiCommand className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Kısayollar</span>
              </Button>
              
              {/* Mobil için sadece ikon */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="relative sm:hidden p-2"
              >
                <FiCommand className="h-4 w-4" />
              </Button>
              
              {/* Klavye Kısayolları Popup */}
              {showKeyboardShortcuts && (
                <div 
                  data-keyboard-shortcuts-popup
                  className="absolute top-14 sm:top-16 right-2 sm:right-4 z-50 w-72 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3 sm:p-4"
                >
                  <div className="space-y-3">
                    {/* Test-specific shortcuts */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cevap Seçenekleri
                      </h4>
                      {testPattern?.options.map((option, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <span className="text-sm">{option.text}</span>
                          <Badge variant="secondary" className="text-xs font-mono">
                            {option.shortcut}
                          </Badge>
                        </div>
                      ))}
                      
                      {testPattern?.allowEmpty && (
                        <div className="flex items-center justify-between py-1">
                          <span className="text-sm">Boş Bırak</span>
                          <Badge variant="secondary" className="text-xs font-mono">
                            3/B
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    {/* Navigation shortcuts */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Navigasyon
                      </h4>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm">Önceki Soru</span>
                        <Badge variant="secondary" className="text-xs font-mono">↑</Badge>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm">Sonraki Soru</span>
                        <Badge variant="secondary" className="text-xs font-mono">↓</Badge>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm">Kaydet</span>
                        <Badge variant="secondary" className="text-xs font-mono">Ctrl+S</Badge>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm">Çıkış</span>
                        <Badge variant="secondary" className="text-xs font-mono">ESC</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <FiSave className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-6 min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-140px)]">
          {/* Ana Soru Alanı */}
          <div className="lg:col-span-3 flex flex-col order-1 lg:order-1">
            <Card className="shadow-lg flex-1 flex flex-col">
              <CardContent className="p-3 sm:p-6 flex-1 flex flex-col">
                {/* Soru Başlığı */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base flex-shrink-0">
                      {currentQuestionIndex + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
                        Soru {currentQuestionIndex + 1}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {totalQuestions} sorudan {currentQuestionIndex + 1}.si
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
                      disabled={currentQuestionIndex === 0}
                    >
                      Önceki
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => currentQuestionIndex < totalQuestions - 1 && setCurrentQuestionIndex(prev => prev + 1)}
                      disabled={currentQuestionIndex === totalQuestions - 1}
                    >
                      Sonraki
                    </Button>
                  </div>
                </div>
                
                {/* Soru Metni */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg text-gray-900 dark:text-gray-100 leading-relaxed">
                    {currentQuestion?.metin}
                  </p>
                </div>
                
                {/* Seçenekler */}
                {testPattern && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                      Cevap Seçenekleri (Klavye Kısayolları)
                    </h3>
                    
                    <div className="grid gap-2 sm:gap-3">
                      {testPattern.options.map((option, index) => {
                        const isSelected = answers[currentQuestion?.id?.toString() || ''] === option.value;
                        
                        return (
                          <Button
                            key={index}
                            variant={isSelected ? "default" : "outline"}
                            className={`w-full justify-start text-left h-auto p-3 sm:p-4 text-sm sm:text-base ${
                              isSelected ? option.color : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => {
                              const questionId = currentQuestion?.id?.toString();
                              if (questionId) {
                                setAnswers(prev => ({ ...prev, [questionId]: option.value }));
                                setEmptyAnswers(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(questionId);
                                  return newSet;
                                });
                                goToNextQuestion();
                              }
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{option.text}</span>
                              <Badge variant="secondary" className="ml-2">
                                {option.shortcut}
                              </Badge>
                            </div>
                          </Button>
                        );
                      })}
                      
                      {testPattern.allowEmpty && (
                        <Button
                          variant={emptyAnswers.has(currentQuestion?.id?.toString() || '') ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto p-4 ${
                            emptyAnswers.has(currentQuestion?.id?.toString() || '') 
                              ? 'bg-orange-100 text-orange-800 border-orange-300'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => {
                            const questionId = currentQuestion?.id?.toString();
                            if (questionId) {
                              setEmptyAnswers(prev => new Set([...prev, questionId]));
                              setAnswers(prev => {
                                const newAnswers = { ...prev };
                                delete newAnswers[questionId];
                                return newAnswers;
                              });
                              goToNextQuestion();
                            }
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>Boş Bırak</span>
                            <Badge variant="secondary" className="ml-2 font-mono">
                              3/B
                            </Badge>
                          </div>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Mevcut Cevap */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Klavye ile cevap verin..."
                      className="flex-1"
                      readOnly
                      value={
                        (() => {
                          const questionId = currentQuestion?.id?.toString();
                          if (!questionId) return '';
                          
                          if (emptyAnswers.has(questionId)) return 'BOŞ';
                          
                          const answer = answers[questionId];
                          if (answer !== undefined && testPattern) {
                            const option = testPattern.options.find(opt => opt.value === answer);
                            return option ? option.text : answer.toString();
                          }
                          
                          return '';
                        })()
                      }
                    />
                    
                    {(() => {
                      const questionId = currentQuestion?.id?.toString();
                      if (!questionId) return null;
                      
                      if (emptyAnswers.has(questionId)) {
                        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">BOŞ</Badge>;
                      }
                      
                      if (answers[questionId] !== undefined) {
                        if (testPattern?.type === 'binary') {
                          return answers[questionId] === 1 
                            ? <Badge className="bg-green-100 text-green-800 border-green-300">DOĞRU</Badge>
                            : <Badge className="bg-red-100 text-red-800 border-red-300">YANLIŞ</Badge>;
                        }
                        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">CEVAPLANDı</Badge>;
                      }
                      
                      return <Badge variant="outline">CEVAPSıZ</Badge>;
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sağ Panel - Navigasyon */}
          <div className="lg:col-span-2 flex flex-col order-2 lg:order-2">
            {/* Hızlı Navigasyon */}
            <Card className="flex-1 flex flex-col">
              <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                    Hızlı Navigasyon
                  </h3>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatTime(elapsedTime)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Soru {currentQuestionIndex + 1} / {totalQuestions} ({Math.round(progress)}% tamamlandı)
                </p>
                
                <div 
                  ref={navigationRef}
                  className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 max-h-64"
                >
                  {Array.from({ length: Math.ceil(testSorulari.length / 5) }, (_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-2 mb-2">
                      {Array.from({ length: 5 }, (_, colIndex) => {
                        const index = rowIndex * 5 + colIndex;
                        if (index >= testSorulari.length) return <div key={colIndex} />;
                        
                        const status = getQuestionStatus(index);
                        const isCurrent = index === currentQuestionIndex;
                        
                        // Cevap türüne göre renk belirleme
                        let statusColor = 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200';
                        
                        if (isCurrent) {
                          statusColor = 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-300';
                        } else if (status === 'empty') {
                          statusColor = 'bg-orange-600 border-orange-700 text-white hover:bg-orange-700';
                        } else if (status === 'answered') {
                          const soruId = testSorulari[index]?.id?.toString();
                          const answer = soruId ? answers[soruId] : null;
                          const answerStr = String(answer);
                          
                          if (answerStr === 'DOĞRU' || answerStr === 'true' || answerStr === '1') {
                            statusColor = 'bg-green-700 border-green-800 text-white hover:bg-green-800';
                          } else if (answerStr === 'YANLIŞ' || answerStr === 'false' || answerStr === '0') {
                            statusColor = 'bg-red-700 border-red-800 text-white hover:bg-red-800';
                          } else {
                            statusColor = 'bg-green-700 border-green-800 text-white hover:bg-green-800';
                          }
                        }
                        
                        return (
                          <Button
                            key={index}
                            data-question={index}
                            variant="outline"
                            size="sm"
                            className={`h-8 w-8 sm:h-10 sm:w-10 p-0 text-xs sm:text-sm font-medium rounded border-2 transition-all duration-200 ${statusColor}`}
                            onClick={() => goToQuestion(index)}
                          >
                            {index + 1}
                          </Button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                
                {/* Alt Bilgiler */}
                <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                  {/* İstatistikler */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                    <div className="space-y-1">
                      <div className="text-base sm:text-lg font-semibold text-green-600">{answeredQuestions}</div>
                      <div className="text-xs text-gray-500">Cevaplanan</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-base sm:text-lg font-semibold text-orange-600">{emptyQuestions}</div>
                      <div className="text-xs text-gray-500">Boş</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-gray-600">{totalQuestions - totalAnswered}</div>
                      <div className="text-xs text-gray-500">Kalan</div>
                    </div>
                  </div>
                  
                  <Progress value={progress} className="h-2" />
                  
                  {/* Renk Açıklamaları */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
                      <span>Cevaplanan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
                      <span>Boş Bırakılan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded bg-gray-100 border border-gray-300"></div>
                      <span>Cevaplanmayan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded bg-blue-600"></div>
                      <span>Mevcut Soru</span>
                    </div>
                  </div>
                  
                  {/* Eksik Cevaplar Uyarısı */}
                  {!testPattern?.allowEmpty && totalQuestions - totalAnswered > 0 && (
                    <Alert className="mt-4">
                      <FiAlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Bu testte tüm sorular cevaplanmalıdır. 
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto font-normal text-xs"
                          onClick={() => {
                            const firstUnanswered = testSorulari.findIndex(soru => {
                              const soruId = soru.id?.toString();
                              return soruId && !answers[soruId] && !emptyAnswers.has(soruId);
                            });
                            if (firstUnanswered !== -1) {
                              setCurrentQuestionIndex(firstUnanswered);
                            }
                          }}
                        >
                          İlk cevaplanmamış soruya git →
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Çıkış Dialog'u */}
      <ConfirmationDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirm={() => {
          if (danisan) {
            navigate(createDanisanUrl(danisan.adSoyad, danisan.id!));
          }
        }}
        title="Testi Bırak"
        description="Test henüz tamamlanmadı. Çıkmak istediğinizden emin misiniz? Girilen cevaplar kaybedilecek."
        confirmText="Evet, Çık"
        cancelText="İptal"
        variant="destructive"
      />
    </div>
  );
}
