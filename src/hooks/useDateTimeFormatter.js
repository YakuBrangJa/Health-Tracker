import React, { useCallback } from "react";

function useDateTimeFormatter() {
  const [formattedDate, setFormattedDate] = React.useState();
  const [formattedTime, setFormattedTime] = React.useState();

  const format = useCallback((date, time) => {
    const latestDate = new Date(`${date}T${time}`);
    const timeGap = new Date().getTime() - latestDate.getTime();
    const dayGap = timeGap / 1000 / 60 / 60 / 24;
    const curYearStart = new Date(new Date().getFullYear(), "0", "1");

    let formattedNewDate;

    if (dayGap < 1) {
      formattedNewDate = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
      }).format(latestDate);
    } else if (dayGap > 1 && dayGap < 2) {
      formattedNewDate = "Yesterday";
    } else if (dayGap > 1 && dayGap <= 7) {
      formattedNewDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(latestDate);
    } else if (dayGap > 7) {
      formattedNewDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(latestDate);
    } else if (latestDate.getTime() - curYearStart.getTime() < 0) {
      formattedNewDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
      });
    }

    setFormattedDate(formattedNewDate);
    setFormattedTime(
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
      }).format(latestDate)
    );
  }, []);

  return {
    formattedDate,
    formattedTime,
    format,
  };
}

export default useDateTimeFormatter;
