import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Brand = (props) => {
  return (
    <Link to="" className="boxProducts__brand" ref={props.refProduct}>
      <img src={props.product} alt="logoBrand" />
    </Link>
  );
};

export default Brand;
