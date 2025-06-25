import { StarIcon, Dot, HeartIcon } from "lucide-react";
import formatDate from "../lib/formatDate";
import formatRunTime from "../lib/formatRuntime";
import Button2 from "./Button2";
import { useNavigate } from "react-router-dom";
import Cast from "./Cast";
import dayjs from "dayjs";
import YouTubePlayer from "react-player/youtube";
import { useRef, useState } from "react";

function FirstMovie({ movie }) {
  const dateRef = useRef(null);

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const dates = [
    dayjs().add(0, "day"),
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
    dayjs().add(3, "day"),
    dayjs().add(4, "day"),
    dayjs().add(5, "day"),
    dayjs().add(6, "day"),
  ];
  const handleBookNow = () => {
    if (selectedDate) {
      const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
      navigate(`/movie/${movie._id}/${formatted}`);
    } else {
      alert("Please select a date before booking!");
    }
  };

  return (
    <div className=" flex flex-col p-40  gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="h-[400px] w-[400px] md:w-[300px] rounded-2xl object-cover object-center"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-[var(--color-primary)] opacity-80">
            English
          </h2>
          <h1 className="text-5xl font-semibold">{movie.title}</h1>
          <div className="flex flex-row gap-2 text-slate-400 items-center">
            <StarIcon className="text-yellow-300" />
            <span>{movie.vote_average.toFixed(1)}</span>
            <span>User Ratings</span>
          </div>

          <p className="w-[500px]">{movie.overview}</p>
          <div className="flex flex-row gap-1 font-light text-slate-400 items-center">
            <span className="flex flex-row items-center gap-1">
              {formatDate(movie.release_date)} <Dot />
            </span>

            <span className="flex flex-row items-center gap-1">
              {movie.genres.map((genre, i) => (
                <span key={i}>
                  {genre.name}
                  {i != movie.genres.length - 1 && " |"}
                </span>
              ))}
              <Dot />
            </span>

            <span className="flex flex-row items-center gap-1">
              {formatRunTime(movie.runtime)}
            </span>
          </div>
          <div className="flex flex-row gap-10 mt-10">
            <Button2 icon="i" color="#4e4747">
              Watch trailer
            </Button2>
            <Button2
              icon2="i"
              color="#f04f40"
              onClick={() => {
                dateRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              Buy tickets
            </Button2>

            <HeartIcon className="translate-y-2" />
          </div>
        </div>
      </div>
      <h1 className="font-semibold text-2xl">Your faviorite cast</h1>
      <div className="flex flex-row gap-8 w-full">
        {movie.casts.slice(0, 7).map((cast, index) => (
          <Cast
            key={cast.id || index}
            source={cast.profile_path}
            name={cast.name}
          />
        ))}
      </div>
      <div
        ref={dateRef}
        className="mt-30 w-full p-6 bg-[#660000]/50 backdrop-blur-md border border-red-800 rounded-xl"
      >
        <h2 className="text-white text-2xl font-semibold mb-4">Choose Date</h2>

        <div className="flex items-center justify-between gap-4">
          {/* Scrollable Dates */}
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pr-4">
            {dates.map((d, i) => {
              const isSelected = selectedDate?.isSame(d, "day");
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`min-w-[70px] text-center border rounded-lg py-2 px-3 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-red-600 border-white text-white font-semibold"
                      : "border-red-600 text-white hover:bg-red-800"
                  }`}
                >
                  <p className="text-xl">{d.format("DD")}</p>
                  <p className="text-sm">{d.format("MMM")}</p>
                </div>
              );
            })}
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="whitespace-nowrap bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded-xl border border-red-500"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstMovie;
