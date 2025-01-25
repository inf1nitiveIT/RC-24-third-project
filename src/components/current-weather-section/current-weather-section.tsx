function CurrentWeatherSection() {
  return(
    <div>
      <h1>Погода в Севастополе</h1>
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex-[1] md:flex-[0.5] p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 1</h2>
          <p>Контент для первой секции (меньшей).</p>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 2</h2>
          <p>Контент для второй секции.</p>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-2">Секция 3</h2>
          <p>Контент для третьей секции.</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherSection;
