import React, { useState, useEffect } from "react";
import "./dateControl.css";

import { useSelector, useDispatch } from "react-redux";
import { activeDataActions } from "../../../../store/activeData";
import useDateTree from "../../../../hooks/useDateTree";

function DateControl({ data }) {
  const dispatch = useDispatch();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const { activeDate } = useSelector((state) => state.activeData);
  const { dateTree } = useDateTree(data);

  const [yearArray, setYearArray] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [dayArray, setDayArray] = useState([]);

  function convertMonthArray(value) {
    return Object.keys(dateTree[value]).sort(
      (a, b) => monthIndex(a) - monthIndex(b)
    );
  }

  function monthIndex(mon) {
    return new Date(Date.parse(mon + " 1, 1970")).getMonth();
  }

  // // YEAR
  useEffect(() => {
    if (!dateTree) return;
    setYearArray(Object.keys(dateTree).reverse());
  }, [dateTree]);
  // // MONTH
  useEffect(() => {
    if (!dateTree || !activeDate.year) return;
    setMonthArray(convertMonthArray(activeDate.year));
  }, [dateTree, activeDate.year]);
  // // DAY
  useEffect(() => {
    if (!dateTree || !activeDate.year || !activeDate.month) return;
    setDayArray(Object.keys(dateTree[activeDate.year][activeDate.month]));
  }, [dateTree, activeDate.year, activeDate.month]);

  // DISPATCH ACTIVEDATE STATE
  useEffect(() => {
    dispatch(activeDataActions.setActiveYear(yearArray[0]));
  }, [yearArray, activeDataActions]);

  useEffect(() => {
    dispatch(activeDataActions.setActiveMonth(monthArray.slice(-1).pop()));
  }, [monthArray, activeDataActions]);

  useEffect(() => {
    dispatch(activeDataActions.setActiveDay(dayArray.slice(-1).pop()));
  }, [dayArray, activeDataActions]);

  if (yearArray.length === 0 || !dateTree) return <div></div>;

  return (
    <div className="date-control">
      {activeDateTab === "D" && (
        <select
          value={activeDate.day}
          onChange={(e) =>
            dispatch(activeDataActions.setActiveDay(e.target.value))
          }
        >
          {dayArray.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      {activeDateTab === "Y" || activeDateTab === "6M" ? (
        ""
      ) : (
        <select
          value={activeDate.month}
          onChange={(e) =>
            dispatch(activeDataActions.setActiveMonth(e.target.value))
          }
        >
          {monthArray.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      )}

      <select
        value={activeDate.year}
        onChange={(e) => {
          dispatch(activeDataActions.setActiveYear(e.target.value));

          const monthLastIndex = convertMonthArray(e.target.value)
            .slice(-1)
            .pop();

          dispatch(activeDataActions.setActiveMonth(monthLastIndex));

          dispatch(
            activeDataActions.setActiveDay(monthLastIndex.slice(-1).pop())
          );
        }}
      >
        {yearArray.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateControl;
