import "./valueContainer.css";

function ValueContainer({
  latestData,
  selectedUnit,
  transformedValue,
  doubleValues,
}) {
  if (selectedUnit === "milimeter mercury") {
    return (
      <span className="cardItem-value">
        {doubleValues.systolic}/{doubleValues.diastolic}
      </span>
    );
  } else if (selectedUnit === "foot") {
    return (
      <span className="cardItem-value">
        {doubleValues.foot}
        <span className="foot-unit">'</span>
        {doubleValues.inch}
        <span className="foot-unit">"</span>
      </span>
    );
  } else {
    return <span className="cardItem-value">{transformedValue}</span>;
  }
}

export default ValueContainer;
