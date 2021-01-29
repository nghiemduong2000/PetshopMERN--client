import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const New = (props) => {
  const { image, title, desc } = props.product;

  return (
    <div className="home__new" ref={props.refProduct}>
      <Link to="" className="home__new-link">
        <div className="home__new-img">
          <img src={image} alt="" />
        </div>
        <div className="home__new-text">
          <h4 className="home__new-title">{title}</h4>
          <p className="home__new-desc">{desc}</p>
        </div>
      </Link>
    </div>
  );
};

export default New;
