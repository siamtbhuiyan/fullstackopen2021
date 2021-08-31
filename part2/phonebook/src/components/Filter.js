import React from "react";

const Filter = ({ search, setSearch }) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </form>
  );
};

export default Filter;
