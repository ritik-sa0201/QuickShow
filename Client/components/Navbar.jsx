import { MenuIcon, Search, XIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const logo = "src/assets/logo.svg";
function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false); // scrolling down
      } else {
        setIsNavbarVisible(true); // scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full flex flex-row justify-around items-center p-4 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link to="/">
        <img src={logo} alt="" className="w-36 h-auto" />
      </Link>

      <div className="hidden  sm:flex flex-row gap-7 px-8 p-3 rounded-4xl border-1 border-white backdrop-blur-2xl bg-gray-800 w-fit items-center justify-center ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "font-regular text-white"
          }
          onClick={() => {
            setisOpen(false);
            scrollTo(0, 0);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "font-regular text-white"
          }
          onClick={() => {
            setisOpen(false);
            scrollTo(0, 0);
          }}
        >
          Movies
        </NavLink>
        <NavLink
          to="/mybookings"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "font-regular text-white"
          }
          onClick={() => {
            setisOpen(false);
            scrollTo(0, 0);
          }}
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/faviourites"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "font-regular text-white"
          }
          onClick={() => {
            setisOpen(false);
            scrollTo(0, 0);
          }}
        >
          Faviourites
        </NavLink>
      </div>

      <div className="flex flex-row gap-4 items-center justify-center">
        <Search onClick={() => setShowSearch(!showSearch)} />
        {showSearch && (
          <input className="bg-slate-700 p-1 rounded-2xl border-1 text-white" />
        )}

        {!user ? (
          <button
            className="px-8 py-2 text-white font-semibold rounded-3xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)]
    cursor-pointer 
    "
            onClick={openSignIn}
          >
            Login
          </button>
        ) : (
          <UserButton />
        )}
        {!isOpen ? (
          <MenuIcon
            className="cursor-pointer sm:hidden"
            onClick={() => {
              setisOpen(true);
            }}
          />
        ) : (
          <XIcon
            className="md:hidden cursor-pointer"
            onClick={() => {
              setisOpen(false);
            }}
          />
        )}

        {/* mobile menu  */}
        {isOpen && (
          <div
            className="fixed top-20 left-0 w-full h-full backdrop-blur-2xl  
            flex items-start justify-center p-10
          "
          >
            <div className="  flex flex-col gap-5 p-3 rounded-4xl   w-fit items-center justify-center ">
              <NavLink
                to="/"
                className="font-regular "
                onClick={() => {
                  setisOpen(false);
                  scrollTo(0, 0);
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/movies"
                className="font-regular"
                onClick={() => {
                  setisOpen(false);
                  scrollTo(0, 0);
                }}
              >
                Movies
              </NavLink>
              <NavLink
                to="/mybookings"
                className="font-regular "
                onClick={() => {
                  setisOpen(false);
                  scrollTo(0, 0);
                }}
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/faviourites"
                className="font-regular "
                onClick={() => {
                  setisOpen(false);
                  scrollTo(0, 0);
                }}
              >
                Faviourites
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
