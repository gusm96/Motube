import express from "express";
import {
  getEditVideo,
  getUpload,
  getWatch,
  postEditVideo,
  postUpload,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.watchVideo, getWatch);
videoRouter.route(routes.editVideo).get(getEditVideo).post(postEditVideo);
videoRouter.route(routes.uploadVideo).get(getUpload).post(postUpload);

export default videoRouter;
