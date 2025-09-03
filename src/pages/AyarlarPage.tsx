// Sistem ayarları sayfası

import { useState, useRef, useEffect } from 'react';
import { FiSettings, FiDatabase, FiDownload, FiUpload, FiTrash2 } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { danisanlariYukle } from '@/store/slices/danisanSlice';
import { testleriYukle } from '@/store/slices/testSlice';
import { dataManager } from '@/lib/dataManager';
import { DataClearConfirmationDialog, ImportDataConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
export default function AyarlarPage() {
  const dispatch = useAppDispatch();
  const {
    toast
  } = useToast();
  const {
    items: danisanlar
  } = useAppSelector(state => state.danisanlar);
  const {
    mevcutTestler
  } = useAppSelector(state => state.testler);
  const [loading, setLoading] = useState({
    export: false,
    import: false,
    delete: false
  });
  const [confirmDialogs, setConfirmDialogs] = useState({
    clearData: false,
    importData: false
  });
  const [stats, setStats] = useState({
    danisanSayisi: 0,
    testSonucSayisi: 0
  });
  const importResolveRef = useRef<((value: boolean) => void) | null>(null);
  const clearResolveRef = useRef<((value: boolean) => void) | null>(null);
  const handleExportData = async () => {
    try {
      setLoading(prev => ({
        ...prev,
        export: true
      }));
      const jsonData = await dataManager.exportAllData();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `psiko-test-yedek-${timestamp}.json`;
      dataManager.downloadFile(jsonData, filename);
      toast({
        title: "Başarılı",
        description: "Veriler başarıyla dışa aktarıldı."
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Veriler dışa aktarılırken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({
        ...prev,
        export: false
      }));
    }
  };
  const handleImportData = async () => {
    try {
      setLoading(prev => ({
        ...prev,
        import: true
      }));
      const jsonData = await dataManager.uploadFile();
      await dataManager.importData(jsonData, async () => {
        return new Promise(resolve => {
          setConfirmDialogs(prev => ({
            ...prev,
            importData: true
          }));
          importResolveRef.current = resolve;
        });
      });

      // Verileri yeniden yükle
      await Promise.all([dispatch(danisanlariYukle()), dispatch(testleriYukle())]);

      // İstatistikleri güncelle
      const newStats = await dataManager.getStats();
      setStats(newStats);
      toast({
        title: "Başarılı",
        description: "Veriler başarıyla içe aktarıldı."
      });
    } catch (error) {
      if (error instanceof Error && error.message !== 'İptal edildi') {
        toast({
          title: "Hata",
          description: error.message,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(prev => ({
        ...prev,
        import: false
      }));
    }
  };
  const handleDeleteAllData = async () => {
    try {
      setLoading(prev => ({
        ...prev,
        delete: true
      }));
      await dataManager.clearAllData(async () => {
        return new Promise(resolve => {
          setConfirmDialogs(prev => ({
            ...prev,
            clearData: true
          }));
          clearResolveRef.current = resolve;
        });
      });

      // Verileri yeniden yükle
      await Promise.all([dispatch(danisanlariYukle()), dispatch(testleriYukle())]);

      // İstatistikleri güncelle
      const newStats = await dataManager.getStats();
      setStats(newStats);
      toast({
        title: "Başarılı",
        description: "Tüm veriler başarıyla silindi."
      });
    } catch (error) {
      if (error instanceof Error && error.message !== 'İptal edildi') {
        toast({
          title: "Hata",
          description: "Veriler silinirken bir hata oluştu.",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(prev => ({
        ...prev,
        delete: false
      }));
    }
  };

  // İstatistikleri yükle
  const loadStats = async () => {
    const newStats = await dataManager.getStats();
    setStats(newStats);
  };

  // Sayfa yüklendiğinde istatistikleri al
  useEffect(() => {
    loadStats();
  }, []);
  return <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FiSettings className="text-primary" />
          Sistem Ayarları
        </h1>
        <p className="text-muted-foreground mt-1">
          Uygulama yapılandırması ve veri yönetimi
        </p>
      </div>

      {/* Sistem Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiDatabase className="text-primary" />
            Sistem Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Uygulama Versiyonu</p>
              <p className="text-foreground">PsikoTest v1.0</p>
            </div>
            
            
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kayıtlı Danışan Sayısı</p>
              <Badge variant="secondary">{stats.danisanSayisi}</Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tamamlanan Test Sayısı</p>
              <Badge variant="secondary">{stats.testSonucSayisi}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Sistemdeki Test Sayısı</p>
              <Badge variant="secondary">{mevcutTestler.length}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Veri Yönetimi */}
      <Card>
        <CardHeader>
          <CardTitle>Veri Yönetimi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Verileri Dışa Aktar</h4>
                <p className="text-sm text-muted-foreground">
                  Tüm danışan ve test verilerini JSON formatında indir
                </p>
              </div>
              <Button variant="outline" onClick={handleExportData} disabled={loading.export} className="min-w-[140px]">
                {loading.export ? <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Dışa Aktarılıyor...
                  </> : <>
                    <FiDownload className="mr-2 h-4 w-4" />
                    Dışa Aktar
                  </>}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Verileri İçe Aktar</h4>
                <p className="text-sm text-muted-foreground">
                  Önceden dışa aktarılmış verileri sisteme yükle
                </p>
              </div>
              <Button variant="outline" onClick={handleImportData} disabled={loading.import} className="min-w-[140px]">
                {loading.import ? <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    İçe Aktarılıyor...
                  </> : <>
                    <FiUpload className="mr-2 h-4 w-4" />
                    İçe Aktar
                  </>}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
              <div>
                <h4 className="font-medium text-destructive">Tüm Verileri Sil</h4>
                <p className="text-sm text-muted-foreground">
                  Dikkat: Bu işlem geri alınamaz!
                </p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAllData} disabled={loading.delete} className="min-w-[140px]">
                {loading.delete ? <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Siliniyor...
                  </> : <>
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    Verileri Sil
                  </>}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geliştirici Bilgileri */}
      <Card className="shadow-card border-gradient-medical">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-medical overflow-hidden">
              <img 
                src="/logo.png" 
                alt="PsikoTest Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            Geliştirici Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">💖</span>
              <span className="text-lg text-muted-foreground">Aşk ile yapıldı</span>
              <span className="text-2xl">💖</span>
            </div>
            <p className="text-sm text-muted-foreground">Bu uygulama özenle ve tutkuyla geliştirilmiştir</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center text-white font-bold">
                NM
              </div>
              <div>
                <h3 className="font-semibold">
                  <span className="bg-gradient-medical bg-clip-text text-transparent">
                    Nadir MERMER
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">Yazılım Geliştirici & Psikolog</p>
              </div>
            </div>
            
            <div className="grid gap-3">
              <a 
                href="https://instagram.com/nadir.mermer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-pink-600 transition-colors">Instagram</p>
                  <p className="text-sm text-muted-foreground">@nadir.mermer</p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <a 
                href="mailto:1nadirmermer@gmail.com" 
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-blue-600 transition-colors">E-posta</p>
                  <p className="text-sm text-muted-foreground">1nadirmermer@gmail.com</p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Yönetimi */}
      

      {/* Confirmation Dialogs */}
      <DataClearConfirmationDialog open={confirmDialogs.clearData} onOpenChange={open => {
      setConfirmDialogs(prev => ({
        ...prev,
        clearData: open
      }));
      if (!open && clearResolveRef.current) {
        clearResolveRef.current(false);
        clearResolveRef.current = null;
      }
    }} onConfirm={() => {
      setConfirmDialogs(prev => ({
        ...prev,
        clearData: false
      }));
      if (clearResolveRef.current) {
        clearResolveRef.current(true);
        clearResolveRef.current = null;
      }
    }} />

      <ImportDataConfirmationDialog open={confirmDialogs.importData} onOpenChange={open => {
      setConfirmDialogs(prev => ({
        ...prev,
        importData: open
      }));
      if (!open && importResolveRef.current) {
        importResolveRef.current(false);
        importResolveRef.current = null;
      }
    }} onConfirm={() => {
      setConfirmDialogs(prev => ({
        ...prev,
        importData: false
      }));
      if (importResolveRef.current) {
        importResolveRef.current(true);
        importResolveRef.current = null;
      }
    }} />
    </div>;
}