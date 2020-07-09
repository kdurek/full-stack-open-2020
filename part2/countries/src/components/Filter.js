import React from "react";

const Filter = ({ valueFilter, handleFilterChange }) => {
  return (
    <div>
      <p>
        <b>
          find countries{" "}
          <input onChange={handleFilterChange} value={valueFilter} />
        </b>
      </p>
    </div>
  );
};

export default Filter;
