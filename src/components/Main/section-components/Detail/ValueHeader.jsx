import React, { useEffect, useState } from "react";
import "./valueHeader.css";

import { useDispatch } from "react-redux";
import { formStateActions } from "../../../../store/form-state";

import ValueContainer from "../ValueContainer";
import DateControl from "./DateControl";

function ValueHeader({ data, unit, selectedUnit, actions }) {
  const dispatch = useDispatch();
  const [latestData, setLatestData] = useState(undefined);
  const unitArray = Object.values(unit);
  const initialUnit = selectedUnit && unit[selectedUnit];

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
        state: initialUnit.name,
        symbol: initialUnit.symbol,
        to: initialUnit.to,
        from: initialUnit.from,
      })
    );
  }, [initialUnit]);

  const unitSelectHandler = (e) => {
    e.preventDefault();

    dispatch(
      actions.changeUnit({
        unit: e.target.value,
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
