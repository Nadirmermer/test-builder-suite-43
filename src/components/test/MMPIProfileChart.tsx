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
  questionMarkTScore?: number;
  validityTScore?: number;
  clinicalTScore?: number;
  kategori: 'geçerlik' | 'klinik' | 'bilinmiyor' | 'separator' | 'bos';
  hammaddePuan?: number;
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
  const questionMarkTScoreValue = Math.min(30 + unansweredCount * 2, 120);

  // MMPI profil verisi - ayrı çizgiler için yeniden yapılandırıldı
  const chartData: ChartDataPoint[] = [
    // Y ekseninden ayırmak için boşluk
    { name: '', fullName: '', kategori: 'bos' },
    // Bilinmiyor ölçeği (tek nokta)
    {
      name: '?',
      fullName: 'Cevaplanmayan',
      questionMarkTScore: questionMarkTScoreValue,
      kategori: 'bilinmiyor',
      hammaddePuan: unansweredCount
    },
    // Geçerlik ölçekleri
    {
      name: 'L',
      fullName: 'Yalan',
      validityTScore: gecerlikOlcekleri.L?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.L?.hammaddePuan
    },
    {
      name: 'F',
      fullName: 'Sıklık',
      validityTScore: gecerlikOlcekleri.F?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.F?.hammaddePuan
    },
    {
      name: 'K',
      fullName: 'Düzeltme',
      validityTScore: gecerlikOlcekleri.K?.tSkoru || 30,
      kategori: 'geçerlik',
      hammaddePuan: gecerlikOlcekleri.K?.hammaddePuan
    },
    // Ayırıcı
    { name: '|', fullName: 'Ayırıcı', kategori: 'separator' },
    // Klinik ölçekler
    {
      name: 'Hs',
      fullName: 'Hipokondriazis',
      clinicalTScore: klinikOlcekler.Hs?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Hs?.hammaddePuan
    },
    {
      name: 'D',
      fullName: 'Depresyon',
      clinicalTScore: klinikOlcekler.D?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.D?.hammaddePuan
    },
    {
      name: 'Hy',
      fullName: 'Histeri',
      clinicalTScore: klinikOlcekler.Hy?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Hy?.hammaddePuan
    },
    {
      name: 'Pd',
      fullName: 'Psikopatik Sapma',
      clinicalTScore: klinikOlcekler.Pd?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pd?.hammaddePuan
    },
    {
      name: 'Mf',
      fullName: 'Erkeklik-Kadınlık',
      clinicalTScore: klinikOlcekler.Mf?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Mf?.hammaddePuan
    },
    {
      name: 'Pa',
      fullName: 'Paranoya',
      clinicalTScore: klinikOlcekler.Pa?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pa?.hammaddePuan
    },
    {
      name: 'Pt',
      fullName: 'Psikasteni',
      clinicalTScore: klinikOlcekler.Pt?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Pt?.hammaddePuan
    },
    {
      name: 'Sc',
      fullName: 'Şizofreni',
      clinicalTScore: klinikOlcekler.Sc?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Sc?.hammaddePuan
    },
    {
      name: 'Ma',
      fullName: 'Hipomani',
      clinicalTScore: klinikOlcekler.Ma?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Ma?.hammaddePuan
    },
    {
      name: 'Si',
      fullName: 'Sosyal İçedönüklük',
      clinicalTScore: klinikOlcekler.Si?.tSkoru || 30,
      kategori: 'klinik',
      hammaddePuan: klinikOlcekler.Si?.hammaddePuan
    }
  ];

  const CustomDot = ({ cx, cy, payload, dataKey }: { cx: number, cy: number, payload: ChartDataPoint, dataKey: string }) => {
    const tSkoru = payload[dataKey as keyof ChartDataPoint];
    
    if (tSkoru === undefined || tSkoru === null) {
      return null;
    }

    const color = (tSkoru as number) >= 70 ? 'hsl(var(--destructive))' : (tSkoru as number) >= 65 ? 'hsl(var(--warning))' : 'hsl(var(--primary))';
    return <circle cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={2} />;
  };

  const yuksekPuanlar = chartData.filter(item => 
    (item.clinicalTScore && item.clinicalTScore >= 65) || 
    (item.validityTScore && item.validityTScore >= 65) ||
    (item.questionMarkTScore && item.questionMarkTScore >= 65)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">MMPI Kişilik Profili</CardTitle>
          <p className="text-sm text-muted-foreground">Türkçe Normlar ile Değerlendirilmiştir</p>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 30, right: 40, left: 30, bottom: 90 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={90}
                  fontSize={12} 
                  tick={{ fill: 'hsl(var(--foreground))' }} 
                  interval={0}
                />
                
                <YAxis 
                  domain={[25, 125]} 
                  ticks={[25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125]} 
                  width={70}
                  label={{ value: 'T-Skoru', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }} 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} 
                />
                
                <Tooltip 
                  formatter={(value: number, name: string, props: { payload: ChartDataPoint }) => {
                    const { payload } = props;
                    const tSkoru = value;
                    const hammadde = payload.hammaddePuan !== undefined ? ` (Ham: ${payload.hammaddePuan})` : '';
                    return [`T=${tSkoru}`, `${payload.fullName}${hammadde}`];
                  }} 
                  labelFormatter={(label: string, payload: { payload: ChartDataPoint }[]) => {
                    if (payload && payload[0]) {
                      return `${payload[0].payload.fullName} (${payload[0].payload.name})`;
                    }
                    return label;
                  }} 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                  itemSorter={(item) => (item.dataKey === 'questionMarkTScore' ? 0 : item.dataKey === 'validityTScore' ? 1 : 2)}
                />
                
                <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" strokeWidth={1} />
                <ReferenceLine y={70} stroke="hsl(var(--destructive))" strokeDasharray="3 3" strokeWidth={2} />
                
                {/* Dikey ayırıcı çizgi */}
                <ReferenceLine x="|" stroke="white" strokeWidth={4} ifOverflow="visible" />

                {/* '?' için tek nokta */}
                <Line dataKey="questionMarkTScore" stroke="transparent" activeDot={false} dot={(props) => <CustomDot {...props} />} />

                {/* Geçerlik Ölçekleri Çizgisi */}
                <Line type="linear" dataKey="validityTScore" stroke="hsl(var(--primary))" strokeWidth={3} connectNulls={true} dot={(props) => <CustomDot {...props} />} activeDot={{ r: 7, stroke: 'white', strokeWidth: 2 }} />
                
                {/* Klinik Ölçekler Çizgisi */}
                <Line type="linear" dataKey="clinicalTScore" stroke="hsl(var(--primary))" strokeWidth={3} connectNulls={true} dot={(props) => <CustomDot {...props} />} activeDot={{ r: 7, stroke: 'white', strokeWidth: 2 }} />

              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-muted-foreground opacity-50" style={{ background: 'repeating-linear-gradient(to right, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 2px, transparent 2px, transparent 4px)' }}></div>
              <span>T=50: Ortalama</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-destructive" style={{ background: 'repeating-linear-gradient(to right, hsl(var(--destructive)) 0, hsl(var(--destructive)) 3px, transparent 3px, transparent 6px)' }}></div>
              <span>T=70: Klinik Anlamlılık</span>
            </div>
          </div>

          {yuksekPuanlar.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Yükseltilmiş Ölçekler (T ≥ 65):</h4>
              <div className="flex flex-wrap gap-2">
                {yuksekPuanlar.map((item, index) => (
                  <Badge 
                    key={`${item.name}-${index}`}
                    variant={(item.clinicalTScore || item.validityTScore || item.questionMarkTScore || 0) >= 70 ? "destructive" : "secondary"} 
                    className="text-xs"
                  >
                    {item.name}: T={(item.clinicalTScore || item.validityTScore || item.questionMarkTScore)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}