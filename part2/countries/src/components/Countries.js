import React from "react";
import Country from "./Country";

const Countries = ({ filter, countries }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredCountries);

  if (filteredCountries.length === countries.length) {
    return <div></div>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};

export default Countries;
