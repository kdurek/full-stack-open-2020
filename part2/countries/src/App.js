import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "notes");

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter valueFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries filter={newFilter} countries={countries} />
    </div>
  );
};

export default App;
