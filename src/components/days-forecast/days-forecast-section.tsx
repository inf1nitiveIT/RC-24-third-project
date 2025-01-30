import { formatForDaysForecast } from '../../utils/utils';
import { ForecastResponse } from '../../utils/types';

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Days Weather Forecast</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {forecastData.map((item) => (
          <div
            key={item.dt}
            className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition"
          >
            <img
              src={item.icon}
              alt="Weather Icon"
              className="w-16 h-16 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{formatForDaysForecast(item.timeZone)}</h3>
            <p className="text-xl font-bold my-2">{item.temp}</p>
            <p className="text-sm text-gray-600">Rain: {item.rain}</p>
            <p className="text-sm text-gray-600">💨 Wind: {item.wind}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaysForecastSection;
