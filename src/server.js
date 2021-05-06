import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();
const morganMiddleware = morgan("dev");

app.use(morganMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const PORT = 4000;

const handleListening = () =>
  console.log(`👍 Server Listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
