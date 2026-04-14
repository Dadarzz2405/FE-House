import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import api from "../../../API/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/login", { username, password });
      const data = res.data;
      if (data.role === "admin") navigate("/admindb");
      else if (data.role === "captain") navigate("/captaindb");
      else setError("Unknown user role");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response)
        setError(err.response.data?.error || "Invalid username or password");
      else if (err.request)
        setError("Cannot connect to server. Please check your connection.");
      else setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar activatedPage="/login" />
      <div className="flex justify-center items-center min-h-[calc(100vh-50px)] bg-gray-100 p-5">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md border-2 border-gray-200">
          <h2 className="text-center text-3xl font-bold text-[#003876] mb-8">
            Login
          </h2>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-300 rounded p-3 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[#003876] text-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                className="p-3 border-2 border-gray-300 rounded-md text-base focus:outline-none focus:border-[#003876]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[#003876] text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="p-3 border-2 border-gray-300 rounded-md text-base focus:outline-none focus:border-[#003876]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="p-4 bg-[#003876] text-white rounded-md font-semibold text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#005ca8] transition-colors"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-md border-l-4 border-[#D4AF37]">
            <p className="font-semibold text-[#003876] text-sm mb-2">
              Test Credentials:
            </p>
            <p className="text-xs text-gray-500 font-mono my-1">
              Admin: admin / tes123
            </p>
            <p className="text-xs text-gray-500 font-mono my-1">
              Captain: ghuraab / tes123
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
