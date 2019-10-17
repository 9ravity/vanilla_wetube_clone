import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routers";

const app = express();

app.set("view engine", "pug");
app.use(cookieParser()); // 회원 가입 로그인 등
app.use(bodyParser.json()); // form 태그 body 데이터 전송 값 해석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // 안전하게 만들어줌
app.use(morgan("dev")); // logging

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
