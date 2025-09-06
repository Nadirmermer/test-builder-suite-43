import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';

interface ArizonaResultProps {
  testSonucu: any;
  danisan?: any;
}

const getSeviyeRengi = (seviye: string) => {
  switch (seviye) {
    case 'minimal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'hafif': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'orta': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'siddetli': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

const getSeviyeAdi = (seviye: string) => {
  switch (seviye) {
    case 'minimal': return 'Minimal / Normal';
    case 'hafif': return 'Hafif Düzeyde';
    case 'orta': return 'Orta Düzeyde';
    case 'siddetli': return 'Şiddetli';
    default: return 'Belirsiz';
  }
};

export const ArizonaResult: React.FC<ArizonaResultProps> = ({ testSonucu, danisan }) => {
  // Sonuç yorumunu belirle
  const puan = testSonucu.puan || 0;
  let sonucYorumu = "Sonuç yorumu bulunamadı";
  let seviye = "belirsiz";

  // Puan aralığına göre sonucu belirle
  if (puan >= 5 && puan <= 11) {
    sonucYorumu = "Cinsel yaşantınızda belirgin bir sorun görünmüyor. Sağlıklı bir cinsel işlevselliğiniz var gibi görünüyor.";
    seviye = "minimal";
  } else if (puan >= 12 && puan <= 30) {
    sonucYorumu = "Cinsel yaşantınızda sorunlar olabilir. Türkçe versiyonunda kesme puanı 11 olarak belirlenmiştir. Bu puanın üzerindeki değerler cinsel işlev bozukluğuna işaret edebilir. Bir uzmana danışmayı düşünebilirsiniz.";
    seviye = "siddetli";
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-background">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Arizona Cinsel Yaşantılar Ölçeği Sonuçları</h2>
        <p className="text-muted-foreground text-lg">
          Cinsel işlevsellik değerlendirmesi
          {danisan?.cinsiyet && (
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
              {danisan.cinsiyet === 'Kadin' ? '👩 Kadın Formu' : '👨 Erkek Formu'}
            </span>
          )}
        </p>
      </div>

      {/* Ana Sonuç Kartı */}
      <Card className="border border-border bg-card shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-foreground">Test Sonucu</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Puan Gösterimi */}
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{puan}</div>
              <div className="text-sm text-muted-foreground font-medium">Toplam Puan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-muted-foreground mb-2">/</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-muted-foreground mb-2">30</div>
              <div className="text-sm text-muted-foreground font-medium">Maksimum Puan</div>
            </div>
          </div>

          {/* Seviye Badge */}
          <div className="flex justify-center">
            <Badge className={`px-6 py-2 text-base font-semibold ${getSeviyeRengi(seviye)}`}>
              {getSeviyeAdi(seviye)}
            </Badge>
          </div>

          {/* Sonuç Yorumu */}
          <Alert className="max-w-4xl mx-auto">
            <AlertDescription className="text-base leading-relaxed text-center">
              {sonucYorumu}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Puan Aralıkları Bilgi Kartı */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">📊 Puan Değerlendirme Tablosu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="font-semibold text-green-800 dark:text-green-200 mb-2">5-11 Puan</div>
              <div className="text-sm text-green-700 dark:text-green-300">Normal / Sağlıklı Cinsel İşlev</div>
            </div>
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="font-semibold text-red-800 dark:text-red-200 mb-2">12-30 Puan</div>
              <div className="text-sm text-red-700 dark:text-red-300">Cinsel İşlev Bozukluğu Riski</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              <strong>Not:</strong> Türkçe versiyonunda kesme puanı 11 olarak belirlenmiştir.
            </p>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
};
