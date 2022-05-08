import React, { useCallback } from "react";

function useChartDataFormat() {
  const [chartDataFormat, setChartDataFormat] = React.useState();

  const formatData = useCallback((data, filterState) => {
    const dateTree = data.reduce((group, item) => {
      const year = new Date(item.date).getFullYear();
      const month = new Date(item.date).toLocaleString("en-US", {
        month: "short",
      });
      const day = new Date(item.date).getDate();
      const weekDay = new Date(item.date).toLocaleString("en-US", {
        week: "short",
      });
      const hour = new Date(`${item.date}T${item.time}`).getHours();

      if (!group[year]) group[year] = {};
      if (!group[year][month]) group[year][month] = {};
      if (!group[year][month][day]) group[year][month][day] = {};
      // if (!group[year][month][day].weekDay)
      // group[year][month][day].weekDay = "";
      if (!group[year][month][day][hour]) group[year][month][day][hour] = [];

      // group[year][month][day].weekDay = weekDay;
      group[year][month][day][hour].push(item.value);
      return group;
    }, {});

    console.log(dateTree);

    if (filterState === "YEAR") {
      const monthsArr = Array.from({ length: 12 }, (item, i) => {
        return new Date(0, i).toLocaleString("en-US", { month: "short" });
      });

      const yearGroup = dateTree[2022]; // selected year (default is latest year)

      const filledChart = monthsArr.map((month) => {
        const matchedMonth = yearGroup[month];

        if (matchedMonth) {
          const monthData =
            Object.values(matchedMonth)
              .map(
                (d) =>
                  Object.values(d)
                    .map(
                      (hr) =>
                        hr.reduce((accu, value) => {
                          return accu + value;
                        }, 0) / hr.length
                    )
                    .reduce((accu, hrAvg) => {
                      return accu + hrAvg;
                    }, 0) / Object.values(d).length
              )
              .reduce((accu, value) => {
                return accu + value;
              }, 0) / Object.values(matchedMonth).length;

          return {
            x: month,
            y: monthData.toFixed(1),
          };
        } else {
          return {
            x: month,
            y: null,
          };
        }
      });
      setChartDataFormat(filledChart);
    }

    if (filterState === "MONTH") {
      const year = "2022"; // selected year
      const month = 5; // selected month
      const daysOfMonth = new Date(year, month, 0).getDate();
      console.log(daysOfMonth);

      const dayArr = Array.from({ length: daysOfMonth }, (_, i) => i + 1);

      const yearGroup = dateTree[year];
      const monthGroup = yearGroup.May;

      const filledChart = dayArr.map((day) => {
        const matchedDay = monthGroup[day];

        if (matchedDay) {
          const dayData =
            Object.values(matchedDay)
              .map(
                (hr) =>
                  hr.reduce((accu, value) => {
                    return accu + value;
                  }, 0) / hr.length
              )
              .reduce((accu, value) => {
                return accu + value;
              }, 0) / Object.values(matchedDay).length;

          return {
            x: day,
            y: dayData.toFixed(1),
          };
        } else {
          return {
            x: day,
            y: null,
          };
        }
      });
      setChartDataFormat(filledChart);
    }

    if (filterState == "WEEK") {
      const year = "2022"; // selected year
      const month = "May"; // selected month

      const week = Array.from({ length: 7 }, (_, i) => i + 1);
    }
  }, []);

  return { chartDataFormat, formatData };
}

export default useChartDataFormat;
