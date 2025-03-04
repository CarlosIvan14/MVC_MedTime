// src/Components/AppointmentCard.jsx
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

function AppointmentCard({ cita, onDetail, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-3 dark:bg-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold dark:text-blue-400">{cita.motive} - {cita.time}</p>
          <p>Patient: {cita.patient_name}</p>
          <p>Doctor: {cita.doctor_name}</p>
          <p>Date: {cita.date}</p>
        </div>
        <button
          onClick={onDetail}
          className="bg-transparent hover:text-blue-500"
        >
          <AiOutlineEye size={20} />
        </button>
      </div>
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
}

export default AppointmentCard;
