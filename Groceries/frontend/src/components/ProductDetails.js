import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Products from "../components/Products";

import HandleAddtoCart from "../utility/handleAddtoCart";

const ProductDetails = () => {
  const productsList = useSelector((state) => state.productsList.productsList);

  const { id } = useParams();
  const productData =
    productsList[0] && productsList.filter((item) => item._id === id)[0];

  const relatedProducts =
    productsList[0] &&
    productsList.flatMap((item) => {
      if (item.category === productData.category) {
        return item;
      } else {
        return [];
      }
    });

  return (
    <div className="mx-4">
      {productData && (
        <div className="md:flex gap-5 bg-white shadow w-full max-w-5xl m-auto">
          <div className="max-w-[500px] max-h-[500px] overflow-hidden">
            <img
              src={productData.image}
              alt={productData.productName}
              className="w-full h-full hover:scale-105 transition-all"
            />
          </div>
          <div className="max-w-[500px] max-h-[500px] overflow-hidden w-full p-6">
            <h2 className="font-bold md:text-3xl">{productData.productName}</h2>
            <h3 className="font-semibold md:text-xl">{productData.category}</h3>
            <p className="text-xl font-semibold">
              <span className="text-red-500">$</span>
              <span>{productData.price}</span>
            </p>
            <div className="flex gap-4 mt-3">
              <button className="bg-yellow-400 w-1/2 font-semibold rounded py-1 hover:bg-yellow-500">
                Buy Now
              </button>
              <div className="w-1/2">
                <HandleAddtoCart productData={productData} />
              </div>
            </div>
            <div className="mt-4 max-w-[500px]">
              <h4 className="font-bold">Description: </h4>
              <p className="text-justify">{productData.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        {relatedProducts && (
          <Products
            snackProducts={relatedProducts}
            heading="Related Products"
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
