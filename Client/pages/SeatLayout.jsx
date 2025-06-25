import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  assets,
  dummyDateTimeData,
  dummyShowsData,
} from "../src/assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import toast from "react-hot-toast";

function SeatLayout() {
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
  const navigate = useNavigate();

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error("You can only select up to 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-[var(--color-primary)] cursor-pointer transition ${
              isSelected
                ? "bg-[var(--color-primary)] text-white"
                : "hover:bg-[var(--color-primary)]/20 text-white"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="min-h-screen flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-20 md:pt-32 text-white">
      {/* Available Timings */}
      <div className="w-60 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-[var(--color-primary)] text-white"
                  : "hover:bg-[var(--color-primary)]/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <h1 className="text-2xl font-semibold mb-4">Select your seats</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-center mt-2">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        <button
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition rounded-full font-medium cursor-pointer active:scale-95"
          onClick={() => {
            navigate("/mybookings");
          }}
        >
          Proceed to CheckOut
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default SeatLayout;
