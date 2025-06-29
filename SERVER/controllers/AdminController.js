//Api to check if user if admin

import Booking from "../models/bookings.js";
import Show from "../models/Shows.js";
import User from "../models/user.js";

export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

//getting the dashboard data

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");
    const totalUser = await User.countDocuments();
    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };
    console.log(dashboardData);
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });
    res.json({ success: true, shows });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

//api to get all bookings

export const geetAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
