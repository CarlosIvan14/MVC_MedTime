const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ruta de login
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
    // En una app real, aquí harías manejo de tokens o sesión.
    // Para simplificar, devolvemos los datos relevantes del usuario.
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
// Ruta para obtener la lista de médicos
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
          specialty: req.body.specialty,
          email: req.body.email,
          password: req.body.password // Include password for login functionality
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
