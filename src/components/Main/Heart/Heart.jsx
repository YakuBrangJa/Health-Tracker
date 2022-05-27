import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { heartActions } from "../../../store/heart";


import Section from "../section-components/Section";

function Heart() {
  const { heart: data, componentState } = useSelector((state) => state.heart);


  return (
    <Section
      title={"Heart"}
      data={data}
      isLoading={false}
      componentState={componentState}
      actions={heartActions}
    />
  );
}

export default Heart;
