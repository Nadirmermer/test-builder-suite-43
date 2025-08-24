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
import { MMPICodeAnalysis } from '@/components/test/MMPICodeAnalysis';
import TestResultChart from '@/components/test/TestResultChart';
import { analyzeCodeTypes } from '@/lib/mmpi/interpretations/codes/analyzer';
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
  // MMPI kod analizi hesaplaması
  const getCodeAnalysis = () => {
    if (!testSonucu?.mmpiSonuclari) return [];
    
    try {
      const mmpiData = fromPublicResults(testSonucu.mmpiSonuclari);
      const clinicalScales = {
        'Hs': { tScore: mmpiData.clinicalScales.Hs.tScore, rawScore: mmpiData.clinicalScales.Hs.rawScore },
        'D': { tScore: mmpiData.clinicalScales.D.tScore, rawScore: mmpiData.clinicalScales.D.rawScore },
        'Hy': { tScore: mmpiData.clinicalScales.Hy.tScore, rawScore: mmpiData.clinicalScales.Hy.rawScore },
        'Pd': { tScore: mmpiData.clinicalScales.Pd.tScore, rawScore: mmpiData.clinicalScales.Pd.rawScore },
        'Mf': { tScore: mmpiData.clinicalScales.Mf.tScore, rawScore: mmpiData.clinicalScales.Mf.rawScore },
        'Pa': { tScore: mmpiData.clinicalScales.Pa.tScore, rawScore: mmpiData.clinicalScales.Pa.rawScore },
        'Pt': { tScore: mmpiData.clinicalScales.Pt.tScore, rawScore: mmpiData.clinicalScales.Pt.rawScore },
        'Sc': { tScore: mmpiData.clinicalScales.Sc.tScore, rawScore: mmpiData.clinicalScales.Sc.rawScore },
        'Ma': { tScore: mmpiData.clinicalScales.Ma.tScore, rawScore: mmpiData.clinicalScales.Ma.rawScore },
        'Si': { tScore: mmpiData.clinicalScales.Si.tScore, rawScore: mmpiData.clinicalScales.Si.rawScore }
      };

      // Validity ölçeklerini de ekleyelim
      const allScales = {
        ...clinicalScales,
        'F': { tScore: mmpiData.validityScales.F.tScore, rawScore: mmpiData.validityScales.F.rawScore },
        'K': { tScore: mmpiData.validityScales.K.tScore, rawScore: mmpiData.validityScales.K.rawScore },
        'L': { tScore: mmpiData.validityScales.L.tScore, rawScore: mmpiData.validityScales.L.rawScore }
      };
      
      return analyzeCodeTypes(allScales, danisan?.cinsiyet as 'Erkek' | 'Kadin');
    } catch (error) {
      console.error('Kod analizi hesaplama hatası:', error);
      return [];
    }
  };

  const codeTypes = getCodeAnalysis();

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
        message: 'Test tamamen tamamlandı',
        icon: CheckCircle,
        color: 'text-green-600'
      };
    } else if (completionRate >= 80) {
      return { 
        status: 'warning', 
        message: `Test %${completionRate.toFixed(0)} tamamlandı`,
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
        <div className="flex items-center justify-between">
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
              <h1 className="text-2xl font-bold text-foreground">Test Raporu</h1>
              <p className="text-muted-foreground text-sm">{testSonucu.testAdi}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              PDF İndir
            </Button>
            
            <TestResultEditModal
              testSonucu={testSonucu}
              open={showEditModal}
              onOpenChange={setShowEditModal}
              onSave={handleSaveEditedResult}
            />
            
            <Button variant="secondary" size="sm" onClick={() => setShowEditModal(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard - Özet Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Test Durumu */}
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

        {/* Toplam Puan (MMPI olmayan testler için) */}
        {!testSonucu.mmpiSonuclari && (
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          {testSonucu.mmpiSonuclari ? (
            <>
              <TabsTrigger value="validity">Geçerlik</TabsTrigger>
              <TabsTrigger value="clinical">Klinik Ölçekler</TabsTrigger>
              <TabsTrigger value="codes">Kod Analizi</TabsTrigger>
            </>
          ) : (
            <TabsTrigger value="results">Sonuçlar</TabsTrigger>
          )}
          <TabsTrigger value="details">Detaylar</TabsTrigger>
        </TabsList>

        {/* Genel Bakış */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Grafikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <TestResultChart testSonucu={testSonucu} showOverallScore={false} />
            </CardContent>
          </Card>

          {/* MMPI olmayan testler için sonuç yorumu */}
          {!testSonucu.mmpiSonuclari && (
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
            <MMPIValidityScaleInterpretation testSonucu={testSonucu} />
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

        {/* Kod Analizi (Sadece MMPI) */}
        {testSonucu.mmpiSonuclari && (
          <TabsContent value="codes" className="space-y-6">
            <MMPICodeAnalysis codeTypes={codeTypes} />
          </TabsContent>
        )}

        {/* Standart Sonuçlar (MMPI olmayan testler) */}
        {!testSonucu.mmpiSonuclari && (
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
                      Soru {parseInt(cevap.soruId)}
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