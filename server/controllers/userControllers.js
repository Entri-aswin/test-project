import { User } from "../models/user.model.js";
import {
  compareHashedPassword,
  generateHashPassword,
} from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

// --------------user list -------------
export const getUser = async (req, res, next) => {
  try {
    const userList = await User.find();
    res.send(userList);
  } catch (error) {
    next(error);
  }
};

// --------- sign up -------------
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!name || !email || !password) {
      return res.send("input field missing");
    }

    if (!userExist) {
      const hashedPassword = await generateHashPassword(password);
      const createUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });
      return res.status(200).json(createUser);
    }
    return res.send("user already exist");
  } catch (error) {
    // res.status(400).json(error)
    next(error);
  }
};

// --------- sign in -------------
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json("Invalid Credentials");
    }
    const userMatch = await compareHashedPassword(password, userExist.password);

    if (!userMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }
    const token = generateToken(userExist._id);
    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV == "production",
    });

    return res.status(200).json({ message: "login success", success: true });
  } catch (error) {
    next(error);
  }
};

// ------- log out -------
export const logut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "user logged out", success: true });
  } catch (error) {
    next(error);
  }
};

//----- check user -----
export const checkUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "authentication failed", success: false });
    }
    return res
      .status(200)
      .json({ message: "user authenticated", success: true });
  } catch (error) {
    next(error);
  }
};


