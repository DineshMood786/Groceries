const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

//Sign UP
exports.signup = async (req, res) => {
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
};

//Login
exports.login = async (req, res) => {
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
};
