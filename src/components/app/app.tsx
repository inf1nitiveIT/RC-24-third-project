import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={''} element={''}/>

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
