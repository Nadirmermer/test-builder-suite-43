import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestSonucu } from '@/types';

interface MMSEChartProps {
  testSonucu: TestSonucu;
}

export default function MMSEChart({ testSonucu }: MMSEChartProps) {
  if (!testSonucu.altOlcekPuanlari) {
    return null;
  }

  // Alt ölçek verilerini grafik için hazırla
  const chartData = Object.entries(testSonucu.altOlcekPuanlari).map(([key, data]) => {
    // Maksimum puanları belirle
    const maksimumPuanlar: Record<string, number> = {
      'yonelim': 10,
      'kayit': 3,
      'dikkat': 5,
      'hatirlama': 3,
      'lisan': 9
    };

    const maksimum = maksimumPuanlar[key] || 10;
    const yuzde = (data.toplamPuan / maksimum) * 100;

    return {
      name: data.ad,
      puan: data.toplamPuan,
      maksimum: maksimum,
      yuzde: Math.round(yuzde),
      ortalama: Math.round(data.ortalamaPuan * 100)
    };
  });

  // Toplam puan için renk belirleme
  const getScoreColor = (puan: number) => {
    if (puan >= 24) return '#22c55e'; // yeşil
    if (puan >= 21) return '#eab308'; // sarı
    if (puan >= 10) return '#f97316'; // turuncu
    return '#ef4444'; // kırmızı
  };

  const totalScoreColor = getScoreColor(testSonucu.puan);

  return (
    <div className="space-y-6">
      {/* Toplam Puan */}
      <Card>
        <CardHeader>
          <CardTitle>MMSE Toplam Puanı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div 
                className="text-6xl font-bold mb-2"
                style={{ color: totalScoreColor }}
              >
                {testSonucu.puan}
              </div>
              <div className="text-2xl text-muted-foreground mb-2">/ 30</div>
              <div className="text-lg font-medium">
                {testSonucu.puan >= 24 ? 'Normal' : 
                 testSonucu.puan >= 21 ? 'Hafif BB' :
                 testSonucu.puan >= 10 ? 'Orta BB' : 'Ağır BB'}
              </div>
            </div>
          </div>
          
          {/* Referans çizgileri */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Normal (24-30)</span>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-muted-foreground">Bilişsel işlev normal</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Hafif BB (21-23)</span>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-muted-foreground">İleri değerlendirme önerilir</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Orta BB (10-20)</span>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span className="text-muted-foreground">Detaylı değerlendirme gerekli</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Ağır BB (0-9)</span>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-muted-foreground">Acil tıbbi değerlendirme</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alt Ölçek Grafikleri */}
      <Card>
        <CardHeader>
          <CardTitle>Alt Ölçek Puanları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'puan') return [`${value} puan`, 'Alınan Puan'];
                    if (name === 'maksimum') return [`${value} puan`, 'Maksimum Puan'];
                    return [value, name];
                  }}
                />
                <Bar 
                  dataKey="puan" 
                  fill="#3b82f6" 
                  name="Alınan Puan"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="maksimum" 
                  fill="#e5e7eb" 
                  name="Maksimum Puan"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Alt Ölçek Detayları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartData.map((data, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{data.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Puan:</span>
                  <span className="font-medium">{data.puan} / {data.maksimum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Başarı:</span>
                  <span className="font-medium">%{data.yuzde}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${data.yuzde}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}