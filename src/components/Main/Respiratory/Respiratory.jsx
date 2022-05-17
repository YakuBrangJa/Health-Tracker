import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useDataRequest from "../../../hooks/useDataRequest";

import Section from "../section-components/Section";

import { respiratoryActions } from "../../../store/respiratory";

function Respiratory() {
  const { respiratory: data, componentState } = useSelector(
    (state) => state.respiratory
  );

  const { isLoading, error, fetchData } = useDataRequest(respiratoryActions);

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData("respiratory");
  }, [fetchData, componentState.firstRun]);

  return (
    <Section
      title={"Respiratory"}
      data={data}
      isLoading={isLoading}
      componentState={componentState}
      actions={respiratoryActions}
    />
  );
}

export default Respiratory;
