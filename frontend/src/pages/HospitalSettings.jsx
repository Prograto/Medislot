import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { CalendarDays, Sun, Moon, BadgeDollarSign } from "lucide-react";

/* ---------- Constants ---------- */
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const emptyHospital = {
  working_days: [],
  morning_start: "",
  morning_end: "",
  evening_start: "",
  evening_end: "",
  hospital_fee: "",
};

export default function HospitalSettings() {
  const [data, setData] = useState(emptyHospital);
  const [loading, setLoading] = useState(true);

  /* ---------- Load Existing Hospital Details ---------- */
  useEffect(() => {
    api
      .get("/hospital/me")
      .then((res) => {
        const h = res.data;

        const [mStart, mEnd] = h.morning_time?.split("-") || [];
        const [eStart, eEnd] = h.evening_time?.split("-") || [];

        setData({
          working_days: h.working_days || [],
          morning_start: mStart || "",
          morning_end: mEnd || "",
          evening_start: eStart || "",
          evening_end: eEnd || "",
          hospital_fee: h.hospital_fee || "",
        });

        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load hospital details");
        setLoading(false);
      });
  }, []);

  /* ---------- Update Hospital ---------- */
  const updateHospital = async () => {
    try {
      const payload = {
        working_days: data.working_days,
        morning_time: `${data.morning_start}-${data.morning_end}`,
        evening_time: `${data.evening_start}-${data.evening_end}`,
        hospital_fee: Number(data.hospital_fee),
      };

      await api.put("/hospital/update", payload);
      toast.success("Hospital details updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-muted">Loading...</p>;
  }

  return (
    <div className="bg-slate-900/85 p-8 rounded-2xl max-w-xl border border-slate-800 shadow-lg">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <CalendarDays size={18} className="text-accent" />
        Hospital Availability & Fees
      </h3>

      {/* Working Days */}
      <div className="mb-6">
        <p className="text-sm mb-2 text-muted flex items-center gap-2">
          <CalendarDays size={14} />
          Working Days
        </p>
        <div className="grid grid-cols-3 gap-2">
          {DAYS.map((day) => (
            <label
              key={day}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={data.working_days.includes(day)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...data.working_days, day]
                    : data.working_days.filter((d) => d !== day);

                  setData({ ...data, working_days: updated });
                }}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Morning Time */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <Sun size={14} />
            Morning Start
          </p>
          <input
            type="time"
            className="input"
            value={data.morning_start}
            onChange={(e) =>
              setData({ ...data, morning_start: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <Sun size={14} />
            Morning End
          </p>
          <input
            type="time"
            className="input"
            value={data.morning_end}
            onChange={(e) =>
              setData({ ...data, morning_end: e.target.value })
            }
          />
        </div>
      </div>

      {/* Evening Time */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <Moon size={14} />
            Evening Start
          </p>
          <input
            type="time"
            className="input"
            value={data.evening_start}
            onChange={(e) =>
              setData({ ...data, evening_start: e.target.value })
            }
          />
        </div>

        <div>
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <Moon size={14} />
            Evening End
          </p>
          <input
            type="time"
            className="input"
            value={data.evening_end}
            onChange={(e) =>
              setData({ ...data, evening_end: e.target.value })
            }
          />
        </div>
      </div>

      {/* Fee */}
      <div className="mb-6">
        <label className="text-sm text-muted mb-2 flex items-center gap-2">
          <BadgeDollarSign size={14} />
          Consultation Fee
        </label>
        <input
          type="number"
          className="input"
          placeholder="Hospital Consultation Fee"
          value={data.hospital_fee}
          onChange={(e) =>
            setData({
              ...data,
              hospital_fee: e.target.value,
            })
          }
        />
      </div>

      {/* Save */}
      <button
        onClick={updateHospital}
        className="bg-accent text-black px-6 py-3 rounded-xl font-semibold"
      >
        Save Changes ✅
      </button>
    </div>
  );
}
