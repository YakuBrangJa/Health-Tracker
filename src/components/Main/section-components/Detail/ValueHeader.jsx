import React, { useEffect } from "react";
import "./valueHeader.css";

import { useSelector, useDispatch } from "react-redux";
import { formStateActions } from "../../../../store/form-state";

function ValueHeader({ unit, actions }) {
  const { unitState } = useSelector((state) => state.formState);
  const dispatch = useDispatch();

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

  const unitSelectHandler = (e) => {
    e.preventDefault();

    dispatch(
      actions.changeUnit({
        unit: e.target.value,
      })
    );
  };

  return (
    <div className="value-header">
      <div className="value">{0}</div>
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
