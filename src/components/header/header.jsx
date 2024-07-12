import React, { useEffect } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import Navbar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getAllCategories } from "../../Redux/categorySlice";
import Loading from "../loading/loading";

export default function Header() {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  console.log("🚀 ~ Header ~ categories:", categories);
  console.log("🚀 ~ categories ~ categories:", categories);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div className={`${styles.header} sticky-top `}>
      <div className={`${styles.topLinks}  `}>
        <ul className={`${styles.topLinksul} m-0`}>
          <li>
            <Link to="/">seller center</Link>
          </li>
          <li>
            <Link to="/">download</Link>
          </li>
          <li>
            follow me on{" "}
            <Link to="https://github.com/mahmoudkhairy402">
              <FaGithub size={16} />
            </Link>{" "}
            <Link to="https://www.facebook.com/profile.php?id=100010137309005">
              <FaFacebook size={16} />{" "}
            </Link>
          </li>
          <li>
            <Link to="/">
              support <MdContactSupport size={18} />
            </Link>
          </li>
          <li>
            <Link to="/">register</Link>
          </li>
          <li>
            <Link to="/">log in</Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.navbar} container`}>
        <Navbar />
      </div>
      <ul
        className={`${styles.categories} d-flex align-items-center justify-content-center mb-1`}
        style={{ listStyle: "none" }}
      >
        {categories.length != 0 ? (
          categories.slice(0, 8).map((ele, index) => {
            return (
              <li className="nav-item">
                <Link
                  to={`categories/${ele?.slug?.replace(" ", "-")}`}
                  key={index}
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  {ele?.name.replace("-", " ")}
                </Link>
              </li>
            );
          })
        ) : (
          <li className="nav-item border-0">
            <Loading width={30} />
          </li>
        )}
      </ul>
    </div>
  );
}
