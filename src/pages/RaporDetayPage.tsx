import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAppSelector } from '@/hooks/useRedux';
import { toast } from '@/hooks/use-toast';
import { testSonucuService, danisanService } from '@/lib/db';
import { TestSonucu, Danisan } from '@/types';
import { fromPublicResults } from '@/lib/mmpi';
import { pdf } from '@react-pdf/renderer';
import { TestReportPDF } from '@/components/pdf/TestReportPDF';
import TestResultEditModal from '@/components/test/TestResultEditModal';
import MMPIValidityScaleInterpretation from '@/components/test/MMPIValidityScaleInterpretation';
import MMPIClinicalScaleInterpretation from '@/components/test/MMPIClinicalScaleInterpretation';
import MMPICodeInterpretation from '@/components/test/MMPICodeInterpretation';
import TestResultChart from '@/components/test/TestResultChart';
import { ArizonaResult } from '@/components/test/ArizonaResult';
import SCL90RChart from '@/components/test/SCL90RChart';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  FileText, 
  Download, 
  Edit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react';

export default function RaporDetayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [testSonucu, setTestSonucu] = useState<TestSonucu | null>(null);
  const [danisan, setDanisan] = useState<Danisan | null>(null);
  const [testTanimi, setTestTanimi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        const sonucId = parseInt(id);
        const sonuc = await testSonucuService.getir(sonucId);
        
        if (sonuc) {
          setTestSonucu(sonuc);
          // Danışan bilgilerini yükle
          const danisanBilgisi = await danisanService.getir(sonuc.danisanId);
          setDanisan(danisanBilgisi || null);
          
          // Test tanımını yükle
          try {
            const testResponse = await fetch(`/tests/${sonuc.testId}.json`);
            if (!testResponse.ok) {
              throw new Error(`Test tanımı dosyası bulunamadı veya yüklenemedi (HTTP ${testResponse.status})`);
            }
            // JSON parse hatasını da yakala
            try {
              const testData = await testResponse.json();
              setTestTanimi(testData);
            } catch (jsonError) {
              throw new Error('Test tanımı dosyası geçerli bir JSON değil.');
            }
          } catch (error) {
            console.error('Test tanımı yüklenemedi:', error);
          }
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
        toast({
          title: "Hata",
          description: "Rapor yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Geçersiz tarih';
    
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };

  const downloadPDF = async () => {
    if (!testSonucu) return;
    
    try {
      const blob = await pdf(<TestReportPDF testSonucu={testSonucu} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `test-raporu-${testSonucu.testAdi}-${new Date().toISOString().slice(0, 10)}.pdf`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Rapor İndirildi",
        description: "Test raporu PDF formatında başarıyla indirildi.",
      });
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      toast({
        title: "Hata",
        description: "PDF oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleSaveEditedResult = async (updatedResult: TestSonucu) => {
    try {
      await testSonucuService.guncelle(updatedResult.id!, updatedResult);
      setTestSonucu(updatedResult);
      toast({
        title: "Test Güncellendi",
        description: "Test cevapları başarıyla güncellendi.",
      });
    } catch (error) {
      console.error('Test güncelleme hatası:', error);
      toast({
        title: "Hata",
        description: "Test güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Test durumu analizi
  const getTestStatus = () => {
    if (!testSonucu) return null;
    
    if (testSonucu.mmpiSonuclari) {
      // MMPI için geçerlik kontrolü yapılacak
      return { 
        status: 'valid', 
        message: 'Test tamamlandı ve analiz edildi',
        icon: CheckCircle,
        color: 'text-green-600'
      };
    }
    
    const unansweredCount = testSonucu.cevaplar?.filter(c => c.verilenPuan === -1).length || 0;
    const totalQuestions = testSonucu.cevaplar?.length || 0;
    const completionRate = ((totalQuestions - unansweredCount) / totalQuestions) * 100;
    
    if (completionRate === 100) {
      return { 
        status: 'complete', 
        message: 'Değerlendirme hazır',
        icon: CheckCircle,
        color: 'text-green-600'
      };
    } else if (completionRate >= 80) {
      return { 
        status: 'warning', 
        message: `%${completionRate.toFixed(0)} tamamlandı`,
        icon: AlertTriangle,
        color: 'text-yellow-600'
      };
    } else {
      return { 
        status: 'incomplete', 
        message: `Test eksik (%${completionRate.toFixed(0)} tamamlandı)`,
        icon: XCircle,
        color: 'text-red-600'
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Rapor yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!testSonucu) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Rapor Bulunamadı</h2>
            <p className="text-muted-foreground mb-6">Bu test sonucu kaydı mevcut değil.</p>
            <Button onClick={() => navigate('/danisanlar')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const testStatus = getTestStatus();

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/danisanlar')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Test Raporu</h1>
              <p className="text-muted-foreground text-sm">{testSonucu.testAdi}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={downloadPDF} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              PDF İndir
            </Button>
            
            <TestResultEditModal
              testSonucu={testSonucu}
              test={testTanimi}
              open={showEditModal}
              onOpenChange={setShowEditModal}
              onSave={handleSaveEditedResult}
            />
            
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setShowEditModal(true)} 
              className="w-full sm:w-auto"
              disabled={!testTanimi}
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard - Özet Bilgiler */}
      <div className={`grid gap-4 ${
        testSonucu.testId === 'young-sema-olcegi-ysq' || testSonucu.testId === 'arizona-cinsel-yasanti-acyo'
          ? 'grid-cols-1 sm:grid-cols-2' 
          : testSonucu.mmpiSonuclari 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      }`}>
        {/* Danışan Bilgisi */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Danışan</p>
                <p className="font-semibold">{danisan?.adSoyad || 'Bilinmiyor'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Tarihi */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600 bg-green-100 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Test Tarihi</p>
                <p className="font-semibold">{formatDate(testSonucu.tamamlanmaTarihi)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Durumu (Young Şema ve Arizona hariç) */}
        {testSonucu.testId !== 'young-sema-olcegi-ysq' && testSonucu.testId !== 'arizona-cinsel-yasanti-acyo' && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {testStatus && (
                  <>
                    <testStatus.icon className={`h-8 w-8 ${testStatus.color} bg-gray-100 rounded-full p-2`} />
                    <div>
                      <p className="text-sm text-muted-foreground">Durum</p>
                      <p className="font-semibold">{testStatus.message}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Toplam Puan (MMPI, Young Şema ve Arizona olmayan testler için) */}
        {!testSonucu.mmpiSonuclari && testSonucu.testId !== 'young-sema-olcegi-ysq' && testSonucu.testId !== 'arizona-cinsel-yasanti-acyo' && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600 bg-purple-100 rounded-full p-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Puan</p>
                  <p className="font-semibold text-2xl">{testSonucu.puan}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ana İçerik - Tabbed Interface */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className={`grid w-full min-w-[400px] mb-4 ${
            testSonucu.mmpiSonuclari ? 'grid-cols-5' : 
            testSonucu.testId === 'young-sema-olcegi-ysq' || testSonucu.testId === 'arizona-cinsel-yasanti-acyo' ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Genel Bakış</TabsTrigger>
            {testSonucu.mmpiSonuclari ? (
              <>
                <TabsTrigger value="validity" className="text-xs sm:text-sm">Geçerlik</TabsTrigger>
                <TabsTrigger value="clinical" className="text-xs sm:text-sm">Klinik</TabsTrigger>
                <TabsTrigger value="codes" className="text-xs sm:text-sm">Kodlar</TabsTrigger>
              </>
            ) : testSonucu.testId !== 'young-sema-olcegi-ysq' && testSonucu.testId !== 'arizona-cinsel-yasanti-acyo' ? (
              <TabsTrigger value="results" className="text-xs sm:text-sm">Sonuçlar</TabsTrigger>
            ) : null}
            <TabsTrigger value="details" className="text-xs sm:text-sm">Detaylar</TabsTrigger>
          </TabsList>
        </div>

        {/* Genel Bakış */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Grafikleri</CardTitle>
            </CardHeader>
            <CardContent>
              {/* SCL-90-R için özel grafik */}
              {testSonucu.testId === 'scl-90-r' ? (
                <SCL90RChart testSonucu={testSonucu} showOverallScore={false} chartType="line" />
              ) : testSonucu.testId === 'arizona-cinsel-yasanti-acyo' ? (
                <ArizonaResult testSonucu={testSonucu} danisan={danisan} />
              ) : (
                <TestResultChart testSonucu={testSonucu} showOverallScore={false} />
              )}
            </CardContent>
          </Card>

          {/* MMPI olmayan testler ve Young Şema Ölçeği, Arizona hariç diğer testler için sonuç yorumu */}
          {!testSonucu.mmpiSonuclari && testSonucu.testId !== 'young-sema-olcegi-ysq' && testSonucu.testId !== 'arizona-cinsel-yasanti-acyo' && (
            <Card>
              <CardHeader>
                <CardTitle>Sonuç Değerlendirmesi</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription className="text-base leading-relaxed">
                    {testSonucu.sonucYorumu}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Geçerlik Ölçekleri (Sadece MMPI) */}
        {testSonucu.mmpiSonuclari && (
          <TabsContent value="validity" className="space-y-6">
            <MMPIValidityScaleInterpretation testSonucu={testSonucu} danisan={danisan} />
          </TabsContent>
        )}

        {/* Klinik Ölçekler (Sadece MMPI) */}
        {testSonucu.mmpiSonuclari && (
          <TabsContent value="clinical" className="space-y-6">
            <MMPIClinicalScaleInterpretation 
              testSonucu={testSonucu} 
              danisanCinsiyet={danisan?.cinsiyet}
            />
          </TabsContent>
        )}

        {/* MMPI Kodları (Sadece MMPI) */}
        {testSonucu.mmpiSonuclari && (
          <TabsContent value="codes" className="space-y-6">
            <MMPICodeInterpretation testSonucu={testSonucu} danisan={danisan} />
          </TabsContent>
        )}

        {/* Standart Sonuçlar (MMPI olmayan testler ve Young Şema, Arizona hariç) */}
        {!testSonucu.mmpiSonuclari && testSonucu.testId !== 'young-sema-olcegi-ysq' && testSonucu.testId !== 'arizona-cinsel-yasanti-acyo' && (
          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detaylı Sonuç Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{testSonucu.puan}</p>
                      <p className="text-sm text-muted-foreground">Toplam Puan</p>
                    </div>
                    
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-3xl font-bold">{testSonucu.cevaplar.filter(c => c.verilenPuan !== -1).length}</p>
                      <p className="text-sm text-muted-foreground">Yanıtlanan Soru</p>
                    </div>
                    
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-3xl font-bold">{testSonucu.cevaplar.length}</p>
                      <p className="text-sm text-muted-foreground">Toplam Soru</p>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription className="text-base leading-relaxed">
                      {testSonucu.sonucYorumu}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Detaylar */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cevap Detayları</CardTitle>
              <p className="text-sm text-muted-foreground">
                Teste verilen yanıtların detaylı listesi
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testSonucu.cevaplar.map((cevap, index) => (
                  <div key={cevap.soruId} className="flex justify-between items-center p-3 border rounded-lg hover:bg-secondary/30 transition-colors">
                    <span className="text-sm font-medium">
                      Soru {isNaN(parseInt(cevap.soruId)) ? cevap.soruId : parseInt(cevap.soruId)}
                    </span>
                    <Badge 
                      variant={cevap.verilenPuan === -1 ? "destructive" : "secondary"}
                      className="ml-2"
                    >
                      {cevap.verilenPuan === -1 ? "Cevaplanmadı" : `${cevap.verilenPuan} puan`}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}