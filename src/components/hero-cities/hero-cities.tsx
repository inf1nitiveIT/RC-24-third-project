import { useEffect, useState } from 'react';
import { fetchWeatherByCity } from '../../api/current-weather-api/current-weather-api';
import { Link } from 'react-router-dom';
import { formatTemperature } from '../../utils/utils';

interface CityWeather {
  city: string;
  temp: number | null;
  icon?: string;
  error?: string;
}

interface HeroCitiesProps {
  cities: string[];
  mainHeading: string;
  featuredCity: string;
}

function HeroCities({ cities, mainHeading, featuredCity }: HeroCitiesProps) {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const data: CityWeather[] = await Promise.all(
          cities.map(async (city) => {
            try {
              const response = await fetchWeatherByCity(city);
              return { city, temp: response.main.temp, icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`};
            } catch (err) {
              return { city, temp: null, error: 'N/A' };
            }
          })
        );
        setWeatherData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cities]);

  const featuredWeather = weatherData.find(
    (data) => data.city.toLowerCase() === featuredCity.toLowerCase()
  );

  return (
    <div className="p-4 w-[400px]">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (

        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className='p-4 text-xl font-semibold'>{mainHeading}</h2>
          {featuredWeather && (
            <Link to={`weather/${featuredCity}`} className="group">
              <div className="relative overflow-hidden">
                <img
                  src={`/RC-24-third-project/img/${featuredCity}-background.jpeg`}
                  alt={featuredCity}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-6 transition-all duration-300 group-hover:bg-opacity-70">
                  <h2 className="text-white text-2xl font-bold">{featuredCity}</h2>
                  <div className="text-white mt-2">
                    <span className="text-3xl font-bold">
                      {featuredWeather.temp !== null
                        ? `${formatTemperature(featuredWeather.temp)}`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>


          )}
          <ul className="space-y-2">
            {weatherData.filter(({ city }) => city.toLowerCase() !== featuredCity.toLowerCase()).map(({ city, temp, error, icon }) => (
              <Link key={city} to={`/weather/${city}`} >
                <li
                  className="flex justify-between items-center bg-white shadow rounded p-4 hover:bg-blue-50"
                >
                  <span className=" text-lg">{city}</span>
                  {error ? (
                    <span className="text-red-500 text-sm">{error}</span>
                  ) : (
                    <div className="text-blue-500 flex items-center gap-2">
                      <img src={icon} alt="Weather Icon" className="w-8 h-8" />
                      <span className="min-w-[50px] text-right">{formatTemperature(temp)}</span>
                    </div>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeroCities;
