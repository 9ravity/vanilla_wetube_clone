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
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(router.videos, videos);
videoRouter.get(router.upload, getUpload);
videoRouter.post(router.upload, uploadVideo, postUpload);

videoRouter.get(router.videoDetail(), videoDetail);
videoRouter.get(router.editVideo(), getEditVideo);
videoRouter.post(router.editVideo(), postEditVideo);

videoRouter.post(router.deleteVideo(), deleteVideo);

export default videoRouter;
