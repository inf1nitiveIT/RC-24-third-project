import Logo from './logo';
import { WeatherResponse } from '../../utils/types';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type HeaderProps = {
  geoWeather: WeatherResponse;
}

function Header({geoWeather}: HeaderProps) {
  return (
    <div className='flex justify-between px-10 py-5 text-black text-xl font-semibold bg-white'>
      <Logo />
      <Link to={`/weather/${geoWeather.name}`}>
        <div className='flex items-center justify-center gap-2 hover:text-blue-500 transition'>
          <BsFillGeoAltFill size={20} color="#000" />
          <p>{geoWeather.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default Header;
