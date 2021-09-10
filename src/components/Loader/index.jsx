import React from "react";
import "./style.css";
const Loader = () => {
  return (
    <div className="centerDiv">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
