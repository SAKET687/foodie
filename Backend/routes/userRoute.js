import express from "express"
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);




// userRouter.post("/add", addUser);

export default userRouter;