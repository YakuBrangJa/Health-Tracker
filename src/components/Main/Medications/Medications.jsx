import React, { useEffect, useState } from "react";
// import "./medications.css";

import Section from "../section-components/Section";

function Medications() {
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    fetch(
      `https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/body-measurements/bodyTemperature/data.json`
    )
      .then((response) => response.json())
      .then((data) => setFetchedData(data));
  }, []);

  // return <Section title={"Medications"} />;
  return <div>{JSON.stringify(fetchedData)}</div>;
}

export default Medications;
