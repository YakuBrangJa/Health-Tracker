import React, { useEffect } from "react";
import { useSelector } from "react-redux";


import Section from "../section-components/Section";
import { otherDataActions } from "../../../store/other-data";

function OtherData() {
  const { otherData: data, componentState } = useSelector(
    (state) => state.otherData
  );

  

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
