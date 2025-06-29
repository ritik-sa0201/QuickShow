import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favouriteMovies, setfavouriteMovies] = useState({});
  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const image_baseURL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const fetchisAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/isAdmin", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setIsAdmin(data.isAdmin);
      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access this page.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchisAdmin();
      fetchFaviouriteMovies();
    }
  }, [user]);

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message || "Failed to fetch shows");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchFaviouriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favourites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setfavouriteMovies(data.shows);
      } else {
        toast.error(data.message || "Failed to fetch shows");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    axios,
    fetchisAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favouriteMovies,
    fetchFaviouriteMovies,
    image_baseURL,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
