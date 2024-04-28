import React, { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../category/category.module.scss";
import {
  fetchSearchProducts,
  getSearchProducts,
} from "../../Redux/searchSlice";

import Card from "../../components/card/card";
import NotFound from "../notFound/notFound";
import Loading from "../../components/loading/loading";
export default function Search() {
  let { searchItem } = useParams();
  const dispatch = useDispatch();
  const { products, total, limit } = useSelector(getSearchProducts);
  console.log("🚀 ~ Search ~ limit:", limit);
  console.log("🚀 ~ Search ~ total:", total);
  console.log("🚀 ~ Search ~ products:", products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startTransition(() => {
      setLoading(true);
      dispatch(fetchSearchProducts(searchItem))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching search products:", error);
          setLoading(false);
        });
    });
  }, [dispatch, searchItem]);

  return (
    <div className={`container ${styles.productsContainer}`}>
      {loading ? (
        <Loading />
      ) : total > 0 ? (
        <>
          <div className={`${styles.primaryTitle}`}>
            search results for "{searchItem}" , ({total}) elements
          </div>
          <div
            className={`row d-flex flex-wrap w-100 justify-content-center gap-4 ${styles.products} my-5`}
          >
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <NotFound title={`No matching products for "${searchItem}"`} />
      )}
    </div>
  );
}
