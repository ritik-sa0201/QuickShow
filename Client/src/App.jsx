import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Moviedetails from "../pages/Moviedetails";
import SeatLayout from "../pages/SeatLayout";
import Movie from "../pages/Movie";
import Faviourite from "../pages/Faviourite";
import MyBooking from "../pages/MyBooking";
import Layout from "../pages/admin/Layout";
import Dashboard from "../pages/admin/Dashboard";
import ListShows from "../pages/admin/ListShows";
import ListBookings from "../pages/admin/ListBookings";
import AddShows from "../pages/admin/AddShows";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  const isAdmin = useLocation().pathname.startsWith("/admin");
  const { user } = useAppContext();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:id" element={<Moviedetails />} />
        <Route path="/movie/:id/:date" element={<SeatLayout />} />
        <Route path="/faviourites" element={<Faviourite />} />
        <Route path="/mybookings" element={<MyBooking />} />
        <Route
          path="/admin/*"
          element={
            user ? (
              <Layout />
            ) : (
              <div className="flex justify-center items-center ">
                <SignIn fallbackRedirectUrl={"/admin"} />
              </div>
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
