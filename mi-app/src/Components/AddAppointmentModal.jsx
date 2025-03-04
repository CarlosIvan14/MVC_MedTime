// src/components/AddAppointmentModal.jsx
import React, { useEffect, useState } from 'react';

function AddAppointmentModal({ dateInfo, onClose, onAppointmentCreated }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [motive, setMotive] = useState('');
  const [time, setTime] = useState('09:00');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/getDoctors'); 
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateStr = `${dateInfo.year}-${String(dateInfo.month).padStart(2, '0')}-${String(dateInfo.day).padStart(2, '0')}`;
      await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateStr,
          time,
          motive,
          patientId: userId,
          doctorId: selectedDoctor
        })
      });
      onAppointmentCreated();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl w-96 dark:bg-gray-800 ">
        <h2 className="text-xl font-bold mb-2">
            Schedule Appointment for {dateInfo.year}-{dateInfo.month}-{dateInfo.day}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full border px-4 py-2 dark:bg-gray-700 rounded-full"
            required
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Reason</label>
          <input
            type="text"
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
            className="w-full border px-3 py-2 dark:bg-gray-700 rounded-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Hour</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 dark:bg-gray-700 rounded-full dark:text-white"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="mr-2 px-3 py-1 bg-gray-300  hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-900 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white  hover:bg-blue-600  dark:bg-blue-600 dark:hover:bg-blue-800 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAppointmentModal;
