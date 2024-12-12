const mongoose = require("mongoose");

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

module.exports = userModel;
