import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState("");
  const [displayWeather, setDisplayWeather] = useState(false);

  const weather_api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital}`;
    axios.get(url).then((response) => {
      setWeather(response.data.current);
      setDisplayWeather(true);
    });
  }, [weather_api_key, country.capital]);
  console.log(weather);

  return (
    <div>
      {!displayWeather ? (
        <p>Gathering info...</p>
      ) : (
        <div>
          <h1>
            <span>{country.name}</span>
          </h1>
          <p>
            <b>
              capital {country.capital}
              <br />
              population {country.population}
            </b>
          </p>
          <h2>Spoken languages</h2>
          <ul>
            <b>
              {country.languages.map((language) => (
                <li key={language.name}>
                  {language.name}
                  <br />
                </li>
              ))}
            </b>
          </ul>
          <p>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              height="30%"
              width="30%"
            />
          </p>
          <h2>Weather in {country.capital}</h2>
          <p>
            <b>temperature: </b> {weather.temperature} Celcius
          </p>
          <img src={weather.weather_icons[0]} alt="weather icon" />
          <p>
            <b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default Country;
