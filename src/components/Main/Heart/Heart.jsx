import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { heartActions } from "../../../store/heart";

import useDataRequest from "../../../hooks/useDataRequest";
import Section from "../section-components/Section";
import SectionLoading from "../section-components/SectionLoading";

function Heart() {
  const { heart: data, componentState } = useSelector((state) => state.heart);

  // FETCHING
  const { isLoading, error, fetchData } = useDataRequest(heartActions);

  useEffect(() => {
    if (!componentState.firstRun) return;
    fetchData("heart");
  }, [fetchData, componentState.firstRun]);

  return (
    <Section
      title={"Heart"}
      data={data}
      isLoading={isLoading}
      componentState={componentState}
      actions={heartActions}
    />
  );
}

export default Heart;
