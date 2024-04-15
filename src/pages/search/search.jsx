import React, { startTransition, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../category/category.module.scss";
import {
  fetchSearchProducts,
  getSearchProducts,
} from "../../Redux/searchSlice";

import Card from "../../components/card/card";
import NotFound from "../notFound/notFound";

export default function Category() {
  let { searchItem } = useParams();
  console.log("🚀 ~ Category ~ category:", searchItem);
  const dispatch = useDispatch();
  const products = useSelector(getSearchProducts);
  console.log("🚀 ~ Category ~ products:", products);

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchSearchProducts(searchItem));
    });
  }, [searchItem]);

  return (
    <div className={`container ${styles.productsContainer}`}>
      {products.products.length != 0 && (
        <div className={`${styles.primaryTitle}`}>
          search resulus for "{searchItem}"
        </div>
      )}
      <div
        className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products} my-5`}
      >
        {products.products.length != 0 ? (
          products.products.map((product) => {
            return <Card product={product} />;
          })
        ) : (
          <NotFound title="no matching products" />
        )}
      </div>
    </div>
  );
}
