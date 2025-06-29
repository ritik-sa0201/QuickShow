import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData } from "../src/assets/assets";
import FirstMovie from "../components/FirstMovie";
import NowShowing from "../components/NowShowing";
import { useAppContext } from "../src/context/AppContext";

function Moviedetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const {
    shows,
    axios,
    getToken,
    user,
    image_baseURL,
    fetchFavouriteMovies,
    faviouriteMovies,
    image_base_url,
  } = useAppContext();

  useEffect(() => {
    const numericId = Number(id);
    const data = dummyShowsData.find((movie) => movie.id === numericId);
    setMovieDetails(data);
  }, [id]);

  if (!movieDetails) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen w-full">
      <FirstMovie movie={movieDetails} />
      <NowShowing />
    </div>
  );
}

export default Moviedetails;
