import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const isAlreadyAdded = persons.find((person) => person.name === newName);

    if (isAlreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
      };
      setPersons(persons.concat(newPerson));
    }
    // console.log(persons);

    setNewName("");
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
