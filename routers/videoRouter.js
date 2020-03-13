import express from "express";
import router from "../routers";
import {
  videoDetail,
  getEditVideo,
  postEditVideo,
  getUpload,
  postUpload,
  deleteVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(router.videos, videos);
videoRouter.get(router.upload, onlyPrivate, getUpload);
videoRouter.post(router.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(router.videoDetail(), videoDetail);
videoRouter.get(router.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(router.editVideo(), onlyPrivate, postEditVideo);

videoRouter.post(router.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
