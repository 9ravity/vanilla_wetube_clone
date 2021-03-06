import multer from "multer";
import routers from "./routers";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatar/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Yetube";
  res.locals.routers = routers;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routers.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routers.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAavatar = multerAvatar.single("avatar");
