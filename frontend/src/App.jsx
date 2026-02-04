import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HospitalDashboard from "./pages/HospitalDashboard";
import UserDashboard from "./pages/UserDashboard";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
