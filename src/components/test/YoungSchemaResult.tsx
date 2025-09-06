import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

interface YoungSchemaResultProps {
  testSonucu: any;
}

// Young Şema Ölçeği alt ölçekleri
const YOUNG_SCHEMA_ALT_OLCEKLER = {
  "duygusal_yoksunluk": {
    "ad": "Duygusal Yoksunluk", 
    "sorular": [1, 19, 37, 55, 73],
    "soruMetinleri": {
      1: "Hiç kimse beni gerçekten sevmiyor.",
      19: "Özel yaşamımda bana gerçekten önem veren kimse yok.",
      37: "Duygusal olarak beni gerçekten anlayan kimse yok.",
      55: "Çoğu zaman kendimi yalnız hissediyorum.",
      73: "Hiç kimse benim gerçekte nasıl bir insan olduğumu bilmiyor."
    }
  },
  "terk_edilme": {
    "ad": "Terk Edilme", 
    "sorular": [2, 20, 28, 38, 74],
    "soruMetinleri": {
      2: "Bana yakın olan insanlar beni terk edebilirler diye endişe ederim.",
      20: "Tek başıma kalamam diye korkuyorum.",
      28: "Beni seven insanların benden uzaklaşacağından korkarım.",
      38: "Bana yakın olan insanları kaybetme konusunda endişe duyarım.",
      74: "İnsanlar beni terk ederse ne yapacağımı bilemem."
    }
  },
  "sosyal_izolasyon": {
    "ad": "Sosyal İzolasyon/Güvensizlik",
    "sorular": [3, 4, 40, 57, 58, 75, 76],
    "soruMetinleri": {
      3: "İnsanlardan uzak durmayı tercih ederim.",
      4: "Başka insanlardan farklı olduğumu hissediyorum.",
      40: "Diğer insanlarla yakınlık kurmakta zorlanırım.",
      57: "Çoğu insanın beni sevmeyeceğini hissediyorum.",
      58: "Diğer insanlarla olan ilişkilerimde kendimi güvende hissetmiyorum.",
      75: "Sosyal durumlarda kendimi rahatsız hissederim.",
      76: "İnsanlar beni tanıyınca beni reddedeceklerdir."
    }
  },
  "kusurluluk": {
    "ad": "Kusurluluk",
    "sorular": [23, 41, 43, 59, 77, 90],
    "soruMetinleri": {
      23: "Temel olarak kusurlu bir insanım.",
      41: "Hiçbir şeyi doğru yapamıyorum.",
      43: "İnsanlar beni gerçekten tanısalar sevmezlerdi.",
      59: "Kendimi diğer insanlardan daha aşağı görürüm.",
      77: "Utanacak çok şeyim var.",
      90: "Sevilmeye değer bir insan değilim."
    }
  },
  "basarisizlik": {
    "ad": "Başarısızlık",
    "sorular": [6, 24, 33, 42, 60, 78],
    "soruMetinleri": {
      6: "Çoğu alanda diğer insanlar kadar yetenekli değilim.",
      24: "Diğer insanlar kadar zeki değilim.",
      33: "İş yaşamında diğer insanlar kadar başarılı değilim.",
      42: "Temelde başarısız bir insanım.",
      60: "Diğer insanlar kadar yetenekli değilim.",
      78: "Hemen hemen her şeyde diğer insanlardan daha kötüyüm."
    }
  },
  "ic_ice_gecme": {
    "ad": "İç içe Geçme/Bağımlılık",
    "sorular": [7, 9, 10, 25, 63, 64, 79, 81, 82],
    "soruMetinleri": {
      7: "Kendi başıma karar alamam.",
      9: "Günlük yaşamımı yürütmek için başkalarının yardımına ihtiyacım var.",
      10: "Kendi başıma bir şeyler yapabileceğime inanmıyorum.",
      25: "Diğer insanlar olmadan çok az şey yapabilirim.",
      63: "Kendi başıma olmayı sevmiyorum.",
      64: "Kendimi beceriksiz biri olarak görüyorum.",
      79: "Ailem olmadan nasıl yaşayacağımı bilmiyorum.",
      81: "Kendi kararlarıma güvenmiyor, başkalarının tavsiyelerine ihtiyaç duyuyorum.",
      82: "Başkalarının bana ne yapacağımı söylemelerini tercih ederim."
    }
  },
  "karamsarlik": {
    "ad": "Karamsarlık", 
    "sorular": [8, 17, 26, 35, 80],
    "soruMetinleri": {
      8: "Hayatta işler ters gidecek diye endişe ederim.",
      17: "Kötü bir şeylerin olacağından korkarım.",
      26: "Finansal güvenliğimi kaybedeceğimden ve fakir kalacağımdan korkarım.",
      35: "Denetimimi kaybedeceğimden korkarım.",
      80: "Büyük bir felaket her an başıma gelebilir."
    }
  },
  "kendini_feda": {
    "ad": "Kendini Feda",
    "sorular": [11, 29, 47, 65, 83],
    "soruMetinleri": {
      11: "Diğer insanların ihtiyaçlarını kendi ihtiyaçlarımdan daha önemli görürüm.",
      29: "Diğer insanları mutlu etmek için kendi ihtiyaçlarımı ihmal ederim.",
      47: "Başkaları için çok fazla şey yapıyorum.",
      65: "Diğer insanlar beni bencil olarak görmesinler diye kendi isteklerimi geri plana atarım.",
      83: "En yakın olduğum insanlar beni kullanır."
    }
  },
  "duygulari_bastirma": {
    "ad": "Duyguları Bastırma",
    "sorular": [12, 30, 48, 66, 84],
    "soruMetinleri": {
      12: "Duygularımı kontrol etmekte zorlanırım.",
      30: "Kızgınlığımı göstermekten kaçınırım.",
      48: "İnsanlar duygusal tepkilerimi abartılı bulur.",
      66: "Doğal tepkilerimi göstermekten korkarım.",
      84: "Olumsuz duygularımı saklamaya çalışırım."
    }
  },
  "yuksek_standartlar": {
    "ad": "Yüksek Standartlar",
    "sorular": [13, 14, 31],
    "soruMetinleri": {
      13: "Yaptığım çoğu şeyde en iyi olmalıyım; ikinci olmayı kabullenemem.",
      14: "Diğer insanlardan bir şeyler istediğimde bana 'hayır' denilmesini çok zor kabullenirim.",
      31: "En iyisini yapmalıyım, 'yeterince iyi' ile yetinemem."
    }
  },
  "ayricaliklilik": {
    "ad": "Ayrıcalıklılık/Yetersiz Özdenetim",
    "sorular": [15, 22, 32, 50, 51, 68, 69],
    "soruMetinleri": {
      15: "İstediğimi alamadığımda çok sinirleniyorum.",
      22: "Dürtülerimi kontrol etmekte zorlanırım.",
      32: "Sıkıcı olan günlük görevleri yapmaya katlanamam.",
      50: "Diğer insanların uyması gereken kurallar beni bağlamaz.",
      51: "Sıkıcı şeylerle uğraşmamalıyım.",
      68: "İstediğimi hemen alamayınca sabrımı kaybederim.",
      69: "Kendimi kontrol edemediğim zamanlar oluyor."
    }
  },
  "onay_arayicilik": {
    "ad": "Onay Arayıcılık", 
    "sorular": [16, 34, 52, 56, 70, 88],
    "soruMetinleri": {
      16: "Diğer insanların onayını almak benim için çok önemli.",
      34: "Diğer insanlara hoş görünmek için çok çaba sarf ederim.",
      52: "Diğer insanların beni beğenmesi çok önemli.",
      56: "Diğer insanların dikkatini çekmek isterim.",
      70: "İmaj ve statü benim için çok önemli.",
      88: "Başarılarım diğer insanlar tarafından fark edilmelidir."
    }
  },
  "cezalandirilma": {
    "ad": "Cezalandırılma",
    "sorular": [18, 49, 53, 54, 72, 89],
    "soruMetinleri": {
      18: "Hata yaptığımda cezalandırılmayı hak ederim.",
      49: "Yaptığım yanlışları affetmem.",
      53: "Diğer insanların hatalarını affetmekte zorlanırım.",
      54: "İnsanlar yaptıkları yanlışlar için mutlaka cezalandırılmalı.",
      72: "Kendimden çok şey bekliyorum.",
      89: "Başkalarından da kendimden beklediğim kadar çok şey bekliyorum."
    }
  },
  "tehditler_dayaniklilik": {
    "ad": "Tehditler Karşısında Dayanıksızlık",
    "sorular": [21, 39, 44, 62, 71],
    "soruMetinleri": {
      21: "Bir an kendimi güvende hissetsem bile bunun sürmeyeceğini biliyorum.",
      39: "Sağlığımı kaybedeceğimden korkarım.",
      44: "Büyük bir hastalığa yakalanacağımdan korkarım.",
      62: "Sevdiklerimin başına kötü şeyler geleceğinden korkarım.",
      71: "Büyük bir doğal afet olacağından korkarım."
    }
  }
};

