import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, BadgeDollarSign, Clock, MapPin, Building2, UserRound } from "lucide-react";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [hospital, setHospital] = useState({});

  useEffect(() => {
    api.get("/doctor/public").then((res) => {
      const d = res.data.find((x) => x._id === id);
      setDoctor(d);

      if (d?.hospital_id) {
        api.get(`/hospital/details/${d.hospital_id}`).then((r) =>
          setHospital(r.data)
        );
      }
    });
  }, [id]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const isWorkingToday =
    doctor.availability_days?.includes(today);

  const slotsAvailable =
    doctor.booked_slots_today < doctor.max_slots_per_day;

  const canBook = isWorkingToday && slotsAvailable;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-accent flex items-center gap-2"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Doctor Info */}
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <UserRound size={22} className="text-accent" />
        {doctor.name}
      </h2>
      <p className="text-accent">
        {doctor.specialization}
      </p>
      <p className="text-sm text-muted">
        {doctor.designation} • {doctor.experience} yrs
      </p>

      {/* Availability */}
      <div className="mt-2 text-sm">
        {!isWorkingToday && (
          <span className="text-yellow-400">
            Doctor not available today
          </span>
        )}
        {isWorkingToday && !slotsAvailable && (
          <span className="text-red-500">
            Slots filled today
          </span>
        )}
        {canBook && (
          <span className="text-green-400">
            {doctor.max_slots_per_day -
              doctor.booked_slots_today}{" "}
            slots available
          </span>
        )}
      </div>

      {/* About Doctor */}
      <div className="mt-4 bg-slate-900/85 p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h3 className="font-semibold text-lg mb-2">
          About Doctor 🩺
        </h3>
        <p className="text-sm text-muted">
          {doctor.description}
        </p>
      </div>

      {/* Hospital Details */}
      <div className="mt-6 bg-slate-900/85 p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Building2 size={18} className="text-accent" />
          Hospital Details
        </h3>
        <p className="font-medium">
          {hospital.hospital_name}
        </p>
        <p className="text-sm text-muted flex items-center gap-2">
          <MapPin size={14} />
          {hospital.address}
        </p>

        <div className="mt-3 text-sm">
          <p className="flex items-center gap-2">
            <BadgeDollarSign size={14} />
            Fee: ₹{doctor.hospital_fee}
          </p>
          <p className="text-muted mt-1 flex items-center gap-2">
            <Clock size={14} />
            Morning: {doctor.hospital_morning_time}
          </p>
          <p className="text-muted flex items-center gap-2">
            <Clock size={14} />
            Evening: {doctor.hospital_evening_time}
          </p>
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={() => navigate(`/book/${doctor._id}`)}
        disabled={!canBook}
        className={`mt-6 px-6 py-3 rounded-xl font-semibold ${
          canBook
            ? "bg-accent text-black"
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {canBook ? "Book Appointment" : "Booking Unavailable"}
      </button>
    </div>
  );
}
