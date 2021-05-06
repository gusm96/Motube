import express from "express";
import {
  getDelVideo,
  getEditVideo,
  getSee,
  getupload,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.watchVideo, getSee);
videoRouter.get(routes.uploadVideo, getupload);
videoRouter.get(routes.editVideo, getEditVideo);
videoRouter.get(routes.deleteVideo, getDelVideo);

export default videoRouter;
