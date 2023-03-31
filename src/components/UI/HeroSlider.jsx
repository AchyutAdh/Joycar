import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  
  return (
    <Slider className="hero__slider">
      <div className="slider__item slider__item-01 mt0" >
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3 mt-5" >Joycar</h4>
            <h1 className="text-light mb-4">Sell any car in <span style={{color: '#CC0B14'}}>48 hours</span> </h1>

            <button className="btn reserve__btn mt-1">
              <Link to="/evaluate">Evalute Now</Link>
            </button>
          </div>
        </Container>
      </div>

    </Slider>
  );
};

export default HeroSlider;
