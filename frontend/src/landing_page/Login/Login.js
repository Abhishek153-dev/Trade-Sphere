import React, { useState } from "react";
import apiClient from "../../api/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.post("/api/auth/login", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
     

      alert("Login successful!");

      // ✅ REDIRECT
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control mb-3"
              value={data.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control mb-3"
              value={data.password}
              onChange={handleChange}
            />

            <button
              className="btn btn-primary w-100"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
