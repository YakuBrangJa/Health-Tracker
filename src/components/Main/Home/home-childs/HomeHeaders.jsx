import React from "react";
import "./homeHeaders.css";

import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

function HomeHeaders({ title }) {
  return (
    <div className="summary-header">
      <h2>{title}</h2>
      {/* <button className="summary-edit__button">
        <span>Edit</span>
        <ModeEditOutlineRoundedIcon className="icon" />
      </button> */}
    </div>
  );
}

export default HomeHeaders;
