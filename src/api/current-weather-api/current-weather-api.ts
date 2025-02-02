import { API_KEY, BASE_URL } from '../../utils/const';
import { ForecastResponse, WeatherResponse} from '../../utils/types';


export const fetchWeatherByCityPerHours = async (city: string): Promise<ForecastResponse> => {
  const response = await fetch(`${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Error loading weather data');
  }

  return (await response.json()) as ForecastResponse;
};


export const fetchWeatherByCoordinates = async (latitude: number,longitude: number): Promise<WeatherResponse> => {
  const response = await fetch(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Error loading weather data');
  }

  return (await response.json()) as WeatherResponse;
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const response = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Error loading weather data');
  }

  return (await response.json()) as WeatherResponse;
};
