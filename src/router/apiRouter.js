import express from "express";
import {
  registerView,
  createComment,
  //deleteComment,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.views, registerView);
apiRouter.post(routes.comments, createComment);
//apiRouter.get(routes.deleteCm, deleteComment);

export default apiRouter;
