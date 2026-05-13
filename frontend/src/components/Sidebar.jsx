// components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        ArtistryPro🎨
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {[
          "Dashboard",
          "My Artworks",
          "Orders",
          "Earnings",
          "Messages",
          "Profile",
        ].map((item) => (
          <NavLink
            key={item}
            to={`/dashboard/${item.toLowerCase().replace(" ", "")}`}
            className={({ isActive }) =>
              `px-6 py-3 ${
                isActive
                  ? "bg-purple-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;