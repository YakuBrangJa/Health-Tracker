import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

// TYPE ICONS
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import KingBedIcon from "@mui/icons-material/KingBed";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import MedicationIcon from "@mui/icons-material/Medication";

import React, { useEffect, useState } from "react";
import "./cardItem.css";

import { useDispatch } from "react-redux";
import { formStateActions } from "../../../store/form-state";
import { unitTransformer } from "../../../store/function-components";

function CardItem({ id, title, data, unit, type, selected }) {
  const dispatch = useDispatch();

  const onClickHandler = (id) => {
    dispatch(formStateActions.setDataState(id));
  };

  // console.log(unit);
  const unitArray = Object.values(unit);
  const selectedUnit = unitArray.find((item) => item.selected === true);

  const latestData = data[data.length - 1];
  let transformedValue;
  if (latestData) {
    transformedValue = parseFloat(
      unitTransformer(latestData.value, selectedUnit.name).toFixed(1)
    );
  }

  let dataType;

  switch (type) {
    case "vitals":
      dataType = {
        icon: <MonitorHeartIcon className="card-type__icon" />,
      };
      break;
    case "body-measurements":
      dataType = {
        icon: <AccessibilityIcon className="card-type__icon" />,
      };
      break;
    case "heart":
      dataType = {
        icon: <FavoriteIcon className="card-type__icon" />,
      };
      break;
    case "respiratory":
      dataType = {
        icon: <FavoriteIcon className="card-type__icon" />,
      };
      break;
    case "sleep":
      dataType = {
        icon: <KingBedIcon className="card-type__icon" />,
      };
      break;
    case "cycleTracker":
      dataType = {
        icon: <DataSaverOffIcon className="card-type__icon" />,
      };
      break;
    case "other":
      dataType = {
        icon: <AddCircleIcon className="card-type__icon" />,
      };
      break;
    default:
      break;
  }

  let cardItem;

  if (data.length === 0) {
    cardItem = (
      <div
        className={`emptyCardItem ${selected && "active"}`}
        onClick={() => onClickHandler(id)}
      >
        <div className="emptyCardItem-top">
          <span className="cardItem-name">{title}</span>
          <div
            className={`emptyCardItem-add__container ${selected && "active"}`}
          >
            <span className="emptyCardItem-add">Add data</span>
            <KeyboardArrowRightSharpIcon
              className={`cardItem-forward__icon `}
            />
          </div>
        </div>
      </div>
    );
  } else {
    cardItem = (
      <div
        className={`cardItem ${selected && "active"}`}
        onClick={() => onClickHandler(id)}
      >
        <div className="cardItem-left">
          <span className="cardItem-name">{title}</span>
          <div className="cardItem-value__container">
            <span className="cardItem-value">{transformedValue}</span>
            <span className="cardItem-unit">{selectedUnit.symbol}</span>
          </div>
        </div>
        <div className="cardItem-right">
          {/* {dataType.icon} */}
          <div className={`cardItem-date__container ${selected && "active"}`}>
            <span className="cardItem-date">{latestData.date}</span>
            <KeyboardArrowRightSharpIcon
              className={`cardItem-forward__icon `}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{cardItem}</>;
}

export default CardItem;
