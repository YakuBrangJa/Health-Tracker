import React, { useState, useRef, useEffect } from "react";

function ValueInput({ unitState, onChangeHandler, formValue, formOpenState }) {
  const inputRef = useRef();

  useEffect(() => {
    if (!formOpenState) return;
    inputRef.current && inputRef.current.focus();
  }, [formOpenState]);

  return (
    <>
      {unitState.formConfig &&
        unitState.formConfig.map((unit, i) => {
          if (unit.type === "number")
            return (
              <li key={unit.symbol}>
                <label>{unit.symbol}</label>
                <input
                  name={unit.name}
                  type={unit.type}
                  step={unit.step}
                  min={unit.min}
                  max={unit.max}
                  onChange={onChangeHandler}
                  value={formValue[unit.name] ? formValue[unit.name] : ""}
                  ref={i == 0 ? inputRef : null}
                />
              </li>
            );

          if (unit.type === "select")
            return (
              <li key={unit.symbol}>
                <label>{unit.symbol}</label>
                <select
                  name={unit.name}
                  onChange={onChangeHandler}
                  value={
                    formValue[unit.name]
                      ? formValue[unit.name]
                      : unit.options[0]
                  }
                >
                  {unit.options.map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </li>
            );
        })}
    </>
  );
}

export default ValueInput;

// const inchChangeHandler = (e) => {
//   setInchValue(e.target.value);
//   onChangeHandler(e);
// };

// if (unitState.state === "milimeter mercury") {
//   return (
//     <>
//       <li>
//         <label>Systolic</label>
//         <input
//           step={".1"}
//           type={"number"}
//           name="systolic"
//           value={formValue}
//           onChange={onChangeHandler}
//         />
//       </li>
//       <li>
//         <label>Diastolic</label>
//         <input
//           step={".1"}
//           type={"number"}
//           name="diastolic"
//           value={formValue}
//           onChange={onChangeHandler}
//         />
//       </li>
//     </>
//   );
// } else if (unitState.state === "foot") {
//   return (
//     <>
//       <li>
//         <label>ft</label>
//         <input
//           step={"any"}
//           name="foot"
//           type={"number"}
//           value={formValue}
//           onChange={onChangeHandler}
//         />
//       </li>
//       <li>
//         <label>in</label>
//         <select name="inch" onChange={inchChangeHandler} value={inchValue}>
//           {Array.from(Array(12).keys()).map((_, i) => (
//             <option key={i} value={i}>
//               {i}
//             </option>
//           ))}
//         </select>
//       </li>
//     </>
//   );
// }

// return (
//   <li>
//     <label>{unitState.symbol}</label>
//     <input
//       step={"any"}
//       type={"number"}
//       name="value"
//       value={formValue}
//       onChange={onChangeHandler}
//       ref={inputRef}
//     />
//   </li>
// );
