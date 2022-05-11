import React, { useEffect } from "react";
import "./dateNav.css";

import { useDispatch, useSelector } from "react-redux";
import { dateNavActions } from "../../../../store/date-nav";

function DateNav(props) {
  const dispatch = useDispatch();
  const { dateTabs, activeTabState } = useSelector((state) => state.dateNav);

  useEffect(() => {
    dispatch(dateNavActions.setActiveTabState("D"));
  }, [dateNavActions]);

  const selectTabHandler = (tab) => {
    dispatch(dateNavActions.setActiveTabState(tab));
  };

  return (
    <div className="date-navigation">
      <ul>
        {dateTabs.map((tab) => (
          <li
            key={tab.short}
            className={`${activeTabState === tab.short && "active"}`}
            onClick={() => selectTabHandler(tab.short)}
          >
            <span>{tab.long}</span>
            <span>{tab.short}</span>
          </li>
        ))}

        <li className="navigator"></li>
      </ul>
    </div>
  );
}

export default DateNav;
