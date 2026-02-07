import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Slide.scss";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll || 1,
    arrows: true,
  };

  return (
    <div className="slide">
      <div className="container">

        <h1 style={{ marginBottom: "20px" }}>
          Popular Services
        </h1>

        <Slider {...settings}>
          {children}
        </Slider>

      </div>
    </div>
  );
};

export default Slide;
