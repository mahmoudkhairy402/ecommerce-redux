import React from "react";
import styles from "./cart.module.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import Swal from "sweetalert2";

import {
  addToCart,
  clearCart,
  deleteFromCart,
  getCartItems,
  getICartItemsCount,
  getICartTotalAmount,
} from "../../Redux/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";

export default function cart() {
  const dispatch = useDispatch();
  const carts = useSelector(getCartItems);
  const totalAmount = useSelector(getICartTotalAmount);

  const cartCount = useSelector(getICartItemsCount);
  console.log("🚀 ~ cart ~ carts:", carts);

  let handleIncrease = (product) => {
    if (product.quantity == product.stock) {
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
      let discount = (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2);
      let totalPrice = product.quantity * discount;
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          totalPrice,
          priceAfterDiscount: Number(discount),
        })
      );
    }
  };
  let handleDecrease = (product) => {
    let discount = (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);

    if (product.quantity > 1) {
      let totalPrice = product.quantity * discount;
      dispatch(
        addToCart({
          ...product,
          quantity: -1,
          totalPrice,
          priceAfterDiscount: Number(discount),
        })
      );
    } else return;
  };
  let handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className={styles.cart}>
      {carts.length != 0 ? (
        <table className="table table-striped my-5 ">
          <tbody>
            <tr style={{ width: "100%" }}>
              <th className="text-center">ID</th>
              <th className="text-center">Image</th>
              <th className="text-center d-none d-sm-table-cell">Name</th>
              <th className="text-center d-none d-sm-table-cell">Unit-Price</th>
              <th className="text-center">Total-Price</th>
              <th className="text-center">Quantity</th>
              <th className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash w-100 m-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </th>
            </tr>
            {carts.map((ele) => {
              return (
                <tr
                  style={{
                    maxWidth: "100%",
                  }}
                  key={ele.id}
                >
                  <td>{ele.id}</td>

                  <td style={{ maxWidth: "100%" }}>
                    {ele.thumbnail ? (
                      <Link to={`/product/${ele.id}`}>
                        <img
                          style={{ maxWidth: "80px" }}
                          src={ele.thumbnail}
                          alt={ele.title}
                        />
                      </Link>
                    ) : (
                      <Loading />
                    )}
                  </td>
                  <td className={`d-none d-sm-table-cell ${styles.title}`}>
                    {ele.title}
                  </td>
                  <td
                    className={` d-none d-sm-table-cell ${styles.priceAfterDiscount}`}
                  >
                    {ele.priceAfterDiscount}$
                  </td>
                  <td className={styles.totalPrice}>
                    {ele.totalPrice.toFixed(2)}$
                  </td>
                  <td className={styles.quantity}>
                    <div className={styles.quantityConter}>
                      <div
                        className={`d-flex justify-content-around gap-1 flex-nowrap ${styles.btns}`}
                      >
                        <button
                          onClick={() => handleDecrease(ele)}
                          className={`btn btn-outline-dark px-2 py-1  ${styles.minus}`}
                        >
                          -
                        </button>
                        <div className={styles.count}>{ele.quantity}</div>
                        <button
                          onClick={() => handleIncrease(ele)}
                          className={`btn btn-outline-dark px-2 py-1 ${styles.plus}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div
                      className="btn text-danger "
                      onClick={() => {
                        dispatch(deleteFromCart(ele));
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.image}>
            <img src={require("../../images/empty-cart.png")} alt="" />
          </div>
          <div className={styles.emptyCartTitle}>
            your cart is empty, go shop now !
          </div>
          <Link to="/" className={` btn rounded-0 ${styles.buyNow}`}>
            shop now
          </Link>
        </div>
      )}

      {carts.length != 0 && (
        <div className={styles.cartCheckout}>
          <div
            className={` btn rounded-0 ${styles.clearCart} `}
            onClick={handleClearCart}
          >
            <MdDeleteForever size={25} /> Clear Cart
          </div>
          <div className={styles.checkout}>
            <div className={styles.info}>
              total <span className={styles.cartCount}>{cartCount}</span> items{" "}
              <span className={styles.total}> {totalAmount.toFixed(2)}$</span>
            </div>
            <div className={` btn rounded-0 ${styles.buyNow}`}>buy Now</div>
          </div>
        </div>
      )}
    </div>
  );
}
