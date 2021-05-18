import express from "express";
import { getJoin, getLogin } from "../controllers/userController";
import { getHome, getSearch } from "../controllers/videoController";

import routes from "../routes";
const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.search, getSearch);

export default globalRouter;
