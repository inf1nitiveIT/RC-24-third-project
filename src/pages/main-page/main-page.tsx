import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CurrentWeatherSection from '../../components/current-weather-section/current-weather-section';

function MainPage () {
  return(
    <>
      <Helmet>
        <title>Pairwise</title>
      </Helmet>
      <Header />
      <CurrentWeatherSection />
    </>
  );
}

export default MainPage;
