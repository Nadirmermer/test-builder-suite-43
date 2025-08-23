// MMPI Sonuç Grafiği - Yeni optimize edilmiş profil grafiğine yönlendirme
import MMPIProfileChart from './MMPIProfileChart';
import { TestSonucu } from '@/types';

interface MMPIResultChartProps {
  testSonucu: TestSonucu;
}

export default function MMPIResultChart({ testSonucu }: MMPIResultChartProps) {
  // Yeni optimized chart componentini kullan
  return <MMPIProfileChart testSonucu={testSonucu} />;
}