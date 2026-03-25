{/* eslint-disable react/prop-types */}
function ForecastCard({ day, unit }) {
  const icon = day.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="forecast-card">
      <p className="forecast-date">{date}</p>
      <img src={iconUrl} alt="weather icon" className="forecast-icon" />
      <p className="forecast-temp">{Math.round(day.main.temp)}°{unit === "metric" ? "C" : "F"}</p>
      <p className="forecast-desc">{day.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;