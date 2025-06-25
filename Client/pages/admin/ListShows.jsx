import { useEffect, useState } from "react";
import { dummyShowsData } from "../../src/assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormaat } from "../../lib/dateFormat";

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading shows:", error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Shows" />

      <div className="max-w-4x1 mt-6 overflow-x-auto">
        <table
          className="w-full border-collapse rounded-md overflow-hidden
text-nowrap"
        >
          <thead>
            <tr className="bg-[var(--color-primary)]/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-[var(--color-primary)]/10
bg-[var(--color-primary)]/5 even:bg-[var(--color-primary)]/10"
              >
                <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                <td className="p-2">{dateFormaat(show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ListShows;
