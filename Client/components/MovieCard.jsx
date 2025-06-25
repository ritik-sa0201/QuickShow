import { Dot, Star, StarIcon, Stars } from "lucide-react";
import Button from "./Button";
import formatDate from "../lib/formatDate";
import formatRunTime from "../lib/formatRuntime";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col flex-wrap p-3 rounded-2xl bg-slate-800 gap-4 h-[450px] w-[320px]
    transition-transform duration-300 hover:-translate-y-2
    "
    >
      <img
        src={movie.poster_path}
        className="rounded-2xl h-[200px] object-cover object-center"
      />
      <h1 className="text-2xl font-medium">{movie.title}</h1>
      <div className="flex flex-row gap-1 font-light text-slate-400">
        <p className="flex flex-row gap-1 ">
          {formatDate(movie.release_date)} <Dot />
        </p>
        <span className="flex flex-row gap-1">
          {movie.genres
            .slice(0, 2)
            .map((genre, i) =>
              i != 1 ? <p> {genre.name} |</p> : <p>{genre.name}</p>
            )}
          <Dot />
        </span>
        <p className="flex flex-row gap-1">{formatRunTime(movie.runtime)}</p>
      </div>
      <div className="flex flex-row gap-1 font-light items-center justify-between">
        <Button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
          }}
        >
          Buy tickets
        </Button>
        <p className="flex flex-row gap-1 translate-y-3  text-slate-400 ">
          <StarIcon /> {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
