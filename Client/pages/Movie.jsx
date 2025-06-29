import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Button from "../components/Button";

import { useAppContext } from "../src/context/AppContext";

function Movie() {
  const navigate = useNavigate();
  const { shows } = useAppContext();
  return (
    <div
      className="min-h-screen w-full p-30
    flex flex-col items-center gap-10
    "
    >
      <div className="w-[80vw] flex flex-row items-center justify-between">
        <p className="font-bold text-2xl">Now Showing</p>
      </div>

      <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {shows.map((show) => (
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

export default Movie;
