const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const dbUser = await User.findOne({ email }).exec();
  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);

    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email },
        process.env.JWT_LOGON_TOKEN,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Credentials doesnt match" });
      return false;
    }
  } else {
    res.status(400).json({ message: "Email is not registered" });
    return false;
  }
};
