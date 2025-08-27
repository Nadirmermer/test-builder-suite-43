import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { testleriYukle } from '@/store/slices/testSlice';
import { danisanGetir } from '@/store/slices/danisanSlice';
import StandardTestInterface from '@/components/test/StandardTestInterface';
import UniversalFastTestInterface from '@/components/test/UniversalFastTestInterface';
import MMPITestInterface from '@/components/test/MMPITestInterface';
import BulkMMPIInterface from '@/components/test/BulkMMPIInterface';
import { createDanisanUrl } from '@/utils/urlUtils';

import { TestTanimi } from '@/types';

export default function TestInterfacePage() {
  const { method, testId, danisanId } = useParams<{ 
    method: 'standard' | 'fast' | 'bulk'; 
    testId: string; 
    danisanId: string; 
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mevcutTestler } = useAppSelector((state) => state.testler);
  const { selectedDanisan } = useAppSelector((state) => state.danisanlar);
  const [selectedTest, setSelectedTest] = useState<TestTanimi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Testleri yükle eğer yoksa
    if (mevcutTestler.length === 0) {
      dispatch(testleriYukle());
    }
  }, [dispatch, mevcutTestler.length]);

  useEffect(() => {
    // Danışan bilgilerini yükle
    if (danisanId) {
      dispatch(danisanGetir(parseInt(danisanId)));
    }
  }, [danisanId, dispatch]);

  useEffect(() => {
    if (testId && mevcutTestler.length > 0) {
      const test = mevcutTestler.find(t => t.id === testId);
      if (test) {
        setSelectedTest(test);
        setLoading(false);
      } else {
        // Test bulunamadı, geri dön
        if (selectedDanisan) {
          const url = createDanisanUrl(selectedDanisan.adSoyad, selectedDanisan.id);
          navigate(url);
        } else {
          navigate('/danisanlar');
        }
      }
    }
  }, [testId, mevcutTestler, navigate, danisanId, selectedDanisan]);

  const handleComplete = () => {
    if (selectedDanisan) {
      const url = createDanisanUrl(selectedDanisan.adSoyad, selectedDanisan.id);
      navigate(url);
    } else {
      navigate('/danisanlar');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Test yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!selectedTest || !danisanId || !method) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Test bulunamadı</h2>
          <p className="text-muted-foreground mt-2">Geçersiz test parametreleri.</p>
        </div>
      </div>
    );
  }

  // MMPI için özel interface kullan
  if (selectedTest.puanlamaTuru === 'mmpi-profil') {
    return (
      <div className="min-h-screen bg-background">
        {method === 'bulk' ? (
          <BulkMMPIInterface
            test={selectedTest}
            danisanId={parseInt(danisanId)}
            onComplete={handleComplete}
          />
        ) : method === 'fast' ? (
          <UniversalFastTestInterface
            test={selectedTest}
            danisanId={parseInt(danisanId)}
            onComplete={handleComplete}
          />
        ) : (
          <MMPITestInterface
            test={selectedTest}
            danisanId={parseInt(danisanId)}
            onComplete={handleComplete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {method === 'standard' ? (
        <StandardTestInterface
          test={selectedTest}
          danisanId={parseInt(danisanId)}
          onComplete={handleComplete}
        />
      ) : (
        <UniversalFastTestInterface
          test={selectedTest}
          danisanId={parseInt(danisanId)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}