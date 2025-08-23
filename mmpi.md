# MMPI - Türk Normları ve Kod Yorumlamaları Sistemi

## Son Durum (Güncellenmiş - 2025)

MMPI sistemi tamamen Türk normlarına göre yeniden yapılandırıldı, duplikasyonlar temizlendi ve kod yorumları Türkçe yapıldı:

```
src/lib/mmpi/
├── core/
│   ├── scoring.ts           # Ana puanlama motoru - Türk normları
│   ├── turkishScoring.ts    # Türk normları T-skor dönüştürme
│   ├── rawScoring.ts        # Ham puan hesaplama (cinsiyet-duyarlı)
│   └── validity.ts          # Geçerlik değerlendirme (resmi konfigürasyonlar)
├── data/
│   ├── turkishNorms.ts      # Resmi Türk normları (M, SD) + T-skor hesaplama
│   ├── scoringKeys.ts       # ✅ DÜZELTILDI: Doğru madde numaraları (kullanıcı verisi)
│   └── validityConfigurations.ts # 15 resmi geçerlik konfigürasyonu
├── interpretations/
│   ├── codeTypes.ts         # İkili, Üçlü, Dörtlü Kodlar (150+ kod)
│   ├── clinicalInterpretation.ts # Klinik yorumlama motoru
│   ├── depresyon.ts         # Depresyon alt testi yorumları
│   ├── hipokondriazis.ts    # Hipokondriazis alt testi yorumları
│   ├── histeri.ts           # Histeri alt testi yorumları
│   ├── hipomani.ts          # Hipomani alt testi yorumları
│   ├── paranoya.ts          # Paranoya alt testi yorumları
│   ├── psikopatikSapma.ts   # Psikopatik Sapma alt testi yorumları
│   ├── psikasteni.ts        # Psikasteni alt testi yorumları
│   ├── sizofreni.ts         # Şizofreni alt testi yorumları
│   ├── sosyalIcedönüklük.ts # Sosyal İçedönüklük alt testi yorumları
│   └── kadinlikErkeklik.ts  # Kadınlık-Erkeklik alt testi yorumları
├── utils/
│   ├── kCorrectionTable.ts  # K ekleme tablosu (resmi)
│   ├── validation.ts        # Veri doğrulama yardımcıları
│   └── gender.ts            # Cinsiyet normalizasyon yardımcıları
├── adapter.ts               # UI format dönüştürücü
├── mmpiData.ts             # MMPI soru metinleri (sadece sorular)
├── mmpiInterpretation.ts   # Kapsamlı klinik yorumlama (Legacy uyumluluk)
└── index.ts                # Tek giriş noktası (export hub)
```

## Son Güncellemeler ✅

### 1. Madde Numaraları Düzeltildi
- ✅ **Kullanıcı Verisi**: Kesin ve doğru madde numaraları uygulandı
- ✅ **L alt testi**: 15 madde (sadece yanlış puanlanan)
- ✅ **F alt testi**: 64 madde (44 doğru, 20 yanlış)
- ✅ **K alt testi**: 30 madde (1 doğru, 29 yanlış)
- ✅ **Klinik ölçekler**: Tüm madde sayıları doğrulandı
- ✅ **Mf ölçeği**: Cinsiyet-özel madde numaraları (*işaretli sorular kadınlarda ters)

### 2. PDF Raporunda İyileştirmeler
- ✅ **Türkçe Karakter Desteği**: Roboto font kullanımı ile ç, ğ, ş, ı, ö, ü harfleri
- ✅ **MMPI Profil Tablosu**: Grafik yerine detaylı tablo görünümü
- ✅ **Görsel Çubuk Grafik**: Her ölçek için renk-kodlu çubuk gösterimi
- ✅ **T-Skoru Seviyeleri**: Normal/Yükseltilmiş/Klinik renk kodlaması

