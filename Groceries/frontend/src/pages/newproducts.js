import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ImageToBase64 } from "../utility/imageToBase";
import axios from "axios";
import { toast } from "react-toastify";

const NewProducts = () => {
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleImage = async (e) => {
    const productImage =
      e.target.files[0] && (await ImageToBase64(e.target.files[0]));
    setProductData((prev) => {
      return { ...prev, image: productImage };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, category, image, price, description } = productData;
    if (productName && category && image && price && description) {
      axios
        .post(`${process.env.REACT_APP_NODE_SERVER}/newproducts`, productData)
        .then((res) => {
          toast(res.data.message);
          setProductData(() => {
            return {
              productName: "",
              category: "",
              image: "",
              price: "",
              description: "",
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Enter Required Fields");
    }
  };

  return (
    <div className="">
      <form
        className="m-auto w-full max-w-md shadow bg-white p-4"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-2 text-center text-xl font-bold">New Product</h2>
        <div className="mb-2">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            id="productName"
            className="bg-slate-200 w-full h-9 p-2"
            onChange={handleChange}
            value={productData.productName}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            className="w-full bg-slate-200 h-9 p-2"
            value={productData.category}
          >
            <option value="">Select Category</option>
            <option value="Snacks & Candy">Snacks & Candy</option>
            <option value="Cool Drinks">Cool Drinks</option>
            <option value="Healthy Choices">Healthy Choices</option>
            <option value="Hot Foods">Hot Foods</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">
            Image
            <div className="w-full bg-slate-200 h-40 flex items-center justify-center cursor-pointer mb-2">
              {productData.image ? (
                <img
                  src={productData.image}
                  alt="productImage"
                  className="h-full"
                />
              ) : (
                <p>
                  <FaUpload size={30} />
                </p>
              )}
              <input
                type="file"
                id="image"
                accept=".jpeg,.jpg,.png"
                name="image"
                hidden
                onChange={handleImage}
              />
            </div>
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="bg-slate-200 w-full h-9 p-2"
            onChange={handleChange}
            value={productData.price}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={2}
            className="bg-slate-200 w-full p-2 resize-none mb-2"
            onChange={handleChange}
            value={productData.description}
          ></textarea>
        </div>
        <button className="shadow w-full bg-red-500 text-white h-8 font-bold rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProducts;
