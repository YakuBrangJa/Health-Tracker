import React from "react";
import "./dateNav.css";

function DateNav(props) {
  return (
    <div className="date-navigation">
      <ul>
        <li>
          <span>Day</span>
          <span>D</span>
        </li>
        <li>
          <span>Week</span>
          <span>W</span>
        </li>
        <li>
          <span>Month</span>
          <span>M</span>
        </li>
        <li>
          <span>6 Months</span>
          <span>6M</span>
        </li>
        <li>
          <span>Year</span>
          <span>Y</span>
        </li>
      </ul>
    </div>
  );
}

export default DateNav;
