// Test yönetimi için Redux slice

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TestTanimi, TestSonucu, TestOturumu } from '@/types';
import { testSonucuService } from '@/lib/db';
import { calculateSCL90RScore } from '@/utils/testUtils';

interface TestState {
  mevcutTestler: TestTanimi[];
  testSonuclari: TestSonucu[];
  aktifOturum: TestOturumu | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
  mevcutTestler: [],
  testSonuclari: [],
  aktifOturum: null,
  loading: false,
  error: null,
};

// Test tanımlarını yükle (public/tests klasöründen + MMPI)
export const testleriYukle = createAsyncThunk(
  'testler/yukle',
  async () => {
    try {
      // Önce test listesini al
      const response = await fetch('/tests/test-list.json');
      const testListesi = await response.json();
      
      // Public klasöründen normal testleri yükle
      const testler: TestTanimi[] = [];
      for (const testDosyasi of testListesi.tests) {
        const testResponse = await fetch(`/tests/${testDosyasi}`);
        const test = await testResponse.json();
        testler.push(test);
      }
      
      // MMPI testini ayrı olarak ekle (lib'den import)
      const { mmpiQuestions } = await import('@/lib/mmpi/data/questions');
      const mmpiTest: TestTanimi = {
        id: 'mmpi',
        testAdi: 'MMPI Minnesota Çok Yönlü Kişilik Envanteri',
        kisaAciklama: 'Minnesota Çok Yönlü Kişilik Envanteri - 566 soruluk kapsamlı kişilik değerlendirmesi',
        talimatlar: 'Her ifadeyi dikkatlice okuyun ve kendiniz için "DOĞRU" mu yoksa "YANLIŞ" mı olduğuna karar verin.',
        kategori: 'Kişilik',
        sureDakika: 90,
        sorular: mmpiQuestions.map(q => ({
          id: q.id,
          metin: q.metin,
          secenekler: [...q.secenekler]
        })),
        sonucYorumlari: [],
        puanlamaTuru: 'mmpi-profil'
      };
      
      testler.push(mmpiTest);
      
      return testler;
    } catch (error) {
      throw new Error('Test dosyaları yüklenirken hata oluştu');
    }
  }
);

// Danışan test sonuçlarını yükle
export const danisanTestSonuclari = createAsyncThunk(
  'testler/danisanSonuclari',
  async (danisanId: number) => {
    const sonuclar = await testSonucuService.danisanSonuclari(danisanId);
    // Date objelerini string'e çevir Redux state için
    return sonuclar.map(sonuc => ({
      ...sonuc,
      tamamlanmaTarihi: sonuc.tamamlanmaTarihi instanceof Date 
        ? sonuc.tamamlanmaTarihi.toISOString() 
        : sonuc.tamamlanmaTarihi
    }));
  }
);

// Test sonucu kaydet
export const testSonucuKaydet = createAsyncThunk(
  'testler/sonucKaydet',
  async (testSonucu: Omit<TestSonucu, 'id'>) => {
    const id = await testSonucuService.ekle(testSonucu);
    return { 
      ...testSonucu, 
      id,
      tamamlanmaTarihi: testSonucu.tamamlanmaTarihi instanceof Date 
        ? testSonucu.tamamlanmaTarihi.toISOString() 
        : testSonucu.tamamlanmaTarihi
    };
  }
);

// Test sonucu özel puanlama ile kaydet (SCL-90-R gibi testler için)
export const testSonucuOzelPuanlamaIleKaydet = createAsyncThunk(
  'testler/sonucOzelPuanlamaKaydet',
  async ({ 
    oturum, 
    test, 
    cevaplar 
  }: { 
    oturum: TestOturumu; 
    test: TestTanimi; 
    cevaplar: Record<string, number>; 
  }) => {
    // SCL-90-R için özel puanlama
    if (test.id === 'scl-90-r') {
      const cevapArray = Object.keys(cevaplar)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => cevaplar[key]);
      
      const sclSonuc = calculateSCL90RScore(cevapArray, test);
      
      if (sclSonuc) {
        const testSonucu: Omit<TestSonucu, 'id'> = {
          danisanId: oturum.danisanId,
          testId: test.id,
          testAdi: test.testAdi,
          tamamlanmaTarihi: new Date(),
          puan: sclSonuc.gso,
          sonucYorumu: sclSonuc.genelSeviye,
          cevaplar: Object.entries(cevaplar).map(([soruId, puan]) => ({
            soruId,
            verilenPuan: puan
          })),
          altOlcekPuanlari: sclSonuc.altOlcekler.reduce((acc, altOlcek) => {
            acc[altOlcek.kisaAd] = {
              toplamPuan: altOlcek.hamPuan,
              ortalamaPuan: altOlcek.ortalamaPuan,
              ad: altOlcek.ad,
              baskın: altOlcek.ortalamaPuan >= 1.0
            };
            return acc;
          }, {} as Record<string, { toplamPuan: number; ortalamaPuan: number; ad: string; baskın: boolean }>)
        };
        
        const id = await testSonucuService.ekle(testSonucu);
        return { 
          ...testSonucu, 
          id,
          tamamlanmaTarihi: testSonucu.tamamlanmaTarihi instanceof Date 
            ? testSonucu.tamamlanmaTarihi.toISOString() 
            : testSonucu.tamamlanmaTarihi
        };
      }
    }
    
    // Varsayılan puanlama
    throw new Error('Desteklenmeyen test türü için özel puanlama');
  }
);

