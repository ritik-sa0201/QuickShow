import { Link } from "react-router-dom";
import { assets } from "../../src/assets/assets";

function AdminNavbar() {
  return (
    <div className="flex items-center justify-between x-6 md:px-10 h-16 border-b border-gray-300/30">
      <Link to="/">
        <img src={assets.logo} alt="ogo" className="w-36 h-auto" />
      </Link>
    </div>
  );
}

export default AdminNavbar;
