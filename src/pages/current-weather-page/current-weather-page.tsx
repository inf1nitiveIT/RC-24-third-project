import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { ForecastResponse, WeatherResponse } from '../../utils/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherByCity, fetchWeatherByCityPerHours} from '../../api/current-weather-api/current-weather-api';
import CurrentForecastSection from '../../components/city-weather-page/current-forecast-section';
import HoursForecastSection from '../../components/hours-forecast/hours-forecast-section';
import DaysForecastSection from '../../components/days-forecast/days-forecast-section';

type HeaderProps = {
  geoWeather: WeatherResponse;
}

function CurrentWeatherPage ({geoWeather}: HeaderProps) {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [hoursWeather, setHoursWeather] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      return;
    }

    const loadWeather = async () => {
      setError(null);

      try {
        const currentData = await fetchWeatherByCity(city);
        const hoursData = await fetchWeatherByCityPerHours(city);

        setWeather(currentData);
        setHoursWeather(hoursData);
      } catch {
        setError('Ошибка загрузки данных.');
      }
    };

    loadWeather();
  }, [city]);


  if (error) {
    return (
      <p>{error}</p>
    );
  }
  if (!weather) {
    return;
  }

  return(
    <>
      <Helmet>
        <title>Pairwise</title>
      </Helmet>
      <Header geoWeather={geoWeather}/>
      <div className="min-h-screen  text-gray-800 py-10 px-4">
        <div className="max-w-6xl mx-auto grid gap-10">
          <CurrentForecastSection weather={weather} />
          <HoursForecastSection hoursWeather={hoursWeather}/>
          <DaysForecastSection hoursWeather={hoursWeather}/>
        </div>
      </div>
    </>
  );
}

export default CurrentWeatherPage;
