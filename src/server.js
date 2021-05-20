import express from "express";
import morgan from "morgan";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();
const morganMiddleware = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
