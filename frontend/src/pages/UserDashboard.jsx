import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import ChatAssistant from "../components/ChatAssistant";
import {
  Stethoscope,
  ClipboardList,
  LogOut,
  CalendarDays,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function UserDashboard() {
  // 🔥 Today in YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  /* ---------------- LOAD DOCTORS BY DATE ---------------- */
  useEffect(() => {
    api
      .get("/doctor/public", {
        params: { date: selectedDate },
      })
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, [selectedDate]);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  /* ---------------- FILTER ---------------- */
  const filtered = doctors.filter((d) => {
    return (
      (search === "" ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(search.toLowerCase())) &&
      (specialization === "" ||
        d.specialization.toLowerCase().includes(specialization.toLowerCase())) &&
      (hospital === "" ||
        d.hospital_name.toLowerCase().includes(hospital.toLowerCase())) &&
      (location === "" ||
        d.hospital_address?.toLowerCase().includes(location.toLowerCase()))
    );
  });

  /* ---------------- SLOT BADGE ---------------- */
  const slotBadge = (doc) => {
    if (!doc.is_working_today) {
      return (
        <span className="text-xs text-yellow-400">
          Doctor Not Available
        </span>
      );
    }

    if (doc.available_slots <= 0) {
      return (
        <span className="text-xs text-red-500">
          Slots Filled
        </span>
      );
    }

    return (
      <span className="text-xs text-green-400">
        {doc.available_slots} Slots Available
      </span>
    );
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Stethoscope size={22} className="text-accent" />
            Find Doctors
          </h2>
          <p className="text-muted text-sm flex items-center gap-2 mt-1">
            <Sparkles size={14} />
            Filter by date, specialty, and location to book faster.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/my-appointments"
            className="border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <ClipboardList size={16} />
            My Appointments
          </Link>

          <button
            onClick={logout}
            className="border border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* DATE PICKER */}
      <div className="mb-6">
        <label className="text-xs text-muted flex items-center gap-2 mb-2">
          <CalendarDays size={14} />
          Choose date
        </label>
        <input
          type="date"
          value={selectedDate}
          min={today}
          className="input max-w-xs"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <input
          className="input"
          placeholder="Search doctor or specialization 🔍"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input"
          placeholder="Specialization 🧠"
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <input
          className="input"
          placeholder="Hospital 🏥"
          onChange={(e) => setHospital(e.target.value)}
        />
        <input
          className="input"
          placeholder="Location / Area 📍"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* DOCTORS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((doc) => {
          const canBook =
            doc.is_working_today && doc.available_slots > 0;

          return (
            <div
              key={doc._id}
              className="bg-slate-900/85 p-6 rounded-2xl border border-slate-800 hover:border-accent transition shadow-lg"
            >
              <p className="text-xs text-muted mb-1 flex items-center gap-2">
                <Building2 size={14} />
                {doc.hospital_name}
              </p>

              <h3 className="text-xl font-semibold">{doc.name}</h3>
              <p className="text-accent text-sm">{doc.specialization}</p>

              <p className="text-xs text-muted mt-1 flex items-center gap-2">
                <MapPin size={14} />
                {doc.hospital_address}
              </p>

              <div className="mt-2">{slotBadge(doc)}</div>

              <p className="text-xs text-muted mt-2">
                ⏰ Doctor: {doc.availability_time}
              </p>

              <p className="text-xs text-muted">
                🕘 Hospital: {doc.hospital_morning_time} /{" "}
                {doc.hospital_evening_time}
              </p>

              <p className="text-sm font-medium mt-2">
                💰 Fee: ₹{doc.hospital_fee}
              </p>

              <p className="text-xs text-muted">
                Slots: {doc.available_slots} / {doc.max_slots_per_day}
              </p>

              <div className="flex gap-2 mt-4">
                <Link
                  to={`/doctor/${doc._id}`}
                  className="flex-1 border border-slate-700 py-2 rounded-lg text-center"
                >
                  Details
                </Link>

                {canBook ? (
                  <Link
                    to={`/book/${doc._id}?date=${selectedDate}`}
                    className="flex-1 bg-accent text-black py-2 rounded-lg text-center"
                  >
                    Book
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-slate-700 text-slate-400 py-2 rounded-lg cursor-not-allowed"
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ChatAssistant />
    </div>
  );
}
