import React from "react";
import ReactDOM from "react-dom";
import styles from "./backdrop.module.css";

function Backdrop() {
  return ReactDOM.createPortal(
    <div className={styles.backdrop}></div>,
    document.body
  );
}

export default Backdrop;
