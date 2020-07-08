import React from "react";

const Filter = ({ valueFilter, handleFilterChange }) => {
  return (
    <div>
      find countries
      <input onChange={handleFilterChange} value={valueFilter} />
      debug: {valueFilter}
    </div>
  );
};

export default Filter;
