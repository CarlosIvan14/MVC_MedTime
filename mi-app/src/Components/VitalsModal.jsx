// src/Components/VitalsModal.jsx
import React, { useState } from 'react';

function VitalsModal({ appointmentId, onClose, onVitalsSaved }) {
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    try {
      const nurseId = localStorage.getItem('userId'); 
      const body = {
        appointmentId,
        nurseId,
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
        notes
      };

      await fetch(`http://localhost:4000/api/appointments/${appointmentId}/vitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      onVitalsSaved();
      onClose();
    } catch (error) {
      console.error('Error saving vitals:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-2xl w-96 dark:bg-gray-700">
        <h2 className="text-xl font-bold mb-2 text-center">Register Vitals</h2>

        <label className="block mt-2">Temperature:</label>
        <input
          type="number"
          step="0.1"
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />

        <label className="block mt-2">Blood Pressure:</label>
        <input
          type="text"
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          placeholder="120/80"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />

        <label className="block mt-2">Heart Rate:</label>
        <input
          type="number"
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
        />

        <label className="block mt-2">Respiratory Rate:</label>
        <input
          type="number"
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          value={respiratoryRate}
          onChange={(e) => setRespiratoryRate(e.target.value)}
        />

        <label className="block mt-2">Oxygen Saturation:</label>
        <input
          type="number"
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          value={oxygenSaturation}
          onChange={(e) => setOxygenSaturation(e.target.value)}
        />

        <label className="block mt-2">Notes:</label>
        <textarea
          className="w-full border px-3 py-1 rounded-full dark:text-gray-800"
          rows="2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded-xl hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default VitalsModal;
