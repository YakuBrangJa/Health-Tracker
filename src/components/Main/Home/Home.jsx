import React from "react";
import "./home.css";
import { useSelector } from "react-redux";

import SectionContainer from "../section-components/SectionContainer";
import Favourites from "./Favourites";
import AppLoader from "../../../Loaders/AppLoader";

function Home() {
  const { isLoading, darkTheme } = useSelector((state) => state.uiState);
  const [testLoading, setTestLoading] = React.useState(true);

  return (
    <SectionContainer title={"Home"}>
      {isLoading ? (
        <AppLoader darkTheme={darkTheme} />
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
