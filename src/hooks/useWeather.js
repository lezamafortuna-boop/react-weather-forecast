import { useState } from "react";

export function useWeather(apiKey) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!weatherRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      // Fetch 3-hour forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      const forecastData = await forecastRes.json();

      // 5-day forecast (noon readings)
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily.slice(0, 5));
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
}