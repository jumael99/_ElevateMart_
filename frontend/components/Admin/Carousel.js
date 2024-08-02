// frontend/components/Carousel.js

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchTopTrendingProductsQuery } from "@/store/slices/api/productApiSlice";

const MyCarousel = () => {
  const [products, setProducts] = useState([]);
  const { data: trendingProducts } = useFetchTopTrendingProductsQuery(4);

  useEffect(() => {
    if (trendingProducts) {
      setProducts(trendingProducts);
    }
  }, [trendingProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <h1 className="text-black font-bold text-3xl text-center pt-6 pb-10">
        Welcome to Our ElevateMart
      </h1>
      <div className="mb-5 px-5">
        <Slider {...settings} rtl={false}>
          {products.map((product, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: "250px" }}
                // onClick={}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MyCarousel;
