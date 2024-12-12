const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.port || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error " + err);
  });

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  profileImage: String,
});

const userModel = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

//Sign UP
app.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    res.send({ status: true, message: "Email ID is already Registered" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedConfirmPassword = await bcrypt.hash(confirmpassword, 12);

    if (req.body) {
      req.body.password = hashedPassword;
      req.body.confirmpassword = hashedConfirmPassword;
    }

    const userData = userModel(req.body);
    const SaveData = userData.save();
    res.send({ status: false, message: "Successfully Registered" });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    const dataRes = {
      _id: existingUser._id,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      profileImage: existingUser.profileImage,
    };

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      res.send({
        message: "Login successful",
        passwordstatus: true,
        data: dataRes,
      });
    } else {
      res.send({ message: "Wrong Password", passwordstatus: false });
    }
  } else {
    res.send({ message: "Invalid Email ID, Please Sign Up." });
  }
});

// New Products

const productSchema = mongoose.Schema({
  productName: String,
  category: String,
  image: String,
  price: Number,
  description: String,
});

const productModel = mongoose.model("newProducts", productSchema);

// Save product

app.post("/newproducts", (req, res) => {
  const newProducts = new productModel(req.body);
  newProducts
    .save()
    .then(() => {
      res.send({ message: "Product created successfully" });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

//Get Products

app.get("/getProducts", (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.json({ message: "Error retrieving data", error: err });
    });
});

app.listen(PORT, () => console.log("Server is running at " + PORT));
