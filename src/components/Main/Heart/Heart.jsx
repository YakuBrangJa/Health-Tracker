import React from "react";
import { useSelector } from "react-redux";

import Section from "../section-components/Section";

function Heart() {
  const data = useSelector((state) => state.heart.heart);

  return <Section title={"Heart"} data={data} />;
}

export default Heart;
