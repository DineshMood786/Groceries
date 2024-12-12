import React from "react";

const HomeCard = ({ productName, category, image, price, description }) => {
  return (
    <div className="bg-white p-3 shadow-md">
      <div className="w-48 h-48">
        <img src={image} alt={productName} className="w-full h-full" />
      </div>
      <div>
        <h3 className="text-center capitalize font-bold">{category}</h3>
      </div>
    </div>
  );
};

export default HomeCard;
