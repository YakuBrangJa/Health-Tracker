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
  const dispatch = useDispatch();
  // FETCHING
  const { isLoading, error, fetchData } = useDataRequest("heart", heartActions);

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData();
  }, [fetchData]);

  // POSTING
  const { sendRequest } = useHttps({
    url: "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/heart.json",
    method: "PUT",
    body: data,
  });
  useEffect(() => {
    if (componentState.firstRun) return;
    sendRequest();
  }, [data, sendRequest]);

  useEffect(() => {
    if (componentState.firstClick) return;
    dispatch(heartActions.updateDataState(dataArray[0].id));
  }, [dataArray]);

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
