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

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <span>all {all}</span> <br />
      <span>average {average}</span> <br />
      <span>positive {positive}%</span>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
