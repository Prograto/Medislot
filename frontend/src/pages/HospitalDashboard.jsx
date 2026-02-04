import { useState } from "react";
import HospitalSettings from "./HospitalSettings";
import DoctorsManager from "./DoctorsManager";
import AppointmentsManager from "./AppointmentsManager";
import toast from "react-hot-toast";
import { Building2, Settings, Stethoscope, CalendarDays, LogOut } from "lucide-react";

export default function HospitalDashboard() {
  const [tab, setTab] = useState("settings");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out");
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Header row */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Building2 size={22} className="text-accent" />
          Hospital Admin Dashboard
        </h2>

        <button
          onClick={logout}
          className="border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white transition flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setTab("settings")}
          className={`px-5 py-2 rounded-xl font-medium ${
            tab === "settings"
              ? "bg-accent text-black"
              : "border border-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <Settings size={16} />
            Hospital Settings
          </span>
        </button>

        <button
          onClick={() => setTab("doctors")}
          className={`px-5 py-2 rounded-xl font-medium ${
            tab === "doctors"
              ? "bg-accent text-black"
              : "border border-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <Stethoscope size={16} />
            Doctors
          </span>
        </button>

        <button
          onClick={() => setTab("appointments")}
          className={`px-5 py-2 rounded-xl font-medium ${
            tab === "appointments"
              ? "bg-accent text-black"
              : "border border-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <CalendarDays size={16} />
            Appointments
          </span>
        </button>
      </div>

      {tab === "settings" && <HospitalSettings />}
      {tab === "doctors" && <DoctorsManager />}
      {tab === "appointments" && <AppointmentsManager />}
    </div>
  );
}
