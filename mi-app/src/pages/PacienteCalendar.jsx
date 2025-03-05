// src/pages/PacienteCalendar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import CalendarBoard from '../Components/CalendarBoard';
import AddAppointmentModal from '../Components/AddAppointmentModal';

function PacienteCalendar() {
  const [appointments, setAppointments] = useState([]);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // getMonth() es 0-based
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || '';

  useEffect(() => {
    fetchAppointments();
  }, [currentYear, currentMonth]);

  const fetchAppointments = async () => { 
    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/byUser/${userId}/paciente`
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleOpenAddModal = (day) => {
    setSelectedDay(day);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const goToPreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 container">
        <h1 className="text-2xl font-bold">
            Appointment Calendar - {userName} - {currentYear}-{String(currentMonth).padStart(2, '0')}
        </h1>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="mr-2 bg-transparent hover:text-blue-500"
          >
            <FiLogOut size={24} />
          </button>
          <button
            onClick={goToPreviousMonth}
            className="mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-900 dark:bg-gray-800"
          >
            &lt; 
          </button>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-900 dark:bg-gray-800"
          >
             &gt;
          </button>
        </div>
      </div>

      <CalendarBoard
        appointments={appointments}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onAddAppointment={handleOpenAddModal}
      />

      {showAddModal && (
        <AddAppointmentModal
          dateInfo={{ year: currentYear, month: currentMonth, day: selectedDay }}
          onClose={handleCloseAddModal}
          onAppointmentCreated={fetchAppointments}
        />
      )}
    </div>
  );
}

export default PacienteCalendar;
