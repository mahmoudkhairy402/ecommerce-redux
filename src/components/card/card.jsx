import React from "react";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
export default function Card({ product }) {
  let discount = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <Link
      key={product.id}
      className={`${styles.cardContainer} `}
      to={`/product/${product.id}`}
      // style={{ maxHeight: "100%", maxWidth: "100%" }}
    >
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img src={product.images[0]} alt={product.title} srcset="" />
        </div>
        <div className={styles.category}>
          {product.category}
          <span className={`${styles.categoryAfter}`}></span>
        </div>
        <div className={styles.brand}>
          <span className={styles.brandIndent}>Brand:</span> {product.brand}
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.pricecontainer}>
          <div className={styles.realprice}>
            <delete>${product.price}</delete>
          </div>
          <div className={styles.priceAfterDiscount}>${discount}</div>
          <div className={styles.discount}>
            ({product.discountPercentage}%off)
          </div>
        </div>
      </div>
    </Link>
  );
}
