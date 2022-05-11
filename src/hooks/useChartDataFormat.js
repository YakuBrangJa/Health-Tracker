import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function useChartDataFormat() {
  const [chartDataFormat, setChartDataFormat] = React.useState();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const activeDate = useSelector((state) => state.activeData.activeDate);

  const formatData = useCallback(
    (dateTree) => {
      function monthIndex(mon) {
        return new Date(Date.parse(mon + " 1, 1970")).getMonth();
      }
      // console.log(activeDate);

      if (activeDateTab === "Y" && dateTree && activeDate.year) {
        const monthsArr = Array.from({ length: 12 }, (item, i) => {
          return new Date(0, i).toLocaleString("en-US", { month: "short" });
        });

        // const yearGroup = dateTree[2021]; // selected year (default is latest year)
        const yearGroup = dateTree[activeDate.year];

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

      if (activeDateTab === "M" && dateTree && activeDate.month) {
        const year = activeDate.year; // selected year
        const month = activeDate.month; // selected month
        const daysOfMonth = new Date(year, monthIndex(month) + 1, 0).getDate();

        const dayArr = Array.from({ length: daysOfMonth }, (_, i) => i + 1);

        // const yearGroup = dateTree[year];
        const monthGroup = dateTree[year][month];

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

      if (activeDateTab === "W" && dateTree && activeDate.day) {
        const year = activeDate.year; // selected year
        const month = activeDate.month; // selected month
        const day = activeDate.day;

        const weekArr = Array.from({ length: 7 }, (_, i) =>
          new Date(
            new Date(`${year}-${monthIndex(month)}-${day}`).getTime() -
              i * 60000 * 60 * 24
          ).getDate()
        ).reverse();

        // const yearGroup = dateTree[year];
        const monthGroup = dateTree[year][month];

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
              x: new Date(`${year}-${month}-${dayItem}`).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                }
              ),
              y: weekDayData.toFixed(1),
            };
          } else {
            return {
              x: new Date(`${year}-${month}-${dayItem}`).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                }
              ),
              y: null,
            };
          }
        });

        setChartDataFormat(filledChart);
      }

      if (activeDateTab === "D" && dateTree && activeDate.day) {
        const year = activeDate.year; // selected year
        const month = activeDate.month; // selected month
        const day = activeDate.day;

        const dayGroup = dateTree[year][month][day];

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
                y: hourData.toFixed(1),
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
    },
    [activeDateTab, activeDate]
  );

  return { chartDataFormat, formatData };
}

export default useChartDataFormat;
