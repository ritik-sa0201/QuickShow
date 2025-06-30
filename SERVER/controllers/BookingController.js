//function to check availability of selected seats fro a movie

import Booking from "../models/bookings.js";
import Show from "../models/Shows.js";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    // ✅ Validate selectedSeats
    if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      console.log("selectedSeats is not a valid array:", selectedSeats);
      return false;
    }

    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats || {};

    // ✅ Check manually using a for-loop instead of .some
    let isAnySeatTaken = false;

    for (let seat of selectedSeats) {
      if (
        occupiedSeats[seat] === "1" ||
        occupiedSeats[seat] === 1 ||
        occupiedSeats[seat] === true
      ) {
        isAnySeatTaken = true;
        break;
      }
    }

    return !isAnySeatTaken;
  } catch (error) {
    console.error("Seat availability error:", error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // Check if the seat is available for the selected show
    const isAvailable =
      (await checkSeatsAvailability(showId, selectedSeats)) || [];

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected Seats are not available.",
      });
    }

    // Get the show details
    const showData = await Show.findById(showId).populate("movie");

    // Create a new booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");

    await showData.save();

    // Stripe Gateway Initialize
    res.json({
      success: true,
      message: "Booking created successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
