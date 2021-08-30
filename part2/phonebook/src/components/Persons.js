import React from "react";

const Persons = ({ person, handleDelete }) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Persons;
