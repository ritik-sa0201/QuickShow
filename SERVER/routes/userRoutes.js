import express from "express";
import {
  getFaviourites,
  getUserBookings,
  updatefavourite,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);

userRouter.post("/updatefavourite", updatefavourite);

userRouter.get("/favourites", getFaviourites);

export default userRouter;
