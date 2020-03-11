import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routers";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet()); // 서버 보안 설정
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // dir 에서 file을 보내주는 middleware
app.use(cookieParser()); // 회원 가입 로그인 등
app.use(bodyParser.json()); // form 태그 body 데이터 전송 값 해석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging

// 미들웨어 생성하기, 로컬변수를 글로벌 변수로 사용하기 위함
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
