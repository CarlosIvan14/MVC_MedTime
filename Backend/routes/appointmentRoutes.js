  const express = require('express');
  const router = express.Router();
  const pool = require('../db');
  const AppointmentDAO = require('../model/DAO/Appointment_dao');


  /// Ruta para obtener citas por rol y usuario

  router.get('/byUser/:userId/:role', async (req, res) => {
    try {
      const { userId, role } = req.params;
      const appointments = await AppointmentDAO.getAppointmentsByUser(userId, role);
      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener citas' });
    }
  });
    

  // Actualizar estado de cita
  router.put('/:appointmentId/state', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { newState } = req.body;
      const updatedRows = await AppointmentDAO.updateAppointmentState(appointmentId, newState);

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }

      res.json({ message: 'Estado de cita actualizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar cita' });
    }
  });

  // Borrar cita
  router.delete('/:appointmentId', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const deletedRows = await AppointmentDAO.deleteAppointment(appointmentId);

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }

      res.json({ message: 'Cita eliminada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar cita' });
    }
  });

  // Crear nueva cita
  router.post('/', async (req, res) => {
    try {
      const { date, time, motive, patientId, doctorId } = req.body;
      const appointmentId = await AppointmentDAO.createAppointment(date, time, motive, patientId, doctorId);
      res.json({ message: 'Cita creada', appointmentId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear cita' });
    }
  });

  module.exports = router;
