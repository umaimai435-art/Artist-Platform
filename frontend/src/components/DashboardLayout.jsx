// layouts/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;