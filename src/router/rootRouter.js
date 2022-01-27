import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { getHome, getSearch } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

import routes from "../routes";
const rootRouter = express.Router();

rootRouter.get(routes.home, getHome);
rootRouter
  .route(routes.join)
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
rootRouter
  .route(routes.login)
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get(routes.search, getSearch);

export default rootRouter;
