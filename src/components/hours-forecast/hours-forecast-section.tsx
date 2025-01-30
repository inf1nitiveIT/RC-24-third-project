import { capitalizeFirstLetter, getWindDirectionIcon} from '../../utils/utils';
import { ForecastResponse } from '../../utils/types';

type HoursForecastProps = {
  hoursWeather: ForecastResponse | null;
};

function HoursForecastSection({ hoursWeather }: HoursForecastProps) {
  if (!hoursWeather) {
    return null;
  }
  const forecastData = hoursWeather.list
    .filter((item) => {
      const forecastDate = new Date(item.dt * 1000);
      const currentDate = new Date();
      return forecastDate.getDate() === currentDate.getDate();
    })
    .slice(0, 8)
    .map((item) => ({
      dt: item.dt,
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: `${Math.round(item.main.temp)}°C`,
      desctiption: item.weather[0].description,
      wind: `${Math.round(item.wind.speed)} m/s`,
      windDeg: item.wind.deg,
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">3-Hour Weather Forecast</h2>
      <div className="divide-y divide-gray-200">
        {forecastData.map((item) => (
          <div key={item.dt} className="py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={item.icon}
                alt="Weather Icon"
                className="w-20 h-20"
              />
              <div>
                <p className="text-xl font-medium">{item.time}</p>
                <p className=" text-gray-600"> {capitalizeFirstLetter(item.desctiption)}</p>
              </div>
            </div>
            <div>
              <p className="text-xl  font-bold text-center">{item.temp}</p>
              <div className='flex mt-2 gap-2'>
                <div>{getWindDirectionIcon(item.windDeg)}</div>
                <p className="text-base text-gray-600">{item.wind}</p>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default HoursForecastSection;
