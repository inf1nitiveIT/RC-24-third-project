import { API_KEY, BASE_URL } from '../../utils/const';

export interface WeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
  cod: number;
  message?: string;
}

export const fetchWeatherByCoordinates = async (latitude: number,longitude: number): Promise<WeatherResponse> => {
  const response = await fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки данных о погоде');
  }

  return (await response.json()) as WeatherResponse;
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
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
