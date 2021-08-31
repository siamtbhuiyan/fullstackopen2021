import React, { useState } from "react";
import axios from "axios";
import countryService from "./services/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  countryService.getAll().then((response) => {
    setCountries(response);
    // console.log(response);
  });
  console.log(countries);

  return (
    <div>
      <input value={search} onChange={handleSearchChange} />
      {countries.map((country) => {
        <h3>{country.name}</h3>;
      })}
    </div>
  );
};

export default App;
