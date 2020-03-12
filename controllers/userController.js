/* eslint-disable no-console */
import routers from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "USER JOIN" });
};
export const postJoin = async (req, res) => {
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
    } catch (error) {
      console.log(error);
    }

    res.redirect(routers.home);
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "USER LOGIN" });
export const postLogin = (req, res) => {
  const { email, password } = req.body;

  res.redirect(routers.home);
};

export const logout = (req, res) => {
  // todo : logout
  res.redirect(routers.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "USERS" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "USER DETAIL" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
