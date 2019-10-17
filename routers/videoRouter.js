import express from "express";
import router from "../routers";
import {
  videos,
  upload,
  videoDetail,
  editVideo,
  deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(router.videos, videos);
videoRouter.get(router.upload, upload);
videoRouter.get(router.videoDetail, videoDetail);
videoRouter.get(router.editVideo, editVideo);
videoRouter.get(router.deleteVideo, deleteVideo);

export default videoRouter;
