import express from "express";
import { getJoin, getLogin, postJoin } from "../controllers/userController";
import { getHome, getSearch } from "../controllers/videoController";

import routes from "../routes";
const rootRouter = express.Router();

rootRouter.get(routes.home, getHome);
rootRouter.route(routes.join).get(getJoin).post(postJoin);
rootRouter.get(routes.login, getLogin);
rootRouter.get(routes.search, getSearch);

export default rootRouter;
