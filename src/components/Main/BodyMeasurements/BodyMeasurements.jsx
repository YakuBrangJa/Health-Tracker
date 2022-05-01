import React from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";

function BodyMeasurements() {
  const data = useSelector((state) => state.bodyMeasurements.bodyMeasurements);

  return <Section title={"Body Measurements"} data={data} />;
}

export default BodyMeasurements;
