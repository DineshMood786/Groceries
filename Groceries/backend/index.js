const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");

const app = express();

const { signup, login } = require("./controllers/userController");
const { newProducts, getProducts } = require("./controllers/productController");
app.use(cors());
app.use(express.json());

const PORT = process.env.port || 8080;

app.post("/signup", signup);

app.post("/login", login);

app.post("/newproducts", newProducts);

app.get("/getProducts", getProducts);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => console.log("Server is running at " + PORT));
