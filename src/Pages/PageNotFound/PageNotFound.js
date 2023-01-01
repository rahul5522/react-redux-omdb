import React from "react";
import error from "../../Common/Assets/image/404.png";
import "./PageNotFound.scss";

export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img className="notfound" src={error}></img>
    </div>
  );
}
