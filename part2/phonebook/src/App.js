import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        setMessage(`[error] Couldn't Get Data from the Server`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const isAlreadyAdded = persons.find((person) => person.name === newName);

    if (isAlreadyAdded) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        console.log(newName);
        const newPerson = {
          name: newName,
          number: newNumber,
        };

        const person = persons.find((person) => person.id === newName.id);
        const changedPerson = { ...person, number: newName.number };

        personService
          .update(newPerson, isAlreadyAdded.id)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? changedPerson : person
              )
            );
            setMessage(`New Number added to ${newName}`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setMessage(
              `[error] ${newPerson.name} has already been removed from server`
            );
            setTimeout((error) => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setMessage(`[error] Couldn't add ${newName} to the server`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDeleteOf = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setMessage(`${name} was deleted`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setMessage(`[error] ${name} was already deleted`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
    const afterDeletePerson = persons.filter((p) => p.name !== name);
    setPersons(afterDeletePerson);
  };

  return (
    <div>
      <Message message={message} />

      <h2>Phonebook</h2>

      <Filter search={search} setSearch={setSearch} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {persons
        .filter((p) => {
          if (p === "") {
            return p;
          } else {
            return p.name.toLowerCase().includes(search.toLowerCase());
          }
        })
        .map((person) => {
          return (
            <p key={person.id}>
              <Persons
                person={person}
                handleDelete={() => handleDeleteOf(person)}
              />
            </p>
          );
        })}
    </div>
  );
};

export default App;
