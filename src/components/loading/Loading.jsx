import "../loading/loading.scss";
import React from "react";
import loading from "../../assets/images/Spin-1s-200px.svg";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
}
