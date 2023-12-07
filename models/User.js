const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

userSchema.pre("save", function (next) {
  console.log("user about to be created & saved", this);
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
