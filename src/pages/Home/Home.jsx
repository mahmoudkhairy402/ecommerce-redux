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
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const categories = useSelector(getAllCategories);
  const randomProducts = [];
  if (products.length !== 0) {
    products.forEach((ele) => {
      let randomIndex = Math.floor(Math.random() * products.length);
      while (randomProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      randomProducts.push(products[randomIndex]);
    });
  }

  console.log("🚀 ~ Home ~ products:", products);
  console.log("🚀 ~ products.forEach ~ randomProducts:", randomProducts);
  useEffect(() => {
    dispatch(fetchProducts(limit));
    dispatch(fetchCategory());
  }, [limit]);

  let firstCat = products.filter(
    (product) => product.category == categories[0]
  );
  let secondCat = products.filter(
    (product) => product.category == categories[1]
  );
  let thirdCat = products.filter(
    (product) => product.category == categories[2]
  );
  let fourthCat = products.filter(
    (product) => product.category == categories[3]
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

          <div className={styles.primaryTitle}>{categories[0]}</div>
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
          <div className={styles.primaryTitle}>{categories[1]}</div>
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
          <div className={styles.primaryTitle}>{categories[2]}</div>
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
          <div className={styles.primaryTitle}>{categories[3]}</div>
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

        {/* {limit >= 6 ? (
          <button
            className={`btn btn-danger w-100 mx-auto ${limit <= 6 && disabled}`}
            onClick={() => {
              handleIncreaseLimit();
            }}
          >
            show more
          </button>
        ) : (
          <div
            className="btn btn-danger w-100 my-3 mx-auto "
            onClick={() => {
              handleDecreaseLimit();
            }}
          >
            show less
          </div>
        )} */}
      </div>
    </>
  );
}
