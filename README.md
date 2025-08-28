# 🧠 PsikoTest - Psikolojik Değerlendirme Sistemi

Modern, güvenli ve kapsamlı psikolojik test uygulama platformu. MMPI, Beck serisi testler ve diğer standardize edilmiş psikolojik değerlendirme araçlarını dijital ortamda güvenle uygulayın.

## 📋 Proje Hakkında

**PsikoTest**, mental sağlık profesyonelleri için geliştirilmiş, tamamen web tabanlı bir psikolojik değerlendirme sistemidir. Sistem, danışanların bilgilerini güvenli bir şekilde saklayarak, standardize edilmiş testleri dijital ortamda uygulama ve detaylı raporlar oluşturma imkanı sunar.

### 🎯 Ana Hedefler
- Psikolojik testlerin dijital ortamda güvenli uygulanması
- Otomatik puanlama ve yorumlama sistemleri
- Kapsamlı rapor oluşturma ve analiz araçları
- Danışan verilerinin güvenli yönetimi
- Mobil ve masaüstü uyumlu modern arayüz

## ✨ Özellikler

### 🧪 Kapsamlı Test Koleksiyonu
- **MMPI (Minnesota Çok Yönlü Kişilik Envanteri)**
  - 566 soruluk tam MMPI-2 testi
  - Cinsiyet bazlı T-skoru normları
  - K-düzeltmesi otomatik uygulaması
  - Geçerlik kontrolü ve profil analizi
  - Detaylı klinik yorumlama motoru

- **Beck Test Serisi**
  - Beck Depresyon Envanteri (BDI)
  - Beck Anksiyete Envanteri (BAI)
  - Beck Umutsuzluk Ölçeği (BUO)
  - Beck İntihar Düşüncesi Ölçeği (BIDO)

- **Diğer Standardize Testler**
  - Young Şema Ölçeği (YSQ)
  - Anksiyete Duyarlılığı İndeksi (ADI-3)
  - Arizona Cinsel Yaşantı Ölçeği (ACYO)
  - SCL-90-R Semptom Tarama Listesi

### 🔒 Güvenlik & Veri Koruma
- **Yerel Depolama**: Tüm veriler kullanıcının cihazında saklanır
- **Şifrelenmiş Danışan Bilgileri**: AES-256 şifreleme
- **KVKV Uyumlu**: Kişisel veri işleme standartları
- **Güvenli PDF Raporları**: Kriptolojik imzalı belgeler
- **Offline Çalışma**: İnternet bağlantısı olmadan da kullanılabilir

### 📊 Gelişmiş Analiz ve Raporlama
- **Interaktif Grafikler**: Recharts ile görselleştirme
- **PDF Rapor Oluşturma**: Profesyonel formatta detaylı raporlar
- **Geçmiş Test Karşılaştırması**: Zaman içindeki değişimleri takip
- **Alt Ölçek Analizleri**: Detaylı puanlama sistemleri
- **Klinik Yorumlama**: Otomatik yorum oluşturma

### 🎨 Modern Kullanıcı Deneyimi
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Dark/Light Mode**: Kullanıcı tercihi destekli tema sistemi
- **PWA Desteği**: Uygulama gibi kullanım deneyimi
- **Hızlı Arama**: Test ve danışan filtreleme
- **Keyboard Shortcuts**: Hızlı navigasyon

## 🏗️ Teknik Yapı

### Frontend Stack
- **React 18.3+** - Modern React ile TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern, accessible bileşen kütüphanesi
- **Redux Toolkit** - Global state yönetimi
- **React Router** - Client-side routing
- **Vite** - Hızlı build tool ve dev server

### Backend & Storage
- **Dexie.js** - IndexedDB abstraction layer
- **IndexedDB** - Browser tabanlı yerel veritabanı
- **Lokomotif Encryption** - Danışan verilerinin şifrelenmesi
- **Service Worker** - Offline çalışma desteği

