import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const cartProducts = useSelector((state) => state.productsList.cartItems);
  console.log(cartProducts);

  return (
    <div>
      <h2 className="font-bold text-2xl">Cart Items</h2>
      <div>
        <div>
          {cartProducts[0] &&
            cartProducts.map((item) => {
              return (
                <CartProduct
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
        <div>Cart Totals</div>
      </div>
    </div>
  );
};

export default Cart;
