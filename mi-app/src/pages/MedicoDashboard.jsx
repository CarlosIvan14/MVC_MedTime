// src/pages/MedicoDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiRefreshCw } from 'react-icons/fi';
import { AiOutlineCheck, AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import AppointmentCard from '../Components/AppointmentCard';
import AppointmentDetailModal from '../Components/AppointmentDetailModal';

function MedicoDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || '';

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/appointments/byUser/${userId}/medico`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleOpenDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setSelectedAppointment(null);
    setShowDetailModal(false);
  };

  const updateAppointmentState = async (appointmentId, newState) => {
    try {
      await fetch(`http://localhost:4000/api/appointments/${appointmentId}/state`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newState })
      });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await fetch(`http://localhost:4000/api/appointments/${appointmentId}`, {
        method: 'DELETE'
      });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const estados = ['Pendient', 'Confirmed', 'Canceled'];

  return (
    <div className="p-4 container">
      <div className="flex items-center justify-between mb-4 container">
        <h1 className="text-3xl font-bold">
            Appointment Board (Doctor) - {userName}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:text-blue-500 dark:hover:text-blue-500 dark:border-none"
        >
          <FiLogOut size={24} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {estados.map((estado) => {
          const citasPorEstado = appointments.filter((c) => c.state === estado);
          return (
            <div key={estado} className="bg-gray-100 p-6 rounded-xl dark:bg-gray-800  ">
              <h2 className="text-xl font-semibold mb-4">{estado}</h2>
              {citasPorEstado.length === 0 && (
                <p className="text-gray-600 dark:text-gray-400">There are no appointments</p>
              )}
              {citasPorEstado.map((cita) => (
                <AppointmentCard
                  key={cita.id}
                  cita={cita}
                  onDetail={() => handleOpenDetail(cita)}
                >
                  {estado === 'Pendient' && (
                    <>
                      <button
                        onClick={() => updateAppointmentState(cita.id, 'Confirmed')}
                        className="mr-2 bg-transparent hover:text-blue-500 px-5 "
                      >
                        <AiOutlineCheck size={20} />
                      </button>
                      <button
                        onClick={() => updateAppointmentState(cita.id, 'Canceled')}
                        className="bg-transparent hover:text-blue-500 px-5"
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </>
                  )}
                  {estado === 'Confirmed' && (
                    <button
                      onClick={() => updateAppointmentState(cita.id, 'Canceled')}
                      className="bg-transparent hover:text-blue-500 px-5"
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  )}
                  {estado === 'Canceled' && (
                    <>
                      <button
                        onClick={() => updateAppointmentState(cita.id, 'Pendient')}
                        className="mr-2 bg-transparent hover:text-blue-500 px-5"
                      >
                        <FiRefreshCw size={20} />
                      </button>
                      <button
                        onClick={() => deleteAppointment(cita.id)}
                        className="bg-transparent hover:text-red-500 px-5"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </>
                  )}
                </AppointmentCard>
              ))}
            </div>
          );
        })}
      </div>

      {showDetailModal && selectedAppointment && (
        <AppointmentDetailModal
          cita={selectedAppointment}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default MedicoDashboard;
