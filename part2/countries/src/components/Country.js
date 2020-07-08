import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>
        <span>{country.name}</span>
      </h1>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>
            {language.name}
            <br />
          </li>
        ))}
      </ul>
      <p>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          height="60"
          width="60"
        />
      </p>
    </div>
  );
};

export default Country;
