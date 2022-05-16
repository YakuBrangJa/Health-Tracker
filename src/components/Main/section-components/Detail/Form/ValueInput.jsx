import React, { useState } from "react";

function ValueInput({ unitState, onChangeHandler }) {
  const [inchValue, setInchValue] = useState();

  const inchChangeHandler = (e) => {
    setInchValue(e.target.value);
    onChangeHandler(e);
  };

  // const inchArray = Array.from()

  if (unitState.state === "milimeter mercury") {
    return (
      <>
        <li>
          <label>Systolic</label>
          <input type={"number"} name="systolic" onChange={onChangeHandler} />
        </li>
        <li>
          <label>Diastolic</label>
          <input type={"number"} name="diastolic" onChange={onChangeHandler} />
        </li>
      </>
    );
  } else if (unitState.state === "foot") {
    return (
      <>
        <li>
          <label>ft</label>
          <input name="foot" type={"number"} onChange={onChangeHandler} />
        </li>
        <li>
          <label>in</label>
          <select name="inch" onChange={inchChangeHandler} value={inchValue}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
          </select>
        </li>
      </>
    );
  }
  return (
    <li>
      <label>{unitState.symbol}</label>
      <input type={"number"} name="value" onChange={onChangeHandler} />
    </li>
  );
}

export default ValueInput;
