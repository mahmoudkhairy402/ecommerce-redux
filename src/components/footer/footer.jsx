import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link className={styles.link} to="./">
          <span>privacy policy</span>
        </Link>
        <Link className={styles.link} to="./">
          <span>term of service</span>
        </Link>
        <Link className={styles.link} to="./">
          <span>about me</span>
        </Link>
      </div>
      <div className={styles.copyRight}>
        &copy; 2024 Khairy. All rights reaserved
      </div>
    </div>
  );
}
