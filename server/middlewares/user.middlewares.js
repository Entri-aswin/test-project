import { verifyToken } from "../utils/jwt.js";

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = verifyToken(token);
    req.userId = user.id;
    next();
  } catch (error) {
    // next(error);
    res.status(400).json({message:'token could not verify',success:false})
  }
};
