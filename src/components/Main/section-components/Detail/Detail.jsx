import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./detail.css";

import AddDataForm from "./Form/AddDataForm";
import DateNav from "./DateNav";
import ValueHeader from "./ValueHeader";
import BarChart from "../../../Charts/BarChart";
import { DemoChart } from "../../../Charts/DemoChart";

function Detail({ id, title, data, unit, actions }) {
  const [formOpen, setFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const formToggleHandler = () => setFormOpen(!formOpen);
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
          <AddDataForm
            formOpenState={formOpen}
            formClose={formCloseHandler}
            actions={actions}
          />
        </div>
      </div>
      <div className="container-child">
        <DateNav />
        <ValueHeader data={data} unit={unit} actions={actions} />
        <div className="section-chart">
          <BarChart data={data} className="chart" />
        </div>
        <div className="section-chart">
          <div className="chart-wrapper">
            <DemoChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
