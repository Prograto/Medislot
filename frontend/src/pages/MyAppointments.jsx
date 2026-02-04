import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, XCircle } from "lucide-react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get("/appointment/my");
    setAppointments(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    await api.delete(`/appointment/cancel/${id}`);
    toast.success("Appointment cancelled");
    load();
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-accent flex items-center gap-2"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <h2 className="text-3xl font-bold mb-6">
        My Appointments 📅
      </h2>

      <div className="space-y-4">
        {appointments.map((a) => (
          <div
            key={a._id}
            className="bg-slate-900/85 p-6 rounded-2xl border border-slate-800 shadow-lg"
          >
            <p className="flex items-center gap-2">
              <CalendarDays size={14} />
              <b>Date:</b> {a.date}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={14} />
              <b>Time:</b> {a.time_slot}
            </p>
            <p><b>Status:</b> Booked</p>

            <button
              onClick={() => cancel(a._id)}
              className="mt-4 border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <XCircle size={16} />
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
