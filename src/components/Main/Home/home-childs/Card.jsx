import React, { useEffect, useState } from "react";

import "./card.css";

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
import { FaLungs } from "react-icons/fa";

function Card({ name, value, unit, date, type }) {
  const [data, setData] = useState({});

  useEffect(() => {
    switch (type) {
      case "vitals":
        setData({
          icon: <MonitorHeartIcon className="card-type__icon" />,
        });
        break;
      case "bodyMeasurements":
        setData({
          icon: <AccessibilityIcon className="card-type__icon" />,
        });
        break;
      case "heart":
        setData({
          icon: <FavoriteIcon className="card-type__icon" />,
        });
        break;
      case "respiratory":
        setData({
          icon: <FaLungs className="card-type__icon" />,
        });
        break;
      case "sleep":
        setData({
          icon: <KingBedIcon className="card-type__icon" />,
        });
        break;
      case "cycleTracker":
        setData({
          icon: <DataSaverOffIcon className="card-type__icon" />,
        });
        break;
      case "other":
        setData({
          icon: <AddCircleIcon className="card-type__icon" />,
        });
        break;
      default:
        break;
    }
  }, [name.value, unit, data, type]);

  // if (type === "heart") {
  //   setData({
  //     icon: <MonitorHeartIcon className="card-type__icon" />,
  //   });
  // }

  //  else if (type === "bodyMeasurements") {
  //   setData({
  //     icon: <AccessibilityIcon className="card-type__icon" />,
  //   });
  // } else if (type === "heart") {
  //   setData({
  //     icon: <FavoriteIcon className="card-type__icon" />,
  //   });
  // } else if (type === "respiratory") {
  //   setData({
  //     icon: <FavoriteIcon className="card-type__icon" />,
  //   });
  // } else if (type === "sleep") {
  //   setData({
  //     icon: <KingBedIcon className="card-type__icon" />,
  //   });
  // } else if (type === "cycleTracker") {
  //   setData({
  //     icon: <DataSaverOffIcon className="card-type__icon" />,
  //   });
  // } else if (type === "other") {
  //   setData({
  //     icon: <AddCircleIcon className="card-type__icon" />,
  //   });
  // }
  return (
    <div className="card">
      <div className="card-left">
        <span className="card-name">{name}</span>
        <div className="card-value__container">
          <span className="card-value">{value}</span>
          <span className="card-unit">{unit}</span>
        </div>
      </div>
      <div className="card-right">
        {data.icon}
        <div className="card-date__container">
          <span className="card-date">{date}</span>
          <KeyboardArrowRightSharpIcon className="card-forward__icon" />
        </div>
      </div>
    </div>
  );
}

export default Card;
