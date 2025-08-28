// Eğitim durumu kontrol ve yönlendirme komponenti

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiAlertCircle, FiArrowLeft, FiBook } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TestTanimi, Danisan, EgitimDurumu } from '@/types';
import { danisanService } from '@/lib/db';

interface EducationSelectionModalProps {
  test: TestTanimi;
  danisan: Danisan;
  onComplete: () => void;
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

export default function EducationSelectionModal({ test, danisan, onComplete }: EducationSelectionModalProps) {
  const navigate = useNavigate();
  const [selectedEducation, setSelectedEducation] = useState<EgitimDurumu | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selectedEducation) return;
    
    try {
      setLoading(true);
      await danisanService.guncelle(danisan.id!, { egitimDurumu: selectedEducation });
      onComplete();
    } catch (error) {
      console.error('Eğitim durumu güncellenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/danisan/${danisan.id}`);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleBack} size="sm">
                <FiArrowLeft className="h-4 w-4" />
              </Button>
              <FiBook className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Eğitim Durumu Seçimi</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {test.testAdi} testi için gerekli
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert>
              <FiAlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>{danisan.adSoyad}</strong> isimli danışan için <strong>{test.testAdi}</strong> testini 
                uygulayabilmek için eğitim durumu bilgisi gereklidir. Bu bilgi test sonuçlarının 
                doğru yorumlanması için önemlidir.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Label className="text-base font-medium">Eğitim Durumu:</Label>
              <RadioGroup 
                value={selectedEducation} 
                onValueChange={(value) => setSelectedEducation(value as EgitimDurumu)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {egitimSeviyeleri.map((seviye) => (
                  <div key={seviye} className="flex items-center space-x-2">
                    <RadioGroupItem value={seviye} id={seviye} />
                    <Label 
                      htmlFor={seviye}
                      className="font-normal cursor-pointer"
                    >
                      {seviye}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex-1"
              >
                İptal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!selectedEducation || loading}
                className="flex-1"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet ve Devam Et'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <h4 className="font-medium text-foreground">Eğitim Durumu Neden Gerekli?</h4>
              <ul className="space-y-2 pl-4">
                <li>• Test normları eğitim seviyesine göre değişiklik gösterir</li>
                <li>• Sonuçların doğru yorumlanması için kritiktir</li>
                <li>• Klinik değerlendirmede önemli bir faktördür</li>
                <li>• Bu bilgi sadece test raporunda kullanılır</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
