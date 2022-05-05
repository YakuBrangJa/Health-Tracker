import React, { useState, useEffect } from "react";
import "./favourites.css";

import SummaryHeader2 from "./summary-childs/SummaryHeader2";
import Card from "./summary-childs/Card";

function Favourites() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch("https://health-tracker-69c66-default-rtdb.firebaseio.com/heart.json")
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);

        const dataArray = Object.values(data);
        console.log(dataArray);
        setFetchedData(dataArray);
        console.log(fetchedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="favourite">
      <SummaryHeader2 title={"Favourites"} />
      <div className="favourite-card">
        <Card
          key="0"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="vitals"
        />
        <Card
          key="1"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="bodyMeasurements"
        />
        <Card
          key="2"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="heart"
        />
        <Card
          hey="3"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="sleep"
        />
        <Card
          key="4"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="respiratory"
        />
        <Card
          key="5"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="other"
        />
        <Card
          key="6"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="cycleTracker"
        />
        <Card
          key="7"
          name={"Heart Rate"}
          value={72}
          unit={"bpm"}
          date={"Mar 9"}
          type="heart"
        />
      </div>
    </div>
  );
}

export default Favourites;
