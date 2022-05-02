import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useDataRequest from "../../../hooks/useDataRequest";

import Section from "../section-components/Section";
import { bodyMeasurementsActions } from "../../../store/body-measurements";

function BodyMeasurements() {
  const { bodyMeasurements: data, componentState } = useSelector(
    (state) => state.bodyMeasurements
  );

  const { isLoading, error, fetchData } = useDataRequest(
    "body-measurements",
    componentState.firstRun,
    bodyMeasurementsActions
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (componentState.firstRun) return;

    fetch(
      "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/body-measurements.json",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;

  return <Section title={"Body Measurements"} data={data} />;
}

export default BodyMeasurements;
