import React, { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import HomeProducts from "../components/HomeProducts";

const Products = ({ snackProducts, heading }) => {
  const handleNavState = useRef();

  const handleBefore = () => {
    handleNavState.current.scrollLeft -= 200;
  };

  const handleAfter = () => {
    handleNavState.current.scrollLeft += 200;
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-2xl">{heading}</h3>
        {snackProducts[0] && snackProducts.length >= 5 && (
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
        )}
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
  );
};

export default Products;
