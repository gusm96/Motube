import express from "express";
import routes from "../routes";
import {
  getDelUser,
  getEditUser,
  getLogout,
  getProfile,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.userProfile, getProfile);
userRouter.get(routes.logout, getLogout);
userRouter.get(routes.editUser, getEditUser);
userRouter.get(routes.deleteUser, getDelUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
