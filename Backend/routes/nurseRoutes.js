// nurseRoutes.js
const express = require('express');
const router = express.Router();
const NurseDAO = require('../model/DAO/Nurse_dao');

router.get('/', async (req, res) => {
  try {
    const nurses = await NurseDAO.getAllNurses();
    res.json(nurses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener enfermeras' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nurseData = {
      name: req.body.name,
      email: req.body.email
    };
    const newNurse = await NurseDAO.createNurse(nurseData);
    res.json({ message: 'Enfermera creada', nurse: newNurse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear enfermera' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const nurseData = {
      name: req.body.name,
      email: req.body.email
    };
    const updatedRows = await NurseDAO.updateNurse(id, nurseData);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Enfermera no encontrada' });
    }
    res.json({ message: 'Enfermera actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar enfermera' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await NurseDAO.deleteNurse(id);
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Enfermera no encontrada' });
    }
    res.json({ message: 'Enfermera eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar enfermera' });
  }
});

module.exports = router;
