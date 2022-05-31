import React from "react";
import styles from "./appLoader2.module.css";

function AppLoader2() {
  return (
    <div className={`${styles.appLoader2}`}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default AppLoader2;
