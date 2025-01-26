import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherByCity, WeatherResponse } from '../../api/current-weather-api/current-weather-api';

export default function CityWeatherPage() {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      return;
    }

    const loadWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherByCity(city);
        setWeather(data);
      } catch {
        setError('Ошибка загрузки данных.');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return (
      <p className='text-center mt-10'>Загрузка данных...</p>
    );
  }
  if (error) {
    return (
      <p>{error}</p>
    );
  }
  if (!weather) {
    return;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Погода в городе {weather.name}</h1>
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex-[1] md:flex-[0.5] p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 1</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 2</h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Влажность: {weather.main.humidity}%</p>
          <p>Скорость ветра: {weather.wind.speed} м/с</p>
          <p>Описание: {weather.weather[0].description}</p>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 3</h2>
          <p>Контент для третьей секции.</p>
        </div>
      </div>

      {}
    </div>
  );
}
