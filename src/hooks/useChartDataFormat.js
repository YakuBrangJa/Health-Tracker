import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function useChartDataFormat() {
  const [chartDataFormat, setChartDataFormat] = React.useState();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const { year, month, day, day14, week } = useSelector(
    (state) => state.activeData.activeDate
  );

  const formatData = useCallback(
    (dateTree) => {
      if (!dateTree || !day || !month || !year) return;

      // REUSABLE FUNCTIONS
      function monthIndex(mon) {
        return new Date(mon + " 1, 1970").getMonth();
      }
      function reduceToAvg(value) {
        return (
          value.reduce((a, b) => {
            return a + b;
          }, 0) / value.length
        );
      }

      if (activeDateTab === "Y") {
        const monthsArr = Array.from({ length: 12 }, (item, i) => {
          return new Date(0, i).toLocaleString("en-US", { month: "short" });
        });

        const filledChart = monthsArr.map((monthItem) => {
          const matchedMonth = dateTree[year][monthItem];

          if (matchedMonth) {
            const monthData = reduceToAvg(
              Object.values(matchedMonth).map((d) =>
                reduceToAvg(Object.values(d.hour).map((hr) => reduceToAvg(hr)))
              )
            );

            return {
              x: monthItem,
              y: monthData.toFixed(1),
            };
          } else {
            return {
              x: monthItem,
              y: null,
            };
          }
        });
        setChartDataFormat(filledChart);
      }

      if (activeDateTab === "M") {
        const daysOfMonth = new Date(year, monthIndex(month) + 1, 0).getDate();
        const dayArr = Array.from({ length: daysOfMonth }, (_, i) => i + 1);

        const monthGroup = dateTree[year][month];

        const filledChart = dayArr.map((dayItem) => {
          const matchedDay = monthGroup[dayItem];

          if (matchedDay) {
            const dayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );

            return {
              x: dayItem,
              y: dayData.toFixed(1),
            };
          } else {
            return {
              x: dayItem,
              y: null,
            };
          }
        });
        setChartDataFormat(filledChart);
      }

      if (activeDateTab === "14D") {
        const day14Parsed = JSON.parse(day14);
        const dayArr = Array.from({ length: 14 }, (_, i) => {
          const date = new Date(
            new Date(
              `${day14Parsed.monthItem} ${day14Parsed.dayItem}, ${day14Parsed.yearItem}`
            ).getTime() -
              i * 60000 * 60 * 24
          );

          return {
            dayItem: date.getDate(),
            monthItem: date.toLocaleString("en-US", { month: "short" }),
          };
        }).reverse();

        const monthGroup =
          dateTree[day14Parsed.yearItem][day14Parsed.monthItem];
        const prevMonthGroup =
          dateTree[day14Parsed.yearItem][dayArr[0].monthItem];

        const dayArr2 = dayArr.splice(
          dayArr.findIndex((item) => item.monthItem === day14Parsed.monthItem)
        );

        // console.log(dayArr, dayArr2);

        const filledChart1 = dayArr.map(({ dayItem, monthItem }) => {
          if (!prevMonthGroup)
            return {
              x:
                dayItem === dayArr[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: null,
            };

          const matchedDay = prevMonthGroup[dayItem];

          if (matchedDay) {
            const dayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
            return {
              x:
                dayItem === dayArr[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: dayData.toFixed(1),
            };
          } else {
            return {
              x:
                dayItem === dayArr[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: null,
            };
          }
        });

        const filledChart2 = dayArr2.map(({ dayItem, monthItem }) => {
          const matchedDay = monthGroup[dayItem];

          if (matchedDay) {
            const dayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
            return {
              x:
                dayItem === dayArr2[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: dayData.toFixed(1),
            };
          } else {
            return {
              x:
                dayItem === dayArr2[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: null,
            };
          }
        });

        setChartDataFormat(filledChart1.concat(filledChart2));
      }

      // WEEK
      if (activeDateTab === "W") {
        const weekParsed = JSON.parse(week);

        function nextSunday(date) {
          return (
            new Date(date).getTime() +
            (6 - new Date(date).getDay()) * 60000 * 60 * 24
          );
        }

        const weekArr = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(
            nextSunday(
              `${weekParsed.monthItem} ${weekParsed.dayItem}, ${weekParsed.yearItem}`
            ) -
              i * 60000 * 60 * 24
          );

          return {
            dayItem: date.getDate(),
            monthItem: date.toLocaleString("en-US", { month: "short" }),
            weekItem: date.toLocaleString("en-US", { weekday: "short" }),
          };
        }).reverse();

        console.log(weekArr);

        const weekGroup = dateTree[weekParsed.yearItem][weekParsed.monthItem];
        const prevWeekGroup =
          dateTree[weekParsed.yearItem][weekArr[0].monthItem];

        const weekArr2 = weekArr.splice(
          weekArr.findIndex((item) => item.monthItem === weekParsed.monthItem)
        );

        const filledChart1 = weekArr.map(({ dayItem, monthItem, weekItem }) => {
          if (!prevWeekGroup)
            return {
              x:
                dayItem === weekArr[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: null,
            };

          const matchedDay = prevWeekGroup[dayItem];

          if (matchedDay) {
            const weekDayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
            return {
              x: `${monthItem + dayItem} ${weekItem}`,
              y: weekDayData.toFixed(1),
            };
          } else {
            return {
              x: `${monthItem + dayItem} ${weekItem}`,
              y: null,
            };
          }
        });

        const filledChart2 = weekArr2.map(
          ({ dayItem, monthItem, weekItem }) => {
            const matchedDay = weekGroup[dayItem];

            if (matchedDay) {
              const weekDayData = reduceToAvg(
                Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
              );
              return {
                x: `${monthItem + dayItem} ${weekItem}`,
                y: weekDayData.toFixed(1),
              };
            } else {
              return {
                x: `${monthItem + dayItem} ${weekItem}`,
                y: null,
              };
            }
          }
        );

        setChartDataFormat(filledChart1.concat(filledChart2));
      }

      if (activeDateTab === "D") {
        const hourArr = Array.from(Array(24).keys());
        const dayGroup = dateTree[year][month][day];

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
              const hourData = reduceToAvg(matchedHour);

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
    [activeDateTab, year, month, day, day14, week]
  );

  return { chartDataFormat, formatData };
}

export default useChartDataFormat;
// --------------------------------------------------
// YEAR
// const monthData =
//   Object.values(matchedMonth)
//     .map(
//       (d) =>
//         Object.values(d.hour)
//           .map(
//             (hr) =>
//               hr.reduce((accu, value) => {
//                 return accu + value;
//               }, 0) / hr.length
//           )
//           .reduce((accu, hrAvg) => {
//             return accu + hrAvg;
//           }, 0) / Object.values(d.hour).length
//     )
//     .reduce((accu, value) => {
//       return accu + value;
//     }, 0) / Object.values(matchedMonth).length;
// ---------------------------------------------------
// MONTH
// const dayData =
//   Object.values(matchedDay.hour)
//     .map(
//       (hr) =>
//         hr.reduce((accu, value) => {
//           return accu + value;
//         }, 0) / hr.length
//     )
//     .reduce((accu, value) => {
//       return accu + value;
//     }, 0) / Object.values(matchedDay.hour).length;
