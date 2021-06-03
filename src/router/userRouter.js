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
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarFiles,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.userProfile, getProfile);
userRouter.get(routes.logout, protectorMiddleware, getLogout);
userRouter
  .route(routes.editUser)
  .all(protectorMiddleware)
  .get(getEditProfile)
  .post(avatarFiles.single("avatar"), postEditProfile);
userRouter
  .route(routes.changePassword)
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(routes.deleteUser, getDelUser);
userRouter.get(routes.githubStart, publicOnlyMiddleware, startGithubLogin);
userRouter.get(routes.githubFinish, publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
