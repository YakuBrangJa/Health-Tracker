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

  // const [preLoad, setPreload] = useState(true);
  // useEffect(() => {
  //   if (componentState.firstRun) return;
  //   setPreload(isLoading);
  // }, [isLoading]);

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData();
  }, []);

  // POSTING
  const { sendRequest } = useHttps({
    url: "https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/heart.json",
    method: "PUT",
    body: data,
  });
  useEffect(() => {
    if (componentState.firstRun) return;
    sendRequest();
  }, [data]);

  useEffect(() => {
    if (componentState.firstClick) return;
    dispatch(heartActions.updateDataState(dataArray[0].id));
    dispatch(formStateActions.setDataState(dataArray[0].id));
  }, [dataArray]);

  const dispatchDataStateOnClick = (id) => {
    dispatch(heartActions.updateDataState(id));
    dispatch(heartActions.updateFirstClick(true));
    dispatch(formStateActions.setDataState(id));
  };

  if (isLoading) {
    return <SectionLoading title={"Heart"}></SectionLoading>;
  }

  return (
    <Section
      title={"Heart"}
      data={dataArray}
      // isLoading={isLoading}
      error={error}
      componentState={componentState}
      dispatchOnClick={dispatchDataStateOnClick}
    />
  );
}

export default Heart;
