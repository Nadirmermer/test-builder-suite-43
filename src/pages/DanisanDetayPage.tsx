import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiClipboard, FiCalendar, FiTrash2, FiStar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TestApplicationModal from '@/components/test/TestApplicationModal';
import TestInfoModal from '@/components/test/TestInfoModal';
import TestSearch from '@/components/test/TestSearch';
import StandardTestInterface from '@/components/test/StandardTestInterface';
import UniversalFastTestInterface from '@/components/test/UniversalFastTestInterface';
import DanisanGuncelleModal from '@/components/danisan/DanisanGuncelleModal';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { danisanGetir, danisanSil } from '@/store/slices/danisanSlice';
import { danisanTestSonuclari, testSonucuSil } from '@/store/slices/testSlice';
import { toggleFavoriteTest } from '@/store/slices/uiSlice';
import { toast } from 'sonner';
import { TestTanimi } from '@/types';
import { extractDanisanIdFromUrl } from '@/utils/urlUtils';

export default function DanisanDetayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // URL'den ID extract et
  const danisanId = id ? extractDanisanIdFromUrl(id) : null;
  
  const { selectedDanisan } = useAppSelector((state) => state.danisanlar);
  const { mevcutTestler, testSonuclari } = useAppSelector((state) => state.testler);
  const { favoriteTests } = useAppSelector((state) => state.ui);
  const [loading, setLoading] = useState(true);
  const [filteredTests, setFilteredTests] = useState<TestTanimi[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestTanimi | null>(null);
  const [testInfoModalOpen, setTestInfoModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testMode, setTestMode] = useState<'standard' | 'fast' | null>(null);
  const [showTestInterface, setShowTestInterface] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (danisanId) {
      Promise.all([
        dispatch(danisanGetir(danisanId)),
        dispatch(danisanTestSonuclari(danisanId))
      ]).finally(() => setLoading(false));
    } else {
      // Geçersiz URL ise ana sayfaya yönlendir
      navigate('/danisanlar');
    }
  }, [danisanId, dispatch, navigate]);

  useEffect(() => {
    // Testleri sırala: favoriler önce, sonra alfabetik
    const sortedTests = [...mevcutTestler].sort((a, b) => {
      const aIsFavorite = favoriteTests.includes(a.id);
      const bIsFavorite = favoriteTests.includes(b.id);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      
      return a.testAdi.localeCompare(b.testAdi, 'tr-TR');
    });
    
    setFilteredTests(sortedTests);
  }, [mevcutTestler, favoriteTests]);

  const handleTestSelect = (test: TestTanimi) => {
    setSelectedTest(test);
    setTestInfoModalOpen(true);
  };

  const handleTestInfoContinue = () => {
    setTestModalOpen(true);
  };

  const handleMethodSelect = (method: 'standard' | 'fast' | 'bulk') => {
    // Test interface sayfasına yönlendir
    navigate(`/test-interface/${method}/${selectedTest?.id}/${danisanId}`);
  };

  const handleTestComplete = () => {
    setShowTestInterface(false);
    setTestMode(null);
    setSelectedTest(null);
    // Test sonuçlarını yeniden yükle
    if (danisanId) {
      dispatch(danisanTestSonuclari(danisanId));
    }
  };

  const handleDeleteDanisan = async () => {
    if (danisanId && window.confirm(`${selectedDanisan?.adSoyad} adlı danışanı ve tüm test sonuçlarını silmek istediğinizden emin misiniz?`)) {
      try {
        await dispatch(danisanSil(danisanId)).unwrap();
        toast.success('Danışan başarıyla silindi');
        navigate('/');
      } catch (error) {
        toast.error('Danışan silinirken hata oluştu');
      }
    }
  };

  const handleDeleteTestResult = async (testResultId: number) => {
    if (window.confirm('Bu test sonucunu silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(testSonucuSil(testResultId)).unwrap();
        toast.success('Test sonucu başarıyla silindi');
        // Refresh test results
        if (danisanId) {
          dispatch(danisanTestSonuclari(danisanId));
        }
      } catch (error) {
        toast.error('Test sonucu silinirken hata oluştu');
      }
    }
  };

  const handleToggleFavorite = (testId: string) => {
    dispatch(toggleFavoriteTest(testId));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Danışan bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (!selectedDanisan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground">Danışan bulunamadı</h2>
        <p className="text-muted-foreground mt-2">Bu danışan kaydı mevcut değil.</p>
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mt-4"
        >
          Danışanlar Listesine Dön
        </Button>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Geçersiz tarih';
    }
    
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="p-2"
        >
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-medical flex items-center justify-center text-white font-bold text-xl shadow-medical">
            {getInitials(selectedDanisan.adSoyad)}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{selectedDanisan.adSoyad}</h1>
            <p className="text-muted-foreground">
              Kayıt Tarihi: {formatDate(selectedDanisan.eklenmeTarihi)}
            </p>
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteDanisan}
            className="ml-4"
          >
            <FiTrash2 className="mr-2 h-4 w-4" />
            Danışanı Sil
          </Button>
        </div>
      </div>

      {/* Danışan Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiUser className="text-primary" />
            Kişisel Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {selectedDanisan.tcKimlikNo && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">T.C. Kimlik No</p>
                <p className="text-foreground">{selectedDanisan.tcKimlikNo}</p>
              </div>
            )}
            
            {selectedDanisan.dogumTarihi && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Doğum Tarihi</p>
                <p className="text-foreground">{selectedDanisan.dogumTarihi}</p>
              </div>
            )}
            
            {selectedDanisan.cinsiyet && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cinsiyet</p>
                <Badge variant="secondary">{selectedDanisan.cinsiyet}</Badge>
              </div>
            )}
            
            {selectedDanisan.telefon && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Telefon</p>
                <p className="text-foreground">{selectedDanisan.telefon}</p>
              </div>
            )}
            
            {selectedDanisan.adres && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Adres</p>
                <p className="text-foreground">{selectedDanisan.adres}</p>
              </div>
            )}
            
            {selectedDanisan.notlar && (
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-muted-foreground">Notlar</p>
                <p className="text-foreground">{selectedDanisan.notlar}</p>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            className="ml-4 shrink-0"
            onClick={() => setEditModalOpen(true)}
          >
            Bilgileri Güncelle
          </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testler ve Sonuçlar */}
      <Tabs defaultValue="testler" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="testler">Uygulanabilecek Testler</TabsTrigger>
          <TabsTrigger value="sonuclar">
            Geçmiş Sonuçlar ({testSonuclari.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="testler" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiClipboard className="text-primary" />
                Test Arşivi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Test Arama ve Filtreleme */}
              <TestSearch 
                tests={mevcutTestler} 
                onFilteredTests={setFilteredTests}
              />

              {/* Test Listesi */}
              {filteredTests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {mevcutTestler.length === 0 
                    ? "Henüz test tanımı yüklenmedi."
                    : "Arama kriterlerinize uygun test bulunamadı."
                  }
                </p>
              ) : (
                <div className="grid gap-4">
                  {filteredTests.map((test) => (
                    <div key={test.id} className="border rounded-lg p-4 hover:bg-secondary/50 transition-smooth">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{test.testAdi}</h4>
                            {favoriteTests.includes(test.id) && (
                              <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            {test.kategori && (
                              <Badge variant="outline" className="text-xs">
                                {test.kategori}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{test.kisaAciklama}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{test.sorular.length} soru</span>
                            {test.sureDakika && <span>~{test.sureDakika} dakika</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleToggleFavorite(test.id)}
                            className="p-2"
                          >
                            <FiStar className={`h-4 w-4 ${favoriteTests.includes(test.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTestSelect(test)}
                          >
                            Testi Uygula
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sonuclar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiCalendar className="text-primary" />
                Test Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testSonuclari.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Henüz tamamlanmış test bulunmuyor.
                </p>
              ) : (
                <div className="space-y-3">
                  {testSonuclari.map((sonuc) => (
                    <div key={sonuc.id} className="border rounded-lg p-4 hover:bg-secondary/50 transition-smooth">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{sonuc.testAdi}</h4>
                          <p className="text-sm text-muted-foreground">
                            Tarih: {formatDate(sonuc.tamamlanmaTarihi)}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">Puan:</span> {sonuc.puan} - {sonuc.sonucYorumu}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/rapor/${sonuc.id}`)}
                          >
                            Raporu Görüntüle
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTestResult(sonuc.id!)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Bilgilendirme Modalı */}
      {selectedTest && (
        <TestInfoModal
          open={testInfoModalOpen}
          onOpenChange={setTestInfoModalOpen}
          test={selectedTest}
          onContinue={handleTestInfoContinue}
        />
      )}

      {/* Test Uygulama Modalı */}
      {selectedTest && (
        <TestApplicationModal
          open={testModalOpen}
          onOpenChange={setTestModalOpen}
          test={selectedTest}
          danisanId={danisanId!}
          onMethodSelect={handleMethodSelect}
        />
      )}

      {/* Danışan Güncelleme Modalı */}
      {selectedDanisan && (
        <DanisanGuncelleModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          danisan={selectedDanisan}
        />
      )}
    </div>
  );
}
