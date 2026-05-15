import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "2b3700c30cdd25c386a96dcf811be3e0";

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found or Invalid city");
      }

      await new Promise((resolve) => setTimeout(resolve,2000))

      const data = await response.json();

      setWeather({
        name: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "blue" }}>
      <h1 style={{color: "blue"}}>Weather App ni Katlen na Color Blue</h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather} style={{ marginLeft: "10px" }}>
        Search Weather
      </button>

      {loading && <p>LOADING NA MAG WAIT KA PLS...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !loading && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}