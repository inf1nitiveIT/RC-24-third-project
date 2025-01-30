import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import CurrentWeatherPage from '../../pages/current-weather-page/current-weather-page';
import { useEffect, useState } from 'react';
import { fetchWeatherByCoordinates } from '../../api/current-weather-api/current-weather-api';
import { WeatherResponse } from '../../utils/types';

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [geoWeather, setGeoWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError('Геолокация не поддерживается вашим браузером');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);

          fetchWeatherByCoordinates(coords.latitude, coords.longitude)
            .then((weatherData) => {
              setGeoWeather(weatherData);
            })
            .catch((err) => {
              setError(err instanceof Error ? err.message : 'Ошибка загрузки данных о погоде.');
            })
            .finally(() => {
              setLoading(false);
            });
        },
        (err) => {
          setError(err.message || 'Не удалось получить местоположение пользователя.');
          setLoading(false);
        }
      );
    };

    getUserLocation();
  }, []);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!latitude || !longitude || !geoWeather) {
    return <p>Нет данных для отображения.</p>;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainPage geoWeather={geoWeather} />}/>
          <Route path="/weather/:city" element={<CurrentWeatherPage geoWeather={geoWeather}/>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

