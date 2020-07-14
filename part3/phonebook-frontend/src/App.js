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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

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
            setMessageType("confirmation");
            setMessage(`Changed ${newName} number`);
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          });
      }
    } else if (duplicateNumberCheck) {
      setMessageType("error");
      setMessage(`${newNumber} is already added to phonebook`);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else if (newName === "" || newNumber === "") {
      setMessageType("error");
      setMessage(`Field can't be empty`);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setMessageType("confirmation");
        setMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      });
    }
  };

  const handleRemoveClick = (id) => {
    const targetPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessageType("error");
          setMessage(`Deleted ${targetPerson.name}`);
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessageType("error");
          setMessage(
            `'Information of ${targetPerson.name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
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
      <Notification message={message} messageType={messageType} />
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
