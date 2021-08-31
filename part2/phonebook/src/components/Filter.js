import React from "react";

const Filter = ({ search, handleSearchChange }) => {
  return (
    <form>
      <div>
        name: <input value={search} onChange={handleSearchChange} />
      </div>
    </form>
  );
};

export default Filter;
