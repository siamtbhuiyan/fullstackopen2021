import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <>
      {part.name} {part.exercises}
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            <Part part={part} />
          </p>
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
