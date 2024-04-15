import React from "react";

export default function Loading({ width }) {
  console.log("🚀 ~ Loading ~ width:", width);
  return (
    <>
      <div className="container w-100 d-flex justify-content-center align-items-center">
        <img
          style={{ width: width || "60px" }}
          className=""
          src={require("../../images/Infinity-1s-224px.gif")}
          alt=""
        />{" "}
      </div>
    </>
  );
}
