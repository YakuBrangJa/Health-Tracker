import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bodyMeasurementsActions } from "../../../store/body-measurements";
import { heartActions } from "../../../store/heart";

import "./addDataForm.css";

function AddDataForm(props) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { dataState, sidebarState, unitState } = useSelector(
    (state) => state.formState
  );

  const [inchState, setInchState] = useState(0);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    if (e.target.name === "inch") {
      setInchState(e.target.value);
    }
  };

  const addDataHandler = (event) => {
    event.preventDefault();
    console.log(formData);

    if (sidebarState === "/body-measurements") {
      dispatch(
        bodyMeasurementsActions.addData({
          dataState,
          unitState,
          formData,
        })
      );
    } else if (sidebarState === "/heart") {
      dispatch(
        heartActions.addData({
          dataState,
          unitState,
          formData,
        })
      );
    }
    props.formClose();
  };

  let valueInput = (
    <li>
      <label>{unitState.symbol}</label>
      <input type={"number"} name="value" onChange={onChangeHandler} />
    </li>
  );

  if (unitState.state === "milimeter mercury") {
    valueInput = (
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
    valueInput = (
      <>
        <li>
          <label>ft</label>
          <input name="foot" type={"number"} onChange={onChangeHandler} />
        </li>
        <li>
          <label>in</label>
          <select name="inch" onChange={onChangeHandler} value={inchState}>
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
    <form
      onSubmit={addDataHandler}
      className={`addDataForm ${props.formOpenState && "open"}`}
    >
      <div className="form-controls">
        <button onClick={props.formClose} type="button" className="form-cancel">
          Cancle
        </button>
        <button type="submit" className="form-add">
          Add
        </button>
      </div>
      <ul>
        <li>
          <label>Date</label>
          <input type={"date"} name="date" onChange={onChangeHandler} />
        </li>
        <li>
          <label>Time</label>
          <input type={"time"} name="time" onChange={onChangeHandler} />
        </li>
        {valueInput}
      </ul>
    </form>
  );
}

export default AddDataForm;
