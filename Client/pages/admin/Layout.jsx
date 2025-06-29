import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../src/context/AppContext";
import { useEffect } from "react";
import Loading from "../../components/Loading";

function Layout() {
  const { isAdmin, fetchIsAdmin } = useAppContext();

  useEffect(() => {
    fetchIsAdmin;
  }, []);
  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Layout;
