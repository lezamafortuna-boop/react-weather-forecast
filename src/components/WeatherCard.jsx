{/* eslint-disable react/prop-types */}
function WeatherCard({ weather, unit }) {
  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <img src={iconUrl} alt="weather icon" className="weather-icon" />

      <p className="description">{weather.weather[0].description}</p>

      <div className="temp">
        {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
      </div>

      <div className="details">
        <p>
          Feels like: {Math.round(weather.main.feels_like)}°
          {unit === "metric" ? "C" : "F"}
        </p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {Math.round(weather.wind.speed)} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;