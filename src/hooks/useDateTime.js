import React from "react";

function useDateTime() {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const today = String(newDate.getDate()).padStart(2, "0");
  const dateFormat = `${year}-${month}-${today}`;

  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const timeFormat = `${hour}:${minute}:00`;
  console.log(hour, minute);

  React.useEffect(() => {
    setDate(dateFormat);
    setTime(timeFormat);
  }, [dateFormat]);

  return {
    date,
    time,
  };
}

export default useDateTime;
