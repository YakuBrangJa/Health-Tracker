import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import { heartActions } from "../../../store/vitals";

import useDataRequest from "../../../hooks/useDataRequest";
import Section from "../section-components/Section";
import CardItem from "../section-components/CardItem/CardItem";
import Detail from "../section-components/Detail/Detail";

import { bodyMeasurementsActions } from "../../../store/body-measurements";
import { heartActions } from "../../../store/heart";
import { respiratoryActions } from "../../../store/respiratory";
import { vitalsActions } from "../../../store/vitals";

function Vitals() {
  const { bodyMeasurements, heart, respiratory, otherData } = useSelector(
    (state) => state
  );

  const componentState = useSelector((state) => state.vitals.componentState);

  const vitals = {
    bodyMeasurements: {
      ...bodyMeasurements.bodyMeasurements.bodyTemperature,
      actions: bodyMeasurementsActions,
      route: "/body-measurements",
    },
    heartRate: {
      ...heart.heart.heartRate,
      actions: heartActions,
      route: "/heart",
    },
    bloodPressure: {
      ...heart.heart.bloodPressure,
      actions: heartActions,
      route: "/heart",
    },
    bloodOxygen: {
      ...respiratory.respiratory.bloodOxygen,
      actions: respiratoryActions,
      route: "/respiratory",
    },
    respiratoryRate: {
      ...respiratory.respiratory.respiratoryRate,
      actions: respiratoryActions,
      route: "/respiratory",
    },
  };

  // // // FETCHING;
  // const { isLoading, error, fetchData } = useDataRequest();
  // useEffect(() => {
  //   if (!componentState.firstRun) return;
  //   fetchData("vitals");
  // }, [fetchData, componentState.firstRun]);
  return (
    <Section
      title={"Vitals"}
      data={vitals}
      isLoading={false}
      componentState={componentState}
      vitalsActions={vitalsActions}
    />
  );
}

export default Vitals;
