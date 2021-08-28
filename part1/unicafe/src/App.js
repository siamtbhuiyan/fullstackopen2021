import React, { useState } from "react";

const Heading = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Result = ({ text, feedbackNum }) => {
  return (
    <div>
      {text} {feedbackNum}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    // console.log(good);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    // console.log(good);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    // console.log(good);
  };

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Heading text="statistics" />
      <Result text="good" feedbackNum={good} />
      <Result text="neutral" feedbackNum={neutral} />
      <Result text="bad" feedbackNum={bad} />
    </div>
  );
};

export default App;
