import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sidebarState = useSelector((state) => state.formState.sidebarState);
  const { backToHome } = useSelector((state) => state.uiState);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goBackHandler = () => {
    dispatch(uiStateActions.setCardSelectState(false));
    dispatch(actions.updateDataState(null));
    if (backToHome) {
      navigate(-1);
      dispatch(uiStateActions.updateBackToHomeState(false));
    }
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

  return (
    <>
      <div className={`container-head ${isLoaded && "loaded"}`}>
        {/* <PushPinIcon /> */}
        <div className="preferance-control" onClick={toggleFavHandler}>
          {favourite ? (
            <FaStar className="icon" />
          ) : (
            <FaRegStar className="icon" />
          )}
          {favourite ? <p>Remove from favourite</p> : <p>Add to favourite</p>}
        </div>
        <div className={`container-back`}>
          <button className="back-btn" onClick={goBackHandler}>
            <MdArrowBackIosNew className="icon" />
            <span>Back</span>
          </button>
        </div>

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
        <div className="detail-footer">
          <div className="mobile-fav" onClick={toggleFavHandler}>
            {favourite ? (
              <span>Remove from favourite</span>
            ) : (
              <span>Add to favourite</span>
            )}
            {favourite ? (
              <FaStar className="icon" />
            ) : (
              <FaRegStar className="icon" />
            )}
          </div>
          <div className="detail-about">
            <span>About {title.toLowerCase()}</span>
            <KeyboardArrowRightSharpIcon className="icon" />
          </div>
          <div className="view-allData">
            <span>View all data</span>
            <KeyboardArrowRightSharpIcon className="icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
