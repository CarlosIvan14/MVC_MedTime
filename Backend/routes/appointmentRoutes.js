const express = require('express');
const router = express.Router();
const pool = require('../db');

/// Ruta para obtener citas por rol y usuario
router.get('/byUser/:userId/:role', async (req, res) => {
    try {
      const { userId, role } = req.params;
  
      let query = '';
      let values = [userId]; // el valor para el WHERE
  
      // Construimos la consulta con JOIN a la tabla de usuarios
      // para sacar los nombres de paciente (p) y doctor (d)
      if (role === 'medico') {
        query = `
          SELECT 
            a.id,
            DATE_FORMAT(a.date, '%Y-%m-%d') AS date,  
            a.time,
            a.motive,
            a.state,
            a.patient_id,
            p.name AS patient_name,
            a.doctor_id,
            d.name AS doctor_name
          FROM appointments a
          JOIN users p ON a.patient_id = p.id
          JOIN users d ON a.doctor_id = d.id
          WHERE a.doctor_id = ?
        `;
      } else if (role === 'paciente') {
        query = `
          SELECT 
            a.id,
            DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
            a.time,
            a.motive,
            a.state,
            a.patient_id,
            p.name AS patient_name,
            a.doctor_id,
            d.name AS doctor_name
          FROM appointments a
          JOIN users p ON a.patient_id = p.id
          JOIN users d ON a.doctor_id = d.id
          WHERE a.patient_id = ?
        `;
      } else {
        // Si no es ni medico ni paciente, retornar vacío o error
        return res.json([]);
      }
  
      const [rows] = await pool.query(query, values);
      res.json(rows);
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

    const [result] = await pool.query(
      'UPDATE appointments SET state = ? WHERE id = ?',
      [newState, appointmentId]
    );

    if (result.affectedRows === 0) {
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
    const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [
      appointmentId,
    ]);

    if (result.affectedRows === 0) {
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
    // Por defecto el estado queda en 'Pendiente'
    const [result] = await pool.query(
      `INSERT INTO appointments (date, time, motive, state, patient_id, doctor_id)
       VALUES (?, ?, ?, 'Pendient', ?, ?)`,
      [date, time, motive, patientId, doctorId]
    );
    res.json({ message: 'Cita creada', appointmentId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear cita' });
  }
});

module.exports = router;
