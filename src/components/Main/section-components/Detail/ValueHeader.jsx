import React, { useEffect, useState } from "react";
import "./valueHeader.css";

import { useDispatch, useSelector } from "react-redux";
import { formStateActions } from "../../../../store/form-state";

import ValueContainer from "../ValueContainer";
import DateControl from "./DateControl";

function ValueHeader({ data, unit, selectedUnit, actions }) {
  const dispatch = useDispatch();
  const [latestData, setLatestData] = useState(undefined);
  const unitArray = Object.values(unit);
  const initialUnit = selectedUnit && unit[selectedUnit];
  const sidebarState = useSelector((state) => state.formState.sidebarState);

  useEffect(() => {
    if (data.length > 0) {
      setLatestData(
        data.reduce((a, b) =>
          new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`)
            ? a
            : b
        )
      );
    } else {
      setLatestData(undefined);
    }
  }, [data]);

  useEffect(() => {
    dispatch(
      formStateActions.setUnitState({
        ...initialUnit,
        state: initialUnit.name,
      })
    );
  }, [initialUnit]);

  const unitSelectHandler = (e) => {
    e.preventDefault();

    dispatch(
      actions.changeUnit({
        unit: e.target.value,
        sidebarState,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));
  };
  // const { formattedDate, format } = useDateTimeFormatter();

  // useEffect(() => {
  //   if (!latestData) return;
  //   format(latestData.date, latestData.time);
  // }, [latestData, format]);

  return (
    <div className="value-header">
      <DateControl data={data} />
      <div className="value-control">
        <ValueContainer
          latestData={latestData}
          unit={unit}
          selectedUnit={selectedUnit}
          isDetailTab={true}
        />

        <select
          name="unit"
          className="unit"
          value={initialUnit.name}
          onChange={unitSelectHandler}
        >
          {unitArray.map((value) => (
            <option key={value.name} value={value.name}>
              {value.symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ValueHeader;
