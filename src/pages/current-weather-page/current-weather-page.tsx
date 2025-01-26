import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CityWeatherPage from '../../components/city-weather-page/city-weather-page';
import { WeatherResponse } from '../../api/current-weather-api/current-weather-api';

type HeaderProps = {
  weather: WeatherResponse;
}

function CurrentWeatherPage ({weather}: HeaderProps) {
  return(
    <>
      <Helmet>
        <title>Pairwise</title>
      </Helmet>
      <Header weather={weather}/>
      <CityWeatherPage />
    </>
  );
}

export default CurrentWeatherPage;
