import { useEffect, useState } from "react";
import { dummyBookingData } from "../src/assets/assets";
import Loading from "../components/Loading";
import formatRunTime from "../lib/formatRuntime";
import { dateFormaat } from "../lib/dateFormat";

function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>
      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between
          bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-lg mt-4 p-2 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={item.show.movie.poster_path}
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
              alt={item.show.movie.title}
            />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">{item.show.movie.title}</p>
              <p className="text-gray-400 text-sm">
                {formatRunTime(item.show.movie.runtime)}
              </p>
              <p className="text-gray-400 text-sm mt-auto">
                {dateFormaat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p>
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <button className="bg-[var(--color-primary)] px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
                  Pay now
                </button>
              )}
            </div>
            <div className="text-sm">
              <p>
                <span>Total Tickets: </span>
                {item.bookedSeats.length}
              </p>
              <p>
                <span>Seat Number: </span>
                {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
}

export default MyBooking;
