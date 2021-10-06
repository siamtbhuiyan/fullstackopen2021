import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  console.log(search);

  return (
    <div>
      Search: <input value={search} onChange={handleSearchChange} />
      <Countries search={search} countries={countries} setSearch={setSearch} />
    </div>
  );
};

export default App;
