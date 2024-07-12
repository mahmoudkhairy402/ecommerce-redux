import React, { useEffect, useState } from "react";
import SimpleSlider from "../../components/slider/slider";
import styles from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, fetchProducts } from "../../Redux/productsSlice";
import Loading from "../../components/loading/loading";
import Card from "../../components/card/card";
import { getAllCategories, fetchCategory } from "../../Redux/categorySlice";

export default function Home() {
  const [limit, setLimit] = useState(18);
  console.log("🚀 ~ Home ~ limit:", limit);
  const [maxLimit, setMaxLimit] = useState(100);
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const [randomProducts, setRandomProducts] = useState([]);
  console.log("🚀 ~ Home ~ products:", products);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    if (products.length !== 0) {
      const newProducts = [];
      products.forEach((ele) => {
        let randomIndex = Math.floor(Math.random() * products.length);
        while (newProducts.includes(products[randomIndex])) {
          randomIndex = Math.floor(Math.random() * products.length);
        }
        newProducts.push(products[randomIndex]);
      });
      setRandomProducts(newProducts);
    }
  }, [products]);
  console.log("🚀 ~ Home ~ products:", products);
  console.log("🚀 ~ products.forEach ~ randomProducts:", randomProducts);
  useEffect(() => {
    dispatch(fetchProducts(limit));
    dispatch(fetchCategory());
  }, [limit]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  let firstCat = products.filter(
    (product) => product.category == categories[0].slug
  );
  let secondCat = products.filter(
    (product) => product.category == categories[1].slug
  );
  let thirdCat = products.filter(
    (product) => product.category == categories[2].slug
  );
  let fourthCat = products.filter(
    (product) => product.category == categories[3].slug
  );

  return (
    <>
      <div className={`container ${styles.mainContent}`}>
        <SimpleSlider />
        <div className={styles.productsContainer}>
          <div className={styles.primaryTitle}>Our Products</div>
          <div
            className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products}`}
          >
            {/* <TestCard /> */}
            {randomProducts.length != 0 ? (
              randomProducts.map((product) => {
                return <Card product={product} />;
              })
            ) : (
              <Loading width={100} />
            )}
          </div>
          <button
            className={`btn btn-danger ${styles.showMore} ${
              limit >= maxLimit && styles.disabled
            }`}
            onClick={() => {
              setLimit((old) => old + 6);
            }}
          >
            show more
          </button>

          <div className={styles.primaryTitle}>{categories[0]?.name}</div>
          <div
            className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products}`}
          >
            {firstCat.length != 0 ? (
              firstCat.map((product) => {
                return <Card product={product} />;
              })
            ) : (
              <Loading width={100} />
            )}
          </div>
          <div className={styles.primaryTitle}>{categories[1]?.name}</div>
          <div
            className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products}`}
          >
            {secondCat.length != 0 ? (
              secondCat.map((product) => {
                return <Card product={product} />;
              })
            ) : (
              <Loading width={100} />
            )}
          </div>
          <div className={styles.primaryTitle}>{categories[2]?.name}</div>
          <div
            className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products}`}
          >
            {thirdCat.length != 0 ? (
              thirdCat.map((product) => {
                return <Card product={product} />;
              })
            ) : (
              <Loading width={100} />
            )}
          </div>
          <div className={styles.primaryTitle}>{categories[3]?.name}</div>
          <div
            className={` row d-flex flex-wrap w-100 justify-content-center gap-4  ${styles.products}`}
          >
            {fourthCat.length != 0 ? (
              fourthCat.map((product) => {
                return <Card product={product} />;
              })
            ) : (
              <Loading width={100} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
