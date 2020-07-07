import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ stats }) => {
  const total = stats[0].good + stats[1].neutral + stats[2].bad;

  const getAverageScore = () => {
    return ((stats[0].good - stats[2].bad) / total).toFixed(2);
  };

  const getPositivePercentage = () => {
    return ((stats[0].good / total) * 100).toFixed(2);
  };

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>good {stats[0].good}</p>
        <p>neutral {stats[1].neutral}</p>
        <p>bad {stats[2].bad}</p>
        <Statistic text={"all"} value={total} />
        <Statistic text={"average"} value={getAverageScore()} />
        <Statistic text={"positive"} value={getPositivePercentage()} />
      </div>
    );
  }
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stateHooks = {
    setGood() {
      setGood(good + 1);
    },
    setNeutral() {
      setNeutral(neutral + 1);
    },
    setBad() {
      setBad(bad + 1);
    },
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => stateHooks.setGood()} text="good" />
      <Button handleClick={() => stateHooks.setNeutral()} text="neutral" />
      <Button handleClick={() => stateHooks.setBad()} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={[{ good }, { neutral }, { bad }]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
