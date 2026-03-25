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
        // Current weather
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!weatherRes.ok) throw new Error("City not found");

        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        // 5-day forecast
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const forecastData = await forecastRes.json();

        // Filter forecast to one reading per day (12:00 PM)
        const daily = forecastData.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
        );

        setForecast(daily);
        } catch (err) {
        setError(err.message || "Something went wrong");
        } finally {
        setLoading(false);
       }
  };

  return { weather, forecast, loading, error, fetchWeather };
}
