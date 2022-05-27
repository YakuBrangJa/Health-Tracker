import React from "react";
import "./loadingCard.css";

function LoadingCard({ delay, isHome }) {
  return (
    <div
      className={`loading-card loading-animation ${delay} ${
        isHome && "isHome"
      }`}
    ></div>
  );
}

export default LoadingCard;
