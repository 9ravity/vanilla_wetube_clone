export const home = (req, res) => res.render("home", { pageTitle: "HOME" });
export const search = (req, res) => res.send("search", { pageTitle: "SEARCH" });
export const videos = (req, res) => res.send("videos", { pageTitle: "VIDEOS" });
export const upload = (req, res) =>
  res.send("upload", { pageTitle: "UPLOAD VIDEO" });
export const videoDetail = (req, res) =>
  res.send("videoDetail", { pageTitle: "VIDEO DETAIL" });
export const editVideo = (req, res) =>
  res.send("editVideo", { pageTitle: "EDIT VIDEO" });
export const deleteVideo = (req, res) =>
  res.send("deleteVideo", { pageTitle: "DELETE VIDEO" });
