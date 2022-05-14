import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useDataRequest from "../../../hooks/useDataRequest";
import useHttps from "../../../hooks/useHttps";

import Section from "../section-components/Section";
import SectionLoading from "../section-components/SectionLoading";
import { bodyMeasurementsActions } from "../../../store/body-measurements";

function BodyMeasurements() {
  const { bodyMeasurements: data, componentState } = useSelector(
    (state) => state.bodyMeasurements
  );

  const { isLoading, error, fetchData } = useDataRequest(
    "body-measurements",
    bodyMeasurementsActions
  );

  useEffect(() => {
    return;
    if (!componentState.firstRun) return;
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <SectionLoading title={"Body Measurements"}></SectionLoading>;
  }

  return (
    <Section
      title={"Body Measurements"}
      data={data}
      error={error}
      componentState={componentState}
      actions={bodyMeasurementsActions}
    />
  );
}

export default BodyMeasurements;
