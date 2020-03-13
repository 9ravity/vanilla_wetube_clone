import passport from "passport";
import routers from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "USER JOIN" });
};
export const postJoin = async (req, res, next) => {
  console.log(`posjoin:${req.body}`);
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "USER JOIN" });
  } else {
    // todo : 사용자 등록 -> login

    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routers.home);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "USER LOGIN" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routers.login,
  successRedirect: routers.home
});

export const facebookLogin = passport.authenticate("facebook");
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postFacebookLogin = (req, res) => {
  res.redirect(routers.home);
};

export const logout = (req, res) => {
  // todo : logout
  res.redirect(routers.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "USERS" });
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findById({ _id: id });
    res.render("userDetail", { pageTitle: "USER DETAIL", user });
  } catch (error) {
    res.redirect(routers.home);
  }
};
export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "EDIT PROFILE" });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routers.getEditProfile);
  } catch (error) {
    res.redirect(routers.getEditProfile);
  }
};
export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(routers.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
  } catch (error) {
    res.status(400);
    res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
  }
};
