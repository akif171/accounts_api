const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = {
  createUser,
};
