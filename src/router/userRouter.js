import express from "express";
import routes from "../routes";
import {
  getDelUser,
  getEditUser,
  getLogout,
  getProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.userProfile, getProfile);
userRouter.get(routes.logout, getLogout);
userRouter.get(routes.editUser, getEditUser);
userRouter.get(routes.deleteUser, getDelUser);

export default userRouter;
