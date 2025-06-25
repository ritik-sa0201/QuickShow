import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import { dummyShowsData } from "../src/assets/assets";

function Faviourite() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full p-30
    flex flex-col items-center gap-10
    "
    >
      <div className="w-[80vw] flex flex-row items-center justify-between">
        <p className="font-bold text-2xl">My faviourites</p>
      </div>

      <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {dummyShowsData.slice(2, 4).map((show) => (
          <MovieCard movie={show} key={show._id} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/movies");
        }}
      >
        Explore More
      </Button>
    </div>
  );
}

export default Faviourite;
