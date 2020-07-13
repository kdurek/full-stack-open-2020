import React from "react";
import Person from "./Person";

const Persons = ({ filter, persons }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person name={person.name} number={person.number} key={person.id} />
        ))}
    </div>
  );
};

export default Persons;
