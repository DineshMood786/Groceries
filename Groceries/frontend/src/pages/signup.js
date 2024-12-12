import React, { useState } from "react";
import user from "../images/user.gif";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AllRoutes from "../components/routes";
import { ImageToBase64 } from "../utility/imageToBase";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmpassword } = formData;

    if (firstname && lastname && email && password && confirmpassword) {
      if (password === confirmpassword) {
        axios
          .post(`${process.env.REACT_APP_NODE_SERVER}/signup`, formData)
          .then((response) => {
            if (response.data.status === false) {
              toast.success(response.data.message);
              navigate(AllRoutes.login.path);
            } else {
              toast.warn(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.data.message);
          });
      } else {
        alert("Password and Confirm Password don't match");
      }
    }
  };

  const handleProfileImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    setFormData((prev) => {
      return {
        ...prev,
        profileImage: data,
      };
    });
  };

  return (
    <div>
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-6 rounded drop-shadow-md">
        <div className="w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md relative">
          <img
            src={formData.profileImage ? formData.profileImage : user}
            alt="user"
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-2 right-2 bg-slate-800 text-white text-2xl rounded-full shadow-md drop-shadow-md cursor-pointer">
              <IoMdAddCircle />
            </div>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleProfileImage}
              accept="image/*"
              hidden
            />
          </label>
        </div>
        <form className="w-full mt-6" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="w-full mt-2 mb-4 p-2 bg-slate-100"
            value={formData.firstname}
            onChange={handleFormData}
            required
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="w-full mt-2 mb-4 p-2 bg-slate-100"
            value={formData.lastname}
            onChange={handleFormData}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-2 mb-4 p-2 bg-slate-100"
            value={formData.email}
            onChange={handleFormData}
            required
          />

          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full mt-2 mb-4 p-2 bg-slate-100"
              value={formData.password}
              onChange={handleFormData}
              required
            />
            <span
              className="absolute mt-3 right-2 top-8 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>

          <div className="relative">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="w-full mt-2 mb-4 p-2 bg-slate-100"
              value={formData.confirmpassword}
              onChange={handleFormData}
              required
            />
            <span
              className="absolute mt-3 right-2 top-8 cursor-pointer"
              onClick={handleConfirmShowPassword}
            >
              {showConfirmPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>

          <button className="bg-blue-500 text-white w-full p-2 rounded-full font-bold">
            {AllRoutes.signup.name}
          </button>
          <p className="mt-3">
            Already have account?{" "}
            <Link to={AllRoutes.login.path} className="text-blue-800 underline">
              {AllRoutes.login.name}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
