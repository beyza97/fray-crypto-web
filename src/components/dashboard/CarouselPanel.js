import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import ProductService from "../../service/ProductService";
import { Chart } from "primereact/chart";

export const CarouselPanel = () => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProductsSmall()
      .then((data) => setProducts(data.slice(0, 10)));
  }, []);

  const basicData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#42AE7F",
      },
    ],
  };

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };
  const { basicOptions } = getLightTheme();

  const productTemplate = (product) => {
    return (
      <div className="p-grid p-formgrid">
        <div className="p-col-12 p-md-6">
          <h4 className="mb-1">S&P 500</h4>
          <h6 className="mt-0 mb-3">4,677.33</h6>
          <a>+7.40(+0.41%)</a>
        </div>
        <div className="p-col-12 p-md-6">
          <Chart
            style={{ height: "20px" }}
            type="line"
            data={basicData}
            options={basicOptions}
          />
        </div>
      </div>
    );
  };

  return (
    <Carousel
      value={products}
      numVisible={3}
      numScroll={1}
      responsiveOptions={responsiveOptions}
      className="custom-carousel"
      circular
      autoplayInterval={5000}
      itemTemplate={productTemplate}
    />
  );
};
