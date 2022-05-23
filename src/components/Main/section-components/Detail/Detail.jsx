import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";

import AddDataForm from "./Form/AddDataForm";
import DateNav from "./DateNav";
import ValueHeader from "./ValueHeader";
import Chart from "../../../Charts/Chart";
import { uiStateActions } from "../../../../store/ui-state";
import { formStateActions } from "../../../../store/form-state";
import { DemoChart } from "../../../Charts/DemoChart";

function Detail({
  id,
  title,
  data,
  unit,
  selectedUnit,
  favourite,
  actions,
  chartConfig,
}) {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sidebarState = useSelector((state) => state.formState.sidebarState);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goBackHandler = () => {
    dispatch(uiStateActions.setCardSelectState(false));
    dispatch(actions.updateDataState(null));
  };

  const toggleFavHandler = () => {
    dispatch(
      actions.toggleFavourite({
        sidebarState,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));
  };

  const formToggleHandler = () => setFormOpen(!formOpen);
  const formCloseHandler = () => setFormOpen(false);

  console.log(favourite);
  return (
    <>
      {/* <div className={`container-head2`}>
      </div> */}
      <div className={`container-head ${isLoaded && "loaded"}`}>
        {/* <PushPinIcon /> */}
        <div className="preferance-control" onClick={toggleFavHandler}>
          {favourite ? (
            <FaHeart className="icon" />
          ) : (
            <FaRegHeart className="icon" />
          )}
          {favourite ? <p>Remove from favourite</p> : <p>Add to favourite</p>}
        </div>
        <button className="back-btn" onClick={goBackHandler}>
          <MdArrowBackIosNew className="icon" />
          <span>Back</span>
        </button>

        <h3>{title}</h3>
        <div className="form-button">
          <button className="addData-btn" onClick={formToggleHandler}>
            <span>Add Data</span>

            <AddRoundedIcon className="icon" />
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
          <Chart
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
