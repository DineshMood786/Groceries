import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProductsList } from "./redux/productActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_SERVER}/getProducts`)
      .then((response) => {
        dispatch(getProductsList(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <menu className="pt-20 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </menu>
      </div>
    </>
  );
}

export default App;
