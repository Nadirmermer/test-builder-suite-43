// MMPI Profil Grafiği - Türk Normlarına Uygun
// Geçerlik ve klinik ölçekleri ayrı çizgilerle gösterir

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TestSonucu } from '@/types';

interface MMPIProfileChartProps {
  testSonucu: TestSonucu;
}

interface ChartDataPoint {
  name: string;
  fullName: string;
  tSkoru: number;
  kategori: 'geçerlik' | 'klinik' | 'separator';
  separatorIndex?: number;
  hammaddePuan?: number;
  durum?: string;
  seviye?: string;
}

export default function MMPIProfileChart({
  testSonucu
}: MMPIProfileChartProps) {
  if (!testSonucu.mmpiSonuclari) {
    return null;
  }

  const {
    gecerlikOlcekleri,
    klinikOlcekler
  } = testSonucu.mmpiSonuclari;

  // ? Testi hesaplama (cevaplanmayan soru sayısı)
  const unansweredCount = testSonucu.cevaplar?.filter(c => c.verilenPuan === -1).length || 0;
  const questionMarkTScore = Math.min(30 + unansweredCount * 2, 120); // Basit hesaplama

  // MMPI profil verisi - doğru sırayla
  const chartData: ChartDataPoint[] = [
    // Geçerlik ölçekleri (Sol taraf)
    {
      name: '?',
      fullName: 'Cevaplanmayan',
      tSkoru: questionMarkTScore,
      kategori: 'geçerlik',
      hammaddePuan: unansweredCount
    },
    {
      name: 'L',
      fullName: 'Yalan',
      tSkoru: gecerlikOlcekleri.L?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.L?.hammaddePuan,
      durum: gecerlikOlcekleri.L?.durum
    },
    {
      name: 'F',
      fullName: 'Sıklık',
      tSkoru: gecerlikOlcekleri.F?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.F?.hammaddePuan,
      durum: gecerlikOlcekleri.F?.durum
    },
    {
      name: 'K',
      fullName: 'Düzeltme',
      tSkoru: gecerlikOlcekleri.K?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.K?.hammaddePuan,
      durum: gecerlikOlcekleri.K?.durum
    },
    // Ayırıcı nokta (dikey çizgi için)
    {
      name: '|',
      fullName: 'Ayırıcı',
      tSkoru: null as any,
      kategori: 'separator',
      separatorIndex: 4
    },
    // Klinik ölçekler (Sağ taraf)
    {
      name: 'Hs',
      fullName: 'Hipokondriazis',
      tSkoru: klinikOlcekler.Hs?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Hs?.hammaddePuan,
      seviye: klinikOlcekler.Hs?.seviye
    },
    {
      name: 'D',
      fullName: 'Depresyon',
      tSkoru: klinikOlcekler.D?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.D?.hammaddePuan,
      seviye: klinikOlcekler.D?.seviye
    },
    {
      name: 'Hy',
      fullName: 'Hysteri',
      tSkoru: klinikOlcekler.Hy?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Hy?.hammaddePuan,
      seviye: klinikOlcekler.Hy?.seviye
    },
    {
      name: 'Pd',
      fullName: 'Psikopatik Sapma',
      tSkoru: klinikOlcekler.Pd?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pd?.hammaddePuan,
      seviye: klinikOlcekler.Pd?.seviye
    },
    {
      name: 'Mf',
      fullName: 'Erkeklik-Kadınlık',
      tSkoru: klinikOlcekler.Mf?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Mf?.hammaddePuan,
      seviye: klinikOlcekler.Mf?.seviye
    },
    {
      name: 'Pa',
      fullName: 'Paranoya',
      tSkoru: klinikOlcekler.Pa?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pa?.hammaddePuan,
      seviye: klinikOlcekler.Pa?.seviye
    },
    {
      name: 'Pt',
      fullName: 'Psikastenik',
      tSkoru: klinikOlcekler.Pt?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pt?.hammaddePuan,
      seviye: klinikOlcekler.Pt?.seviye
    },
    {
      name: 'Sc',
      fullName: 'Şizofreni',
      tSkoru: klinikOlcekler.Sc?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Sc?.hammaddePuan,
      seviye: klinikOlcekler.Sc?.seviye
    },
    {
      name: 'Ma',
      fullName: 'Hipomani',
      tSkoru: klinikOlcekler.Ma?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Ma?.hammaddePuan,
      seviye: klinikOlcekler.Ma?.seviye
    },
    {
      name: 'Si',
      fullName: 'Sosyal İçedönüklük',
      tSkoru: klinikOlcekler.Si?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Si?.hammaddePuan,
      seviye: klinikOlcekler.Si?.seviye
    }
  ];

  // Geçerlik ve klinik ölçekler için ayrı veri setleri
  const validityData = chartData.filter(item => item.kategori === 'geçerlik');
  const clinicalData = chartData.filter(item => item.kategori === 'klinik');

  // Yüksek puanları tespit et
  const yuksekPuanlar = chartData.filter(item => item.kategori !== 'separator' && item.tSkoru >= 65);

  return (
    <div className="space-y-6">
      {/* MMPI Profil Grafiği */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">MMPI Kişilik Profili</CardTitle>
          <p className="text-sm my-[20px] text-red-300">
            Profil Kodu: {testSonucu.mmpiSonuclari.profilKodu} | 
            Geçerlik: {testSonucu.mmpiSonuclari.gecerlikDurumu}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{
                top: 30,
                right: 40,
                left: 30,
                bottom: 90
              }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                
                {/* X Ekseni */}
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={90}
                  fontSize={12} 
                  tick={{
                    fill: 'hsl(var(--foreground))'
                  }} 
                />
                
                {/* Y Ekseni - Daha geniş aralık */}
                <YAxis 
                  domain={[25, 125]} 
                  ticks={[25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125]} 
                  width={70}
                  label={{
                    value: 'T-Skoru',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      textAnchor: 'middle',
                      fill: 'hsl(var(--foreground))'
                    }
                  }} 
                  tick={{
                    fill: 'hsl(var(--foreground))',
                    fontSize: 11
                  }} 
                />
                
                {/* Tooltip */}
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => {
                    const data = props.payload;
                    if (data.kategori === 'separator') return ['', ''];
                    return [`T=${value}`, `${data.fullName} (Ham: ${data.hammaddePuan || 'N/A'})`];
                  }} 
                  labelFormatter={(label: any, payload: any) => {
                    if (payload && payload[0]) {
                      const data = payload[0].payload;
                      if (data.kategori === 'separator') return 'Ayırıcı';
                      return `${data.fullName} (${data.name})`;
                    }
                    return label;
                  }} 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))'
                  }} 
                />
                
                {/* Referans çizgileri - sadece 50 ve 70 */}
                <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" strokeWidth={1} />
                <ReferenceLine y={70} stroke="hsl(var(--destructive))" strokeDasharray="3 3" strokeWidth={2} />
                
                {/* Dikey ayırıcı çizgi - K ve Hs arasında */}
                <ReferenceLine x={3.5} stroke="hsl(var(--border))" strokeWidth={2} opacity={0.8} />
                
                {/* Ana profil çizgisi - tüm noktalar için (? hariç diğerleriyle bağlı olmayacak) */}
                <Line 
                  type="linear" 
                  dataKey="tSkoru" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={(props: any) => {
                    if (props.payload.kategori === 'separator') {
                      return null; // Ayırıcı nokta için dot gösterme
                    }
                    const color = props.payload.tSkoru >= 70 ? 'hsl(var(--destructive))' : props.payload.tSkoru >= 65 ? 'hsl(var(--warning))' : 'hsl(var(--primary))';
                    return <circle cx={props.cx} cy={props.cy} r={5} fill={color} stroke="white" strokeWidth={2} />;
                  }}
                  activeDot={{
                    r: 7,
                    fill: 'hsl(var(--primary))',
                    stroke: 'white',
                    strokeWidth: 2
                  }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Referans çizgileri açıklaması */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-muted-foreground opacity-50" style={{
                background: 'repeating-linear-gradient(to right, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 2px, transparent 2px, transparent 4px)'
              }}>
              </div>
              <span>T=50: Ortalama</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-destructive" style={{
                background: 'repeating-linear-gradient(to right, hsl(var(--destructive)) 0, hsl(var(--destructive)) 3px, transparent 3px, transparent 6px)'
              }}>
              </div>
              <span>T=70: Klinik Anlamlılık</span>
            </div>
          </div>

          {/* Profil Özeti */}
          {yuksekPuanlar.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Yükseltilmiş Ölçekler (T ≥ 65):</h4>
              <div className="flex flex-wrap gap-2">
                {yuksekPuanlar.map((item, index) => (
                  <Badge 
                    key={index} 
                    variant={item.tSkoru >= 70 ? "destructive" : "secondary"} 
                    className="text-xs"
                  >
                    {item.name}: T={item.tSkoru}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detaylı Tablolar */}
    </div>
  );
}