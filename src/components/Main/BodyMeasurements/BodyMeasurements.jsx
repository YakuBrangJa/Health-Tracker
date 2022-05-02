import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";

function BodyMeasurements() {
  const data = useSelector((state) => state.bodyMeasurements);

  useEffect(() => {
    fetch(
      "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/body-measurements.json",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }, [data]);

  return <Section title={"Body Measurements"} data={data} />;
}

export default BodyMeasurements;
