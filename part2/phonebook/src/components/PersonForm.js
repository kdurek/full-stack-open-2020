import React from "react";

const PersonForm = ({
  onSubmit,
  valueName,
  handleNameChange,
  valueNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <p>
          name: <input onChange={handleNameChange} value={valueName} />
        </p>
        <p>
          number: <input onChange={handleNumberChange} value={valueNumber} />
        </p>
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
