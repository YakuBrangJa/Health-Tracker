import React, { useState } from "react";

function useUnitTransformer() {
  const [transformedValue, setTransformedValue] = useState();
  const [doubleValues, setDoubleValues] = useState({});
  const transform = (value, unit) => {
    switch (unit) {
      case "kilogram":
        setTransformedValue(parseFloat((value / 2.205).toFixed(1)));
        break;
      case "meter":
        setTransformedValue(parseFloat((value / 100).toFixed(1)));
        break;
      case "inch":
        setTransformedValue(parseFloat((value * 0.393701).toFixed(1)));
        break;
      case "celcius":
        setTransformedValue(parseFloat(((value - 32) * (5 / 9)).toFixed(1)));
        break;
      case "foot":
        setDoubleValues({
          foot: parseFloat((value / 30.48).toFixed(0)),
          inch: Math.round((value % 30.48) / 2.54),
        });
        break;
      case "milimeter mercury":
        setDoubleValues({
          systolic: parseInt(value.systolic),
          diastolic: parseInt(value.diastolic),
        });
        break;
      default:
        setTransformedValue(parseFloat(value.toFixed(1)));
    }
  };

  return {
    transformedValue,
    doubleValues,
    transform,
  };
}

export default useUnitTransformer;
