// src/components/AppointmentDetailModal.jsx
import React from 'react';

function AppointmentDetailModal({ cita, onClose }) {
  const { vitals = [] } = cita;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-2xl w-96 dark:bg-gray-700">
        <h2 className="text-xl font-bold mb-2 text-center">Appointment Detail</h2>
        <p><strong>Date:</strong> {cita.date}</p>
        <p><strong>Hour:</strong> {cita.time}</p>
        <p><strong>Reason:</strong> {cita.motive}</p>
        <p><strong>Appointment State:</strong> {cita.state}</p>
        <p><strong>Patient:</strong> {cita.patient_name}</p>
        <p><strong>Doctor:</strong> {cita.doctor_name}</p>

        {/* Sección de Vitals */}
        <div className="mt-4">
          <h3 className="font-semibold">Vitals:</h3>
          {vitals.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No vitals recorded</p>
          ) : (
            vitals.map((v) => (
              <div key={v.id} className="border-b border-gray-300 py-2">
                <p><strong>Registered by:</strong> {v.nurse_name}</p>
                <p><strong>Temp:</strong> {v.temperature} °C</p>
                <p><strong>Blood Pressure:</strong> {v.blood_pressure}</p>
                <p><strong>Heart Rate:</strong> {v.heart_rate} bpm</p>
                <p><strong>Resp. Rate:</strong> {v.respiratory_rate} rpm</p>
                <p><strong>O2 Sat:</strong> {v.oxygen_saturation}%</p>
                <p><strong>Notes:</strong> {v.notes}</p>
                <p className="text-sm text-gray-500">Date: {new Date(v.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

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
