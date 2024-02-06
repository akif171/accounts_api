const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  //   console.log(req.body);

  const { business, email, password } = req.body;
  console.log(business, email, password);

  try {
    if (!business || !email || !password) {
      return res.status(500).json({ msg: "all fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(309).json({ msg: "user already exists." });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      business,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User Creadet.", savedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Registeration failed." });
  }
};

const userLogin = async (req, res) => {
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

    res.cookie("auth-token", token, {
      httpOnly: true,
      maxAge: 1000 * 6 * 60,
      secure: true, // Set to true if served over HTTPS
      path: "/",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "bad request." });
  }
};

const userLogout = async (req, res) => {
  res.clearCookie("auth-token");
  return res.status(200).json({ msg: "you are Loged Out. " });
};

module.exports = {
  createUser,
  userLogin,
  userLogout,
};
