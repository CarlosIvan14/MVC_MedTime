  const express = require('express');
  const router = express.Router();
  const pool = require('../db');
  const AppointmentDAO = require('../model/DAO/Appointment_dao');


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

  router.post('/:appointmentId/vitals', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const {
        nurseId,
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
        notes
      } = req.body;

      const vitalsId = await AppointmentDAO.addVitals({
        appointmentId,
        nurseId,
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
        notes
      });

      res.json({ message: 'Vitals added', vitalsId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding vitals' });
    }
  });

  router.get('/:appointmentId/vitals', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const vitals = await AppointmentDAO.getVitalsByAppointment(appointmentId);
      res.json(vitals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching vitals' });
    }
  });
  module.exports = router;
