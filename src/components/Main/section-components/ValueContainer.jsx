import React, { useEffect } from "react";
import "./valueContainer.css";

import useUnitTransformer from "../../../hooks/useUnitTransformer";

function ValueContainer({ unit, latestData, isDetailTab }) {
  const unitArray = Object.values(unit);
  const selectedUnit = unitArray.find((item) => item.selected === true);

  const { transform, singleValues, doubleValues } = useUnitTransformer();

  useEffect(() => {
    if (!latestData) return;
    transform(latestData.value, selectedUnit.name);
  }, [latestData, selectedUnit, transform]);

  console.log(unit);

  if (selectedUnit.name === "milimeter mercury") {
    return (
      <div className="cardItem-value__container">
        <span className={`cardItem-value ${isDetailTab && "detail-value"}`}>
          {doubleValues.systolic}/{doubleValues.diastolic}
        </span>
        {!isDetailTab && (
          <span className="cardItem-unit">{selectedUnit.symbol}</span>
        )}
      </div>
    );
  } else if (selectedUnit.name === "foot") {
    return (
      <div className="cardItem-value__container">
        <span className={`cardItem-value ${isDetailTab && "detail-value"}`}>
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
        <span className={`cardItem-value ${isDetailTab && "detail-value"}`}>
          {singleValues}
        </span>
        {!isDetailTab && (
          <span className="cardItem-unit">{selectedUnit.symbol}</span>
        )}
      </div>
    );
  }
}

export default ValueContainer;
