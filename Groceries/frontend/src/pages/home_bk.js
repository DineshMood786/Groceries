import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard";
import HomeProducts from "../components/HomeProducts";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import AllCategories from "../components/AllCategories";

const Home = () => {
  const productsList = useSelector((state) => state.productsList.productsList);
  const handleNavState = useRef();
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

  const handleBefore = () => {
    handleNavState.current.scrollLeft -= 200;
  };

  const handleAfter = () => {
    handleNavState.current.scrollLeft += 200;
  };

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
      <div>
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">Snacks & Candy</h3>
          <div className="mr-4">
            <button
              onClick={handleBefore}
              className="bg-slate-300 rounded py-1"
            >
              <MdNavigateBefore size={30} />
            </button>
            <button
              onClick={handleAfter}
              className="bg-slate-300 rounded ml-2 py-1"
            >
              <MdNavigateNext size={30} />
            </button>
          </div>
        </div>
        <div
          ref={handleNavState}
          className="flex overflow-scroll scrollbar-none scroll-smooth gap-5 py-2"
        >
          {snackProducts[0] &&
            snackProducts.map((item) => {
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
