import React from "react";
import "./summary.css";

import SectionContainer from "../section-components/SectionContainer";
import Favourites from "./Favourites";
import Highlights from "./Highlights";

function Summary() {
  return (
    <SectionContainer title={"Summary"}>
      <div className="summary-container">
        <Favourites />
        <Highlights />
      </div>
    </SectionContainer>
  );
}

export default Summary;
