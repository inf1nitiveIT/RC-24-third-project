import { FaArrowUp } from 'react-icons/fa';

const formatTemperature = (temp: number | null): string => temp !== null ? `${(temp - 273).toFixed(0)}°C` : 'N/A';

const formatForCurrentDate = (dt: number, timezone: number): string => {
  const localDate = new Date((dt + timezone) * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return localDate.toLocaleDateString('en-US', options);
};

function formatForDaysForecast(dateStr: string): string {
  const date = new Date(dateStr);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${daysOfWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getWindDirectionIcon = (deg:number) => {
  const directions = [
    { dir: 'N', rotation: 0 },
    { dir: 'NE', rotation: 45 },
    { dir: 'E', rotation: 90 },
    { dir: 'SE', rotation: 135 },
    { dir: 'S', rotation: 180 },
    { dir: 'SW', rotation: 225 },
    { dir: 'W', rotation: 270 },
    { dir: 'NW', rotation: 315 },
  ];

  const closestDirection = directions.reduce((prev, curr) =>
    Math.abs(deg - curr.rotation) < Math.abs(deg - prev.rotation) ? curr : prev
  );

  return (
    <FaArrowUp
      style={{
        transform: `rotate(${closestDirection.rotation}deg)`,
        transition: 'transform 0.3s ease',
      }}
      className="text-gray-700 w-6 h-6"
    />
  );
};


export {formatTemperature, formatForCurrentDate, capitalizeFirstLetter, getWindDirectionIcon, formatForDaysForecast};
