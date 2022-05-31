import React from "react";
import styles from "./appLoader.module.css";

function AppLoader(props) {
  return (
    <div
      className={`${styles.appLoader} ${
        props.darkTheme && styles["dark-theme"]
      }`}
    >
      <div className={styles.circle1}>
        <div className={styles.circle2}>
          <div className={styles.circle3}></div>
        </div>
      </div>
    </div>
  );
}

export default AppLoader;
