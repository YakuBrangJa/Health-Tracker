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
        weekday: "short",
      });
      const hour = new Date(`${item.date}T${item.time}`).getHours();
      const hourObj = "hour";
      const weekObj = "week";

      if (!group[year]) group[year] = {};
      if (!group[year][month]) group[year][month] = {};
      if (!group[year][month][day]) group[year][month][day] = {};
      if (!group[year][month][day][weekObj])
        group[year][month][day][weekObj] = "";
      if (!group[year][month][day][hourObj])
        group[year][month][day][hourObj] = {};
      if (!group[year][month][day][hourObj][hour])
        group[year][month][day][hourObj][hour] = [];

      group[year][month][day][weekObj] = weekDay;
      group[year][month][day][hourObj][hour].push(item.value);
      return group;
    }, {});

    console.log(dateTree);

    if (filterState === "YEAR") {
      const monthsArr = Array.from({ length: 12 }, (item, i) => {
        return new Date(0, i).toLocaleString("en-US", { month: "short" });
      });

      const yearGroup = dateTree[2021]; // selected year (default is latest year)

      const filledChart = monthsArr.map((month) => {
        const matchedMonth = yearGroup[month];

        if (matchedMonth) {
          const monthData =
            Object.values(matchedMonth)
              .map(
                (d) =>
                  Object.values(d.hour)
                    .map(
                      (hr) =>
                        hr.reduce((accu, value) => {
                          return accu + value;
                        }, 0) / hr.length
                    )
                    .reduce((accu, hrAvg) => {
                      return accu + hrAvg;
                    }, 0) / Object.values(d.hour).length
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
            Object.values(matchedDay.hour)
              .map(
                (hr) =>
                  hr.reduce((accu, value) => {
                    return accu + value;
                  }, 0) / hr.length
              )
              .reduce((accu, value) => {
                return accu + value;
              }, 0) / Object.values(matchedDay.hour).length;

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
      const month = 5; // selected month
      const day = 9;

      const weekArr = Array.from({ length: 7 }, (_, i) =>
        new Date(
          new Date(`${year}-${month}-${day}`).getTime() - i * 60000 * 60 * 24
        ).getDate()
      ).reverse();

      const yearGroup = dateTree[year];
      const monthGroup = yearGroup.May;

      const filledChart = weekArr.map((dayItem) => {
        const matchedDay = monthGroup[dayItem];

        if (matchedDay) {
          const weekDayData =
            Object.values(matchedDay.hour)
              .map(
                (hr) =>
                  hr.reduce((accu, value) => {
                    return accu + value;
                  }, 0) / hr.length
              )
              .reduce((accu, value) => {
                return accu + value;
              }, 0) / Object.values(matchedDay.hour).length;

          return {
            x: new Date(`${year}-${month}-${dayItem}`).toLocaleString("en-US", {
              weekday: "short",
            }),
            y: weekDayData.toFixed(1),
          };
        } else {
          return {
            x: new Date(`${year}-${month}-${dayItem}`).toLocaleString("en-US", {
              weekday: "short",
            }),
            y: null,
          };
        }
      });

      setChartDataFormat(filledChart);
    }

    if (filterState === "DAY") {
      const year = "2022"; // selected year
      const month = 5; // selected month
      const day = 9;

      const yearGroup = dateTree[year];
      const monthGroup = yearGroup.May;
      const dayGroup = monthGroup[day];

      const hourArr = Array.from(Array(24).keys());

      const filledChart = hourArr.map((hourItem) => {
        const hourFormat = (hr) => {
          if (hr === 0) return "12 AM";
          else if (hr === 12) return "12 PM";
          else if (hr > 12) return hr - 12;
          else return hr;
        };

        if (dayGroup) {
          const matchedHour = dayGroup.hour[hourItem];

          if (matchedHour) {
            const hourData =
              matchedHour.reduce((accu, value) => {
                return accu + value;
              }, 0) / matchedHour.length;

            return {
              x: hourFormat(hourItem),
              y: hourData,
            };
          } else {
            return {
              x: hourFormat(hourItem),
              y: null,
            };
          }
        } else {
          return {
            x: hourFormat(hourItem),
            y: null,
          };
        }
      });
      setChartDataFormat(filledChart);
    }
  }, []);

  return { chartDataFormat, formatData };
}

export default useChartDataFormat;
