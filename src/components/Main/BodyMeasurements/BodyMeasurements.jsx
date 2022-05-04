import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useDataRequest from "../../../hooks/useDataRequest";
import useHttps from "../../../hooks/useHttps";

import Section from "../section-components/Section";
import SectionLoading from "../section-components/SectionLoading";
import { bodyMeasurementsActions } from "../../../store/body-measurements";
import formState, { formStateActions } from "../../../store/form-state";

function BodyMeasurements() {
  const { bodyMeasurements: data, componentState } = useSelector(
    (state) => state.bodyMeasurements
  );

  const dataArray = Object.values(data);
  const dispatch = useDispatch();

  const { isLoading, error, fetchData } = useDataRequest(
    "body-measurements",
    bodyMeasurementsActions
  );

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData();
  }, []);

  const { sendRequest } = useHttps({
    url: "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/body-measurements.json",
    method: "PUT",
    body: data,
  });

  useEffect(() => {
    if (componentState.firstRun) return;
    sendRequest();
  }, [data]);

  useEffect(() => {
    if (componentState.firstClick) return;
    dispatch(bodyMeasurementsActions.updateDataState(dataArray[0].id));
    dispatch(formStateActions.setDataState(dataArray[0].id));
  }, [dataArray]);

  const dispatchDataStateOnClick = (id) => {
    dispatch(bodyMeasurementsActions.updateDataState(id));
    dispatch(bodyMeasurementsActions.updateFirstClick(true));
    dispatch(formStateActions.setDataState(id));
  };

  if (isLoading) {
    return <SectionLoading title={"Body Measurements"}></SectionLoading>;
  }

  return (
    <Section
      title={"Body Measurements"}
      data={dataArray}
      // isLoading={componentState.firstRun ? true : isLoading}
      error={error}
      componentState={componentState}
      dispatchOnClick={dispatchDataStateOnClick}
    />
  );
}

export default BodyMeasurements;
