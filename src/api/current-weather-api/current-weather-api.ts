interface WeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
  cod: number;
  message?: string;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const API_KEY = '7fcaf0b2625d5971e6386ed34438d53c';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = (await response.json()) as WeatherResponse;


    if (!response.ok) {
      throw new Error(data.message || 'Ошибка загрузки данных.');
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || 'Неизвестная ошибка сети.');
    }
    throw new Error('Неизвестная ошибка.');
  }
};
