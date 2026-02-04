import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { UserPlus, BadgeCheck } from "lucide-react";

export default function Register() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const register = async () => {
    const endpoint =
      role === "patient"
        ? "/auth/register/patient"
        : "/auth/register/hospital";

    try {
      await api.post(endpoint, form);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/85 p-10 rounded-2xl w-[440px] shadow-xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <UserPlus size={20} className="text-accent" />
          Create Account
        </h2>
        <p className="text-muted mb-6 text-sm">
          Register as a {role} ✨
        </p>

        <select
          className="input mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient 👤</option>
          <option value="hospital">Hospital 🏥</option>
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

        {role === "patient" && (
          <>
            <input
              className="input mb-4"
              placeholder="Username 👤"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <input
              className="input mb-4"
              placeholder="Phone 📞"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </>
        )}

        {role === "hospital" && (
          <>
            <input
              className="input mb-4"
              placeholder="Hospital Name 🏥"
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital_name: e.target.value,
                })
              }
            />
            <input
              className="input mb-4"
              placeholder="Address 📍"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
            <input
              className="input mb-6"
              placeholder="License Number ✅"
              onChange={(e) =>
                setForm({
                  ...form,
                  license_number: e.target.value,
                })
              }
            />
          </>
        )}

        <button
          type="button"
          onClick={register}
          className="w-full bg-accent text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <BadgeCheck size={16} />
          Register
        </button>
      </div>
    </div>
  );
}
