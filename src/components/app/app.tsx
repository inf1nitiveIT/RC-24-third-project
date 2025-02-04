import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import CurrentWeatherPage from '../../pages/current-weather-page/current-weather-page';
import { useEffect, useState } from 'react';
import { fetchWeatherByCoordinates } from '../../api/current-weather-api/current-weather-api';
import { WeatherResponse } from '../../utils/types';

function App() {
  const [geoWeather, setGeoWeather] = useState<WeatherResponse | null>(null);
  const [geoDenied, setGeoDenied] = useState<boolean>(false);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setGeoDenied(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
          .then(setGeoWeather)
          .catch(() => setGeoDenied(true));
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoDenied(true);
        }
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);


  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path={'/'} element={<MainPage geoWeather={geoWeather} geoDenied={geoDenied} />}/>
          <Route path="/weather/:city" element={<CurrentWeatherPage geoWeather={geoWeather} geoDenied={geoDenied}/>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

