import React from "react";

const Country = ({ country, weather }) => {
  return (
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
        <b>temperature: </b> {weather["current"].temperature} Celcius
      </p>
      <img src={weather["current"].weather_icons[0]} alt="weather icon" />
      <p>
        <b>wind: </b> {weather["current"].wind_speed} kph direction{" "}
        {weather["current"].wind_dir}
      </p>
    </div>
  );
};

export default Country;
