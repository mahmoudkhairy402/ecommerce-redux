import React, { startTransition, useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import Loading from "../../components/loading/loading";
import { TiShoppingCart } from "react-icons/ti";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ReactImageMagnify from "react-image-magnify";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  fetchSingleProduct,
} from "../../Redux/productsSlice";

import { addToCart, clearCart, getCartItems } from "../../Redux/cartSlice";
export default function productDetails() {
  const [quantity, setQuantity] = useState(1);
  const [addAvailability, setAddAvailability] = useState(true);
  let { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector(getSingleProduct);
  const cartItems = useSelector(getCartItems);

  const {
    id,
    images,
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    stock,
  } = product;
  const [activePhoto, setActivePhoto] = useState();

  //
  console.log("🚀 ~ productDetails ~ product:", product);
  let discount = (price - (price * discountPercentage) / 100).toFixed(2);

  let handleAddToCart = () => {
    startTransition(() => {
      let totalPrice = quantity * discount;
      dispatch(
        addToCart({
          ...product,
          quantity: quantity,
          totalPrice,
          priceAfterDiscount: Number(discount),
        })
      );

      cartItems.forEach((element) => {
        if (element.id == id) {
          if (element.quantity + quantity >= stock) {
            setAddAvailability(false);

            const Toast = Swal.mixin({
              toast: true,
              position: "top-start",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "error",
              title: `Stock Became Empty!`,
            });
          } else {
            setAddAvailability(true);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-start",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: ` Added ${quantity} Of ${product.title} To Cart Successfully`,
            });
          }
        }
      });
    });
  };
  let handleClearCart = () => {
    dispatch(clearCart());
  };
  useEffect(() => {
    startTransition(() => {
      dispatch(fetchSingleProduct(productId));
    });
  }, [dispatch, productId]);

  return (
    <>
      {product ? (
        <div className={` container ${styles.productDetails}`}>
          <>
            <div
              className={`col-12 col-md-6 mt-md-5 ${styles.imagesContainer}`}
            >
              <div className={styles.images}>
                {images && images.length ? (
                  images.slice(0, 4).map((image, index) => (
                    <div
                      onClick={() => {
                        setActivePhoto(image);
                      }}
                      className={styles.imageContainer}
                      key={index}
                    >
                      <img src={image} alt={title} />
                    </div>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
              {images && images.length ? (
                <div className={styles.mainImage}>
                  <ReactImageMagnify
                    className={styles.img}
                    {...{
                      smallImage: {
                        isFluidWidth: true,
                        width: 400,
                        height: 400,
                        src: activePhoto || (images && images[0]),
                      },
                      largeImage: {
                        src: activePhoto || (images && images[0]),
                        width: 800,
                        height: 800,
                        fadeDurationInMs: "300",
                        enlargedImagePosition: "over",
                        // sizes:
                        //   "(max-width: 767px) 10vw, (max-width: 1200px) 30vw, 360px",
                      },

                      enlargedImageContainerStyle: {
                        zIndex: "1500",
                      },
                      enlargedImageContainerDimensions: {
                        width: "100%",
                        height: "100%",
                      },
                      shouldUsePositiveSpaceLens: true,
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                      enlargedImagePosition: "over",
                      shouldUsePositiveSpaceLens: true,
                    }}
                  />
                  {/* <img src={activePhoto || (images && images[0])} alt={title} /> */}
                </div>
              ) : (
                <Loading />
              )}
            </div>
            <div className={`col-12 col-md-4 ${styles.productContent}`}>
              <div className={styles.title}>{title}</div>
              <div className={styles.description}>{description}</div>
              <div className={styles.productInfo}>
                <span className={styles.rating}>
                  <span className={styles.textTitle}>rating:</span>
                  {rating}
                </span>
                <span className={styles.brand}>
                  <span className={styles.textTitle}>Brand:</span>
                  {brand}
                </span>{" "}
                <span className={styles.category}>
                  <span className={styles.textTitle}>category:</span>
                  {category}
                </span>
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.realprice}>
                  <span className={styles.delete}>${price}</span>
                  Include All Of Taxes
                </div>
                <div className={styles.discountInfo}>
                  <div className={styles.priceAfterDiscount}>${discount}</div>
                  <div className={styles.discount}>
                    {discountPercentage} %off
                  </div>
                </div>
              </div>
              <div className={styles.quantityConter}>
                quantity:{" "}
                <div className={styles.btns}>
                  <button
                    onClick={() => {
                      if (quantity === 1) {
                        setQuantity(1);
                      } else {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                    className={`btn btn-outline-dark ${styles.minus}`}
                  >
                    -
                  </button>
                  <div className={styles.count}>{quantity}</div>
                  <button
                    onClick={() => {
                      if (quantity === stock) {
                        setQuantity(quantity);
                      } else {
                        setQuantity((prev) => prev + 1);
                      }
                    }}
                    className={`btn btn-outline-dark ${styles.plus}`}
                  >
                    +
                  </button>
                </div>
              </div>
              {stock == 0 && quantity > stock ? (
                <div className="text-danger">Out Of Stock</div>
              ) : (
                <div className={styles.payment}>
                  {addAvailability ? (
                    <div
                      onClick={handleAddToCart}
                      className={` btn rounded-0 ${styles.addToCArt}`}
                    >
                      <TiShoppingCart size={25} /> add To CArt
                    </div>
                  ) : (
                    <div
                      onClick={handleAddToCart}
                      className={` btn rounded-0 ${styles.addToCArt} disabled`}
                    >
                      <TiShoppingCart size={25} /> add To CArt
                    </div>
                  )}

                  <div
                    onClick={handleClearCart}
                    className={` btn rounded-0 ${styles.buyNow}`}
                  >
                    buy Now
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
