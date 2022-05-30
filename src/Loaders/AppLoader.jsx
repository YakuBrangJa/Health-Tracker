import React from "react";
import styles from "./appLoader.module.css";

function AppLoader() {
  return (
    <div className={styles.appLoader}>
      <div className={styles.circle1}>
        <div className={styles.circle2}>
          <div className={styles.circle3}></div>
        </div>
      </div>
    </div>
  );
}

export default AppLoader;
