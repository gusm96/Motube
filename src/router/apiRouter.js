import express from "express";
import { registerView } from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.views, registerView);

export default apiRouter;
