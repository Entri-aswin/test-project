import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const secret_key = process.env.SECRET_KEY;

export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, secret_key, {
    expiresIn: "24h",
  });
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret_key);
};
