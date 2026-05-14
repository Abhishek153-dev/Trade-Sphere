import { useState } from "react";
import apiClient from "../../api/client";
import { useNavigate } from "react-router-dom";
//import "./Signup.css"; // Create this for custom styles

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validate = () => {
    if (!data.name.trim()) return "Name is required";
    if (!data.email.trim()) return "Email is required";
    if (!data.password) return "Password is required";
    if (data.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await apiClient.post("/api/auth/signup", data);

      if (res.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError("User already exists with this email");
        } else {
          setError(err.response.data.message || "Signup failed");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Open a free account</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Choose a password (min 6 chars)"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