### 3. Madde Sayıları (Doğrulanmış)
- **L**: 15 madde - Yalan ölçeği
- **F**: 64 madde - Sıklık ölçeği  
- **K**: 30 madde - Düzeltme ölçeği
- **Hs**: 33 madde - Hipokondriazis
- **D**: 60 madde - Depresyon
- **Hy**: 60 madde - Histeri
- **Pd**: 50 madde - Psikopatik Sapma
- **Mf**: 60 madde - Kadınlık-Erkeklik (cinsiyet-özel)
- **Pa**: 40 madde - Paranoya
- **Pt**: 48 madde - Psikasteni (K-düzeltmeli)
- **Sc**: 78 madde - Şizofreni (K-düzeltmeli)
- **Ma**: 46 madde - Hipomani (K-düzeltmeli)
- **Si**: 70 madde - Sosyal İçedönüklük

## Temel Özellikler ✅

- ✅ **Resmi Türk Normları**: Erkek ve kadın için ayrı M/SD değerleri
- ✅ **T-Skoru Formülü**: T = 50 + 10*(X - M)/SD 
- ✅ **K-Düzeltmesi**: Resmi ekleme tablosu (Hs+0.5K, Pd+0.4K, Pt+1.0K, Sc+1.0K, Ma+0.2K)
- ✅ **Geçerlik Kuralları**: L≥80, F≥100, ?≥30 profil geçersiz
- ✅ **Profil Kodlama**: High-point kod sistemi
- ✅ **Risk Değerlendirmesi**: T≥70 klinik, T≥65 yükseltilmiş
- ✅ **Duplikasyon Temizleme**: Tek fonksiyon, tek sorumluluk prensibi
- ✅ **Türkçe Kod Yorumları**: Tüm fonksiyonlar Türkçe açıklamalı

## Türk Normları (Resmi Kitaptan)

### Erkek Normları
- L: M=6.45, SD=2.74
- F: M=8.3, SD=4.62  
- K: M=13.98, SD=4.65
- Hs+0.5K: M=13.19, SD=4.07
- D: M=20.63, SD=4.76
- Hy: M=19.31, SD=4.71
- Pd+0.4K: M=22.22, SD=4.45
- Mf: M=29.21, SD=3.82
- Pa: M=11.12, SD=4.03
- Pt+1.0K: M=27.9, SD=6.3
- Sc+1.0K: M=29.82, SD=9.05
- Ma+0.2K: M=19.96, SD=4.4
- Si: M=25.86, SD=7.97

### Kadın Normları  
- L: M=6, SD=2.25
- F: M=9.38, SD=5.16
- K: M=11.82, SD=3.8
- Hs+0.5K: M=15.89, SD=4.88
- D: M=23.86, SD=5.08
- Hy: M=18.12, SD=5.31  ✅ **DÜZELTİLMİŞ**
- Pd+0.4K: M=22.84, SD=4.51
- Mf: M=32.98, SD=3.67
- Pa: M=11.93, SD=4.17
- Pt+1.0K: M=29.2, SD=6.59
- Sc+1.0K: M=31.06, SD=8.2
- Ma+0.2K: M=19.72, SD=4.36
- Si: M=29.88, SD=7.52

## K Ekleme Tablosu

Resmi tabloya göre K ham puanından düzeltme değerleri:
- 0.5K oranı: Hs için
- 0.4K oranı: Pd için  
- 1.0K oranı: Pt ve Sc için
- 0.2K oranı: Ma için

## Geçerlik Kriterleri

- **Geçersiz**: L≥80, F≥100, ?≥30
- **Sınırlı**: L≥70, F≥80, K≥75, K≤35, ?≥10
- **Geçerli**: Diğer durumlar

## Temizlenen Duplikasyonlar ✅

1. **T-skor seviye belirleme**: `determineTScoreLevel` kaldırıldı → `determineLevel` (validity.ts) kullanılıyor
2. **Tek T-skor hesaplama**: Sadece `calculateTScore` (turkishNorms.ts) kullanılıyor
3. **Tek K-düzeltme**: Sadece `applyKCorrection` (turkishNorms.ts) kullanılıyor
4. **Klinik norm karşılaştırması**: Kaldırıldı (gereksiz karmaşıklık)

