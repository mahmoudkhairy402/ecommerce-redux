import React from "react";
import styles from "./logo.module.scss";
export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={require("../../images/logo.png")} alt="" srcset="" />
    </div>
  );
}
