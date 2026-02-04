import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { CalendarDays, LoaderCircle, UserRound, ClipboardList, Stethoscope } from "lucide-react";

export default function AppointmentsManager() {
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD APPOINTMENTS ---------------- */
  const loadAppointments = async () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/appointment/hospital", {
        params: { date },
      });
      setAppointments(res.data);
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GROUP BY DOCTOR ---------------- */
  const grouped = appointments.reduce((acc, a) => {
    if (!acc[a.doctor_name]) {
      acc[a.doctor_name] = [];
    }
    acc[a.doctor_name].push(a);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl">
      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList size={20} className="text-accent" />
        Appointments
      </h2>

      {/* DATE PICKER */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="text-xs text-muted flex items-center gap-2 mb-2">
            <CalendarDays size={14} />
            Select date
          </label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={loadAppointments}
          className="bg-accent text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 h-11 self-end"
        >
          <Stethoscope size={16} />
          Load Appointments
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-muted flex items-center gap-2">
          <LoaderCircle size={14} className="animate-spin" />
          Loading appointments...
        </p>
      )}

      {/* NO DATA */}
      {!loading && Object.keys(grouped).length === 0 && (
        <p className="text-sm text-muted">
          No appointments found for selected date
        </p>
      )}

      {/* DOCTOR CARDS */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([doctor, list]) => (
          <div
            key={doctor}
            className="bg-slate-900/85 p-6 rounded-2xl border border-slate-800 shadow-lg"
          >
            {/* DOCTOR HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                🩺 Dr. {doctor}
              </h3>
              <span className="text-sm text-muted">
                Total Booked: {list.length}
              </span>
            </div>

            {/* PATIENT LIST */}
            <div className="space-y-3">
              {list.map((a) => (
                <div
                  key={a._id}
                  className="bg-slate-800 p-4 rounded-xl text-sm"
                >
                  <div className="flex justify-between">
                    <span className="font-medium flex items-center gap-2">
                      <UserRound size={14} />
                      {a.patient_name}
                    </span>
                    <span className="text-muted">
                      {a.date}
                    </span>
                  </div>

                  <p className="text-xs text-muted mt-2">
                    🧾 Problem: {a.problem || "Not specified"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
