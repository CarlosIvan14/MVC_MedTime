const pool = require('../db');
const Patient = require('../Patient');

class PatientDAO {
    static async getAllPatients() {
        const [rows] = await pool.query(
            'SELECT id, name, email FROM users WHERE role = "paciente"'
        );
        return rows.map(row => Patient.fromDAO(row));
    }

    static async getPatientById(patientId) {
        const [rows] = await pool.query(
            'SELECT id, name, email FROM users WHERE id = ? AND role = "paciente"',
            [patientId]
        );
        return rows.length ? Patient.fromDAO(rows[0]) : null;
    }

    static async createPatient(patientData) {
        const patient = new Patient(
            null,
            patientData.name,
            patientData.email,
            patientData.password
        );

        const [result] = await pool.query(
            `INSERT INTO users (name, email, password, role) 
             VALUES (?, ?, ?, ?)`,
            [
                patient.name,
                patient.email,
                patient.password,
                patient.role
            ]
        );

        patient.id = result.insertId;
        return patient.toJSON();
    }

    static async updatePatient(id, patientData) {
        const [result] = await pool.query(
            `UPDATE users 
             SET name = ?, email = ? 
             WHERE id = ? AND role = "paciente"`,
            [patientData.name, patientData.email, id]
        );
        return result.affectedRows;
    }

    static async deletePatient(id) {
        const [result] = await pool.query(
            'DELETE FROM users WHERE id = ? AND role = "paciente"',
            [id]
        );
        return result.affectedRows;
    }

    static async getPatientAppointments(patientId) {
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
             WHERE a.patient_id = ?`,
            [patientId]
        );
        return rows;
    }
}

module.exports = PatientDAO;