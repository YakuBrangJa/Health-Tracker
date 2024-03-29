import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";
import { bodyMeasurementsActions } from "../../../store/body-measurements";

function BodyMeasurements() {
  const { bodyMeasurements: data, componentState } = useSelector(
    (state) => state.bodyMeasurements
  );

  return (
    <Section
      title={"Body Measurements"}
      data={data}
      isLoading={false}
      componentState={componentState}
      actions={bodyMeasurementsActions}
    />
  );
}

export default BodyMeasurements;
