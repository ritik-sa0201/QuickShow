import { assets } from "../src/assets/assets";

function Footer() {
  return (
    <footer className="  px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img className="w-36 h-auto" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            QuickShow is your one-stop destination for a seamless and
            lightning-fast movie ticket booking experience. Whether you’re
            planning a weekend with friends or a spontaneous solo movie night.{" "}
          </p>
          <div className="flex items-center gap-2 mt-4"></div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Movies</a>
              </li>
              <li>
                <a href="#">My Bookings</a>
              </li>
              <li>
                <a href="#">Faviourites</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">This website is built by</h2>
            <div className="text-sm space-y-2">
              <p>Ritik Saini</p>
              <p>ritik.sainicoding@gmail.com</p>
              <p>+91 8929892878</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © QuickShow. All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer;
