import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFormDateFormat from "../../../../../hooks/useFormDateFormat";

import ValueInput from "./ValueInput";
import { formStateActions } from "../../../../../store/form-state";

import "./addDataForm.css";

function AddDataForm({ formClose, formOpenState, actions }) {
  const [formData, setFormData] = useState({});
  const [formDate, setFormDate] = useState();
  const [formTime, setFormTime] = useState();
  const [inputIsValid, setInputIsValid] = useState(true);
  const dispatch = useDispatch();
  const { sidebarState, unitState } = useSelector((state) => state.formState);

  // const targetData = sidebarState
  //   .split("-")
  //   .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1))
  //   .replace("/", "");

  // const dataBranch = useSelector((state) => state[targetData][targetData]);
  // const dataState = useSelector(
  //   (state) => state[targetData].componentState.dataState
  // );

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    // if (formData.value.length > 0) {
    //   setInputIsValid(true);
    // }
    // if (formData.value.length === 0) {
    //   setInputIsValid(false);
    // }
  };

  const { date, time } = useFormDateFormat();

  useEffect(() => {
    setFormDate(date);
    setFormTime(time);
    setFormData({
      date: date,
      time: time,
    });
  }, [date]);

  const addDataHandler = (event) => {
    event.preventDefault();
    console.log(formData);

    dispatch(
      actions.addData({
        unitState,
        formData,
        sidebarState,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));

    formClose();
  };

  return (
    <form
      onSubmit={addDataHandler}
      className={`addDataForm ${formOpenState && "open"}`}
    >
      <div className="form-controls">
        <button onClick={formClose} type="button" className="form-cancel">
          Cancle
        </button>
        <button
          type="submit"
          className={`form-add`}
          disabled={!inputIsValid ? true : false}
        >
          Add
        </button>
      </div>
      <ul>
        <li>
          <label>Date</label>
          <input
            type={"date"}
            name="date"
            defaultValue={formDate}
            onChange={onChangeHandler}
          />
        </li>
        <li>
          <label>Time</label>
          <input
            type={"time"}
            name="time"
            defaultValue={formTime}
            onChange={onChangeHandler}
          />
        </li>
        <ValueInput onChangeHandler={onChangeHandler} unitState={unitState} />
        {/* {valueInput} */}
      </ul>
    </form>
  );
}

export default AddDataForm;
