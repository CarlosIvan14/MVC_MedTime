const express = require('express');
const router = express.Router();
const pool = require('../db');
const DoctorDAO = require('../model/DAO/Doctor_dao');
const PatientDAO = require('../model/DAO/Patient_Dao');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];
    res.json({
      id: user.id,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
router.get('/getDoctors', async (req, res) => {
  try {
    const doctors = await DoctorDAO.getAllDoctors();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener médicos' });
  }
});

router.post('/createDoctor', async (req, res) => {
  try {
      const doctorData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password 
      };

      const newDoctor = await DoctorDAO.createDoctor(doctorData);
      res.json({
          message: 'Doctor creado exitosamente',
          doctor: newDoctor
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear doctor' });
  }
});

router.post('/createPatient', async (req, res) => {
  try {
      const patientData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      };

      const newPatient = await PatientDAO.createPatient(patientData);
      res.json({
          message: 'Paciente creado exitosamente',
          patient: newPatient
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear paciente' });
  }
});

module.exports = router;