### Test Motoru
- **JSON Tabanlı Test Tanımları** - Esnek test yapılandırması
- **Çoklu Puanlama Sistemleri** - Farklı test türleri için optimize
- **Alt Ölçek Hesaplamaları** - Karmaşık puanlama algoritmaları
- **Real-time Validation** - Anlık veri doğrulama

### Visualization & Reporting
- **Recharts** - Interactive chart library
- **@react-pdf/renderer** - PDF oluşturma
- **React Hook Form** - Form yönetimi
- **Zod** - Runtime type validation

## 📁 Proje Yapısı

```
test-builder-suite-43/
├── 📁 public/                    # Statik dosyalar
│   ├── favicon.ico              # Uygulama ikonu
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service Worker
│   └── 📁 tests/                 # Test tanım dosyaları
│       ├── test-list.json       # Mevcut testlerin listesi
│       ├── beck-depresyon-envanteri-bde.json
│       ├── beck-anksiyete-envanteri-bai.json
│       ├── mmpi-1.json          # MMPI test verileri
│       └── ...                  # Diğer test dosyaları
│
├── 📁 src/                      # Kaynak kod
│   ├── App.tsx                  # Ana uygulama bileşeni
│   ├── main.tsx                 # Uygulamanın giriş noktası
│   ├── index.css                # Global CSS stilleri
│   │
│   ├── 📁 components/           # React bileşenleri
│   │   ├── 📁 ui/               # Temel UI bileşenleri (Shadcn/ui)
│   │   │   ├── button.tsx       # Button bileşeni
│   │   │   ├── card.tsx         # Card bileşeni
│   │   │   ├── dialog.tsx       # Modal/Dialog bileşeni
│   │   │   ├── chart.tsx        # Grafik bileşenleri
│   │   │   └── ...              # Diğer UI bileşenleri
│   │   │
│   │   ├── 📁 layout/           # Layout bileşenleri
│   │   │   ├── Layout.tsx       # Ana layout wrapper
│   │   │   ├── Header.tsx       # Üst navigasyon
│   │   │   ├── Sidebar.tsx      # Yan menü
│   │   │   ├── MobileBottomNav.tsx # Mobil alt navigasyon
│   │   │   └── PageTransition.tsx  # Sayfa geçiş animasyonları
│   │   │
│   │   ├── 📁 danisan/          # Danışan yönetimi bileşenleri
│   │   │   ├── DanisanCard.tsx  # Danışan kartı
│   │   │   ├── YeniDanisanModal.tsx # Yeni danışan ekleme
│   │   │   └── DanisanGuncelleModal.tsx # Danışan güncelleme
│   │   │
│   │   ├── 📁 test/             # Test uygulaması bileşenleri
│   │   │   ├── StandardTestInterface.tsx   # Standart test arayüzü
│   │   │   ├── UniversalFastTestInterface.tsx # Hızlı test arayüzü
│   │   │   ├── MMPITestInterface.tsx       # MMPI özel arayüzü
│   │   │   ├── BulkMMPIInterface.tsx       # MMPI toplu uygulama
│   │   │   ├── TestApplicationModal.tsx    # Test uygulama modalı
│   │   │   ├── TestResultChart.tsx         # Sonuç grafikleri
│   │   │   ├── TestResultEditModal.tsx     # Sonuç düzenleme
│   │   │   ├── TestSearch.tsx              # Test arama
│   │   │   ├── MMPIProfileChart.tsx        # MMPI profil grafiği
│   │   │   ├── MMPIClinicalScaleInterpretation.tsx # MMPI yorumlama
│   │   │   ├── MMPIValidityScaleInterpretation.tsx # MMPI geçerlik
│   │   │   ├── SCL90RChart.tsx             # SCL-90-R grafikleri
│   │   │   └── GenderSelectionModal.tsx    # Cinsiyet seçimi
│   │   │
│   │   └── 📁 pdf/              # PDF oluşturma bileşenleri
│   │       └── TestReportPDF.tsx # Test raporu PDF şablonu
│   │
│   ├── 📁 pages/                # Sayfa bileşenleri
│   │   ├── Index.tsx            # Ana sayfa (Dashboard)
│   │   ├── DanisanlarPage.tsx   # Danışanlar listesi
│   │   ├── DanisanDetayPage.tsx # Danışan detay sayfası
│   │   ├── TestlerPage.tsx      # Test listesi ve yönetimi
│   │   ├── TestInterfacePage.tsx # Test uygulama sayfası
│   │   ├── RaporDetayPage.tsx   # Test raporu detayı
│   │   ├── AyarlarPage.tsx      # Uygulama ayarları
│   │   └── NotFound.tsx         # 404 sayfası
│   │
│   ├── 📁 store/                # Redux store yapılandırması
│   │   ├── index.ts             # Store konfigürasyonu
│   │   └── 📁 slices/           # Redux Toolkit slices
│   │       ├── danisanlarSlice.ts # Danışan state yönetimi
│   │       ├── testlerSlice.ts    # Test state yönetimi
│   │       └── uiSlice.ts         # UI state (tema, modals vb.)
│   │
│   ├── 📁 lib/                  # Utility kütüphaneleri
│   │   ├── db.ts                # Dexie.js veritabanı konfigürasyonu
│   │   ├── dataManager.ts       # Veri yönetim fonksiyonları
│   │   ├── utils.ts             # Genel utility fonksiyonlar
│   │   └── 📁 mmpi/             # MMPI özel kütüphanesi
│   │       ├── index.ts         # MMPI public API
│   │       ├── mmpiData.ts      # Ham veriler (566 soru, normlar)
│   │       ├── mmpiScoring.ts   # Puanlama motoru
│   │       ├── mmpiInterpretation.ts # Yorumlama motoru
│   │       ├── adapter.ts       # Format adaptörü
│   │       └── 📁 interpretations/ # Detaylı yorumlama modülleri
│   │           ├── 📁 clinical/    # Klinik ölçek yorumları
│   │           └── 📁 validity/    # Geçerlik ölçek yorumları
│   │
│   ├── 📁 types/                # TypeScript tip tanımları
│   │   └── index.ts             # Ana tip tanımları
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── useRedux.ts          # Redux typed hooks
│   │   ├── use-toast.ts         # Toast bildirimleri
│   │   └── use-mobile.tsx       # Mobil detect hook
│   │
│   └── 📁 utils/                # Utility fonksiyonlar
│       ├── encryption.ts        # Veri şifreleme
│       ├── performance.ts       # Performans optimizasyonları
│       ├── testUtils.ts         # Test utility fonksiyonları
│       └── urlUtils.ts          # URL işlemleri
│
├── 📁 Konfigürasyon Dosyaları
│   ├── package.json             # NPM bağımlılıkları ve scriptler
│   ├── tsconfig.json            # TypeScript konfigürasyonu
│   ├── vite.config.ts           # Vite build konfigürasyonu
│   ├── tailwind.config.ts       # Tailwind CSS konfigürasyonu
│   ├── components.json          # Shadcn/ui konfigürasyonu
│   ├── eslint.config.js         # ESLint kuralları
│   └── postcss.config.js        # PostCSS konfigürasyonu
│
└── README.md                    # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js** 18.0 veya üzeri
- **npm** veya **yarn** package manager
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)

### Kurulum Adımları

```bash
# 1. Projeyi klonlayın
git clone <repository-url>
cd test-builder-suite-43

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcınızda açın
# http://localhost:5173
```

### Production Build

```bash
# Production build oluşturun
npm run build

