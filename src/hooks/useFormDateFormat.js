import React from "react";

function useFormDateFormat(formOpenState) {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    const newDate = new Date();

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const today = String(newDate.getDate()).padStart(2, "0");
    const dateFormat = `${year}-${month}-${today}`;

    const hour = String(newDate.getHours()).padStart(2, "0");
    const minute = String(newDate.getMinutes()).padStart(2, "0");
    const timeFormat = `${hour}:${minute}:00`;

    setDate(dateFormat);
    setTime(timeFormat);
  }, [formOpenState]);

  return {
    date,
    time,
  };
}

export default useFormDateFormat;
