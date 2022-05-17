import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useDataRequest from "../../../hooks/useDataRequest";

import Section from "../section-components/Section";
import SectionLoading from "../section-components/SectionLoading";
import { bodyMeasurementsActions } from "../../../store/body-measurements";

function BodyMeasurements() {
  const { bodyMeasurements: data, componentState } = useSelector(
    (state) => state.bodyMeasurements
  );

  const { isLoading, error, fetchData } = useDataRequest(
    bodyMeasurementsActions
  );

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData("body-measurements");
  }, [fetchData, componentState.firstRun]);

  return (
    <Section
      title={"Body Measurements"}
      data={data}
      isLoading={isLoading}
      componentState={componentState}
      actions={bodyMeasurementsActions}
    />
  );
}

export default BodyMeasurements;
