// src/Components/ScheduledAppointmentCard.jsx
import React, { useState } from "react";
import AppointmentDetailModal from "./AppointmentDetailModal";
import { AiOutlineEye } from "react-icons/ai";

function ScheduledAppointmentCard({ cita }) {
  const [showDetail, setShowDetail] = useState(false);
  const [detailedCita, setDetailedCita] = useState(cita);

  const handleOpenDetail = async () => {
    try {
      const resp = await fetch(`http://localhost:4000/api/appointments/${cita.id}/vitals`);
      const vitalsData = await resp.json();
      setDetailedCita({ ...cita, vitals: vitalsData });
    } catch (error) {
      console.error("Error fetching vitals:", error);
      setDetailedCita({ ...cita, vitals: [] });
    }
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-3 flex items-center justify-between">
      <p className="font-bold">Scheduled Appointment</p>
      <button
        onClick={handleOpenDetail}
        className="bg-transparent text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-500"
        style={{ border: "none", cursor: "pointer" }}
      >
        <AiOutlineEye size={24} />
      </button>
      {showDetail && (
        <AppointmentDetailModal cita={detailedCita} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default ScheduledAppointmentCard;
