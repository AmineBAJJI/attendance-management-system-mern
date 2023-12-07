const User = require("../models/User");

module.exports.signup_post = async (req, res) => {
  res.send("new signup");
};

module.exports.login_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not created");
  }
};
