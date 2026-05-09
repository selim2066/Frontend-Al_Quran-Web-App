const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  translated_name: string; // ⚠️ plain string now — was { name: string } before
}

export interface Ayah {
  id: number;
  surah_id: number;
  verse_number: number;
  verse_key: string;
  text_madani: string;
  translation_text: string;
  translation_source: string;
}

export async function fetchSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/api/surahs`);
  const data = await res.json();
  return data.chapters;
}

export async function fetchAyahs(surahId: number): Promise<Ayah[]> {
  const res = await fetch(`${BASE_URL}/api/ayahs/${surahId}`);
  const data = await res.json();
  return data.verses;
}

export async function searchAyahs(query: string) {
  const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.search.results;
}