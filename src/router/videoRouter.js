import express from "express";
import {
  delVideo,
  getEditVideo,
  getUpload,
  getWatch,
  postEditVideo,
  postUpload,
} from "../controllers/videoController";
import { protectorMiddleware, videoFiles } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.watchVideo, getWatch);
videoRouter
  .route(routes.editVideo)
  .all(protectorMiddleware)
  .get(getEditVideo)
  .post(postEditVideo);
videoRouter
  .route(routes.uploadVideo)
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoFiles.single("video"), postUpload);
videoRouter.all(protectorMiddleware).get(routes.deleteVideo, delVideo);

export default videoRouter;
