import React from "react";
import styles from "./notfound.module.scss";
import { Link } from "react-router-dom";
export default function NotFound({ title = "404... Not Fount Page" }) {
  console.log("🚀 ~ NotFound ~ title:", title);

  return (
    <div className={styles.emptyCart}>
      {/* <div className={styles.image}>
        <img src={require("../../images/empty-caشrt.png")} alt="" />
      </div> */}
      <div className={styles.noMatching}>{title}</div>
      <Link to="/" className={` btn rounded-0 ${styles.buyNow}`}>
        shop now
      </Link>
    </div>
  );
}
