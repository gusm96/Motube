import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { getHome, getSearch } from "../controllers/videoController";

import routes from "../routes";
const rootRouter = express.Router();

rootRouter.get(routes.home, getHome);
rootRouter.route(routes.join).get(getJoin).post(postJoin);
rootRouter.route(routes.login).get(getLogin).post(postLogin);
rootRouter.get(routes.search, getSearch);

export default rootRouter;
