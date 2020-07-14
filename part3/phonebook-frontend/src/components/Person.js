import React from "react";

const Person = ({ name, number, id, handleRemoveClick }) => {
  return (
    <p>
      {name} {number}{" "}
      <button onClick={() => handleRemoveClick(id)}>delete</button>
    </p>
  );
};

export default Person;
