import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData } from "../src/assets/assets";
import FirstMovie from "../components/FirstMovie";
import NowShowing from "../components/NowShowing";

function Moviedetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

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
