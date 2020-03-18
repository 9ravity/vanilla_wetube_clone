import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose"; // mongoDB 연결
import session from "express-session";
import MongoStore from "connect-mongo"; // session 저장
import { localsMiddleware } from "./middlewares";
import routes from "./routers";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

console.log(`env : ${process.env.COOKIE_SECRET}`);

app.use(helmet()); // 서버 보안 설정
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // dir 에서 file을 보내주는 middleware
app.use("/static", express.static("static")); // dir 에서 file을 보내주는 middleware
app.use(cookieParser()); // 회원 가입 로그인 등
app.use(bodyParser.json()); // form 태그 body 데이터 전송 값 해석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
); //secret 매우 중요 보안
app.use(passport.initialize()); // 쿠키 파서를 통해서 쿠키를 읽고, passport가 쿠키에 맞는 user를 찾아서, middlewares.js에서 user(object)를 찾음
app.use(passport.session());

// 미들웨어 생성하기, 로컬변수를 글로벌 변수로 사용하기 위함
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
