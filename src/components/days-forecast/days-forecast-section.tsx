import { formatForDaysForecast } from '../../utils/utils';
import { ForecastResponse } from '../../utils/types';
import { LuCloudRain } from 'react-icons/lu';
import { WiStrongWind } from 'react-icons/wi';

type DaysForecastProps = {
  hoursWeather: ForecastResponse | null;
};

function DaysForecastSection({hoursWeather} : DaysForecastProps) {
  if (!hoursWeather) {
    return null;
  }

  const forecastData = hoursWeather.list
    .filter((item) => {
      const forecastDate = new Date(item.dt * 1000);
      const currentDate = new Date();

      return (
        forecastDate.getDate() !== currentDate.getDate() &&
        forecastDate.getHours() === 18
      );
    })
    .slice(0, 4)
    .map((item) => ({
      dt: item.dt,
      timeZone: item.dt_txt,
      temp: `${Math.round(item.main.temp)}°C`,
      rain: item.rain ? `${item.rain['3h']} mm` : '0 mm',
      wind: `${Math.round(item.wind.speed)} m/s`,
      windDeg: item.wind.deg,
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));

  return(
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Days Forecast</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {forecastData.map((item) => (
          <div
            key={item.dt}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={item.icon}
              alt="Weather Icon"
              className="w-20 h-20 mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-700">{formatForDaysForecast(item.timeZone)}</h3>
            <p className="text-2xl font-extrabold text-blue-600 my-2">{item.temp}</p>
            <div className="flex items-center justify-center gap-2 text-gray-600 ">
              <LuCloudRain className="text-lg " />
              <p className="text-sm font-medium">Rain: {item.rain}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 mt-1">
              <WiStrongWind className="text-xl" />
              <p className="text-sm font-medium">Wind: {item.wind}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaysForecastSection;
