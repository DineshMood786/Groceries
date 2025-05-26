import React from "react";
import { FaCandyCane } from "react-icons/fa6";

const AllCategories = ({ category, filterClick }) => {
  /* 
  This for demo purpose
  */
  return (
    <div
      onClick={filterClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="bg-yellow-400 w-16 h-16 p-5 rounded-full text-center">
        <FaCandyCane size={20} />
      </div>
      <p>{category}</p>
    </div>
  );
};

export default AllCategories;
