import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ total, good, neutral, bad }) => {
  const getAverageScore = () => {
    return ((good - bad) / total).toFixed(2);
  };

  const getPositivePercentage = () => {
    return ((good / total) * 100).toFixed(2);
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
        <table>
          <tbody>
            <Statistic text={"good"} value={good} />
            <Statistic text={"neutral"} value={neutral} />
            <Statistic text={"bad"} value={bad} />
            <Statistic text={"all"} value={total} />
            <Statistic text={"average"} value={getAverageScore()} />
            <Statistic text={"positive"} value={getPositivePercentage()} />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setTotal(total + 1);
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setTotal(total + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
