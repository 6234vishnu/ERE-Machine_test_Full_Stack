import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const mongodbSecretKey = process.env.JWT_SECRET_KEY;

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    if (!mongodbSecretKey) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server error: Missing JWT secret key",
        });
    }

    const token = jwt.sign({ userId: findUser._id }, mongodbSecretKey, {
      expiresIn: "2h",
    });

    return res
      .status(200)
      .json({ success: true, message: "User login successful", token });
  } catch (error) {
    console.log("Error in userLogin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in user login" });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const saveUser = await newUser.save();

    if (!mongodbSecretKey) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server error: Missing JWT secret key",
        });
    }

    const token = jwt.sign({ userId: saveUser._id }, mongodbSecretKey, {
      expiresIn: "2h",
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log("Error in userRegister:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in user signUp" });
  }
};
