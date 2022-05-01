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
  console.log(typeof formData.value);
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const addDataHandler = (event) => {
    event.preventDefault();

    if (sidebarState === "/body-measurements") {
      dispatch(
        bodyMeasurementsActions.addData({
          dataState,
          unitState,
          ...formData,
        })
      );
    } else if (sidebarState === "/heart") {
      dispatch(
        heartActions.addData({
          dataState,
          unitState,
          ...formData,
        })
      );
    }
    props.formClose();
  };

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
        <li>
          <label>Value</label>
          <input type={"number"} name="value" onChange={onChangeHandler} />
        </li>
        {/* <li>
          <label>Diastolic</label>
          <input type={"number"} />
        </li> */}
      </ul>
    </form>
  );
}

export default AddDataForm;