# Build dosyalarını önizleyin
npm run preview
```

## 🔧 Geliştirme Rehberi

### Yeni Test Ekleme

1. **Test JSON dosyası oluşturun** (`public/tests/` klasöründe):
```json
{
  "id": "yeni-test-id",
  "testAdi": "Yeni Test Adı",
  "kisaAciklama": "Test açıklaması",
  "kategori": "Test kategorisi",
  "sureDakika": 15,
  "talimatlar": "Test talimatları...",
  "sorular": [
    {
      "id": "soru_1",
      "metin": "Soru metni",
      "secenekler": [
        { "metin": "Seçenek 1", "puan": 0 },
        { "metin": "Seçenek 2", "puan": 1 }
      ]
    }
  ],
  "sonucYorumlari": [
    {
      "minPuan": 0,
      "maxPuan": 10,
      "yorum": "Düşük seviye"
    }
  ]
}
```

2. **Test listesini güncelleyin** (`public/tests/test-list.json`):
```json
{
  "tests": [
    "yeni-test-id.json",
    "...diğer testler"
  ]
}
```

3. **Özel puanlama mantığı** (gerekirse `src/utils/testUtils.ts`'de):
```typescript
export function calculateYeniTestScore(cevaplar: any[]): number {
  // Özel puanlama mantığı
  return totalScore;
}
```

### MMPI Genişletme

MMPI ile ilgili tüm geliştirmeler `src/lib/mmpi/` klasöründe yapılır:

```typescript
// Yeni interpretasyon ekleme
import { calculateMMPIScores, generateMMPIInterpretation } from '@/lib/mmpi';

