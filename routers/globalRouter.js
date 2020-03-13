import express from "express";
import routers from "../routers";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routers.join, onlyPublic, getJoin);
globalRouter.post(routers.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routers.login, onlyPublic, getLogin);
globalRouter.post(routers.login, onlyPublic, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.logout, onlyPublic, logout);
globalRouter.get(routers.search, search);

globalRouter.get(routers.facebook, facebookLogin);
globalRouter.get(
  routers.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

export default globalRouter;
