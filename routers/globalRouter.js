import express from "express";
import routers from "../routers";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routers.join, getJoin);
globalRouter.post(routers.join, postJoin);
globalRouter.get(routers.login, getLogin);
globalRouter.post(routers.login, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.logout, logout);
globalRouter.get(routers.search, search);

export default globalRouter;
