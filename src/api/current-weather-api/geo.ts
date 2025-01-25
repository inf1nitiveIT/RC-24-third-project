export interface GeoSuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const fetchCitySuggestions = async (query: string): Promise<GeoSuggestion[]> => {
  const API_KEY = '7fcaf0b2625d5971e6386ed34438d53c';
  const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}&lang=ru`);
    const data = (await response.json()) as GeoSuggestion[];

    return data;
  } catch (error) {
    throw new Error('Ошибка загрузки подсказок.');
  }
};