// Kullanım
const results = calculateMMPIScores(cevaplar, bosCevaplar, cinsiyet);
const interpretation = generateMMPIInterpretation(results);
```

### Stil Rehberi

- **Tailwind CSS** sınıfları kullanın
- **Shadcn/ui** bileşenlerini tercih edin
- **Mobile-first** yaklaşım benimseyin
- **Dark/Light mode** uyumluluğunu sağlayın

### Veri Modelleri

Ana veri yapıları `src/types/index.ts` dosyasında tanımlanmıştır:

```typescript
interface Danisan {
  id?: number;
  adSoyad: string;
  tcKimlikNo?: string;
  dogumTarihi?: string;
  cinsiyet?: 'Erkek' | 'Kadın' | 'Belirtmek istemiyorum';
  // ...diğer alanlar
}

interface TestSonucu {
  id?: number;
  danisanId: number;
  testId: string;
  testAdi: string;
  tamamlanmaTarihi: Date | string;
  puan: number;
  sonucYorumu: string;
  cevaplar: { soruId: string; verilenPuan: number }[];
  // ...diğer alanlar
}
```

## 📊 Test Sistemi Detayları

### Desteklenen Test Türleri

#### 1. **MMPI (Minnesota Çok Yönlü Kişilik Envanteri)**
- **566 soru** tam versiyonu
- **Geçerlik ölçekleri**: L, F, K, Cannot Say
- **Klinik ölçekler**: Hs, D, Hy, Pd, Mf, Pa, Pt, Sc, Ma, Si
- **Cinsiyet bazlı normlar** ve T-skoru hesaplaması
- **K-düzeltmesi** otomatik uygulaması
- **Detaylı klinik yorumlama** motoru

#### 2. **Beck Test Serisi**
- **Beck Depresyon Envanteri (BDI)**: 21 maddelik depresyon taraması
- **Beck Anksiyete Envanteri (BAI)**: 21 maddelik anksiyete ölçümü
- **Beck Umutsuzluk Ölçeği (BUO)**: Umutsuzluk düzeyi değerlendirmesi
- **Beck İntihar Düşüncesi Ölçeği (BIDO)**: İntihar riski değerlendirmesi

#### 3. **Diğer Klinik Testler**
- **Young Şema Ölçeği (YSQ)**: Erken dönem uyumsuz şemalar
- **Anksiyete Duyarlılığı İndeksi (ADI-3)**: Anksiyete duyarlılığı
- **Arizona Cinsel Yaşantı Ölçeği (ACYO)**: Cinsel işlev değerlendirmesi
- **SCL-90-R**: Kapsamlı semptom tarama listesi

### Puanlama Sistemleri

#### Otomatik Puanlama
- **Ham puan hesaplama**: Seçeneklerin puanlarının toplanması
- **T-skoru dönüşümü**: Yaş ve cinsiyet normlarına göre
- **Yüzdelik dilim**: Norm grubundaki konum
- **Kategorik yorumlama**: Düşük/Normal/Yüksek sınıflandırması

#### Alt Ölçek Analizleri
- **MMPI alt ölçekleri**: Her ölçek için ayrı analiz
- **YSQ şema alanları**: 18 farklı şema kategorisi
- **SCL-90-R semptom boyutları**: 9 semptom kategorisi
- **Faktör analizleri**: Çok boyutlu değerlendirmeler

### Raporlama Sistemi

#### Grafik Visualizasyonlar
- **Profil grafikleri**: Test profillerinin görsel gösterimi
- **Bar charts**: Alt ölçek karşılaştırmaları
- **Line charts**: Zaman içindeki değişimler
- **Scatter plots**: İlişki analizleri
- **Heat maps**: Kapsamlı veri görselleştirmesi

#### PDF Raporları
- **Profesyonel format**: Klinik kullanıma uygun layout
- **Kapsamlı içerik**: Test sonuçları, grafikler, yorumlar
- **Güvenli imzalama**: Dijital imza desteği
- **Yazdırma optimizasyonu**: A4 format uyumluluğu

## 🔐 Güvenlik ve Gizlilik

### Veri Güvenliği
- **AES-256 şifreleme**: Danışan verilerinin korunması
- **Yerel depolama**: Veriler kullanıcının cihazında kalır
- **No cloud storage**: Hiçbir veri sunucuya gönderilmez
- **Secure connections**: HTTPS zorunluluğu

### KVKV Uyumluluğu
- **Minimal veri toplama**: Sadece gerekli bilgiler
- **Açık rıza**: Kullanıcı onayı sistemleri
- **Veri taşınabilirliği**: Export/import özellikleri
- **Silme hakkı**: Veri silme seçenekleri

### Erişim Kontrolü
- **Yerel yetkilendirme**: Cihaz bazlı erişim
- **Session management**: Güvenli oturum yönetimi
- **Audit logging**: İşlem logları
- **Backup options**: Güvenli yedekleme

## 🎨 UI/UX Tasarım Prensipleri

### Modern Tasarım
- **Material Design 3**: Google'ın en son tasarım dili
- **Shadcn/ui**: Accessible ve modern bileşenler
- **Consistent spacing**: 8px grid sistemi
- **Typography scale**: Hiyerarşik font sistemi

### Accessibility
- **WCAG 2.1 AA**: Web erişilebilirlik standartları
- **Keyboard navigation**: Klavye ile tam kullanım
- **Screen reader support**: Görme engelliler için destek
- **High contrast mode**: Yüksek kontrast seçenekleri

### Responsive Design
- **Mobile-first**: Mobil öncelikli tasarım
- **Breakpoint system**: Tailwind CSS breakpoints
- **Touch-friendly**: Dokunmatik arayüz optimizasyonu
- **Performance**: Hızlı yükleme ve düşük memory usage

## 🚀 Performans Optimizasyonları

### Frontend Optimizasyonlar
- **Code splitting**: Sayfa bazlı kod bölme
- **Lazy loading**: İhtiyaç anında yükleme
- **Tree shaking**: Kullanılmayan kod elimination
- **Bundle optimization**: Optimized build output

### Veritabanı Optimizasyonları
- **Indexed queries**: Hızlı veri erişimi
- **Batch operations**: Toplu işlemler
- **Caching strategies**: Akıllı önbellekleme
- **Data compression**: Veri sıkıştırma

### Memory Management
- **Cleanup routines**: Bellek temizleme
- **Efficient rendering**: React optimizasyonları
- **Image optimization**: Görsel optimizasyonu
- **State management**: Efektif state yönetimi

## 🧪 Test ve Quality Assurance

### Test Stratejisi
- **Unit tests**: Birim testleri
- **Integration tests**: Entegrasyon testleri
- **E2E tests**: Uçtan uca testler
- **Performance tests**: Performans testleri

### Code Quality
- **ESLint**: Kod kalitesi kontrolü
- **TypeScript**: Tip güvenliği
- **Prettier**: Kod formatı standardizasyonu
- **Husky**: Git hooks ile otomatik kontroller

### Browser Compatibility
- **Chrome**: 90+ version support
- **Firefox**: 88+ version support
- **Safari**: 14+ version support
- **Edge**: 90+ version support

## 📈 Roadmap ve Gelecek Planları

### Kısa Vadeli (1-3 ay)
- [ ] **MMPI-2-RF** entegrasyonu
- [ ] **Wechsler testleri** eklenmesi
- [ ] **Advanced reporting** özellikleri
- [ ] **Multi-language** destek

### Orta Vadeli (3-6 ay)
- [ ] **AI-powered insights** eklenmesi
- [ ] **Statistical analysis** modülü
- [ ] **Team collaboration** özellikleri
- [ ] **Advanced export** options

### Uzun Vadeli (6+ ay)
- [ ] **Cloud sync** option (opsiyonel)
- [ ] **Mobile apps** (iOS/Android)
- [ ] **API integrations** with other systems
- [ ] **Advanced analytics** dashboard

## 🤝 Katkıda Bulunma

### Geliştirme Süreci
1. **Fork** projeyi
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** değişikliklerinizi (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

### Kod Standartları
- **TypeScript** kullanımı zorunlu
- **ESLint** kurallarına uyum
- **Jest** ile test coverage
- **Conventional commits** formatı

### Dokümantasyon
- **JSDoc** comments for functions
- **README** güncellemeleri
- **Changelog** maintenance
- **API documentation**

## 📄 Lisans ve Legal

### Lisans Bilgileri
Bu proje kapalı kaynak olarak geliştirilmiştir. Tüm hakları saklıdır.

### Kullanım Koşulları
- **Profesyonel kullanım**: Sadece lisanslı psikologlar/psikiyatristler
- **Eğitim amaçlı**: Supervised academic use allowed
- **Commercial use**: License required
- **Redistribution**: Prohibited without permission

### Yasal Uyarılar
- Test sonuçları tek başına tanı koymak için kullanılamaz
- Profesyonel süpervizyon gereklidir
- Klinik karar vermede destekleyici araç olarak kullanılmalıdır
- Danışan onayı ve bilgilendirilmiş rıza gereklidir

## 📞 İletişim ve Destek

### Teknik Destek
- **Email**: support@psikotestsystem.com
- **Issue Tracker**: GitHub Issues
- **Documentation**: [docs.psikotestsystem.com]
- **Community**: [forum.psikotestsystem.com]

### Geliştirici İletişim
- **Lead Developer**: [geliştirici-email]
- **Project Manager**: [pm-email]
- **UX Designer**: [ux-email]

---

**Geliştirici Notu**: Bu uygulama profesyonel psikolojik değerlendirme amacıyla tasarlanmıştır. Test sonuçları mutlaka lisanslı mental sağlık profesyoneli gözetiminde değerlendirilmelidir. Sistem, klinik karar verme sürecinde destekleyici bir araç olarak kullanılmalı, tek başına tanı koymak için kullanılmamalıdır.

**Son Güncelleme**: Ağustos 2025  
**Versiyon**: 1.0.0  
**Build**: Production Ready
