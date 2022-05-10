import React, { useEffect, useState } from "react";
import "./valueHeader.css";

import { useSelector, useDispatch } from "react-redux";
import { formStateActions } from "../../../../store/form-state";

import ValueContainer from "../ValueContainer";

function ValueHeader({ data, unit, actions }) {
  const dispatch = useDispatch();
  const { unitState } = useSelector((state) => state.formState);
  const [latestData, setLatestData] = useState(undefined);

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

  const unitArray = Object.values(unit);
  const initialUnit = unitArray.find((item) => item.selected === true);

  useEffect(() => {
    dispatch(
      formStateActions.setUnitState({
        state: initialUnit.name,
        symbol: initialUnit.symbol,
      })
    );
  }, [initialUnit]);

  // const { formattedDate, format } = useDateTimeFormatter();

  // useEffect(() => {
  //   if (!latestData) return;
  //   format(latestData.date, latestData.time);
  // }, [latestData, format]);

  const unitSelectHandler = (e) => {
    e.preventDefault();

    dispatch(
      actions.changeUnit({
        unit: e.target.value,
      })
    );

    dispatch(formStateActions.setDataSubmitted(true));
  };

  return (
    <div className="value-header">
      <ValueContainer
        latestData={latestData}
        unit={unit}
        selectedUnit={initialUnit.name}
      />
      {/* <div className="value">{0}</div> */}
      <select
        name="unit"
        className="unit"
        value={unitState.state}
        onChange={unitSelectHandler}
      >
        {unitArray.map((value) => (
          <option key={value.name} value={value.name}>
            {value.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ValueHeader;
