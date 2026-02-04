import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import logo from "../medislot.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-6 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="MediSlot"
          className="h-10 w-10 rounded-xl object-contain bg-white/90 p-1"
        />
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brandBlue to-brandGreen bg-clip-text text-transparent">
            MediSlot
          </h1>
          <p className="text-xs text-muted">Smart Appointments. Better Care.</p>
        </div>
      </div>

      <nav className="flex items-center gap-4 text-sm">
        <Link className="hover:text-accent flex items-center gap-2" to="/login">
          <LogIn size={16} />
          Login
        </Link>
        <Link
          className="bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          to="/register"
        >
          <UserPlus size={16} />
          Register
        </Link>
      </nav>
    </header>
  );
}
