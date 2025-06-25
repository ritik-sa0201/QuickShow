import FrontPage from "../components/FrontPage";
import NowShowing from "../components/NowShowing";
import Trailers from "../components/Trailers";

function Home() {
  return (
    <div className="">
      <FrontPage />
      <NowShowing />
      <Trailers />
    </div>
  );
}

export default Home;
