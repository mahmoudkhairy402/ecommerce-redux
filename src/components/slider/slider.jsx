import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.scss";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };
  return (
    <div
      className={` my-4 ${styles.slider}`}
      style={{ maxHeight: "400px", overflow: "hidden" }}
    >
      <Slider {...settings}>
        <div
          className={styles.slide}
          style={{ width: "100%", maxHeight: "80%" }}
        >
          <img
            src={require("../../images/slide1.jpg")}
            alt=""
            srcset=""
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className={styles.slide}
          style={{ width: "100%", maxHeight: "80%" }}
        >
          <img
            src={require("../../images/slide2.jpg")}
            alt=""
            srcset=""
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className={styles.slide}
          style={{ width: "100%", maxHeight: "80%" }}
        >
          <img
            src={require("../../images/slide3.jpg")}
            alt=""
            srcset=""
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
}
