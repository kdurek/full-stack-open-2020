import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  // const [capitalCity, setCapitalCity] = useState("");
  // const [weather, setWeather] = useState([]);

  console.log(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_SECRET_NAME}&query=${capitalCity}`
  //     )
  //     .then((response) => {
  //       setWeather(response.data);
  //     });
  // }, [process.env.REACT_APP_SECRET_NAME, capitalCity]);
  // console.log("weather", weather.length, "set");

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const showCountry = (event) => {
    event.preventDefault();
    setNewFilter(event.target.value);
  };

  // const handleCountryChange = (capital) => setCapitalCity(capital);

  return (
    <div>
      {process.env.REACT_APP_API_KEY}
      <Filter valueFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries
        filter={newFilter}
        countries={countries}
        // weather={weather}
        showCountry={showCountry}
        // handleCountryChange={handleCountryChange}
      />
    </div>
  );
};

export default App;
