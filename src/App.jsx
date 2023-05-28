import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import getApiKey from "./utils/getApiKey";
import axios from "axios";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [error, setError] = useState(null);

  let backgroundClass = "";

  if (weather) {
    const id = weather?.weather[0].id;

    const idToClassMap = {
      "200-232": "thunderstorm",
      "300-321": "shower-rain",
      "500-531": "rain",
      "600-622": "snow-time",
      "701-781": "mist-time",
      "800": "clear",
      "801-804": "clouds",
    };

    const matchingClass = Object.keys(idToClassMap).find((key) => {
      const [start, end] = key.split("-");
      return id >= parseInt(start) && id < parseInt(end);
    });

    backgroundClass = matchingClass ? idToClassMap[matchingClass] : "default";
  }

  useEffect(() => {
    const success = (pos) => {
      console.log(pos);
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    const error = (err) => {
      setError(err.message);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
        coords?.lat
      }&lon=${coords?.lon}&appid=${getApiKey()}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const objTemp = {
            celsius: +(res.data.main.temp - 273.15).toFixed(1),
            farenheit: +(((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemp(objTemp);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className={`app ${backgroundClass}`}>
      {
        // <Loading />
        weather ? <WeatherCard weather={weather} temp={temp} /> : <Loading />
      }
    </div>
  );
}

export default App;
