// Tüm demografik bilgileri tek modal'da toplayan birleşik component

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBook, FiHeart, FiCalendar, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { TestTanimi, Danisan, EgitimDurumu, MedeniDurum } from '@/types';
import { danisanService } from '@/lib/db';
import { isCinsiyetGerekli, isEgitimDurumuGerekli, isMedeniDurumGerekli, isYasGerekli } from '@/utils/testUtils';

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
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleBack} size="sm">
                <FiArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">Eksik Demografik Bilgiler</CardTitle>
                <p className="text-muted-foreground">
                  {test.testAdi} testi için {missingCount} bilgi eksik
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <FiAlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>{test.testAdi}</strong> testini uygulayabilmek için aşağıdaki bilgiler gereklidir. 
                Bu bilgiler test sonuçlarının doğru yorumlanması için önemlidir.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {/* Cinsiyet Seçimi */}
              {missingInfo.cinsiyet && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiUser className="h-4 w-4 text-primary" />
                    <Label className="text-base font-medium">Cinsiyet *</Label>
                  </div>
                  <RadioGroup
                    value={selectedGender}
                    onValueChange={(value) => setSelectedGender(value as 'Erkek' | 'Kadin')}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                      <RadioGroupItem value="Kadin" id="kadin" />
                      <Label htmlFor="kadin" className="cursor-pointer flex-1">
                        Kadın
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                      <RadioGroupItem value="Erkek" id="erkek" />
                      <Label htmlFor="erkek" className="cursor-pointer flex-1">
                        Erkek
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Eğitim Durumu Seçimi */}
              {missingInfo.egitimDurumu && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiBook className="h-4 w-4 text-primary" />
                    <Label className="text-base font-medium">Eğitim Durumu *</Label>
                  </div>
                  <RadioGroup 
                    value={selectedEducation} 
                    onValueChange={(value) => setSelectedEducation(value as EgitimDurumu)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {egitimSeviyeleri.map((seviye) => (
                      <div key={seviye} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                        <RadioGroupItem value={seviye} id={`egitim-${seviye}`} />
                        <Label 
                          htmlFor={`egitim-${seviye}`}
                          className="cursor-pointer flex-1 font-normal"
                        >
                          {seviye}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Medeni Durum Seçimi */}
              {missingInfo.medeniDurum && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiHeart className="h-4 w-4 text-primary" />
                    <Label className="text-base font-medium">Medeni Durum *</Label>
                  </div>
                  <RadioGroup
                    value={selectedMaritalStatus}
                    onValueChange={(value) => setSelectedMaritalStatus(value as MedeniDurum)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {medeniDurumSeviyeleri.map((durum) => (
                      <div key={durum} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                        <RadioGroupItem value={durum} id={`medeni-${durum}`} />
                        <Label htmlFor={`medeni-${durum}`} className="cursor-pointer flex-1 font-normal">
                          {durum}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Doğum Tarihi */}
              {missingInfo.dogumTarihi && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4 text-primary" />
                    <Label className="text-base font-medium">Doğum Tarihi *</Label>
                  </div>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="max-w-sm"
                    max={new Date().toISOString().split('T')[0]} // Bugünden sonraki tarih seçilemez
                  />
                  {birthDate && (
                    <p className="text-sm text-muted-foreground">
                      Yaş: {Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                İptal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!isFormValid() || loading}
                className="flex-1"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet ve Teste Başla'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bilgi kartı */}
        {missingCount > 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <h4 className="font-medium text-foreground">Neden Bu Bilgiler Gerekli?</h4>
                <ul className="space-y-2 pl-4">
                  {missingInfo.cinsiyet && <li>• <strong>Cinsiyet:</strong> Test formu ve norm tabloları cinsiyete göre değişir</li>}
                  {missingInfo.egitimDurumu && <li>• <strong>Eğitim Durumu:</strong> Test normları eğitim seviyesine göre hesaplanır</li>}
                  {missingInfo.medeniDurum && <li>• <strong>Medeni Durum:</strong> Klinik yorumlama için gerekli demografik bilgi</li>}
                  {missingInfo.dogumTarihi && <li>• <strong>Yaş:</strong> Yaş gruplarına göre farklı norm tabloları kullanılır</li>}
                  <li>• Bu bilgiler sadece test raporunda kullanılır ve güvenle saklanır</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}