import React, { useState, useEffect } from "react";

function useDateTree(data) {
  const [dateTree, setDateTree] = useState();

  useEffect(() => {
    const tree = data.reduce((group, item) => {
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

    setDateTree(tree);
  }, [data]);

  return {
    dateTree,
  };
}

export default useDateTree;
