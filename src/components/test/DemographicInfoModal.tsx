// Modern ve responsive demografik bilgi toplama modal'ı

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiBook, 
  FiHeart, 
  FiCalendar, 
  FiInfo, 
  FiArrowLeft, 
  FiCheckCircle,
  FiLock
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TestTanimi, Danisan, EgitimDurumu, MedeniDurum } from '@/types';
import { danisanService } from '@/lib/db';
import { isCinsiyetGerekli, isEgitimDurumuGerekli, isMedeniDurumGerekli, isYasGerekli } from '@/utils/testUtils';
import { cn } from '@/lib/utils';

interface DemographicInfoModalProps {
  test: TestTanimi;
  danisan: Danisan;
  onComplete: () => void;
}

interface MissingInfo {
  cinsiyet: boolean;
  egitimDurumu: boolean;
  medeniDurum: boolean;
  dogumTarihi: boolean;
}

const egitimSeviyeleri: EgitimDurumu[] = [
  'Okuma yazma yok',
  'İlkokul',
  'Ortaokul', 
  'Lise',
  'Önlisans',
  'Lisans',
  'Yüksek lisans',
  'Doktora'
];

const medeniDurumSeviyeleri: MedeniDurum[] = [
  'Bekar',
  'Evli',
  'Boşanmış',
  'Dul',
  'Ayrı yaşıyor'
];

