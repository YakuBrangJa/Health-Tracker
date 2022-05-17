import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

import React, { useEffect, useState } from "react";
import "./detail.css";

import AddDataForm from "./Form/AddDataForm";
import DateNav from "./DateNav";
import ValueHeader from "./ValueHeader";
import BarChart from "../../../Charts/BarChart";
import { DemoChart } from "../../../Charts/DemoChart";

function Detail({ id, title, data, unit, selectedUnit, actions, chartConfig }) {
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
        <ValueHeader
          data={data}
          unit={unit}
          selectedUnit={selectedUnit}
          actions={actions}
        />
        <div className="section-chart">
          <BarChart
            id={id}
            data={data}
            chartConfig={chartConfig}
            className="chart"
            formOpen={formToggleHandler}
          />
        </div>
        <div className="view-all__data">
          <span>View all data</span>
          <KeyboardArrowRightSharpIcon />
        </div>
      </div>
    </>
  );
}

export default Detail;
