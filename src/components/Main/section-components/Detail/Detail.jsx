import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

import AddDataForm from "./Form/AddDataForm";
import DateNav from "./DateNav";
import ValueHeader from "./ValueHeader";
import Chart from "../../../Charts/Chart";
import DataTable from "./DataTable/DataTable";
import formState, { formStateActions } from "../../../../store/form-state";
import { uiStateActions } from "../../../../store/ui-state";
import useLocalStorage from "../../../../hooks/useLocalStorage";

function Detail({
  id,
  title,
  data,
  dataKey,
  type,
  unit,
  selectedUnit,
  favourite,
  actions,
  chartConfig,
}) {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { sidebarState, dataSubmitted } = useSelector(
    (state) => state.formState
  );
  const showTableState = useSelector((state) => state.uiState.showTableState);

  // SETTING LOCALSTORAGE DATA
  const [localData, setLocalData] = useLocalStorage(type);

  useEffect(() => {
    if (!dataSubmitted) return;
    setLocalData({
      ...localData,
      [dataKey]: {
        id,
        title,
        selectedUnit,
        data,
        favourite,
      },
    });

    dispatch(formStateActions.setDataSubmitted(false));
  }, [localData, id, title, selectedUnit, data, favourite]);

  // END OF SETTING LOCALSTORAGE DATA

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleFavHandler = () => {
    dispatch(
      actions.toggleFavourite({
        sidebarState,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));
  };

  const formOpenHandler = () => setFormOpen(true);
  const formCloseHandler = () => setFormOpen(false);

  const showTableHandler = () => {
    dispatch(uiStateActions.setShowTableState(true));
  };
  const closeTableHandler = () => {
    dispatch(uiStateActions.setShowTableState(false));
  };

  return (
    <>
      <div className={`container-head ${isLoaded && "loaded"}`}>
        {!showTableState && (
          <div className="preferance-control">
            {favourite ? (
              <FaStar className="icon" onClick={toggleFavHandler} />
            ) : (
              <FaRegStar className="icon" onClick={toggleFavHandler} />
            )}
            {favourite ? <p>Remove from favourite</p> : <p>Add to favourite</p>}
          </div>
        )}
        {showTableState && (
          <div className={`dataTable-back `}>
            <button className="back-btn text-btn" onClick={closeTableHandler}>
              <MdArrowBackIosNew className="icon" />
              <span>Back</span>
            </button>
          </div>
        )}

        <h3>{title}</h3>
        <div className="form-button ">
          <button className="text-btn addData-btn" onClick={formOpenHandler}>
            <span>Add Data</span>
            <AddRoundedIcon className="icon" />
          </button>
          <AddDataForm
            formOpenState={formOpen}
            formCloseHandler={formCloseHandler}
            actions={actions}
          />
        </div>
      </div>
      {!showTableState && (
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
              type={type}
              chartConfig={chartConfig}
              formOpen={formOpenHandler}
            />
          </div>
          <div className="detail-footer">
            <div className="footer-fav">
              <div
                className={`mobile-fav ${favourite && "fav"}`}
                onClick={toggleFavHandler}
              >
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
              <p>Favourites appear in Home</p>
            </div>
            <div className="detail-info">
              <div className="view-allData" onClick={showTableHandler}>
                <span>View all data</span>
                <KeyboardArrowRightSharpIcon className="icon" />
              </div>
              <div className="detail-about">
                <span>About {title.toLowerCase()}</span>
                <KeyboardArrowRightSharpIcon className="icon" />
              </div>
            </div>
          </div>
        </div>
      )}
      {showTableState && (
        <DataTable data={data} actions={actions} sidebarState={sidebarState} />
      )}
    </>
  );
}

export default Detail;
