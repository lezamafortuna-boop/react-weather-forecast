import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric"); // "metric" = °C, "imperial" = °F

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // ✅ Use the custom hook
  const { weather, forecast, loading, error, fetchWeather } = useWeather(API_KEY);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {weather && (
        <button className="unit-toggle" onClick={toggleUnit}>
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="card-container">
        {weather && <WeatherCard weather={weather} unit={unit} />}
      </div>

      {forecast.length > 0 && (
        <div className="forecast-container">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.map((day) => (
              <ForecastCard key={day.dt} day={day} unit={unit}   />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;