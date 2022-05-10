import React, { useEffect } from "react";
import "./valueContainer.css";

import useUnitTransformer from "../../../hooks/useUnitTransformer";

function ValueContainer({ unit, latestData }) {
  const unitArray = Object.values(unit);
  const selectedUnit = unitArray.find((item) => item.selected === true);

  const { transform, singleValues, doubleValues } = useUnitTransformer();
  useEffect(() => {
    if (!latestData) return;
    transform(latestData.value, selectedUnit.name);
  }, [latestData, selectedUnit, transform]);

  if (selectedUnit.name === "milimeter mercury") {
    return (
      <div className="cardItem-value__container">
        <span className="cardItem-value">
          {doubleValues.systolic}/{doubleValues.diastolic}
        </span>
        <span className="cardItem-unit">{selectedUnit.symbol}</span>
      </div>
    );
  } else if (selectedUnit.name === "foot") {
    return (
      <div className="cardItem-value__container">
        <span className="cardItem-value">
          {doubleValues.foot}
          <span className="foot-unit">'</span>
          {doubleValues.inch}
          <span className="foot-unit">"</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="cardItem-value__container">
        <span className="cardItem-value">{singleValues}</span>
        <span className="cardItem-unit">{selectedUnit.symbol}</span>
      </div>
    );
  }
}

export default ValueContainer;
