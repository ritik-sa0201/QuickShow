import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Button from "./Button";
import BlurCircle from "./BlurCircle";
import { assets, dummyShowsData } from "../src/assets/assets";
import { useAppContext } from "../src/context/AppContext";

function NowShowing() {
  const navigate = useNavigate();
  const { shows } = useAppContext();
  return (
    <div
      className="min-h-screen w-screen px-20 py-15
    flex flex-col items-center gap-10
    "
    >
      <div className="w-[80vw] flex flex-row items-center justify-between">
        <p>Now Showing</p>
        <Link
          to="/movies"
          className="flex flex-row gap-1 items-center
          "
        >
          View All
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {shows.slice(0, 4).map((show) => (
          <MovieCard movie={show} key={show._id} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/movies");
        }}
      >
        Show More
      </Button>
    </div>
  );
}

export default NowShowing;
