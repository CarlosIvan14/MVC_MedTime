// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MedicoDashboard from "../pages/MedicoDashboard";
import PacienteCalendar from "../pages/PacienteCalendar";
import NotFound from "../pages/NotFound";
import EnfermeraDashboard from "../pages/EnfermeraDashboard";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medico/dashboard" element={<MedicoDashboard />} />
        <Route path="/enfermera/dashboard" element={<EnfermeraDashboard />} />
        <Route path="/paciente/calendar" element={<PacienteCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
