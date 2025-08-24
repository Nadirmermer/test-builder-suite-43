// URL Helper Functions for SEO-friendly URLs

/**
 * Danışan adını URL-friendly format'a çevirir
 * @param name - Danışan adı
 * @returns URL-safe string
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldır
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tireye çevir
    .trim()
    .replace(/^-|-$/g, ''); // Başındaki ve sonundaki tireleri kaldır
}

/**
 * Danışan için SEO-friendly URL oluşturur
 * @param name - Danışan adı
 * @param id - Danışan ID'si
 * @returns SEO-friendly URL path
 */
export function createDanisanUrl(name: string, id: number): string {
  const slug = slugify(name);
  return `/danisan/${slug}-${id}`;
}

/**
 * URL'den danışan ID'sini extract eder
 * @param urlParam - URL parameter (slug-id formatında)
 * @returns Danışan ID'si
 */
export function extractDanisanIdFromUrl(urlParam: string): number {
  const parts = urlParam.split('-');
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  
  if (isNaN(id)) {
    throw new Error('Geçersiz danışan URL formatı');
  }
  
  return id;
}

/**
 * Test raporu için SEO-friendly URL oluşturur
 * @param testAdi - Test adı
 * @param id - Test sonucu ID'si
 * @returns SEO-friendly URL path
 */
export function createRaporUrl(testAdi: string, id: number): string {
  const slug = slugify(testAdi);
  return `/rapor/${slug}-${id}`;
}

/**
 * URL'den rapor ID'sini extract eder
 * @param urlParam - URL parameter (slug-id formatında)
 * @returns Rapor ID'si
 */
export function extractRaporIdFromUrl(urlParam: string): number {
  const parts = urlParam.split('-');
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  
  if (isNaN(id)) {
    throw new Error('Geçersiz rapor URL formatı');
  }
  
  return id;
}