import React from "react";
import { useDispatch } from "react-redux";
import { cartItems } from "../redux/productActions";

const HandleAddtoCart = ({ productData }) => {
  const dispatch = useDispatch();
  const handleAddtoCart = () => {
    dispatch(cartItems(productData));
  };

  return (
    <button
      className="bg-yellow-400 shadow font-semibold w-full rounded py-1 hover:bg-yellow-500"
      onClick={handleAddtoCart}
    >
      Add to Cart
    </button>
  );
};

export default HandleAddtoCart;
