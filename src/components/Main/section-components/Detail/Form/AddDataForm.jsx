import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFormDateFormat from "../../../../../hooks/useFormDateFormat";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";

import ValueInput from "./ValueInput";
import { formStateActions } from "../../../../../store/form-state";

import "./addDataForm.css";

function AddDataForm({ formCloseHandler, formOpenState, actions }) {
  const [formData, setFormData] = useState({});
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formValue, setFormValue] = useState({});
  const [inputIsEmpty, setInputIsEmpty] = useState(true);

  const dispatch = useDispatch();
  const formRef = useRef();
  const { sidebarState, unitState } = useSelector((state) => state.formState);
  const { date, time } = useFormDateFormat(formOpenState);

  // CLOSE FORM ON CLICKED OUTSIDE
  useOnClickOutside(formRef, formCloseHandler, formOpenState);

  // SETTING INITIAL FORM VALUES
  useEffect(() => {
    setFormDate(date);
    setFormTime(time);

    if (!unitState.formConfig) return;

    setFormValue(
      unitState.formConfig.reduce((a, b) => {
        if (!a[b.name]) a[b.name] = null;
        if (b.type === "number") a[b.name] = "";
        if (b.type === "select") a[b.name] = b.options[0];
        return a;
      }, {})
    );

    setFormData({
      date: date,
      time: time,
      ...unitState.formConfig.reduce((a, b) => {
        if (!a[b.name]) a[b.name] = null;
        if (b.type === "number") a[b.name] = "";
        if (b.type === "select") a[b.name] = b.options[0];
        return a;
      }, {}),
    });
    setInputIsEmpty(true);
  }, [date, time, formOpenState]);

  // LISTENING TO FORM VALUE CHANGES
  const onChangeHandler = (e) => {
    if (e.target.name === "date") setFormDate(e.target.value);
    if (e.target.name === "time") setFormTime(e.target.value);

    unitState.formConfig.forEach((unit) => {
      if (e.target.name === unit.name) {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.value.trim(),
        });
      }
    });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });

    if (e.target.value.trim() !== "") {
      setInputIsEmpty(false);
    }
    if (e.target.value.trim() === "") {
      setInputIsEmpty(true);
    }
  };

  // SUBMIT HANDLER FUNCTION
  const addDataHandler = (event) => {
    event.preventDefault();

    dispatch(
      actions.addData({
        unitState,
        formData,
        sidebarState,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));
    setFormDate(date);
    setFormTime(time);
    setFormValue(
      unitState.formConfig.reduce((a, b) => {
        if (!a[b.name]) a[b.name] = null;
        a[b.name] = "";
        return a;
      }, {})
    );
    setInputIsEmpty(true);
    formCloseHandler();
  };

  return (
    <form
      onSubmit={addDataHandler}
      className={`addDataForm ${formOpenState && "open"}`}
      ref={formRef}
    >
      <div className="form-controls">
        <button
          onClick={formCloseHandler}
          type="button"
          className="form-cancel text-btn"
        >
          Cancle
        </button>
        <button
          type="submit"
          className={`form-add text-btn ${inputIsEmpty && "submit-disabled"}`}
          disabled={inputIsEmpty ? true : false}
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
            value={formDate ? formDate : ""}
            onChange={onChangeHandler}
          />
        </li>
        <li>
          <label>Time</label>
          <input
            type={"time"}
            name="time"
            value={formTime ? formTime : ""}
            onChange={onChangeHandler}
          />
        </li>
        <ValueInput
          onChangeHandler={onChangeHandler}
          unitState={unitState}
          formValue={formValue}
          formOpenState={formOpenState}
        />
        {/* {valueInput} */}
      </ul>
    </form>
  );
}

export default AddDataForm;
