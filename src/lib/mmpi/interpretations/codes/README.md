# MMPI Kod Analizi Sistemi

Bu dosya MMPI kod interpretasyonlarının modüler organizasyonunu ve eklenen kodların listesini içerir.

## 📁 Dosya Yapısı

```
codes/
├── types.ts           # Ortak tip tanımlamaları
├── singleCodes.ts     # Tekli kod interpretasyonları (1, 2, 3, ...)
├── twoCodes.ts        # İkili kod interpretasyonları (12, 13, 14, ...)
├── threeCodes.ts      # Üçlü kod interpretasyonları (123, 127, 132, ...)
├── fourCodes.ts       # Dörtlü kod interpretasyonları (1234, 1236, 1237, ...)
├── fiveCodes.ts       # Beşli kod interpretasyonları (12370, 12378, ...)
└── README.md          # Bu dosya
```

## ✅ Eklenen Kodlar Listesi

### **Tekli Kodlar (1 kod)**
- **1** - Yüksek 1/Düşük 4 özel durumu

### **İkili Kodlar (9 kod)**
- **12/21** - Depresif duygudurum + somatik yakınmalar
- **13/31** - Ana kod + Yüksek K + Düşük 2 varyasyonları (3 varyasyon)
- **14/41** - Kronik hipokondriyak uyum
- **146** - Antisosyal özellikler ve impuls kontrol
- **1469** - Hostilite ve impulsivite
- **15/51** - Pasif yaşam biçimi
- **16/61** - Katı, inatçı kişilik
- **17/71** - Kronik gerginlik ve kaygı
- **18/81** - Somatik delüzyonlar

### **Üçlü Kodlar (8 kod)**
- **123** - Konversif semptomlar
- **127** - Artmış anksiyete ve bağımlılık
- **132/312** - Zayıflık, yorgunluk ve gizli depresyon
- **134/314** - İnatçılık ve züppelik
- **136/316** - Benmerkezcil ve narsisistik
- **137** - Esneklik eksikliği
- **138/318** - Borderline kişilik bozukluğu
- **139** - Çoklu somatik yakınmalar

### **Dörtlü Kodlar (5 kod)**
- **1234** - Ana kod + T-skor farkı kontrolü ile 2134 yönlendirmesi
- **1236** - Somatik + paranoid eğilimler
- **1237** - Karma nevrotik bozukluk
- **1342** - Bağımlı, immatür kişilik
- **1382** - Şiddetli depresyon + sosyal uyumsuzluk

### **Beşli Kodlar (2 kod)**
- **12370** - Depresyon, anksiyete ve sosyal geri çekilme
- **12378** - Şiddetli nevrotik bozukluk

## 📊 İstatistikler

- **Toplam Kod Sayısı:** 25+ kod
- **Tamamlanma Oranı:** ~17% (Hedef: 150+ kod)
- **Kalan Kod Sayısı:** ~125 kod

## 🔧 Teknik Özellikler

### **Otomatik Kontroller**
- ✅ T-skor farkı kontrolü (5+ puan fark)
- ✅ Yüksek K kontrolü
- ✅ Düşük alt test kontrolleri
- ✅ Cinsiyet özel durumları

### **Veri Yapısı**
- ✅ Klinik önemi (clinicalSignificance)
- ✅ Karakteristik özellikler (characteristics)
- ✅ Olası tanılar (possibleDiagnoses)
- ✅ Tedavi önerileri (therapeuticImplications)
- ✅ Cinsiyet özel notları (genderSpecific)
- ✅ Ek notlar (additionalNotes)
- ✅ Demografik notlar (demographicNotes)

### **Alternatif Kod Desteği**
- ✅ 13/31, 12/21 gibi çift yönlü kodlar
- ✅ Otomatik kod routing
- ✅ T-skor tabanlı alternatif seçimi

## 🚀 Modüler Yapının Avantajları

1. **Yönetilebilirlik:** Her dosya tek sorumluluğa sahip
2. **Ölçeklenebilirlik:** Yeni kodlar kolayca eklenebilir
3. **Test Edilebilirlik:** Her modül ayrı test edilebilir
4. **Paralel Çalışma:** Farklı kod türleri eşzamanlı geliştirilebilir
5. **Kod İncelemesi:** Değişiklikler daha kolay takip edilebilir

## 📝 Kod Ekleme Rehberi

### Yeni İkili Kod Ekleme
```typescript
// twoCodes.ts içinde
case '19':
case '91': {
  return {
    code: code,
    alternativeCode: code === '19' ? '91' : '19',
    description: '19/91 Kodu',
    characteristics: [...],
    clinicalSignificance: '...',
    // ... diğer alanlar
  };
}
```

### Cinsiyet Özel Durumları
```typescript
genderSpecific: {
  male: [
    'Erkeklerde görülen özellik 1',
    'Erkeklerde görülen özellik 2'
  ],
  female: [
    'Kadınlarda görülen özellik 1',
    'Kadınlarda görülen özellik 2'
  ]
}
```

### T-Skor Kontrolü
```typescript
if (scales.K && scales.K.tScore >= 70) {
  // Yüksek K durumu
}

if (scales.scale2 && scales.scale2.tScore < 65) {
  // Düşük 2 durumu
}
```

## 🎯 Gelecek Hedefler

1. **Kalan 125+ kod** eklenmesi
2. **Altılı-Yedili kod** kategorileri
3. **Özel durumlar** ve **koşullu routing**
4. **Test kapsamı** genişletilmesi
5. **Performans optimizasyonu**

## 📞 Destek

Manuel içerik eklemek için her kod tipinin ilgili dosyasını düzenleyin:
- Tekli kodlar → `singleCodes.ts`
- İkili kodlar → `twoCodes.ts`
- Üçlü kodlar → `threeCodes.ts`
- Dörtlü kodlar → `fourCodes.ts`
- Beşli kodlar → `fiveCodes.ts`

**Manuel içeriğin %100 korunması kritik öncelik!**