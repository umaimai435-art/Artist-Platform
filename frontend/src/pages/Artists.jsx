import StatCard from "../components/StatCard";

const SellerDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

      {/* ===== TOP STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Sales" value="Rs 120,000" />
        <StatCard title="Orders" value="45" />
        <StatCard title="Earnings" value="Rs 95,000" />
        <StatCard title="Artworks" value="12" />
      </div>

      {/* ===== PLACEHOLDER FOR CHART ===== */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <p className="text-gray-500">Chart will be added here</p>
      </div>
    </div>
  );
};

export default SellerDashboard;
