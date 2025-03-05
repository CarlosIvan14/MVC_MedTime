// NurseDAO.js
const pool = require('../../db');
const Nurse = require('../objects/Nurse');

class NurseDAO {
  static async getNurseById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE id = ? AND role = 'enfermera'`,
      [id]
    );
    return rows.length ? Nurse.fromDAO(rows[0]) : null;
  }

  static async getAllNurses() {
    const [rows] = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE role = 'enfermera'`
    );
    // Puedes devolver directamente rows o mapear a objetos Nurse
    return rows.map(row => Nurse.fromDAO(row));
  }

  static async createNurse(nurseData) {
    const nurse = new Nurse(
      null,
      nurseData.name,
      nurseData.email
    );

    const [result] = await pool.query(
      `INSERT INTO users (name, email, role)
       VALUES (?, ?, ?)`,
      [nurse.name, nurse.email, 'enfermera']
    );

    nurse.id = result.insertId;
    return nurse.toJSON();
  }

  static async updateNurse(id, nurseData) {
    const [result] = await pool.query(
      `UPDATE users
       SET name = ?, email = ?
       WHERE id = ? AND role = 'enfermera'`,
      [nurseData.name, nurseData.email, id]
    );
    return result.affectedRows;
  }

  static async deleteNurse(id) {
    const [result] = await pool.query(
      `DELETE FROM users
       WHERE id = ? AND role = 'enfermera'`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = NurseDAO;
