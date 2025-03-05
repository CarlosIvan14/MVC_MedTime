const pool = require('../db');
const Doctor = require('../Doctor');

class DoctorDAO {
    static async getDoctorById(id) {
        const [rows] = await pool.query(
            `SELECT id, name, specialty, email 
             FROM users 
             WHERE id = ? AND role = 'medico'`,
            [id]
        );
        return rows.length ? Doctor.fromDAO(rows[0]) : null;
    }

    static async getAllDoctors() {
        const [rows] = await pool.query(
            `SELECT id, name, specialty, email 
             FROM users 
             WHERE role = 'medico'`
        );
        return rows;
    }

    static async getDoctorsBySpecialty(specialty) {
        const [rows] = await pool.query(
            `SELECT id, name, specialty, email 
             FROM users 
             WHERE role = 'medico' AND specialty = ?`,
            [specialty]
        );
        return rows;
    }

    static async createDoctor(doctorData) {
      const doctor = new Doctor(
          null,
          doctorData.name,
          doctorData.specialty,
          doctorData.email
      );
  
      const [result] = await pool.query(
          `INSERT INTO users (name, specialty, email, role) 
           VALUES (?, ?, ?, ?, ?)`,
          [
              doctor.name,
              doctor.specialty,
              doctor.email,
              'medico',
              
          ]
      );
      
      doctor.id = result.insertId;
      return {
          id: doctor.id,
          name: doctor.name,
          role: doctor.role,
          specialty: doctor.specialty,
          email: doctor.email
      };
  }

    

    static async updateDoctor(id, doctorData) {
        const [result] = await pool.query(
            `UPDATE users 
             SET name = ?, specialty = ?, email = ? 
             WHERE id = ? AND role = 'medico'`,
            [doctorData.name, doctorData.specialty, doctorData.email, id]
        );
        return result.affectedRows;
    }

    static async deleteDoctor(id) {
        const [result] = await pool.query(
            `DELETE FROM users 
             WHERE id = ? AND role = 'medico'`,
            [id]
        );
        return result.affectedRows;
    }

    static async getDoctorAppointments(doctorId) {
        const [rows] = await pool.query(
            `SELECT 
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
             WHERE a.doctor_id = ?`,
            [doctorId]
        );
        return rows;
    }
}

module.exports = DoctorDAO;