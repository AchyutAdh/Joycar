import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";


const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
          Joy Car made selling my car so easy and stress-free. The AI-powered valuation was accurate and I got a great price for my car in no time.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          

          <div>
            <h6 className="mb-0 mt-3">Bibek Khanal</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        I was skeptical at first, but Joy Car exceeded my expectations. The team was professional and the whole process was seamless. I would definitely recommend it to anyone looking to sell their car.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
        

          <div>
            <h6 className="mb-0 mt-3">Yashwant Poudel</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        I've sold many cars in the past, but Joy Car's service was by far the best. The AI valuation was quick and accurate, and the team was very responsive and helpful throughout the entire process.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
         

          <div>
            <h6 className="mb-0 mt-3">Pinte</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        As someone who has little knowledge about cars, I was worried about getting a fair price for my vehicle. But with Joy Car's AI-powered valuation, I was able to get an accurate value and sell my car with confidence.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
        

          <div>
            <h6 className="mb-0 mt-3">Khukuri Dai</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
