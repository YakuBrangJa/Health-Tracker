import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heartActions } from "../../../store/heart";
import { formStateActions } from "../../../store/form-state";

import useHttps from "../../../hooks/useHttps";
import useDataRequest from "../../../hooks/useDataRequest";
import Section from "../section-components/Section";
import SectionLoading from "../section-components/SectionLoading";

function Heart() {
  const { heart: data, componentState } = useSelector((state) => state.heart);
  const dataArray = Object.values(data);

  // FETCHING
  const { isLoading, error, fetchData } = useDataRequest("heart", heartActions);

  useEffect(() => {
    return;
    if (!componentState.firstRun) return;
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <SectionLoading title={"Heart"}></SectionLoading>;
  }

  return (
    <Section
      title={"Heart"}
      data={dataArray}
      error={error}
      componentState={componentState}
      actions={heartActions}
    />
  );
}

export default Heart;
