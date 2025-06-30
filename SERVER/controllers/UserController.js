import { clerkClient } from "@clerk/express";
import Booking from "../models/bookings.js";

export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user })
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

//fav->dd fav in clerk user metadata

export const updatefavourite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, error: "A valid movie ID is required" });
    }

    const user = await clerkClient.users.getUser(userId);
    const favourites = user.privateMetadata.favourites || [];

    const updatedFavourites = favourites.includes(movieId)
      ? favourites.filter((item) => item !== movieId)
      : [...favourites, movieId];

    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        favourites: updatedFavourites,
      },
    });

    res.json({
      success: true,
      message: "Favourite updated successfully",
      updatedFavourites,
    });
  } catch (error) {
    console.error("Error updating favourites:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFaviourites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favourites = user.privateMetadata.favourites;
    const movies = await Booking.find({ _id: { $in: favourites } });
    console.log(movies);
    res.json({ success: true, movies });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
