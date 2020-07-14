import React from "react";
import Person from "./Person";

const PersonList = ({ filter, persons, handleRemoveClick }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            name={person.name}
            number={person.number}
            id={person.id}
            handleRemoveClick={handleRemoveClick}
            key={person.id}
          />
        ))}
    </div>
  );
};

export default PersonList;
