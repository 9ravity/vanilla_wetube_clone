/* eslint-disable no-console */
import routers from "../routers";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // 모든 video 가져오기
    res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log(`videoController - error : ${error}`);
    res.render("home", { pageTitle: "HOME", videos: [] });
  }
};
export const search = async (req, res) => {
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};

// export const videos = (req, res) => {
//   res.render("videos", { pageTitle: "VIDEOS" });
// };

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD VIDEO" });
};

export const postUpload = async (req, res) => {
  const {
    body: { description, title },
    file: { path }
  } = req;
  // //todo : upload save logic
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  console.log(newVideo);
  req.user.videos.push(newVideo);
  req.user.save();
  res.redirect(routers.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routers.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routers.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routers.videoDetail(id));
  } catch (error) {
    res.redirect(routers.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routers.home);
};

// api Register video view
export const postRegisterView = async (req, res) => {
  try {
    const video = await Video.findOne(req.params.id);
    video.views += video.views + 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