// Test sonucu sil
export const testSonucuSil = createAsyncThunk(
  'testler/sonucSil',
  async (id: number) => {
    await testSonucuService.sil(id);
    return id;
  }
);

// Test sonucu güncelle
export const testSonucuGuncelle = createAsyncThunk(
  'testler/sonucGuncelle',
  async ({ id, testSonucu }: { id: number; testSonucu: Partial<TestSonucu> }) => {
    await testSonucuService.guncelle(id, testSonucu);
    const guncelSonuc = testSonucu.tamamlanmaTarihi ? {
      ...testSonucu,
      tamamlanmaTarihi: testSonucu.tamamlanmaTarihi instanceof Date 
        ? testSonucu.tamamlanmaTarihi.toISOString() 
        : testSonucu.tamamlanmaTarihi
    } : testSonucu;
    return { id, testSonucu: guncelSonuc };
  }
);

const testSlice = createSlice({
  name: 'testler',
  initialState,
  reducers: {
    testOturumuBaslat: (state, action: PayloadAction<TestOturumu>) => {
      // Date objelerini string'e çevir Redux state için
      const oturum = {
        ...action.payload,
        baslamaTarihi: action.payload.baslamaTarihi instanceof Date 
          ? action.payload.baslamaTarihi.toISOString() 
          : action.payload.baslamaTarihi,
        baslangicZamani: action.payload.baslangicZamani instanceof Date 
          ? action.payload.baslangicZamani.toISOString() 
          : action.payload.baslangicZamani
      };
      state.aktifOturum = oturum;
    },
    
    cevapGuncelle: (state, action: PayloadAction<{ soruId: string; puan: number }>) => {
      if (state.aktifOturum) {
        state.aktifOturum.cevaplar[action.payload.soruId] = action.payload.puan;
      }
    },
    
    soruIndexGuncelle: (state, action: PayloadAction<number>) => {
      if (state.aktifOturum) {
        state.aktifOturum.aktifSoruIndex = action.payload;
      }
    },
    
    testOturumuBitir: (state) => {
      state.aktifOturum = null;
    },
    
    errorTemizle: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Testleri yükle
      .addCase(testleriYukle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testleriYukle.fulfilled, (state, action) => {
        state.loading = false;
        state.mevcutTestler = action.payload;
      })
      .addCase(testleriYukle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Testler yüklenirken hata oluştu';
      })
      
      // Danışan test sonuçları
      .addCase(danisanTestSonuclari.fulfilled, (state, action) => {
        state.testSonuclari = action.payload;
      })
      
      // Test sonucu kaydet
      .addCase(testSonucuKaydet.fulfilled, (state, action) => {
        state.testSonuclari.unshift(action.payload as TestSonucu);
      })
      
      // Test sonucu özel puanlama ile kaydet
      .addCase(testSonucuOzelPuanlamaIleKaydet.fulfilled, (state, action) => {
        state.testSonuclari.unshift(action.payload as TestSonucu);
      })
      
      // Test sonucu sil
      .addCase(testSonucuSil.fulfilled, (state, action) => {
        state.testSonuclari = state.testSonuclari.filter(sonuc => sonuc.id !== action.payload);
      })
      
      // Test sonucu güncelle
      .addCase(testSonucuGuncelle.fulfilled, (state, action) => {
        const { id, testSonucu } = action.payload;
        const index = state.testSonuclari.findIndex(sonuc => sonuc.id === id);
        if (index !== -1) {
          state.testSonuclari[index] = { ...state.testSonuclari[index], ...testSonucu };
        }
      });
  },
});

export const {
  testOturumuBaslat,
  cevapGuncelle,
  soruIndexGuncelle,
  testOturumuBitir,
  errorTemizle,
} = testSlice.actions;

export default testSlice.reducer;