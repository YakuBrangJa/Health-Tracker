import React from "react";
import "./home.css";

import SectionContainer from "../section-components/SectionContainer";
import Favourites from "./Favourites";
import Highlights from "./Highlights";

function Home() {
  return (
    <SectionContainer title={"Home"}>
      <div className="home-container">
        <Favourites />
        <Highlights />
      </div>
    </SectionContainer>
  );
}

export default Home;
