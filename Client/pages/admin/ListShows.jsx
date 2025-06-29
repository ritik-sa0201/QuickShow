import { useEffect, useState } from "react";
import { dummyShowsData } from "../../src/assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormaat } from "../../lib/dateFormat";
import { useAppContext } from "../../src/context/AppContext";

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user } = useAppContext();

  const [shows, setShows] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(data.shows || dummyShowsData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading shows:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShows();
    }
  }, [user]);

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
