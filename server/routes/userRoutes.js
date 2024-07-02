import express from "express";
import {
  checkUser,
  getUser,
  logut,
  signin,
  signup,
} from "../controllers/userControllers.js";
import { authenticateUser } from "../middlewares/user.middlewares.js";

const router = express.Router();

router.get("/usersList", getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logut);
router.get("/check-user", authenticateUser, checkUser);

export const userRouter = router;
