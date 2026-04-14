import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../API/axios";

const CaptainDashboard = () => {
  const [houseData, setHouseData] = useState(null);
  const [members, setMembers] = useState([]);
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/api/me");
      setCurrentUser(response.data);
      if (response.data.role !== "captain") {
        navigate("/login");
        return;
      }
      loadDashboardData();
    } catch {
      navigate("/login");
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await api.get("/api/captain/dashboard");
      setHouseData(response.data.house);
      setMembers(response.data.members);
      setMyAnnouncements(response.data.my_announcements);
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

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/api/captain/announcements/${id}/delete`);
      showAlert("Announcement deleted successfully", "success");
      loadDashboardData();
    } catch (error) {
      showAlert(error.response?.data?.error || "Failed to delete", "danger");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
    } catch {}
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-[#003876]">Loading...</h2>
      </div>
    );

  const cardClass = "bg-white rounded-xl shadow p-6 mb-8";

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-[#003876] flex justify-between items-center px-8 py-4 shadow">
        <a href="#" className="text-white font-bold text-xl">
          🎖️ Captain Dashboard
        </a>
        <div className="flex items-center gap-4">
          <span className="text-white">
            Welcome, <strong>{currentUser?.name || "Captain"}</strong>
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
        {/* House Banner */}
        {houseData && (
          <div className="bg-gradient-to-br from-[#003876] to-[#005ca8] text-white p-12 rounded-xl text-center mb-8 shadow-lg">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">
              {houseData.name}
            </h2>
            <div className="text-6xl font-bold">{houseData.points}</div>
            <p className="mt-2 opacity-90">Total House Points</p>
            <p className="mt-4 text-lg opacity-80">{houseData.description}</p>
          </div>
        )}

        {alert && (
          <div
            className={`p-4 rounded-lg mb-6 border ${alert.type === "success" ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}`}
          >
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Members */}
          <div className={cardClass}>
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              👥 House Members
            </h2>
            {members.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg text-center border-2 border-gray-200 hover:border-[#003876] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="font-bold text-[#003876]">
                      {member.name}
                    </div>
                    <div className="text-gray-500 text-sm capitalize">
                      {member.role}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 italic py-8">
                No members in your house yet
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className={cardClass}>
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              ⚡ Quick Actions
            </h2>
            <button
              onClick={() => navigate("/createann")}
              className="w-full py-4 bg-[#003876] hover:bg-[#005ca8] text-white rounded-lg font-bold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              📢 Create New Announcement
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Create announcements to communicate with your house members and
              the entire school.
            </p>
          </div>

          {/* My Announcements */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 lg:col-span-2">
            <h2 className="text-[#003876] font-bold text-xl mb-6 pb-3 border-b-2 border-[#D4AF37]">
              📢 My Announcements
            </h2>
            {myAnnouncements.length > 0 ? (
              myAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-gray-50 p-6 rounded-lg mb-4 border-l-4 border-[#003876]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xl font-bold text-[#003876]">
                        {ann.title}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(ann.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm hover:-translate-y-0.5 transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{ann.content}</p>
                  {ann.image_url && (
                    <div className="mt-4 text-center">
                      <img
                        src={ann.image_url}
                        alt="Announcement"
                        className="max-w-full max-h-[400px] rounded-lg shadow"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 italic py-8">
                <p>You haven't posted any announcements yet</p>
                <button
                  onClick={() => navigate("/createann")}
                  className="mt-4 w-full py-4 bg-[#003876] hover:bg-[#005ca8] text-white rounded-lg font-bold transition-all"
                >
                  Create Your First Announcement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDashboard;
