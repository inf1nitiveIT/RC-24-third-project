import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection () {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCity(evt.target.value);
    setError('');
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    navigate(`/weather/${city}`);
  };

  return(

    <div
      className="flex  justify-center bg-cover bg-center bg-background-pattern my-6 py-8"
    >
      <div className="bg-white bg-opacity-75 rounded-2xl shadow-xl p-8 max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-6">Weather in your city</h2>
        <div className="flex justify-center flex-wrap mb-4 gap-4 relative">
          <input
            type="text"
            placeholder="Write the city"
            className="rounded-lg p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none w-60"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white rounded-lg px-5 py-3 font-semibold hover:bg-blue-600 transition">
            Search
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <p className="text-gray-600 text-sm">
          More than 10,000,000 locations around the world
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
