import React from "react";
import { Link } from "react-router-dom";
import HandleAddtoCart from "../utility/handleAddtoCart";

const HomeProducts = ({
  productName,
  category,
  image,
  price,
  description,
  id,
}) => {
  const productData = { productName, category, image, price, description, id };

  return (
    <div className="bg-white shadow p-3 max-w-[262px]">
      <Link
        to={`/productDetails/${id}`}
        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
      >
        {" "}
        <div className="w-60 h-60">
          <img src={image} alt={productName} className="w-full h-full" />
        </div>
        <h3 className="font-semibold w-60 whitespace-nowrap overflow-hidden text-ellipsis">
          {productName}
        </h3>
      </Link>
      <div className="font-bold">
        <span className="text-red-600">$</span>
        <span>{price}</span>
      </div>
      <div className="mt-3 w-full">
        <HandleAddtoCart productData={productData} />
      </div>
    </div>
  );
};

export default HomeProducts;
