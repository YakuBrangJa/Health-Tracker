import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function useChartDataFormat() {
  const [chartDataFormat, setChartDataFormat] = React.useState();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const { year, month, day } = useSelector(
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
        const dayArr = Array.from({ length: 14 }, (_, i) => {
          return {
            dayItem: new Date(
              new Date(`${month} ${day}, ${year}`).getTime() -
                i * 60000 * 60 * 24
            ).getDate(),
            monthItem: new Date(
              new Date(`${month} ${day}, ${year}`).getTime() -
                i * 60000 * 60 * 24
            ).toLocaleString("en-US", { month: "short" }),
          };
        }).reverse();

        const monthGroup = dateTree[year][month];
        const prevMonthGroup = dateTree[year][dayArr[0].monthItem];

        const dayArr2 = dayArr.splice(
          dayArr.findIndex((item) => item.monthItem === month)
        );

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
            const weekDayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
            return {
              x:
                dayItem === dayArr[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: weekDayData.toFixed(1),
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
            const weekDayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
            return {
              x:
                dayItem === dayArr2[0].dayItem
                  ? monthItem + " " + dayItem
                  : dayItem,
              y: weekDayData.toFixed(1),
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
      if (activeDateTab === "W") {
        const weekArr = Array.from({ length: 7 }, (_, i) =>
          new Date(
            new Date(year, monthIndex(month), day).getTime() -
              i * 60000 * 60 * 24
          ).getDate()
        ).reverse();
        console.log(weekArr);

        const monthGroup = dateTree[year][month];

        const filledChart = weekArr.map((dayItem) => {
          const matchedDay = monthGroup[dayItem];

          if (matchedDay) {
            const weekDayData = reduceToAvg(
              Object.values(matchedDay.hour).map((hr) => reduceToAvg(hr))
            );
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
    [activeDateTab, year, month, day]
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
