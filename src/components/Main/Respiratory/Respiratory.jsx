import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";
import { respiratoryActions } from "../../../store/respiratory";

function Respiratory() {
  const { respiratory: data, componentState } = useSelector(
    (state) => state.respiratory
  );

  return (
    <Section
      title={"Respiratory"}
      data={data}
      isLoading={false}
      componentState={componentState}
      actions={respiratoryActions}
    />
  );
}

export default Respiratory;
