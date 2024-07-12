import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./category.module.scss";
import {
  fetchProductsCategory,
  getSpecificCategories,
} from "../../Redux/categorySlice";

import Loading from "../../components/loading/loading";
import Card from "../../components/card/card";

export default function Category() {
  let { category } = useParams();
  console.log("🚀 ~ Category ~ category:", category);
  const dispatch = useDispatch();
  const products = useSelector(getSpecificCategories);
  console.log("🚀🚀🚀🚀 ~ Category ~ products:", products);

  useEffect(() => {
    dispatch(fetchProductsCategory(category));
  }, [category]);

  return (
    <div className={`container ${styles.productsContainer}`}>
      <div className={`${styles.primaryTitle}`}>{category}</div>
      <div
        className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products} my-5`}
      >
        {products.length != 0 ? (
          products.products.map((product) => {
            return <Card product={product} />;
          })
        ) : (
          <Loading width={100} />
        )}
      </div>
    </div>
  );
}
