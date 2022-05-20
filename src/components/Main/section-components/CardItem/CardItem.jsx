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
import { useDispatch } from "react-redux";
import "./cardItem.css";
import { uiStateActions } from "../../../../store/ui-state";

import ValueContainer from "../ValueContainer";

import useDateTimeFormatter from "../../../../hooks/useDateTimeFormatter";

function CardItem({
  id,
  title,
  data,
  unit,
  type,
  selectedUnit,
  selected,
  actions,
}) {
  const dispatch = useDispatch();
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    if (data.length === 0) return;
    setLatestData(
      data.reduce((a, b) =>
        new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`)
          ? a
          : b
      )
    );
  }, [data]);

  const { formattedDate, format } = useDateTimeFormatter();

  useEffect(() => {
    if (!latestData) return;
    format(latestData.date, latestData.time);
  }, [latestData, format]);

  const onClickHandler = () => {
    dispatch(actions.updateDataState(id));
    dispatch(actions.updateFirstClick(true));
    dispatch(uiStateActions.setCardSelectState(true));
  };

  const typeColor = {
    vitals: "#d55",
    symptoms: "#7707B3",
    medications: "#14b309",
    "body-measurements": "#bf5af2",
    heart: "#fe375f",
    respiratory: "#54a1ff",
    sleep: "#69B389",
    "cycle-tracker": "#E60E9A",
    "other-data": "#0e74dc",
  };

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

  if (data.length === 0) {
    return (
      <div
        className={`emptyCardItem ${selected && "active"}`}
        onClick={onClickHandler}
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
    return (
      <div
        className={`cardItem ${selected && "active"}`}
        onClick={onClickHandler}
      >
        <div className="cardItem-left">
          <span className="cardItem-name">{title}</span>
          <ValueContainer
            unit={unit}
            selectedUnit={selectedUnit}
            latestData={latestData}
            isDetailTab={false}
          />
        </div>
        <div className="cardItem-right">
          {/* {dataType.icon} */}
          <div className={`cardItem-date__container ${selected && "active"}`}>
            <span className="cardItem-date">{formattedDate}</span>
            <KeyboardArrowRightSharpIcon
              className={`cardItem-forward__icon `}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardItem;
