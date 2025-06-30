import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setoccupiedSeats] = useState([]);

  const navigate = useNavigate();

  const { axios, getToken, user } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (err) {
      console.log("Error fetching show details");
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time.");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can select a maximum of 5 seats.");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast.error("This seat is already occupied.");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const bookTickets = async () => {
    try {
      if (!user) {
        return toast.error("Please login to book tickets.");
      }
      if (!selectedTime || !selectedSeats.length) {
        return toast.error("Please select a time and at least one seat.");
      }
      console.log(selectedSeats);
      const { data } = await axios.post(
        "/api/booking/create",
        {
          showId: selectedTime.showId,
          selectedSeats: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="grid grid-cols-9 gap-2 mt-2 w-full">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer text-sm ${
              selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
            }
            ${
              occupiedSeats.includes(seatId) &&
              "bg-gray-500 text-gray-200 cursor-not-allowed"
            }
            `}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setoccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-4 md:px-10 lg:px-20 py-16">
      {/* Available Timings */}
      <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-8 h-max md:sticky md:top-30 md:-ml-10 mb-8 md:mb-0 mt-10">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {Array.isArray(show.dateTime?.[date]) &&
            show.dateTime[date].map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-10 overflow-x-auto no-scrollbar">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4 mt-50">Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300 gap-6 w-full px-2 sm:px-10">
          {/* First group (A & B) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Remaining seat rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx} className="space-y-4">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={bookTickets}
          className="flex item-center gap-1 mt-20 px-10 py-3 text-s, bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Proceed To Checkout
          <ArrowRightIcon className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
