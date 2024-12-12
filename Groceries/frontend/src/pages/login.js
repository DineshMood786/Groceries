import React, { useState } from "react";
import user from "../images/user.gif";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import AllRoutes from "../components/routes";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/loginAction";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email && password) {
      axios
        .post(`${process.env.REACT_APP_NODE_SERVER}/login`, formData)
        .then((response) => {
          if (response.data.passwordstatus) {
            toast.success(response.data.message);

            dispatch(loginAction(response.data));

            navigate(AllRoutes.home.path);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else {
      alert("Please Enter Required Fields");
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-6 rounded drop-shadow-md">
        <div className="w-20 overflow-hidden rounded-full shadow-md drop-shadow-md">
          <img src={user} alt="user" className="w-full" />
        </div>
        <form className="w-full mt-6" onSubmit={handleSubmit}>
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

          <button className="bg-blue-500 text-white w-full p-2 rounded-full font-bold">
            {AllRoutes.login.name}
          </button>
          <p className="mt-3">
            Don't have account?{" "}
            <Link
              to={AllRoutes.signup.path}
              className="text-blue-800 underline"
            >
              {AllRoutes.signup.name}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
