import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../API/axios";

const AdminDashboard = () => {
  const [houses, setHouses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [formData, setFormData] = useState({
    house_id: "",
    points: "",
    reason: "",
  });
  const [alert, setAlert] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/api/me");
      setCurrentUser(response.data);
      loadDashboardData();
    } catch {
      navigate("/login");
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await api.get("/api/admin/dashboard");
      setHouses(response.data.houses);
      setRecentTransactions(response.data.recent_transactions);
    } catch {
      showAlert("Failed to load dashboard data", "danger");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddPoints = async () => {
    if (!formData.house_id || !formData.points || !formData.reason)
      return showAlert("Please fill all fields", "danger");
    if (parseInt(formData.points) <= 0)
      return showAlert("Points must be positive", "danger");
    if (!window.confirm(`Add ${formData.points} points?`)) return;
    try {
      const response = await api.post("/api/admin/points/add", formData);
      showAlert(response.data.message, "success");
      loadDashboardData();
      setFormData({ house_id: "", points: "", reason: "" });
    } catch (error) {
      showAlert(
        error.response?.data?.error || "Failed to add points",
        "danger",
      );
    }
  };

  const handleDeductPoints = async () => {
    if (!formData.house_id || !formData.points || !formData.reason)
      return showAlert("Please fill all fields", "danger");
    if (parseInt(formData.points) <= 0)
      return showAlert("Points must be positive", "danger");
    if (!window.confirm(`Deduct ${formData.points} points?`)) return;
    try {
      const response = await api.post("/api/admin/points/deduct", formData);
      showAlert(response.data.message, "success");
      loadDashboardData();
      setFormData({ house_id: "", points: "", reason: "" });
    } catch (error) {
      showAlert(
        error.response?.data?.error || "Failed to deduct points",
        "danger",
      );
    }
  };

  const handleLogoUpload = async (houseId, event) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!allowed.includes(file.type))
      return showAlert("Invalid file type", "danger");
    if (file.size > 5 * 1024 * 1024)
      return showAlert("File too large (max 5MB)", "danger");
    const fd = new FormData();
    fd.append("logo", file);
    try {
      setUploadingLogo(houseId);
      const response = await api.post(`/api/admin/house/${houseId}/logo`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showAlert(response.data.message, "success");
      setHouses((prev) =>
        prev.map((h) =>
          h.id === houseId ? { ...h, logo_url: response.data.url } : h,
        ),
      );
    } catch (error) {
      showAlert(
        error.response?.data?.error || "Failed to upload logo",
        "danger",
      );
    } finally {
      setUploadingLogo(null);
      event.target.value = "";
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
    } catch {}
    navigate("/login");
  };

  const rankBadgeClass = (i) => {
    if (i === 0) return "bg-[#D4AF37] text-[#003876]";
    if (i === 1) return "bg-gray-300 text-[#003876]";
    if (i === 2) return "bg-amber-600 text-white";
    return "bg-gray-500 text-white";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-[#003876]">Loading...</h2>
      </div>
    );

  const inputClass =
    "w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-base focus:outline-none focus:border-[#003876]";
  const labelClass = "block font-semibold text-[#003876] mb-1";
  const cardClass = "bg-white rounded-xl shadow p-6 mb-8";

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-[#003876] flex justify-between items-center px-8 py-4 shadow">
        <a href="#" className="text-white font-bold text-xl">
          🎯 Admin Dashboard
        </a>
        <div className="flex items-center gap-4">
          <span className="text-white">
            Welcome, <strong>{currentUser?.name || "Admin"}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 my-8">
        <div className={`${cardClass}`}>
          <h1 className="text-[#003876] text-2xl font-bold">
            🎯 Admin Dashboard
          </h1>
          <p className="text-gray-500">
            Manage house points and view standings
          </p>
        </div>

        {alert && (
          <div
            className={`p-4 rounded-lg mb-6 border ${alert.type === "success" ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}`}
          >
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Points Management */}
          <div className={cardClass}>
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              📊 Points Management
            </h2>
            <div className="mb-4">
              <label className={labelClass}>Select House</label>
              <select
                name="house_id"
                value={formData.house_id}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Choose a house...</option>
                {houses.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.points} points)
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className={labelClass}>Points Amount</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleInputChange}
                placeholder="Enter points amount"
                min="1"
                className={inputClass}
              />
            </div>
            <div className="mb-4">
              <label className={labelClass}>Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="3"
                placeholder="Why are you adding/deducting points?"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                onClick={handleAddPoints}
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all hover:-translate-y-0.5"
              >
                ➕ Add Points
              </button>
              <button
                onClick={handleDeductPoints}
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all hover:-translate-y-0.5"
              >
                ➖ Deduct Points
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className={cardClass}>
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              📜 Recent Transactions
            </h2>
            {recentTransactions.length > 0 ? (
              <div className="max-h-[450px] overflow-y-auto">
                {recentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#003876]">
                        {t.house.name}
                      </span>
                      <span
                        className={`font-bold text-lg ${t.points_change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {t.points_change > 0 ? "+" : ""}
                        {t.points_change}
                      </span>
                    </div>
                    <p className="text-gray-500 italic text-sm">{t.reason}</p>
                    <p className="text-gray-400 text-xs">
                      by {t.admin.name} •{" "}
                      {new Date(t.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 italic py-8">
                No transactions yet
              </p>
            )}
          </div>

          {/* Logo Management */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 lg:col-span-2">
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              🖼️ Manage House Logos
            </h2>
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#003876] text-white">
                <tr>
                  <th className="p-4 text-left w-48">House</th>
                  <th className="p-4 text-left w-28">Current Logo</th>
                  <th className="p-4 text-left">Upload New Logo</th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house) => (
                  <tr
                    key={house.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <strong>{house.name}</strong>
                      <br />
                      <small className="text-gray-400">
                        {house.points} points
                      </small>
                    </td>
                    <td className="p-4">
                      <img
                        src={house.logo_url}
                        alt={house.name}
                        className="w-20 h-20 object-contain border-2 border-gray-200 rounded-lg p-1"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/80?text=${house.name}`;
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                          onChange={(e) => handleLogoUpload(house.id, e)}
                          disabled={uploadingLogo === house.id}
                          className="text-sm cursor-pointer disabled:cursor-not-allowed"
                        />
                        {uploadingLogo === house.id && (
                          <span className="text-[#003876] font-bold">
                            Uploading...
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Standings */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 lg:col-span-2">
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              🏆 Current House Standings
            </h2>
            <table className="w-full border-collapse">
              <thead className="bg-[#003876] text-white">
                <tr>
                  <th className="p-4 text-left w-20">Rank</th>
                  <th className="p-4 text-left">House Name</th>
                  <th className="p-4 text-left w-28">Points</th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house, index) => (
                  <tr
                    key={house.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span
                        className={`inline-flex w-10 h-10 rounded-full items-center justify-center font-bold ${rankBadgeClass(index)}`}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-4">
                      <strong>{house.name}</strong>
                      <br />
                      <small className="text-gray-400">
                        {house.description}
                      </small>
                    </td>
                    <td className="p-4">
                      <strong className="text-xl text-[#003876]">
                        {house.points}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
