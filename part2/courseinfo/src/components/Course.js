import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((ele, idx) => (
        <Part
          name={ele.name}
          exercises={ele.exercises}
          key={ele.name.slice(0, 2) + idx}
        />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
