import React from "react";

const Countries = ({ search, countries, setSearch }) => {
  const filter = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {search === "" ? (
        countries.map((c, i) => <li key={i}>{c.name}</li>)
      ) : filter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filter.length === 1 ? (
        <div>
          <h1>{filter[0].name}</h1> <p>Capital: {filter[0].capital}</p>
          <p>Population: {filter[0].population}</p> <h2>Languages</h2>{" "}
          <ul>
            {filter[0].languages.map((l, i) => (
              <li key={i}>{l.name}</li>
            ))}
          </ul>
          <img alt="" src={filter[0].flag} height="200px" width="300px"></img>
        </div>
      ) : (
        filter.map((c, i) => (
          <div>
            <li key={i}>{c.name}</li>
            <button onClick={() => setSearch(c.name)}>Show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Countries;
