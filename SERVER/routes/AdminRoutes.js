import express from "express";
import { protectAdmin } from "../middewares/auth.js";
import {
  geetAllBookings,
  getAllShows,
  getDashboardData,
  isAdmin,
} from "../controllers/AdminController.js";

const adminRouter = express.Router();

adminRouter.get("/isAdmin", protectAdmin, isAdmin);
adminRouter.get("/dashboard", protectAdmin, getDashboardData);
adminRouter.get("/all-shows", protectAdmin, getAllShows);
adminRouter.get("/all-bookings", protectAdmin, geetAllBookings);

export default adminRouter;
