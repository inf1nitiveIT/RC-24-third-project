function SearchBar() {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full rounded-lg border border-gray-300 pl-3 pr-8 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m2.1-6.9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
