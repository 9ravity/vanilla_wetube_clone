import routers from "./routers";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Yetube";
  res.locals.routers = routers;
  next();
};
