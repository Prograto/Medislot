import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { ArrowLeft, CalendarDays, ClipboardList, BadgeCheck, Info } from "lucide-react";

export default function BookAppointment() {
  const { id } = useParams(); // doctor_id
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(params.get("date") || "");
  const [problem, setProblem] = useState("");
  const [availability, setAvailability] = useState(null);

  /* ---------------- LOAD AVAILABILITY ---------------- */
  useEffect(() => {
    if (!date) return;

    api
      .get("/doctor/public", {
        params: { date },
      })
      .then((res) => {
        const doc = res.data.find((d) => d._id === id);
        if (!doc) return;

        setAvailability({
          total: doc.max_slots_per_day,
          booked: doc.booked_slots_today,
          available: doc.available_slots,
        });
      })
      .catch(() => toast.error("Failed to load availability"));
  }, [date, id]);

  /* ---------------- BOOK ---------------- */
  const book = async () => {
    if (!date || !problem) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.post("/appointment/book", {
        doctor_id: id,
        date,
        problem,
      });

      toast.success("Appointment booked successfully");
      navigate("/my-appointments");
    } catch (e) {
      toast.error(
        e.response?.data?.detail || "No slots available"
      );
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-accent flex items-center gap-2"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList size={20} className="text-accent" />
        Book Appointment
      </h2>

      <label className="text-xs text-muted flex items-center gap-2 mb-2">
        <CalendarDays size={14} />
        Select date
      </label>
      <input
        type="date"
        className="input mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="text-xs text-muted flex items-center gap-2 mb-2">
        <Info size={14} />
        Describe your problem
      </label>
      <textarea
        className="input mb-4"
        placeholder="Describe your problem"
        onChange={(e) => setProblem(e.target.value)}
      />

      {availability && (
        <div className="bg-slate-900/85 p-4 rounded-xl mb-4 border border-slate-800">
          <p>Total Slots: {availability.total}</p>
          <p>Booked: {availability.booked}</p>
          <p className="text-green-400">
            Available: {availability.available}
          </p>
        </div>
      )}

      <button
        onClick={book}
        disabled={!availability || availability.available <= 0}
        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
          availability?.available > 0
            ? "bg-accent text-black"
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        <BadgeCheck size={16} />
        Confirm Booking
      </button>
    </div>
  );
}
