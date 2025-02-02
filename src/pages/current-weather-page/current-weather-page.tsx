import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { ForecastResponse, WeatherResponse } from '../../utils/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchWeatherByCity, fetchWeatherByCityPerHours} from '../../api/current-weather-api/current-weather-api';
import CurrentForecastSection from '../../components/city-weather-page/current-forecast-section';
import HoursForecastSection from '../../components/hours-forecast/hours-forecast-section';
import DaysForecastSection from '../../components/days-forecast/days-forecast-section';


type HeaderProps = {
  geoWeather: WeatherResponse | null;
  geoDenied: boolean;
}

function CurrentWeatherPage ({geoWeather, geoDenied}: HeaderProps) {
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
        setError('Error loading data for the selected city.');
      }
    };

    loadWeather();
  }, [city]);


  if (error) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <p className="text-center text-xl">{error}</p>
        <Link to={'/'}>
          <button className='bg-blue-500 rounded-xl p-4 font-semibold text-white hover:bg-blue-600 transition'>
          Select another city
          </button>
        </Link>
      </div>

    );
  }
  if (!weather) {
    return;
  }

  return(
    <>
      <Helmet>
        <title>{city}</title>
      </Helmet>
      <Header geoWeather={geoWeather} geoDenied={geoDenied}/>
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