const getPuanRengi = (puan: number) => {
  if (puan === 1) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (puan === 2) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  if (puan === 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  if (puan === 4) return 'bg-green-500 text-white dark:bg-green-600';
  if (puan === 5) return 'bg-orange-500 text-white dark:bg-orange-600';
  if (puan === 6) return 'bg-red-500 text-white dark:bg-red-600';
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
};

export const YoungSchemaResult: React.FC<YoungSchemaResultProps> = ({ testSonucu }) => {
  const [acikAltOlcekler, setAcikAltOlcekler] = useState<string[]>([]);

  // Cevapları map'e çevir kolay erişim için
  const cevapMap = new Map<number, number>();
  testSonucu.cevaplar.forEach((cevap: any) => {
    cevapMap.set(parseInt(cevap.soruId), cevap.verilenPuan);
  });

  const altOlcekAcKapat = (altOlcekId: string) => {
    setAcikAltOlcekler(prev => 
      prev.includes(altOlcekId) 
        ? prev.filter(id => id !== altOlcekId)
        : [...prev, altOlcekId]
    );
  };

  return (
    <div className="space-y-6 p-6 min-h-screen bg-background">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Young Şema Ölçeği Sonuçları</h2>
        <p className="text-muted-foreground text-lg">Alt ölçek puanları ve soru detayları</p>
      </div>

      {Object.entries(YOUNG_SCHEMA_ALT_OLCEKLER).map(([altOlcekId, altOlcek]) => {
        // Bu alt ölçeğin toplam puanını hesapla
        let toplamPuan = 0;
        altOlcek.sorular.forEach(soruNo => {
          const puan = cevapMap.get(soruNo) || 0;
          toplamPuan += puan;
        });

        const maxPuan = altOlcek.sorular.length * 6; // Her soru max 6 puan
        const acikMi = acikAltOlcekler.includes(altOlcekId);

        return (
          <Card key={altOlcekId} className="border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
              onClick={() => altOlcekAcKapat(altOlcekId)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {altOlcek.ad}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {toplamPuan}<span className="text-muted-foreground">/{maxPuan}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {altOlcek.sorular.length} soru
                    </div>
                  </div>
                  {acikMi ? (
                    <ChevronUp className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  )}
                </div>
              </div>
            </CardHeader>

            {acikMi && (
              <CardContent className="pt-0 pb-6">
                <div className="space-y-4">
                  {altOlcek.sorular.map(soruNo => {
                    const puan = cevapMap.get(soruNo) || 0;
                    const soruMetni = altOlcek.soruMetinleri[soruNo];
                    
                    return (
                      <div key={soruNo} className="border-l-4 border-primary/30 pl-6 py-3 bg-muted/20 rounded-r-lg hover:bg-muted/40 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-medium text-foreground text-base leading-relaxed">
                              <span className="font-bold text-primary">{soruNo}.</span> {soruMetni}
                            </div>
                          </div>
                          <div className={`px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getPuanRengi(puan)}`}>
                            {puan} puan
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

    </div>
  );
};
