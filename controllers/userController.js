export const join = (req, res) => res.send("join", { pageTitle: "USER JOIN" });
export const login = (req, res) =>
  res.send("login", { pageTitle: "USER LOGIN" });
export const logout = (req, res) =>
  res.send("logout", { pageTitle: "USER LOGOUT" });

export const users = (req, res) => res.send("users", { pageTitle: "USERS" });
export const userDetail = (req, res) =>
  res.send("userDetail", { pageTitle: "USER DETAIL" });
export const editProfile = (req, res) =>
  res.send("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, res) =>
  res.send("changePassword", { pageTitle: "CHANGE PASSWORD" });
