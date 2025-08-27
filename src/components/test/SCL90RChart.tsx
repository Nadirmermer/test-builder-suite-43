import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TestSonucu } from '@/types';

interface SCL90RChartProps {
  testSonucu: TestSonucu;
  showOverallScore?: boolean;
  chartType?: 'bar' | 'line';
}

export default function SCL90RChart({ testSonucu, showOverallScore = true, chartType = 'line' }: SCL90RChartProps) {
  // SCL-90-R için renk kodlaması
  const getSCLColor = (ortalamaPuan: number) => {
    if (ortalamaPuan >= 1.0) return '#dc2626'; // Kırmızı - Problemli
    if (ortalamaPuan >= 0.5) return '#ea580c'; // Turuncu - Orta düzey  
    return '#16a34a'; // Yeşil - Normal
  };

  const getSCLSeviye = (ortalamaPuan: number) => {
    if (ortalamaPuan >= 1.0) return 'Yüksek';
    if (ortalamaPuan >= 0.5) return 'Orta';
    return 'Normal';
  };

  // Genel Semptom Ortalaması (GSO)
  const gso = testSonucu.puan;
  const gsoSeviye = getSCLSeviye(gso);

  // Alt ölçek verilerini hazırla
  const chartData = testSonucu.altOlcekPuanlari
    ? Object.entries(testSonucu.altOlcekPuanlari).map(([key, data]) => ({
        name: data.ad.length > 12 ? data.ad.substring(0, 12) + '...' : data.ad,
        fullName: data.ad,
        puan: data.ortalamaPuan,
        fill: getSCLColor(data.ortalamaPuan),
        seviye: getSCLSeviye(data.ortalamaPuan)
      }))
    : [];

  const problemliAlanlar = chartData.filter(item => item.puan >= 1.0);
  const ortaAlanlar = chartData.filter(item => item.puan >= 0.5 && item.puan < 1.0);

  return (
    <div className="space-y-6">
      {showOverallScore && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Genel Semptom Ortalaması (GSO)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`text-4xl font-bold ${
                gsoSeviye === 'Yüksek' ? 'text-red-600' :
                gsoSeviye === 'Orta' ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {gso.toFixed(2)}
              </div>
              <div className="space-y-2">
                <Badge 
                  variant={gsoSeviye === 'Yüksek' ? 'destructive' : 'outline'}
                  className={
                    gsoSeviye === 'Yüksek' ? '' :
                    gsoSeviye === 'Orta' ? 'border-orange-500 text-orange-700' :
                    'border-green-500 text-green-700'
                  }
                >
                  {gsoSeviye} Seviye
                </Badge>
                <p className="text-muted-foreground text-sm">{testSonucu.sonucYorumu}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SCL-90-R Alt Ölçek Profili</CardTitle>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline" className="text-green-600 border-green-500">
              Normal (&lt; 0.5)
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-500">
              Orta Düzey (0.5-1.0)
            </Badge>
            <Badge variant="outline" className="text-red-600 border-red-500">
              Yüksek (≥ 1.0)
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart 
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={11}
                    interval={0}
                  />
                  <YAxis 
                    domain={[0, 4]}
                    tickFormatter={(value) => value.toFixed(1)}
                    fontSize={11}
                  />
                  <ReferenceLine y={0.5} stroke="#22c55e" strokeDasharray="5 5" label="Normal Üst Sınır" />
                  <ReferenceLine y={1.0} stroke="#f59e0b" strokeDasharray="5 5" label="Orta Üst Sınır" />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), 'Ortalama Puan']}
                    labelFormatter={(label: string, payload: unknown[]) => {
                      if (payload && Array.isArray(payload) && payload[0]) {
                        const data = (payload[0] as any).payload;
                        return `${data.fullName} - ${data.seviye}`;
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
                    type="monotone"
                    dataKey="puan" 
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2 }}
                  />
                </LineChart>
              ) : (
                <BarChart 
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={11}
                    interval={0}
                  />
                  <YAxis 
                    domain={[0, 4]}
                    tickFormatter={(value) => value.toFixed(1)}
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), 'Ortalama Puan']}
                    labelFormatter={(label: string, payload: unknown[]) => {
                      if (payload && Array.isArray(payload) && payload[0]) {
                        const data = (payload[0] as any).payload;
                        return `${data.fullName} - ${data.seviye}`;
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
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Kritik noktalar özetı */}
          {(problemliAlanlar.length > 0 || ortaAlanlar.length > 0) && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-semibold text-sm">Dikkat Gereken Alanlar:</h4>
              
              {problemliAlanlar.length > 0 && (
                <div className="space-y-2">
                  <Badge variant="destructive" className="mb-2">Yüksek Seviye Belirtiler</Badge>
                  <div className="grid gap-2">
                    {problemliAlanlar.map((item, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-2 rounded bg-red-50 border border-red-200"
                      >
                        <span className="font-medium text-red-800">{item.fullName}</span>
                        <span className="font-mono text-red-600 font-semibold">
                          {item.puan.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ortaAlanlar.length > 0 && (
                <div className="space-y-2">
                  <Badge variant="outline" className="border-orange-500 text-orange-700 mb-2">
                    Orta Düzey Belirtiler
                  </Badge>
                  <div className="grid gap-2">
                    {ortaAlanlar.map((item, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-200"
                      >
                        <span className="font-medium text-orange-800">{item.fullName}</span>
                        <span className="font-mono text-orange-600 font-semibold">
                          {item.puan.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tüm alt ölçekler tablosu */}
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-sm">Tüm Alt Ölçek Puanları:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {chartData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-2 rounded ${
                    item.seviye === 'Yüksek' ? 'bg-red-50 border border-red-200' :
                    item.seviye === 'Orta' ? 'bg-orange-50 border border-orange-200' :
                    'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.fullName}</span>
                    <span className={`text-xs ${
                      item.seviye === 'Yüksek' ? 'text-red-600' :
                      item.seviye === 'Orta' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {item.seviye}
                    </span>
                  </div>
                  <span className={`font-mono ${
                    item.seviye === 'Yüksek' ? 'text-red-600 font-semibold' :
                    item.seviye === 'Orta' ? 'text-orange-600 font-semibold' :
                    'text-green-600'
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