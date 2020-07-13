import React, { useState, useEffect } from "react";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log("rendered", persons.length, "notes");

  const handleAddClick = (event) => {
    event.preventDefault();

    const duplicateNameCheck = persons.find(
      (person) => person.name === newName
    );
    const duplicateNumberCheck = persons.find(
      (person) => person.number === newNumber
    );

    if (duplicateNameCheck) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const targetPerson = persons.find((person) => person.name === newName);
        console.log("targetPerson: ", targetPerson);
        const changedNumber = { ...targetPerson, number: newNumber };
        personService
          .update(targetPerson.id, changedNumber)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== targetPerson.id ? person : response.data
              )
            );
          });
      }
    } else if (duplicateNumberCheck) {
      alert(`${newNumber} is already added to phonebook`);
    } else if (newName === "" || newNumber === "") {
      alert(`Field can't be empty`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  const handleRemoveClick = (id) => {
    const targetPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter valueFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleAddClick}
        valueName={newName}
        handleNameChange={handleNameChange}
        valueNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <PersonList
        filter={newFilter}
        persons={persons}
        handleRemoveClick={handleRemoveClick}
      />
    </div>
  );
};

export default App;
