import Header from '../../components/header/header';
import HeroSection from '../../components/hero-section/hero-section';
import { WeatherResponse } from '../../utils/types';
import HeroCities from '../../components/hero-cities/hero-cities';
import { CITIES_OF_RUSSIA, CAPITAL_CITIES, CITIES_OF_EUROPE } from '../../utils/const';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { Helmet } from 'react-helmet-async';


type MainPageProps = {
  geoWeather: WeatherResponse | null;
  geoDenied: boolean;
};


function MainPage ({geoWeather, geoDenied}: MainPageProps) {
  return(
    <>
      <Helmet>
        <title>D.Weather</title>
      </Helmet>
      <Header geoWeather={geoWeather} geoDenied={geoDenied}/>
      <HeroSection />
      <div className='mt-12'>
        <h1 className='text-center font-semibold text-3xl'>Popular cities</h1>
        <div className='flex justify-center items-center flex-wrap'>
          <HeroCities cities={CITIES_OF_RUSSIA} mainHeading={'Russian cities'} featuredCity={'Moscow'} />
          <HeroCities cities={CAPITAL_CITIES} mainHeading={'Capital Cities'} featuredCity={'Minsk'} />
          <HeroCities cities={CITIES_OF_EUROPE} mainHeading={'Cities of Europe'} featuredCity={'Berlin'} />
        </div>
      </div>
      <FavoritesList />

    </>
  );
}

export default MainPage;
