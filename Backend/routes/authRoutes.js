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
      const [rows] = await pool.query(
        "SELECT id, name FROM users WHERE role = 'medico'"
      );
      res.json(rows); // Devuelve un array de { id, name }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener médicos' });
    }
  });

module.exports = router;
