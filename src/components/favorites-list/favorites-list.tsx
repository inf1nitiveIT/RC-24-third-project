import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAVORITES_KEY_FOR_LOCAL_STORAGE } from '../../utils/const';
import { FaTrash } from 'react-icons/fa';
import { fetchWeatherByCity } from '../../api/current-weather-api/current-weather-api';
import { formatTemperature } from '../../utils/utils';

interface WeatherData {
  [key: string]: {
    temp: number;
    icon: string;
  };
}

function FavoritesList() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData>({});

  const fetchWeatherData = async (cities: string[]) => {
    const newWeatherData: WeatherData = {};

    await Promise.all(
      cities.map(async (city) => {
        try {
          const data = await fetchWeatherByCity(city);
          newWeatherData[city] = {
            temp: data.main.temp,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          };
        } catch (error) {
          newWeatherData[city] = { temp: NaN, icon: '' };
        }
      })
    );

    setWeatherData(newWeatherData);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY_FOR_LOCAL_STORAGE);
    if (storedFavorites) {
      const cities = JSON.parse(storedFavorites) as string[];
      setFavorites(cities);
      fetchWeatherData(cities);
    }
  }, []);

  const onRemove = (city: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY_FOR_LOCAL_STORAGE, JSON.stringify(updatedFavorites));

    setWeatherData((prev) => {
      const updatedWeather = { ...prev };
      delete updatedWeather[city];
      return updatedWeather;
    });
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-gray-800 my-12">Favorite Cities</h2>
      <section className="p-6 my-12 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">

        {favorites.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {favorites.map((city) => (
              <li
                key={city}
                className="flex items-center justify-between p-4 hover:bg-blue-50 transition duration-200"
              >
                <Link to={`weather/${city}`} className="flex items-center gap-4 flex-1">
                  <img src={weatherData[city]?.icon || ''} alt="Weather Icon" className="w-14 h-14" />
                  <div>
                    <span className="text-lg font-medium text-gray-700">{city}</span>
                    <p className="text-blue-500 text-sm">
                      {Number.isNaN(weatherData[city]?.temp)
                        ? 'N/A'
                        : `${formatTemperature(weatherData[city]?.temp)}`}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => onRemove(city)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-red-500 rounded-full transition"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="my-6 text-gray-600 text-center">No favorite cities yet. Add some from the weather page.</p>
        )}
      </section>
    </>
  );
}

export default FavoritesList;
