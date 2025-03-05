const pool = require('../../db');
const Appointment = require('../objects/Appointment');

class AppointmentDAO {
  static async getAppointmentsByUser(userId, role) {
    let query = '';
    let values = [userId];

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
      return [];
    }

    const [rows] = await pool.query(query, values);
    return rows;
  }

  static async updateAppointmentState(appointmentId, newState) {
    const [result] = await pool.query(
      'UPDATE appointments SET state = ? WHERE id = ?',
      [newState, appointmentId]
    );
    return result.affectedRows;
  }

  static async deleteAppointment(appointmentId) {
    const [result] = await pool.query(
      'DELETE FROM appointments WHERE id = ?',
      [appointmentId]
    );
    return result.affectedRows;
  }

  static async createAppointment(date, time, motive, patientId, doctorId) {
    const appointment = new Appointment(
        null,
        date,
        time,
        motive,
        'Pendiente',
        patientId,
        doctorId
    );

    const [result] = await pool.query(
        `INSERT INTO appointments (date, time, motive, state, patient_id, doctor_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            appointment.date,
            appointment.time,
            appointment.motive,
            appointment.state,
            appointment.patientId,
            appointment.doctorId
        ]
    );
    return result.insertId;
  }
}

module.exports = AppointmentDAO;
