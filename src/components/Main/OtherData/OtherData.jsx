import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import useDataRequest from "../../../hooks/useDataRequest";
import Section from "../section-components/Section";
import { otherDataActions } from "../../../store/other-data";

function OtherData() {
  const { otherData: data, componentState } = useSelector(
    (state) => state.otherData
  );

  // FETCHING
  // const { isLoading, error, fetchData } = useDataRequest(otherDataActions);

  // useEffect(() => {
  //   if (!componentState.firstRun) return;
  //   fetchData("other-data");
  // }, [fetchData, componentState.firstRun]);

  return (
    <Section
      title={"Other Data"}
      data={data}
      isLoading={false}
      componentState={componentState}
      actions={otherDataActions}
    />
  );
}

export default OtherData;
