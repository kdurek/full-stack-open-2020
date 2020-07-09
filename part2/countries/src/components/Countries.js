import React from "react";
import Country from "./Country";

const Countries = ({
  filter,
  countries,
  weather,
  showCountry,
  handleCountryChange,
}) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length === countries.length) {
    return <div></div>;
  } else if (filteredCountries.length === 1) {
    handleCountryChange(filteredCountries[0].capital);
    return <Country country={filteredCountries[0]} weather={weather} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <div>
        <b>
          {filteredCountries.map((country) => (
            <div key={country.name}>
              <span>{country.name}</span>
              <button type="button" value={country.name} onClick={showCountry}>
                show
              </button>
              <br />
            </div>
          ))}
        </b>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          <b>Too many matches, specify another filter</b>
        </p>
      </div>
    );
  }
};

export default Countries;
