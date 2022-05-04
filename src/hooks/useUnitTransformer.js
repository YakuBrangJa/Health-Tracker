import React, { useState } from "react";

function useUnitTransformer() {
  const [singleValues, setSingleValues] = useState();
  const [doubleValues, setDoubleValues] = useState({});
  const transform = (value, unit) => {
    switch (unit) {
      case "kilogram":
        setSingleValues(parseFloat((value / 2.205).toFixed(1)));
        break;
      case "meter":
        setSingleValues(parseFloat((value / 100).toFixed(1)));
        break;
      case "inch":
        setSingleValues(parseFloat((value * 0.393701).toFixed(1)));
        break;
      case "celcius":
        setSingleValues(parseFloat(((value - 32) * (5 / 9)).toFixed(1)));
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
        setSingleValues(parseFloat(value.toFixed(1)));
    }
  };

  return {
    singleValues,
    doubleValues,
    transform,
  };
}

export default useUnitTransformer;
