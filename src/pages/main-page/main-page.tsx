import Header from '../../components/header/header';
import HeroSection from '../../components/hero-section/hero-section';
import { WeatherResponse } from '../../api/current-weather-api/current-weather-api';
import HeroCities from '../../components/hero-cities/hero-cities';
import { CITIES_OF_RUSSIA, CAPITAL_CITIES, CITIES_OF_EUROPE } from '../../utils/const';

type MainPageProps = {
  weather: WeatherResponse;
};

function MainPage ({weather}: MainPageProps) {

  return(
    <>
      <Header weather={weather}/>
      <HeroSection />
      <div className='mt-12'>
        <h1 className='text-center font-semibold text-2xl'>Popular cities</h1>
        <div className='flex justify-center items-center flex-wrap'>
          <HeroCities cities={CITIES_OF_RUSSIA} mainHeading={'Russian cities'} featuredCity={'Moscow'} />
          <HeroCities cities={CAPITAL_CITIES} mainHeading={'Capital Cities'} featuredCity={'Minsk'} />
          <HeroCities cities={CITIES_OF_EUROPE} mainHeading={'Cities of Europe'} featuredCity={'Berlin'} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
