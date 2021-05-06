import express from "express";
import {
  getHome,
  getJoin,
  getLogin,
  getSearch,
} from "../controllers/globalController";
import routes from "../routes";
const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.search, getSearch);

export default globalRouter;
