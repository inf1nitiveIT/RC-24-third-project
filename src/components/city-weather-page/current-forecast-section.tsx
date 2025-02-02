import { WeatherResponse } from '../../utils/types';
import { capitalizeFirstLetter, formatForCurrentDate, formatTemperature, getWindDirectionIcon } from '../../utils/utils';
import { FaSun, FaTint, FaThermometerHalf, FaEye, FaCloud, FaArrowUp, FaCog } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import SettingsModalWindow from '../settings-modal-window/settings-modal-window';
import { FAVORITES_KEY } from '../../utils/const';
import { FaStar } from 'react-icons/fa';

type CurrentForecastProps = {
  weather: WeatherResponse;
}

const loadInitialSettings = (): { [key: string]: boolean } => {
  const savedSettings = localStorage.getItem('userSettings');
  return savedSettings ? (JSON.parse(savedSettings) as { [key: string]: boolean }) : {
    feelsLike: false,
    humidity: true,
    sunrise: false,
  };
};

function CurrentForecastSection({weather}: CurrentForecastProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>(loadInitialSettings);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites) as string[]);
    }
  }, []);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(weather.name)) {
      updatedFavorites = favorites.filter((fav) => fav !== weather.name);
    } else {
      updatedFavorites = [...favorites, weather.name];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };


  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(toggles));
  }, [toggles]);

  const handleToggleChange = (id: string) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [id]: !prevToggles[id],
    }));
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg shadow-xl p-8 text-gray-900 relative">
      <button className="absolute top-4 right-4 p-2 bg-blue-200 rounded-full shadow-lg hover:bg-gray-200" onClick={() => setIsModalOpen(true)}>
        <FaCog className="w-6 h-6 text-gray-700" />
      </button>

      {isModalOpen && (
        <SettingsModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} toggles={toggles} onToggleChange={handleToggleChange}/>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between">
        {/* Left Section */}
        <div className="sm:w-2/5 text-center sm:text-left mb-6 sm:mb-0">
          <div className='flex items-start '>
            <h1 className="text-4xl font-semibold mb-2">{weather.name}</h1>
            <button
              className="px-4  text-yellow-500"
              onClick={toggleFavorite}
            >
              <FaStar size={30} className={favorites.includes(weather.name) ? 'fill-amber-500' : 'fill-gray-400'} />
            </button>
          </div>
          <p className="text-sm text-gray-700">{formatForCurrentDate(weather.dt, weather.timezone)}</p>
          <div className="mt-4">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-28 h-28"
                />
                <div>
                  <p className="text-5xl font-extrabold">{formatTemperature(weather.main.temp)}</p>
                  <p className="text-xl text-gray-700">{capitalizeFirstLetter(weather.weather[0].description)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="sm:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-6 text-base text-gray-700">
          {toggles.feelsLike && (
            <div className="flex items-center gap-4">
              <FaThermometerHalf className="w-6 h-6 text-gray-700" />
              <div>
                <p className="font-medium">Feels Like</p>
                <p>{formatTemperature(weather.main.feels_like)}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            {getWindDirectionIcon(weather.wind.deg)}
            <div>
              <p className="font-medium">Wind</p>
              <p>{Math.round(weather.wind.speed)} m/s {}</p>
            </div>
          </div>
          {toggles.humidity && (
            <div className="flex items-center gap-4">
              <FaTint className="w-6 h-6 text-gray-700" />
              <div>
                <p className="font-medium">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <FaArrowUp className="w-6 h-6 text-gray-700" />
            <div>
              <p className="font-medium">Pressure</p>
              <p>{weather.main.pressure} hPa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaEye className="w-6 h-6 text-gray-700" />
            <div>
              <p className="font-medium">Visibility</p>
              <p>{weather.visibility / 1000} km</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaCloud className="w-6 h-6 text-gray-700" />
            <div>
              <p className="font-medium">Clouds</p>
              <p>{weather.clouds.all}%</p>
            </div>
          </div>
          {toggles.sunrise && (
            <>
              <div className="flex items-center gap-4">
                <FaSun className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-medium">Sunrise</p>
                  <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaSun className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-medium">Sunset</p>
                  <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
              </div>
            </>)}

        </div>

      </div>
    </div>


  );
}

export default CurrentForecastSection;
