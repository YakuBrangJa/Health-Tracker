import React from "react";
import "./summaryHeader2.css";

import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

function SummaryHeader2({ title }) {
  return (
    <div className="summary-header">
      <h2>{title}</h2>
      <button className="summary-edit__button">
        <span>Edit</span>
        <ModeEditOutlineRoundedIcon className="icon" />
      </button>
    </div>
  );
}

export default SummaryHeader2;
