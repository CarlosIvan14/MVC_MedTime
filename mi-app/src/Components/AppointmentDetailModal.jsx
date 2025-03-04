// src/components/AppointmentDetailModal.jsx
import React from 'react';

function AppointmentDetailModal({ cita, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-2xl w-96 dark:bg-gray-700">
        <h2 className="text-xl font-bold mb-2 text-center">Appointment Detail</h2>
        <p>Date: {cita.date}</p>
        <p>Hour: {cita.time}</p>
        <p>Reason: {cita.motive}</p>
        <p>Apponintment State: {cita.state}</p>
        <p>Patient: {cita.patient_name}</p>
        <p>Doctor: {cita.doctor_name}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-4 px-3 py-1 bg-gray-300 rounded-2xl hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900"  
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailModal;
