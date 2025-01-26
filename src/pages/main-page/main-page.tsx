import Header from '../../components/header/header';
import HeroSection from '../../components/hero-section/hero-section';
import { WeatherResponse } from '../../api/current-weather-api/current-weather-api';

type MainPageProps = {
  weather: WeatherResponse;
};

function MainPage ({weather}: MainPageProps) {

  return(
    <>
      <Header weather={weather}/>
      <HeroSection />
    </>
  );
}

export default MainPage;
