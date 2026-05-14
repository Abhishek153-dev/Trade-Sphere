import { useState } from "react";
import apiClient from "../api/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await apiClient.post("/api/auth/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login success");

      navigate("/dashboard"); // 🔥 redirect
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
