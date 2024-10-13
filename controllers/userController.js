const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name || email || password || phone || address) {
      return res.status(400).json({ message: "All data fields required!" });
    }

    //check user

    const findUser = await User.findOne({ email });

    //existing user
    if (findUser) {
      return res.status(409).json({ message: "User Already Registered!" });
    }

    //hash pass

    const hashPass = await bcrypt.hash(password, 10);

    // register usert

    const createUser = await User.create({
      name,
      email,
      password: hashPass,
      phone,
      address,
    });
  } catch (error) {
    console.error("Error while signing up the user:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { signupController };