export default function DemographicInfoModal({ test, danisan, onComplete }: DemographicInfoModalProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Eksik bilgileri tespit et
  const missingInfo: MissingInfo = {
    cinsiyet: isCinsiyetGerekli(test, danisan),
    egitimDurumu: isEgitimDurumuGerekli(test, danisan),
    medeniDurum: isMedeniDurumGerekli(test, danisan),
    dogumTarihi: isYasGerekli(test, danisan)
  };

  // Form state'leri
  const [selectedGender, setSelectedGender] = useState<'Erkek' | 'Kadin' | ''>('');
  const [selectedEducation, setSelectedEducation] = useState<EgitimDurumu | ''>('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<MedeniDurum | ''>('');
  const [birthDate, setBirthDate] = useState('');

  // Kaç adet eksik bilgi var?
  const missingCount = Object.values(missingInfo).filter(Boolean).length;

  // Form validasyonu
  const isFormValid = () => {
    if (missingInfo.cinsiyet && !selectedGender) return false;
    if (missingInfo.egitimDurumu && !selectedEducation) return false;
    if (missingInfo.medeniDurum && !selectedMaritalStatus) return false;
    if (missingInfo.dogumTarihi && !birthDate) return false;
    return true;
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    
    try {
      setLoading(true);
      
      // Güncelleme nesnesini oluştur
      const updateData: Partial<Danisan> = {};
      
      if (missingInfo.cinsiyet && selectedGender) {
        updateData.cinsiyet = selectedGender;
      }
      
      if (missingInfo.egitimDurumu && selectedEducation) {
        updateData.egitimDurumu = selectedEducation;
      }
      
      if (missingInfo.medeniDurum && selectedMaritalStatus) {
        updateData.medeniDurum = selectedMaritalStatus;
      }
      
      if (missingInfo.dogumTarihi && birthDate) {
        updateData.dogumTarihi = birthDate;
      }

      // Danışan bilgilerini güncelle
      await danisanService.guncelle(danisan.id!, updateData);
      onComplete();
    } catch (error) {
      console.error('Demografik bilgiler güncellenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/danisan/${danisan.id}`);
  };

  // Eğer eksik bilgi yoksa, direkt teste geç
  if (missingCount === 0) {
    onComplete();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 flex items-center justify-center">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="relative max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white shadow-lg">
              <FiUser className="h-6 w-6" />
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
            <Badge variant="secondary" className="px-3 py-1">
              {missingCount} bilgi eksik
            </Badge>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
            Demografik Bilgiler
          </h1>
          <p className="text-muted-foreground text-lg">
            <span className="font-medium text-primary">{test.testAdi}</span> testi için gerekli bilgileri tamamlayın
          </p>
        </div>

        {/* Main Form Card */}
        <div className="backdrop-blur-sm bg-card/90 border shadow-2xl rounded-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-secondary">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
              style={{ width: `${((4 - missingCount) / 4) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <FiArrowLeft className="h-4 w-4 mr-2" />
                Geri Dön
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FiLock className="h-4 w-4" />
                <span>Güvenli ve gizli</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-8">
            {/* Cinsiyet Seçimi */}
            {missingInfo.cinsiyet && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Cinsiyet</Label>
                    <p className="text-sm text-muted-foreground">Test formu cinsiyete göre değişir</p>
                  </div>
                </div>
                <RadioGroup
                  value={selectedGender}
                  onValueChange={(value) => setSelectedGender(value as 'Erkek' | 'Kadin')}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    "hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]",
                    selectedGender === 'Kadin' ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
                  )}>
                    <div className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="Kadin" id="kadin" className="text-primary" />
                      <Label htmlFor="kadin" className="cursor-pointer flex-1 font-medium text-base">
                        👩 Kadın
                      </Label>
                      {selectedGender === 'Kadin' && (
                        <FiCheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                  <div className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    "hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]",
                    selectedGender === 'Erkek' ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
                  )}>
                    <div className="p-4 flex items-center space-x-3">
                      <RadioGroupItem value="Erkek" id="erkek" className="text-primary" />
                      <Label htmlFor="erkek" className="cursor-pointer flex-1 font-medium text-base">
                        👨 Erkek
                      </Label>
                      {selectedGender === 'Erkek' && (
                        <FiCheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Eğitim Durumu Seçimi */}
            {missingInfo.egitimDurumu && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                    <FiBook className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Eğitim Durumu</Label>
                    <p className="text-sm text-muted-foreground">Test normları eğitim seviyesine göre değişir</p>
                  </div>
                </div>
                <RadioGroup 
                  value={selectedEducation} 
                  onValueChange={(value) => setSelectedEducation(value as EgitimDurumu)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {egitimSeviyeleri.map((seviye) => (
                    <div 
                      key={seviye} 
                      className={cn(
                        "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                        "hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]",
                        selectedEducation === seviye ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
                      )}
                    >
                      <div className="p-3 flex items-center space-x-3">
                        <RadioGroupItem value={seviye} id={`egitim-${seviye}`} className="text-primary" />
                        <Label 
                          htmlFor={`egitim-${seviye}`}
                          className="cursor-pointer flex-1 font-medium text-sm"
                        >
                          {seviye}
                        </Label>
                        {selectedEducation === seviye && (
                          <FiCheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Medeni Durum Seçimi */}
            {missingInfo.medeniDurum && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white shadow-md">
                    <FiHeart className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Medeni Durum</Label>
                    <p className="text-sm text-muted-foreground">Klinik yorumlama için gerekli</p>
                  </div>
                </div>
                <RadioGroup
                  value={selectedMaritalStatus}
                  onValueChange={(value) => setSelectedMaritalStatus(value as MedeniDurum)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {medeniDurumSeviyeleri.map((durum) => (
                    <div 
                      key={durum} 
                      className={cn(
                        "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                        "hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]",
                        selectedMaritalStatus === durum ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
                      )}
                    >
                      <div className="p-3 flex items-center space-x-3">
                        <RadioGroupItem value={durum} id={`medeni-${durum}`} className="text-primary" />
                        <Label htmlFor={`medeni-${durum}`} className="cursor-pointer flex-1 font-medium text-sm">
                          {durum}
                        </Label>
                        {selectedMaritalStatus === durum && (
                          <FiCheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Doğum Tarihi */}
            {missingInfo.dogumTarihi && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white shadow-md">
                    <FiCalendar className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Doğum Tarihi</Label>
                    <p className="text-sm text-muted-foreground">Yaş gruplarına göre norm tabloları kullanılır</p>
                  </div>
                </div>
                <div className="max-w-sm space-y-3">
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {birthDate && (
                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <FiInfo className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium text-primary">
                        Hesaplanan Yaş: {Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} yıl
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t bg-secondary/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="sm:flex-1 h-12 rounded-xl text-base font-medium"
              >
                <FiArrowLeft className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!isFormValid() || loading}
                className={cn(
                  "sm:flex-1 h-12 rounded-xl text-base font-medium transition-all duration-300",
                  "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                  "shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
                  (!isFormValid() || loading) && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="h-4 w-4 mr-2" />
                    Kaydet ve Teste Başla
                  </>
                )}
              </Button>
            </div>
            
            {/* Form Validation Hint */}
            {!isFormValid() && (
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm">
                  <FiInfo className="h-4 w-4" />
                  <span>Lütfen tüm gerekli alanları doldurun</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 backdrop-blur-sm bg-card/60 border rounded-2xl p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <FiLock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Güvenlik ve Gizlilik</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
              {missingInfo.cinsiyet && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Test formu cinsiyete göre uyarlanır</span>
                </div>
              )}
              {missingInfo.egitimDurumu && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Norm tabloları eğitim seviyesine göre</span>
                </div>
              )}
              {missingInfo.medeniDurum && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full" />
                  <span>Klinik yorumlama için gerekli</span>
                </div>
              )}
              {missingInfo.dogumTarihi && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>Yaş gruplarına göre değerlendirme</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground border-t pt-4">
              Tüm bilgiler AES-256 şifreleme ile korunur ve sadece test raporunda kullanılır
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}