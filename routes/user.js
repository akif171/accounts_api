const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUser } = require("../controllers/user");
const jwt = require("jsonwebtoken");

router.post("/register", createUser);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(300).json({ msg: "User does not exists." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(300).json({ msg: "Invalid credentials." });
    }
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); 

    res.cookie("auth-token", token, { httpOnly: true });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "bad request." });
  }
});

module.exports = router;
