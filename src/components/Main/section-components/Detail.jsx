import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./detail.css";

import About from "./About";
import AddDataForm from "./AddDataForm";
import { formStateActions } from "../../../store/form-state";
import { bodyMeasurementsActions } from "../../../store/body-measurements";
import { heartActions } from "../../../store/heart";

function Detail({ id, title, data, unit }) {
  const [formOpen, setFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const formToggleHandler = () => {
    setFormOpen(!formOpen);
  };

  const { dataState, sidebarState, unitState } = useSelector(
    (state) => state.formState
  );

  const unitArray = Object.values(unit);
  const initialUnit = unitArray.find((item) => item.selected === true).name;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(formStateActions.setUnitState(initialUnit));
  }, [initialUnit]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const unitSelectHandler = (e) => {
    e.preventDefault();
    dispatch(formStateActions.setUnitState(e.target.value));
    if (sidebarState === "/body-measurements") {
      dispatch(
        bodyMeasurementsActions.changeUnit({
          dataState,
          unit: e.target.value,
        })
      );
    } else if (sidebarState === "/heart") {
      dispatch(
        heartActions.changeUnit({
          dataState,
          unit: e.target.value,
        })
      );
    }
  };

  const formCloseHandler = () => setFormOpen(false);
  return (
    <>
      <div className={`container-head ${isLoaded && "loaded"}`}>
        {/* <PushPinIcon /> */}
        <PushPinOutlinedIcon className="icon" />
        <h3>{title}</h3>
        <div className="form-button">
          <button onClick={formToggleHandler}>
            Add data <AddRoundedIcon className="icon" />
          </button>
          <AddDataForm formOpenState={formOpen} formClose={formCloseHandler} />
        </div>
      </div>
      <div className="container-child">
        <div className="date-navigation">
          <ul>
            <li>Day</li>
            <li>Week</li>
            <li>Month</li>
            <li>6 Months</li>
            <li>Year</li>
          </ul>
        </div>
        <div className="value-header">
          <div className="value">{data}</div>
          <select
            name="unit"
            className="unit"
            value={unitState}
            onChange={unitSelectHandler}
          >
            {unitArray.map((value) => (
              <option key={value.name} value={value.name}>
                {value.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="section-graph">
          <div className="graph"></div>
        </div>
        <About />
      </div>
    </>
  );
}

export default Detail;