## PDF Rapor İyileştirmeleri ✅

- **Türkçe Karakter Desteği**: Roboto font ile tam Türkçe destek
- **MMPI Profil Tablosu**: Detaylı ölçek tablosu (ham puan, T-skoru, seviye)
- **Görsel Çubuk Grafik**: Her ölçek için renk-kodlu çubuk gösterimi
- **T-Skoru Renk Kodlaması**: Yeşil (Normal), Turuncu (Yükseltilmiş), Kırmızı (Klinik)
- **Grafik Açıklaması**: Referans değerleri ve anlamları

## Grafik İyileştirmeleri ✅

- **Y Ekseni**: 25-125 aralığı (eski: 30-120)
- **Detaylı Ticks**: 5'er birimlik aralıklar
- **Yükseklik**: 600px (eski: 384px)
- **Margin**: Daha geniş kenar boşlukları
- **Daha İyi Görünürlük**: 45-55 arası aralık artık net görünüyor

## Kod Tipi Sistemi

### İkili Kodlar (12, 13, 21, 31, vb.)
- **12/21 Kodu**: 1. ve 2. klinik alt ölçeğin yüksek olması (T≥70), diğerlerinin düşük olması
- **Sıralama Önemli**: 135 = 1. en yüksek, sonra 3. (en az T≥65)
- **12/21 Notasyonu**: İster 12 ister 21, sadece 1 ve 2'nin yüksek olması anlamına gelir

### Kod Yorumlamaları
- ✅ **150+ Kod Tipi**: Tüm ikili, üçlü, dörtlü kombinasyonlar
- ✅ **Modüler Yapı**: Her kod tipi ayrı dosyada organize edildi
- ✅ **Resmi Kaynak**: Türk MMPI uygulama kitabından alındı
- ✅ **Alt Varyantlar**: Özel durumlar ve kombinasyonlar

## Dosya Dizin Haritası

### Core Modüller (Hesaplama)
- `scoring.ts` → Ana puanlama koordinatörü
- `turkishScoring.ts` → T-skor dönüştürme (sadece)
- `rawScoring.ts` → Ham puan hesaplama
- `validity.ts` → Geçerlik değerlendirme + seviye belirleme

### Data Modülleri (Norm Verileri)
- `turkishNorms.ts` → M/SD değerleri + T-skor hesaplama + K-düzeltme
- `scoringKeys.ts` → ✅ **DÜZELTILDI**: Doğru puanlama anahtarları
- `validityConfigurations.ts` → 15 resmi geçerlik konfigürasyonu

### Interpretation Modülleri (Yorumlama)
- `codeTypes.ts` → 150+ kod tipi yorumu
- `clinicalInterpretation.ts` → Kapsamlı klinik yorumlama
- `[ölçek].ts` → Her ölçek için özel yorumlar

### Utils (Yardımcı)
- `kCorrectionTable.ts` → Resmi K ekleme tablosu
- `validation.ts` → Veri doğrulama
- `gender.ts` → Cinsiyet normalizasyon

## Son Değişiklikler (Bu Güncelleme)

1. ✅ **Madde Numaraları**: Kullanıcı tarafından sağlanan kesin ve doğru verilerle güncellendi
2. ✅ **PDF Türkçe Karakter**: Roboto font ile tam Türkçe destek
3. ✅ **PDF MMPI Grafik**: Detaylı profil tablosu ve görsel çubuk grafik eklendi
4. ✅ **Grafik Y Ekseni**: 600px yükseklik, 25-125 aralık
5. ✅ **Türkçe Yorumlar**: Tüm core dosyalarda Türkçe açıklamalar
6. ✅ **Import Düzenleme**: determineLevel validity.ts'den import ediliyor