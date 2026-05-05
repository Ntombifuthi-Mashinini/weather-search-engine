import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [city, setCity] = useState("Durban");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("celsius");

  useEffect(() => {
    search();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    let apiKey = "4bf39f80fc9d48003o92t3a6c3d6d47a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  function handleResponse(response) {
    setWeather({
      temperature: response.data.temperature.current,
      city: response.data.city,
      description: response.data.condition.description,
      icon: response.data.condition.icon_url,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      date: new Date(response.data.time * 1000)
    });
  }

  function formatDate(date) {
    return date.toLocaleString();
  }

  function showFahrenheit() {
    setUnit("fahrenheit");
  }

  function showCelsius() {
    setUnit("celsius");
  }

  function convertTemp() {
    if (unit === "celsius") return Math.round(weather.temperature);
    return Math.round((weather.temperature * 9) / 5 + 32);
  }

  if (!weather) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="app container">
      <h1 className="text-center mb-4">Weather App</h1>

      <form onSubmit={handleSubmit} className="d-flex mb-4">
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search city..."
          onChange={handleCityChange}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="card p-4 text-center">
        <h2>{weather.city}</h2>
        <p>{formatDate(weather.date)}</p>

        <img src={weather.icon} alt="weather icon" />

        <h3>
          {convertTemp()}°
          <span className="unit">
            <button onClick={showCelsius}>C</button> |{" "}
            <button onClick={showFahrenheit}>F</button>
          </span>
        </h3>

        <p className="text-capitalize">{weather.description}</p>

        <p>
          Humidity: {weather.humidity}% | Wind: {weather.wind} km/h
        </p>
      </div>
    </div>
  );
}
