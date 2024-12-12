import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard";
import HomeProducts from "../components/HomeProducts";

import AllCategories from "../components/AllCategories";
import Products from "../components/Products";

const Home = () => {
  const productsList = useSelector((state) => state.productsList.productsList);

  const [filterData, setFilterData] = useState([]);

  let homeProducts = {};
  let snackProducts = {};

  if (productsList[0]) {
    const allCategories = [
      ...new Set(productsList.map((product) => product.category)),
    ];

    homeProducts = allCategories.map((cat) => {
      const product = productsList.find((prod) => prod.category === cat);
      return product;
    });

    snackProducts = productsList.filter(
      (item) => item.category === "snacks&candy"
    );
  } else {
    homeProducts = {};
    snackProducts = {};
  }

  useEffect(() => {
    setFilterData(productsList);
  }, [productsList]);

  const handleFilterProduct = (category) => {
    const filterProducts = productsList.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    setFilterData(() => {
      return [...filterProducts];
    });
  };

  return (
    <div className="px-4">
      <div className="md:flex md:gap-6 py-2">
        <div className="md:w-1/2">
          <div className="flex rounded-full shadow w-52 px-3 pt-2 pb-1 bg-slate-300">
            <p className="font-bold">Pickup is available</p>
            <img
              src="https://cdn-icons-png.freepik.com/256/5609/5609064.png?semt=ais_hybrid"
              alt="pickup"
              className="w-7 h-7 ml-2"
            />
          </div>
          <div className="py-4">
            <h1 className="font-bold text-5xl pb-2">
              Visit your store <p className="inline text-red-500">Chevron!</p>
            </h1>
            <p className="text-justify">
              Discover a wide range of quality products at unbeatable prices.
              Our friendly staff is here to help you find exactly what you need,
              so stop by today and enjoy a seamless shopping experience! Don’t
              miss out on our exclusive in-store deals—come and see what’s in
              store for you!
            </p>
          </div>
          <button className="font-bold shadow rounded-xl px-4 py-2 bg-red-500 text-white">
            See Products
          </button>
        </div>
        <div className="md:w-1/2 py-4 flex flex-wrap gap-5 justify-center">
          {homeProducts[0] &&
            homeProducts.map((item) => {
              return (
                <HomeCard
                  key={item._id}
                  productName={item.productName}
                  category={item.category}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                />
              );
            })}
        </div>
      </div>

      {snackProducts[0] && (
        <Products snackProducts={snackProducts} heading="New Products" />
      )}

      <div>
        <h3 className="font-bold text-2xl mt-2">All Categories</h3>
        <div className="flex gap-5 justify-center">
          {homeProducts[0] &&
            homeProducts.map((item) => {
              return (
                <AllCategories
                  key={item._id}
                  category={item.category}
                  filterClick={() => handleFilterProduct(item.category)}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-wrap gap-5 py-2">
        {filterData[0] &&
          filterData.map((item) => {
            return (
              <HomeProducts
                key={item._id}
                id={item._id}
                productName={item.productName}
                category={item.category}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
