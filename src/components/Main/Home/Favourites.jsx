import React, { useState, useEffect } from "react";
import "./favourites.css";

import HomeHeaders from "./home-childs/HomeHeaders";
import CardItem from "../section-components/CardItem/CardItem";

import { useSelector } from "react-redux";

function Favourites() {
  const { bodyMeasurements, heart, respiratory, otherData } = useSelector(
    (state) => state
  );

  const stateArray = [
    bodyMeasurements.bodyMeasurements,
    heart.heart,
    respiratory.respiratory,
    otherData.otherData,
  ];

  let favArr = stateArray
    .map((item) =>
      Object.values(item).filter((item) => item.favourite === true)
    )
    .flat();

  return (
    <div className="favourite">
      <HomeHeaders title={"Favourites"} />
      <div className="favourite-card">
        {favArr.map((item) => (
          <CardItem
            key={item.id}
            id={item.id}
            title={item.title}
            data={item.data}
            unit={item.unit}
            selectedUnit={item.selectedUnit}
            type={item.type}
            isHome={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
