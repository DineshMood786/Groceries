import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import AllRoutes from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/loginAction";
import { toast } from "react-toastify";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const loginState = useSelector((state) => state.loginReducer);
  const cartItems = useSelector((state) => state.productsList.cartItems);
  const dispatch = useDispatch();

  const userImage = loginState.profileImage;

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    toast("Logout Successfully");
  };

  return (
    <header className="fixed w-full h-16 shadow-md px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo} alt="logo" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden md:flex gap-3 md:gap-6 text-base md:text-lg">
            <Link to={AllRoutes.home.path}>{AllRoutes.home.name}</Link>
            <Link to={AllRoutes.menu.path}>{AllRoutes.menu.name}</Link>
            <Link to={AllRoutes.about.path}>{AllRoutes.about.name}</Link>
            <Link to={AllRoutes.contact.path}>{AllRoutes.contact.name}</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"/cart"}>
              <FaShoppingCart />
            </Link>

            <div className="absolute -top-3 -right-1 text-white bg-red-600 rounded-full text-sm h-5 w-5 text-center">
              {cartItems.length}
            </div>
          </div>
          <div className="text-2xl text-slate-600" onClick={handleShowMenu}>
            <div className="cursor-pointer">
              {userImage ? (
                <img
                  src={userImage}
                  alt="profileImage"
                  className="w-9 h-9 mb-2 rounded-full"
                />
              ) : (
                <FaUser />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-4 shadow drop-shadow-md py-2 mt-1 bg-white text-lg flex flex-col">
                {loginState.email === process.env.REACT_APP_ADMIN_USER && (
                  <Link
                    to={"newproducts"}
                    className="whitespace-nowrap px-4 hover:text-white hover:bg-red-500"
                  >
                    New Products
                  </Link>
                )}
                {userImage ? (
                  <p
                    className="whitespace-nowrap cursor-pointer px-4 hover:text-white hover:bg-red-500"
                    onClick={handleLogout}
                  >
                    {AllRoutes.logout.name}
                  </p>
                ) : (
                  <Link
                    to={AllRoutes.login.path}
                    className="whitespace-nowrap px-4 hover:text-white hover:bg-red-500"
                  >
                    {AllRoutes.login.name}
                  </Link>
                )}
                <nav className="md:hidden flex flex-col text-base text-center">
                  <Link to={AllRoutes.home.path}>{AllRoutes.home.name}</Link>
                  <Link to={AllRoutes.menu.path}>{AllRoutes.menu.name}</Link>
                  <Link to={AllRoutes.about.path}>{AllRoutes.about.name}</Link>
                  <Link to={AllRoutes.contact.path}>
                    {AllRoutes.contact.name}
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
