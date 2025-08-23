
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiClipboard, FiDownload, FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toast } from '@/hooks/use-toast';
import { testSonucuService } from '@/lib/db';
import { TestSonucu } from '@/types';
import TestResultChart from '@/components/test/TestResultChart';
import { pdf } from '@react-pdf/renderer';
import { TestReportPDF } from '@/components/pdf/TestReportPDF';
import { fromPublicResults } from '@/lib/mmpi';
import TestResultEditModal from '@/components/test/TestResultEditModal';

export default function RaporDetayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [testSonucu, setTestSonucu] = useState<TestSonucu | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const { selectedDanisan } = useAppSelector((state) => state.danisanlar);

  useEffect(() => {
    if (id) {
      const sonucId = parseInt(id);
      testSonucuService.getir(sonucId).then((sonuc) => {
        if (sonuc) {
          setTestSonucu(sonuc);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Geçersiz tarih';
    }
    
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
      link.download = `test-raporu-${testSonucu.testAdi}-${formatDate(new Date()).replace(/[:/\s]/g, '-')}.pdf`;
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
        description: `PDF oluşturulurken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Rapor yükleniyor...</p>
      </div>
    );
  }

  if (!testSonucu) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground">Rapor bulunamadı</h2>
        <p className="text-muted-foreground mt-2">Bu test sonucu kaydı mevcut değil.</p>
        <Button 
          onClick={() => navigate('/danisanlar')} 
          variant="outline" 
          className="mt-4"
        >
          Danışanlar Listesine Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/danisanlar')}
          className="p-2"
        >
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground">Test Raporu</h1>
          <p className="text-muted-foreground">{testSonucu.testAdi}</p>
        </div>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2" onClick={downloadPDF}>
            <FiDownload className="h-4 w-4" />
            PDF İndir
          </Button>
          
          <TestResultEditModal
            testSonucu={testSonucu}
            open={showEditModal}
            onOpenChange={setShowEditModal}
            onSave={handleSaveEditedResult}
          />
          
          <Button variant="secondary" className="gap-2" onClick={() => setShowEditModal(true)}>
            <FiEdit className="h-4 w-4" />
            Düzenle
          </Button>
        </div>
      </div>

      {/* Test Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiClipboard className="text-primary" />
            Test Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Test Adı</p>
              <p className="text-foreground">{testSonucu.testAdi}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tamamlanma Tarihi</p>
              <p className="text-foreground">{formatDate(testSonucu.tamamlanmaTarihi)}</p>
            </div>
            
            {/* Sadece MMPI olmayan testler için toplam puan göster */}
            {!testSonucu.mmpiSonuclari && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Puan</p>
                <p className="text-2xl font-bold text-primary">{testSonucu.puan}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Sonucu Grafikleri */}
      <TestResultChart testSonucu={testSonucu} showOverallScore={false} />

      {/* MMPI Detaylı Skorlar */}
      {testSonucu.mmpiSonuclari && (() => {
        const mmpiResults = fromPublicResults(testSonucu.mmpiSonuclari);
        
        // Ölçek isimleri
        const validityScaleNames: Record<string, string> = {
          L: 'Yalan (L)',
          F: 'Sıklık (F)', 
          K: 'Düzeltme (K)'
        };
        
        const clinicalScaleNames: Record<string, string> = {
          Hs: 'Hipokondriazis',
          D: 'Depresyon',
          Hy: 'Histeri',
          Pd: 'Psikopatik Sapma',
          Mf: 'Maskülinite-Femininite',
          Pa: 'Paranoya',
          Pt: 'Psikasteni',
          Sc: 'Şizofreni',
          Ma: 'Hipomani',
          Si: 'Sosyal İçedönüklük'
        };
        
        return (
          <div className="space-y-6">
            {/* Geçerlik Ölçekleri */}
            <Card>
              <CardHeader>
                <CardTitle>Geçerlik Ölçekleri</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Testin geçerlik durumunu gösteren ölçekler
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(mmpiResults.validityScales).map(([scaleId, scale]) => (
                    <div key={scaleId} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 text-center">
                          {scaleId}
                        </Badge>
                        <span className="font-medium">{validityScaleNames[scaleId] || scaleId}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          Ham: {scale.rawScore}
                        </span>
                        <span className="font-bold text-lg">
                          T: {scale.tScore}
                        </span>
                        <Badge 
                          variant={scale.tScore >= 70 ? 'destructive' : 
                                  scale.tScore >= 65 ? 'secondary' : 'default'}
                        >
                          {scale.tScore >= 70 ? 'Klinik' : 
                           scale.tScore >= 65 ? 'Yükseltilmiş' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Klinik Ölçekler */}
            <Card>
              <CardHeader>
                <CardTitle>Klinik Ölçekler</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Kişilik ve psikolojik özellikleri gösteren ölçekler
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(mmpiResults.clinicalScales).map(([scaleId, scale]) => (
                    <div key={scaleId} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 text-center">
                          {scaleId}
                        </Badge>
                        <span className="font-medium">{clinicalScaleNames[scaleId] || scaleId}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          Ham: {scale.rawScore}
                        </span>
                        <span className="font-bold text-lg">
                          T: {scale.tScore}
                        </span>
                        <Badge 
                          variant={scale.tScore >= 70 ? 'destructive' : 
                                  scale.tScore >= 65 ? 'secondary' : 'default'}
                        >
                          {scale.tScore >= 70 ? 'Klinik' : 
                           scale.tScore >= 65 ? 'Yükseltilmiş' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })()}

      {/* Standart Sonuç Yorumu */}
      {!testSonucu.mmpiSonuclari && (
        <Card>
          <CardHeader>
            <CardTitle>Sonuç Değerlendirmesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-foreground text-lg leading-relaxed">
                {testSonucu.sonucYorumu}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cevap Detayları */}
      <Card>
        <CardHeader>
          <CardTitle>Cevap Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testSonucu.cevaplar.map((cevap, index) => (
               <div key={cevap.soruId} className="flex justify-between items-center p-3 border rounded-lg">
                <span className="text-sm text-muted-foreground">
                  Soru {parseInt(cevap.soruId)} ({index + 1})
                </span>
                <Badge variant={cevap.verilenPuan === -1 ? "destructive" : "secondary"}>
                  {cevap.verilenPuan === -1 ? "Boş" : `${cevap.verilenPuan} puan`}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
