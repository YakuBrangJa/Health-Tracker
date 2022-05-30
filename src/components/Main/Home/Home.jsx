import React from "react";
import "./home.css";
import { useSelector } from "react-redux";

import SectionContainer from "../section-components/SectionContainer";
import Favourites from "./Favourites";
import AppLoader from "../../../Loaders/AppLoader";

function Home() {
  const isLoading = useSelector((state) => state.uiState.isLoading);

  return (
    <SectionContainer title={"Home"}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <div className="home-container">
          <Favourites />
          {/* <Highlights /> */}
        </div>
      )}
    </SectionContainer>
  );
}

export default Home;
