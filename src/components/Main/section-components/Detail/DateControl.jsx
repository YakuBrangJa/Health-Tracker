import React, { useState, useEffect } from "react";
import "./dateControl.css";

import { useSelector, useDispatch } from "react-redux";
import { activeDataActions } from "../../../../store/activeData";
import useDateTree from "../../../../hooks/useDateTree";

function DateControl({ data }) {
  const dispatch = useDispatch();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const { year, month, day, day14, week } = useSelector(
    (state) => state.activeData.activeDate
  );
  const { dateTree } = useDateTree(data);

  const [earliestData, setEarliestData] = useState();
  const [latestData, setLatestData] = useState();

  const [yearArray, setYearArray] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [fourteenDayArray, setFourteenDayArray] = useState([]);
  const [weekArray, setWeekArray] = useState([]);
  const [dayArray, setDayArray] = useState([]);

  function convertMonthArray(value) {
    return Object.keys(dateTree[value]).sort(
      (a, b) => monthIndex(a) - monthIndex(b)
    );
  }

  function monthIndex(mon) {
    return new Date(Date.parse(mon + " 1, 1970")).getMonth();
  }

  function intervalStartDate(date, interval) {
    const dateDiff = new Date(
      new Date(
        `${date.monthItem} ${date.dayItem}, ${date.yearItem}`
      ).getTime() -
        60000 * 60 * 24 * interval
    );

    return {
      day: dateDiff.toLocaleString("en-US", {
        day: "numeric",
      }),
      month: dateDiff.toLocaleString("en-US", {
        month: "short",
      }),
    };
  }

  function nextSunday(date) {
    return (
      new Date(date).getTime() + (7 - new Date(date).getDay()) * 60000 * 60 * 24
    );
  }

  useEffect(() => {
    if (data.length === 0) return;
    const early = data.reduce((a, b) =>
      new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`) ? b : a
    );
    const late = data.reduce((a, b) =>
      new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`) ? a : b
    );

    setEarliestData(early);
    setLatestData(late);
  }, [data]);

  // YEAR
  useEffect(() => {
    if (!dateTree) return;
    setYearArray(Object.keys(dateTree).reverse());
  }, [dateTree]);
  // MONTH
  useEffect(() => {
    if (!dateTree || !year) return;
    setMonthArray(convertMonthArray(year));
  }, [dateTree, year]);
  // 14 DAYS
  useEffect(() => {
    if (!earliestData || !latestData || !dateTree || !year || !month) return;

    const totalInterval = (
      (new Date(latestData.date).getTime() -
        new Date(earliestData.date).getTime()) /
      (60000 * 60 * 24 * 14)
    ).toFixed(0);

    const dayArr = Array.from(
      { length: totalInterval == 0 ? 1 : totalInterval },
      (_, i) => {
        const day14 = new Date(
          new Date(latestData.date).getTime() - i * 60000 * 60 * 24 * 14
        );

        return {
          dayItem: day14.getDate(),
          monthItem: day14.toLocaleString("en-US", { month: "short" }),
          yearItem: day14.toLocaleString("en-US", { year: "numeric" }),
        };
      }
    );

    const dayArrFiltered = dayArr.filter((item) => item.yearItem === year);
    const fixedDayArr =
      dayArrFiltered.length === 0 ? [dayArr.slice(-1).pop()] : dayArrFiltered;

    setFourteenDayArray(fixedDayArr);
  }, [earliestData, latestData, dateTree, year, month]);

  // WEEK
  useEffect(() => {
    if (!earliestData || !latestData || !dateTree || !year || !month) return;

    const totalInterval = (
      (new Date(latestData.date).getTime() -
        new Date(earliestData.date).getTime()) /
      (60000 * 60 * 24 * 7)
    ).toFixed(0);

    const dayArr = Array.from(
      { length: totalInterval == 0 ? 1 : totalInterval },
      (_, i) => {
        const weekDays = new Date(
          nextSunday(latestData.date) - (i + 1) * 60000 * 60 * 24 * 7
        );

        return {
          dayItem: weekDays.getDate(),
          monthItem: weekDays.toLocaleString("en-US", { month: "short" }),
          yearItem: weekDays.toLocaleString("en-US", { year: "numeric" }),
        };
      }
    );
    const dayArrFiltered = dayArr.filter(
      (item) => item.yearItem === year && item.monthItem === month
    );
    const fixedDayArr =
      dayArrFiltered.length === 0 ? [dayArr.slice(-1).pop()] : dayArrFiltered;

    setWeekArray(fixedDayArr);
  }, [earliestData, latestData, dateTree, year, month]);

  // DAY
  useEffect(() => {
    if (!dateTree || !year || !month) return;
    const arr = dateTree[year][month] ? Object.keys(dateTree[year][month]) : [];
    setDayArray(arr);
  }, [dateTree, year, month]);

  // DISPATCH STATE
  useEffect(() => {
    dispatch(activeDataActions.setActiveYear(yearArray[0]));
  }, [yearArray, activeDataActions]);

  useEffect(() => {
    dispatch(activeDataActions.setActiveMonth(monthArray.slice(-1).pop()));
  }, [monthArray, activeDataActions]);

  useEffect(() => {
    dispatch(activeDataActions.setActiveDay(dayArray.slice(-1).pop()));
  }, [dayArray, activeDataActions]);

  useEffect(() => {
    dispatch(
      activeDataActions.setActiveDay14(JSON.stringify(fourteenDayArray[0]))
    );
  }, [fourteenDayArray, activeDataActions]);

  useEffect(() => {
    dispatch(activeDataActions.setActiveWeek(JSON.stringify(weekArray[0])));
  }, [weekArray, activeDataActions]);

  // console.log(day14);
  // console.log(week !== undefined ? JSON.parse(week) : "no week");

  if (yearArray.length === 0 || !dateTree) return <div></div>;

  return (
    <div className="date-control">
      <select
        value={year}
        onChange={(e) => {
          dispatch(activeDataActions.setActiveYear(e.target.value));

          const monthLastIndex = convertMonthArray(e.target.value)
            .slice(-1)
            .pop();

          dispatch(activeDataActions.setActiveMonth(monthLastIndex));
        }}
      >
        {yearArray.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {activeDateTab === "Y" || activeDateTab === "14D" ? (
        ""
      ) : (
        <select
          value={month}
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

      {activeDateTab === "D" ? (
        <select
          value={day}
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
      ) : (
        ""
      )}

      {activeDateTab === "14D" && (
        <select
          value={day14}
          onChange={(e) => {
            dispatch(activeDataActions.setActiveDay14(e.target.value));
          }}
        >
          {fourteenDayArray.map((d) => (
            <option key={d.dayItem + d.monthItem} value={JSON.stringify(d)}>
              {`${intervalStartDate(d, 13).month}${
                intervalStartDate(d, 13).day
              } - ${d.monthItem}${d.dayItem}`}
            </option>
          ))}
        </select>
      )}

      {activeDateTab === "W" && (
        <select
          value={week}
          onChange={(e) => {
            dispatch(activeDataActions.setActiveWeek(e.target.value));
          }}
        >
          {weekArray.map((d) => (
            <option key={d.dayItem + d.monthItem} value={JSON.stringify(d)}>
              {`${d.monthItem}${d.dayItem} - ${intervalStartDate(d, -6).month}${
                intervalStartDate(d, -6).day
              }`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DateControl;
