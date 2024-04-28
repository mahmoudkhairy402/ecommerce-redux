import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getAllCategories } from "../../Redux/categorySlice";
import { getICartItemsCount, getCartItems } from "../../Redux/cartSlice";
import Loading from "../loading/loading";
import Logo from "../logo/logo";

export default function Navbar() {
  const cartRef = useRef(null); // Ref for the cart offcanvas element

  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const cartItemsCount = useSelector(getICartItemsCount);
  const cartItems = useSelector(getCartItems);
  const navigate = useNavigate();
  console.log("🚀 ~ Navbar ~ cartItemsCount:", cartItemsCount);
  const [cartVisable, setCartVisable] = useState(false);
  const [serachItem, setSearchItem] = useState("");
  let handleSearch = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisable(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.navbar}>
      <nav className="navbar navbar-dark pb-0 ">
        <div className={`${styles.navbarContent} container`}>
          <button
            className="navbar-toggler me-4 text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to={"/"} className="navbar-brand">
            <Logo />
          </Link>
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => {
              navigate(`search/${serachItem}`);
              e.preventDefault();
            }}
          >
            <input
              className="form-control me-2 rounded-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <Link
              to={`search/${serachItem}`}
              className="btn btn-outline-light rounded-0"
            >
              Search
            </Link>
          </form>
          <div
            //!
            className={` ${styles.cart}`}
            onClick={() => {
              cartVisable ? setCartVisable(false) : setCartVisable(true);
            }}
          >
            <TiShoppingCart size={28} />
            {cartItemsCount > 0 && (
              <div className={styles.cartCount}>{cartItemsCount}</div>
            )}
            {cartVisable && (
              <div className={`  ${styles.cartUl}`} ref={cartRef}>
                {cartItems.length > 0 && (
                  <h4 className={styles.cartUlTitle}>
                    recently added products...
                  </h4>
                )}
                {cartItems.length > 0 ? (
                  cartItems.slice(-5).map((ele) => {
                    return (
                      <Link
                        to={`product/${ele.id}`}
                        className={styles.cartItem}
                      >
                        <div className={styles.image}>
                          <img src={ele.thumbnail} alt={ele.title} srcset="" />
                        </div>
                        <div className={styles.title}>{ele.title}</div>
                        <div className={styles.quantity}>{ele.quantity}</div>
                      </Link>
                    );
                  })
                ) : (
                  <h4 className={styles.cartUlTitle}>your cart is empty.</h4>
                )}
                {cartItems.length > 0 && (
                  <Link to="./cart" className={styles.cartLink}>
                    show more details{" "}
                    <FaLongArrowAltRight className={styles.icon} />
                  </Link>
                )}
              </div>
            )}
          </div>
          <div
            className={`offcanvas offcanvas-start ${styles.sidbar} `}
            tabIndex={-1}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className={`offcanvas-header ${styles.sidbarHeader}`}>
              <h4
                className="offcanvas-title text-light"
                id="offcanvasDarkNavbarLabel"
              >
                Our Categories
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul
                className={`navbar-nav justify-content-end flex-grow-1 pe-3 ${styles.categoriesUl}`}
              >
                {categories.length != 0 ? (
                  categories.map((ele, index) => {
                    return (
                      <>
                        <li className="nav-item">
                          <Link
                            to={`categories/${ele}`}
                            key={index}
                            className="nav-link active"
                            aria-current="page"
                            href="#"
                          >
                            {ele.replace("-", " ")}
                          </Link>
                        </li>
                      </>
                    );
                  })
                ) : (
                  <li className="nav-item">
                    <Loading />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
