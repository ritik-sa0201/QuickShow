import { ArrowRight, Calendar1Icon, Clock } from "lucide-react";
import { assets } from "../src/assets/assets";
import bgImage from "../src/assets/backgroundImage.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 🔄 Animated Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-scalePulse scale-105 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* 🎬 Foreground Content */}
      <div className="relative z-10 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full text-white">
        <img src={assets.marvelLogo} alt="" className="w-[250px]" />
        <h1 className="text-5xl font-semibold">Guardians</h1>
        <h1 className="text-5xl font-semibold">of the Galaxy</h1>
        <div className="flex flex-row gap-4 items-center justify-center">
          <p>Action | Adventure | Sci-Fi</p>
          <span className="flex flex-row gap-2 items-center justify-center">
            <Calendar1Icon /> 2018
          </span>
          <span className="flex flex-row gap-2 items-center justify-center">
            <Clock /> 2h 8m
          </span>
        </div>
        <p className="max-w-xl">
          In a post-apocalyptic world where cities ride on wheels and consume
          each other to survive, two people meet in London and try to stop a
          conspiracy.
        </p>
        <Button
          onClick={() => {
            navigate("/movies");
          }}
        >
          Explore Movies{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default FrontPage;
