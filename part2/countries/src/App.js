import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const showCountry = (event) => {
    event.preventDefault();
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter valueFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries
        filter={newFilter}
        countries={countries}
        showCountry={showCountry}
      />
    </div>
  );
};

export default App;
