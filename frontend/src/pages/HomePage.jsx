import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Sparkles, CalendarCheck, Mic, Hospital } from "lucide-react";
import logo from "../medislot.png";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="px-10 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-semibold mb-6">
              <Sparkles size={14} />
              AI-assisted booking • Fast & simple
            </div>

            <h1 className="text-5xl font-extrabold leading-tight">
              Smart <span className="text-accent">Appointments</span>
              <br />
              For Better Care
            </h1>

            <p className="mt-6 text-muted max-w-xl">
              Book doctor appointments instantly using text or voice. Hospitals manage doctors, availability,
              and patient flow effortlessly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-xs bg-slate-900/70 border border-slate-800 px-3 py-2 rounded-full">
                🩺 Verified Doctors
              </span>
              <span className="text-xs bg-slate-900/70 border border-slate-800 px-3 py-2 rounded-full">
                📅 Instant Slots
              </span>
              <span className="text-xs bg-slate-900/70 border border-slate-800 px-3 py-2 rounded-full">
                🎤 Voice Friendly
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white/95 p-6 rounded-3xl shadow-2xl border border-slate-200/40">
              <img
                src={logo}
                alt="MediSlot logo"
                className="w-[320px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl">
          {/* Patient CTA */}
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-accent/60 transition">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <CalendarCheck size={18} className="text-accent" />
              For Patients
            </h3>
            <p className="text-muted text-sm mb-4">
              Find doctors, choose slots, and book appointments easily.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-xl font-semibold"
            >
              Book Appointment
              <Mic size={16} />
            </Link>
          </div>

          {/* Hospital CTA */}
          <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-accent/60 transition">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Hospital size={18} className="text-accent" />
              For Hospitals
            </h3>
            <p className="text-muted text-sm mb-4">
              Manage doctors, schedules, and appointments digitally.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-slate-700 px-6 py-3 rounded-xl hover:border-accent"
            >
              Hospital Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
