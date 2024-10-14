const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signupController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name || !email || !password || !phone || !address) {
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
    if (createUser) {
      return res.status(201).json({ message: "User Created Successfully!" });
    } else {
      return res
        .status(500)
        .json({ message: "Error while creating the user!" });
    }
  } catch (error) {
    console.error("Error while signing up the user:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.data(400).json({ message: '"All Data Fields Required!' });
    }

    //check user

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User not registered yet!" });
    }

    const comparePass = await bcrypt.compare(password, existingUser.password);
    if (!comparePass) {
      return res.status(401).json({ message: "Password Incorrect!" });
    }

    //creating token
    const secretkey = process.env.JWT_SECRET;
    const userid = existingUser._id

    const createToken = JWT.sign({userid}, secretkey , {expiresIn:"7d"})
    if (!createToken) {
        return res.status(400).json({ message: "Login Token Not Created!" });
      }
      else {
        // Send token to the client
        return res.status(200).json({ message: "User Logged In", token: createToken});
      }
    } 
catch (error) {
    console.error("Error while login:", error);
    return res.status(500).json({ message: "Internal Server Error!"});
  }
};


const testController = (req,res)=>{
  console.log("protected route")
  res.send('Helo from protected route')
}

module.exports = { signupController, loginController, testController };
