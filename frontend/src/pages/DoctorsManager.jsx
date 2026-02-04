import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { PlusCircle, Pencil, Trash2, UserRound, Stethoscope } from "lucide-react";

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

const emptyDoctor = {
  name: "",
  specialization: "",
  experience: "",
  designation: "",
  description: "",
  availability_days: [],
  start_time: "",
  end_time: "",
  max_slots_per_day: "",
};

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [editingId, setEditingId] = useState(null);

  /* ---------- Load Doctors ---------- */
  const loadDoctors = async () => {
    const res = await api.get("/doctor/list");
    setDoctors(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  /* ---------- Add / Edit ---------- */
  const openAdd = () => {
    setDoctorForm(emptyDoctor);
    setEditing(false);
    setShowModal(true);
  };

  const openEdit = (doc) => {
    const [start, end] = doc.availability_time?.split("-") || [];

    setDoctorForm({
      ...doc,
      start_time: start || "",
      end_time: end || "",
      availability_days: doc.availability_days || [],
    });

    setEditingId(doc._id);
    setEditing(true);
    setShowModal(true);
  };

  const saveDoctor = async () => {
    try {
      const payload = {
        name: doctorForm.name,
        specialization: doctorForm.specialization,
        designation: doctorForm.designation,
        description: doctorForm.description,
        experience: Number(doctorForm.experience),
        max_slots_per_day: Number(doctorForm.max_slots_per_day),
        availability_days: doctorForm.availability_days,
        availability_time: `${doctorForm.start_time}-${doctorForm.end_time}`,
      };

      if (editing) {
        await api.put(`/doctor/update/${editingId}`, payload);
        toast.success("Doctor updated");
      } else {
        await api.post("/doctor/add", payload);
        toast.success("Doctor added");
      }

      setShowModal(false);
      loadDoctors();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  /* ---------- Delete ---------- */
  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    await api.delete(`/doctor/delete/${id}`);
    toast.success("Doctor deleted");
    loadDoctors();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Stethoscope size={20} className="text-accent" />
          Doctors
        </h3>
        <button
          onClick={openAdd}
          className="bg-accent text-black px-6 py-2 rounded-xl font-semibold flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Add Doctor
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-slate-900/85 p-6 rounded-2xl border border-slate-800 shadow-lg"
          >
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <UserRound size={16} className="text-accent" />
              {doc.name}
            </h4>
            <p className="text-accent text-sm">{doc.specialization}</p>

            <div className="text-sm text-muted mt-3 space-y-1">
              <p>Designation: {doc.designation}</p>
              <p>Experience: {doc.experience} yrs</p>
              <p>Slots/day: {doc.max_slots_per_day}</p>
              <p>Time: {doc.availability_time}</p>
              <p className="text-xs">
                Days: {doc.availability_days.join(", ")}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(doc)}
                className="flex-1 border border-slate-700 py-2 rounded-lg hover:border-accent flex items-center justify-center gap-2"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                onClick={() => deleteDoctor(doc._id)}
                className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 p-8 rounded-2xl w-[460px] max-h-[90vh] overflow-y-auto border border-slate-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              {editing ? "Edit Doctor" : "Add Doctor"}
            </h3>

            {/* Inputs */}
            <input
              className="input mb-3"
              placeholder="Doctor Name"
              value={doctorForm.name}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, name: e.target.value })
              }
            />

            <input
              className="input mb-3"
              placeholder="Specialization"
              value={doctorForm.specialization}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, specialization: e.target.value })
              }
            />

            <input
              className="input mb-3"
              placeholder="Designation"
              value={doctorForm.designation}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, designation: e.target.value })
              }
            />

            <input
              type="number"
              className="input mb-3"
              placeholder="Experience (years)"
              value={doctorForm.experience}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, experience: e.target.value })
              }
            />

            <textarea
              className="input mb-3"
              placeholder="Doctor Description"
              value={doctorForm.description}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, description: e.target.value })
              }
            />

            {/* Days */}
            <div className="mb-4">
              <p className="text-sm mb-2 text-muted">
                Availability Days
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DAYS.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={doctorForm.availability_days.includes(day)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...doctorForm.availability_days, day]
                          : doctorForm.availability_days.filter(
                              (d) => d !== day
                            );

                        setDoctorForm({
                          ...doctorForm,
                          availability_days: updated,
                        });
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="time"
                className="input"
                value={doctorForm.start_time}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    start_time: e.target.value,
                  })
                }
              />
              <input
                type="time"
                className="input"
                value={doctorForm.end_time}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    end_time: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="number"
              className="input mb-5"
              placeholder="Max Slots Per Day"
              value={doctorForm.max_slots_per_day}
              onChange={(e) =>
                setDoctorForm({
                  ...doctorForm,
                  max_slots_per_day: e.target.value,
                })
              }
            />

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={saveDoctor}
                className="flex-1 bg-accent text-black py-2 rounded-lg font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-slate-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
