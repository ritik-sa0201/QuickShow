import express from "express";
import {
  addShow,
  getNowPlayingMovies,
  getShows,
  getShow,
} from "../controllers/showControllers.js";
import { protectAdmin } from "../middewares/auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies);

showRouter.post("/add", addShow);

showRouter.get("/all", getShows);
showRouter.get("/:movieId", getShow);
export default showRouter;
