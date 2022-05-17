import React from "react";
import "./valueContainer.css";

function ValueContainer({ unit, latestData, selectedUnit, isDetailTab }) {
  if (!selectedUnit || !latestData) return;

  if (!latestData && isDetailTab) {
    return <p className="empty-value">No Data</p>;
  }

  return (
    <div className="cardItem-value__container">
      <span className={`cardItem-value ${isDetailTab && "detail-value"}`}>
        {unit[selectedUnit].to(latestData.value)}
      </span>
      {!isDetailTab && (
        <span className="cardItem-unit">{unit[selectedUnit].symbol}</span>
      )}
    </div>
  );
}

export default ValueContainer;
