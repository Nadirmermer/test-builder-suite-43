// Medeni durum kontrol ve yönlendirme komponenti

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TestTanimi, Danisan, MedeniDurum } from '@/types';
import { danisanService } from '@/lib/db';

interface MaritalStatusSelectionModalProps {
  test: TestTanimi;
  danisan: Danisan;
  onComplete: () => void;
}

const medeniDurumSeviyeleri: MedeniDurum[] = [
  'Bekar',
  'Evli',
  'Boşanmış',
  'Dul',
  'Ayrı yaşıyor'
];

export default function MaritalStatusSelectionModal({ test, danisan, onComplete }: MaritalStatusSelectionModalProps) {
  const navigate = useNavigate();
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<MedeniDurum | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selectedMaritalStatus) return;
    
    try {
      setLoading(true);
      await danisanService.guncelle(danisan.id!, { medeniDurum: selectedMaritalStatus });
      onComplete();
    } catch (error) {
      console.error('Medeni durum güncellenirken hata:', error);
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
              <FiHeart className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">Medeni Durum Bilgisi Gerekli</CardTitle>
                <p className="text-muted-foreground mt-1">
                  <strong>{test.testAdi}</strong> testi için medeni durum bilginiz gereklidir.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <FiAlertCircle className="h-4 w-4" />
              <AlertDescription>
                Bu test güvenilir sonuçlar için medeni durum bilgisini gerektirir. 
                Lütfen mevcut medeni durumunuzu seçin. Bu bilgi sadece test sonuçlarının 
                doğru yorumlanması için kullanılacaktır.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Label className="text-base font-medium">Medeni durumunuzu seçin:</Label>
              <RadioGroup
                value={selectedMaritalStatus}
                onValueChange={(value) => setSelectedMaritalStatus(value as MedeniDurum)}
                className="space-y-3"
              >
                {medeniDurumSeviyeleri.map((durum) => (
                  <div key={durum} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                    <RadioGroupItem value={durum} id={durum} />
                    <Label htmlFor={durum} className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2">
                        <FiHeart className="h-4 w-4" />
                        {durum}
                      </div>
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-smooth cursor-pointer">
                  <RadioGroupItem value="Belirtmek istemiyorum" id="belirtmek-istemiyorum" />
                  <Label htmlFor="belirtmek-istemiyorum" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <FiHeart className="h-4 w-4" />
                      Belirtmek istemiyorum
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                İptal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!selectedMaritalStatus || loading}
                className="flex-1"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet ve Teste Devam Et'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
