import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";

function Heart() {
  const data = useSelector((state) => state.heart);

  useEffect(() => {
    fetch(
      "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/heart.json",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }, [data]);

  return <Section title={"Heart"} data={data} />;
}

export default Heart;
