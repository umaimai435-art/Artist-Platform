import { useState } from "react";

export default function SystemSettings() {
  const [platformFee, setPlatformFee] = useState(10);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const saveSettings = () => {
    alert("System Configurations Updated Successfully!");
  };

  return (
    <div className="p-8 relative z-10 font-sans antialiased text-gray-100">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-white/5 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          System <span className="text-purple-500">Settings</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Configure marketplace metrics and general controls
        </p>
      </div>

      {/* Settings Form Card */}
      <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 max-w-2xl flex flex-col gap-6 shadow-2xl">
        
        {/* Fee Control */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Marketplace Commission Fee (%)
          </label>
          <input 
            type="number" 
            value={platformFee} 
            onChange={(e) => setPlatformFee(e.target.value)}
            className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 w-full transition"
          />
        </div>

        {/* Maintenance Mode Toggle */}
        <div className="flex justify-between items-center bg-black/10 p-4 border border-white/5 rounded-xl">
          <div>
            <p className="text-sm font-semibold text-white">Maintenance Mode</p>
            <p className="text-xs text-gray-400 mt-0.5">Temporarily disable store operations for clients</p>
          </div>
          <input 
            type="checkbox" 
            checked={maintenanceMode}
            onChange={() => setMaintenanceMode(!maintenanceMode)}
            className="w-5 h-5 accent-purple-600 cursor-pointer rounded border-white/10"
          />
        </div>

        {/* Save Button */}
        <button 
          onClick={saveSettings}
          className="w-full mt-2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-purple-600/15 transition-all duration-200"
        >
          Save Settings
        </button>
      </div>

    </div>
  );
}