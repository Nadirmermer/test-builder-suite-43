import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TestSonucu } from '@/types';
import MMPIProfileChart from './MMPIProfileChart';
import SCL90RChart from './SCL90RChart';

interface TestResultChartProps {
  testSonucu: TestSonucu;
  showOverallScore?: boolean;
}

export default function TestResultChart({ testSonucu, showOverallScore = true }: TestResultChartProps) {
  // MMPI için özel grafik bileşenini kullan
  if (testSonucu.mmpiSonuclari) {
    return <MMPIProfileChart testSonucu={testSonucu} />;
  }

  // SCL-90-R için özel grafik bileşenini kullan
  if (testSonucu.testId === 'scl-90-r') {
    return <SCL90RChart testSonucu={testSonucu} showOverallScore={showOverallScore} />;
  }

  // SCL-90-R için özel renk kodlaması
  const getSCLColor = (ortalamaPuan: number) => {
    if (ortalamaPuan >= 1.0) return 'hsl(var(--destructive))'; // Kırmızı - Problemli
    if (ortalamaPuan >= 0.5) return 'hsl(var(--warning))'; // Turuncu - Orta düzey  
    return 'hsl(var(--primary))'; // Mavi - Normal
  };

  const isSCL90R = testSonucu.testId === 'scl-90-r';

  // Alt ölçek puanları varsa grafik verisi hazırla
  const chartData = testSonucu.altOlcekPuanlari
    ? Object.entries(testSonucu.altOlcekPuanlari).map(([key, data]) => ({
        name: data.ad.length > 15 ? data.ad.substring(0, 15) + '...' : data.ad,
        fullName: data.ad,
        puan: data.ortalamaPuan,
        toplamPuan: data.toplamPuan,
        baskın: data.baskın,
        color: isSCL90R ? getSCLColor(data.ortalamaPuan) : 'hsl(var(--primary))',
        seviye: isSCL90R ? 
          (data.ortalamaPuan >= 1.0 ? 'Yüksek' : 
           data.ortalamaPuan >= 0.5 ? 'Orta' : 'Normal') 
          : undefined
      }))
    : [];

  const baskınAlanlar = chartData.filter(item => item.baskın);

  if (!testSonucu.altOlcekPuanlari) {
    // Alt ölçek yoksa sadece genel puanı göster
    return showOverallScore ? (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Test Sonucu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">{testSonucu.puan}</div>
            <p className="text-muted-foreground">{testSonucu.sonucYorumu}</p>
          </div>
        </CardContent>
      </Card>
    ) : null;
  }

  return (
    <div className="space-y-6">
      {showOverallScore && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Genel Test Skoru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{testSonucu.puan}</div>
              <p className="text-muted-foreground">{testSonucu.sonucYorumu}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {isSCL90R ? 'SCL-90-R Alt Ölçek Puanları' : 'Alt Ölçek Puanları'}
          </CardTitle>
          {isSCL90R && (
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="outline" className="text-green-600">Normal (&lt; 0.5)</Badge>
              <Badge variant="outline" className="text-orange-600">Orta (0.5-1.0)</Badge>
              <Badge variant="outline" className="text-red-600">Yüksek (≥ 1.0)</Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              {isSCL90R ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis 
                    domain={[0, isSCL90R ? 4 : 'dataMax']}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), 'Ortalama Puan']}
                    labelFormatter={(label: string, payload: { payload: { fullName: string, seviye: string } }[]) => {
                      if (payload && payload[0]) {
                        const data = payload[0].payload;
                        return `${data.fullName} - ${data.seviye || ''}`;
                      }
                      return label;
                    }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                   <Bar 
                     dataKey="puan"
                     radius={[4, 4, 0, 0]}
                     fill="hsl(var(--primary))"
                   />
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), 'Puan']}
                    labelFormatter={(label: string, payload: { payload: { fullName: string } }[]) => {
                      if (payload && payload[0]) {
                        const data = payload[0].payload;
                        return `${data.fullName}`;
                      }
                      return label;
                    }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="linear" 
                    dataKey="puan" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Detay tablo */}
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-sm">
              {isSCL90R ? 'Alt Ölçek Detayları:' : 'Detaylı Puanlar:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {chartData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-2 rounded ${
                    isSCL90R && item.seviye === 'Yüksek' ? 'bg-red-50 border border-red-200' :
                    isSCL90R && item.seviye === 'Orta' ? 'bg-orange-50 border border-orange-200' :
                    'bg-muted/30'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.fullName}</span>
                    {isSCL90R && <span className="text-xs text-muted-foreground">{item.seviye}</span>}
                  </div>
                  <span className={`font-mono ${
                    isSCL90R && item.seviye === 'Yüksek' ? 'text-red-600 font-semibold' :
                    isSCL90R && item.seviye === 'Orta' ? 'text-orange-600 font-semibold' :
                    ''
                  }`}>
                    {item.puan.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}