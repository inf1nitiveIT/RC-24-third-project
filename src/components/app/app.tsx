import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={''} element={<MainPage />}/>

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
