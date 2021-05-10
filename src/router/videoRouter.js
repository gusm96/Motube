import express from "express";
import {
  getEditVideo,
  getWatch,
  postEditVideo,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.watchVideo, getWatch);
videoRouter.route(routes.editVideo).get(getEditVideo).post(postEditVideo);

export default videoRouter;
