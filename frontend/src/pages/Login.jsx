import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogIn, User, Hospital } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({});
  const [role, setRole] = useState("patient"); // 🔥 ADD ROLE STATE
  const navigate = useNavigate();

  const login = async () => {
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    const loading = toast.loading("Logging in...");
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
        role: role,               // 🔥 SEND ROLE
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful", { id: loading });

      if (res.data.role === "hospital") {
        navigate("/hospital-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast.dismiss(loading);

      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 400) {
        toast.error("Invalid role selected");
      } else {
        toast.error("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/85 p-10 rounded-2xl w-[420px] shadow-xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <LogIn size={20} className="text-accent" />
          Welcome Back
        </h2>
        <p className="text-muted text-sm mb-6">
          Login to your account 🔐
        </p>

        {/* 🔥 ROLE SELECTOR */}
        <select
          className="input mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient Login 👤</option>
          <option value="hospital">Hospital Login 🏥</option>
        </select>

        <input
          className="input mb-4"
          placeholder="Email ✉️"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="input mb-4"
          placeholder="Password 🔑"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={login}
          className="w-full bg-accent text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <User size={16} />
          Login
        </button>

        <p className="text-sm text-muted mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-accent hover:underline font-medium"
          >
            Register <Hospital size={14} className="inline" />
          </Link>
        </p>
      </div>
    </div>
  );
}
