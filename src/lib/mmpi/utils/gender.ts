// MMPI Cinsiyet Normalizasyon Yardımcıları
// Cinsiyet değerlerini normalize eder ve doğrular

/**
 * Cinsiyet değerini normalize et
 */
export function normalizeGender(gender: string | undefined): 'Erkek' | 'Kadin' | undefined {
  if (!gender) return undefined;
  
  const normalized = gender.trim();
  
  // Türkçe değerler
  if (normalized === 'Erkek' || normalized === 'erkek' || normalized === 'ERKEK') {
    return 'Erkek';
  }
  
  if (normalized === 'Kadin' || normalized === 'Kadın' || normalized === 'kadin' || normalized === 'kadın' || normalized === 'KADIN' || normalized === 'KADIN') {
    return 'Kadin';
  }
  
  // İngilizce değerler
  if (normalized === 'Male' || normalized === 'male' || normalized === 'MALE' || normalized === 'M' || normalized === 'm') {
    return 'Erkek';
  }
  
  if (normalized === 'Female' || normalized === 'female' || normalized === 'FEMALE' || normalized === 'F' || normalized === 'f') {
    return 'Kadin';
  }
  
  console.warn(`Geçersiz cinsiyet değeri: ${gender}`);
  return undefined;
}

/**
 * Cinsiyet değerini doğrula
 */
export function validateGender(gender: string | undefined): gender is 'Erkek' | 'Kadin' {
  const normalized = normalizeGender(gender);
  return normalized === 'Erkek' || normalized === 'Kadin';
}

/**
 * Cinsiyet gerektiren ölçekler listesi
 */
export const GENDER_REQUIRED_SCALES = ['Mf'];

/**
 * Ölçek için cinsiyet gerekli mi kontrol et
 */
export function isGenderRequiredForScale(scaleId: string): boolean {
  return GENDER_REQUIRED_SCALES.includes(scaleId);
}