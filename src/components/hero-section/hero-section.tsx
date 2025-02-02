import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERE_API_KEY } from '../../utils/const';
import { HereGeocodeResponse } from '../../utils/types';

function HeroSection () {
  const [city, setCity] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const [suggestions, setSuggestions] = useState<{ name: string; country: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();

  const fetchCities = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const HERE_URL = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${HERE_API_KEY}&limit=5&lang=en`;

    try {
      const response = await fetch(HERE_URL);
      const data = (await response.json()) as HereGeocodeResponse;

      setSuggestions(
        data.items.map((item) => ({
          name: item.address.city || item.title,
          country: item.address.countryCode,
        }))
      );
    } catch (error) {
      void error;
    }
  };


  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setCity(value);
    setInputError('');
    fetchCities(value);
  };

  const handleSuggestionClick = (name: string) => {
    setCity(name);
    setSuggestions([]);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setInputError('Please enter a city name.');
      return;
    }
    navigate(`/weather/${city}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return(

    <div
      className="flex  justify-center bg-cover bg-center bg-background-pattern my-6 py-8"
    >
      <div className="bg-white bg-opacity-75 rounded-2xl shadow-xl p-8 max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-6">Weather in your city</h2>
        <div className="flex justify-center flex-wrap mb-4 gap-4 relative">
          <div className="relative w-60">
            <input
              type="text"
              placeholder="Write the city"
              className="rounded-lg p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none w-60"
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            {suggestions.length > 0 && (
              <ul ref={suggestionsRef} className="absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.name}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => handleSuggestionClick(suggestion.name)}
                  >
                    {suggestion.name}, {suggestion.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={handleSearch} className="bg-blue-500 text-white rounded-lg px-5 py-3 font-semibold hover:bg-blue-600 transition">
            Search
          </button>
        </div>
        {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
        <p className="text-gray-600 text-sm">
          More than 10,000,000 locations around the world
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
