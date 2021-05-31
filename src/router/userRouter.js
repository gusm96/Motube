import express from "express";
import routes from "../routes";
import {
  getDelUser,
  getEditProfile,
  postEditProfile,
  getLogout,
  getProfile,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.userProfile, getProfile);
userRouter.get(routes.logout, protectorMiddleware, getLogout);
userRouter
  .route(routes.editUser)
  .all(protectorMiddleware)
  .get(getEditProfile)
  .post(postEditProfile);
userRouter.get(routes.deleteUser, getDelUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
