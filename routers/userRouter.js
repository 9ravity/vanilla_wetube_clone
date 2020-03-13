import express from "express";
import router from "../routers";
import {
  users,
  getEditProfile,
  postEditProfile,
  userDetail,
  getChangePassword,
  postChangePassword
} from "../controllers/userController";
import { onlyPrivate, uploadAavatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(router.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  router.editProfile,
  onlyPrivate,
  uploadAavatar,
  postEditProfile
);
userRouter.get(router.users, users);
userRouter.get(router.userDetail(), userDetail);
userRouter.get(router.changePassword, onlyPrivate, getChangePassword);
userRouter.post(router.changePassword, onlyPrivate, postChangePassword);

export default userRouter;
