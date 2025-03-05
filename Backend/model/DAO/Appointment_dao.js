// /model/DAO/Appointment_dao.js

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
    } else if (role === 'enfermera') {
      // Enfermera ve todas las citas
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
      `;
      values = [];
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
      'Pendient',
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

  static async addVitals(vitalsData) {
    const {
      appointmentId,
      nurseId,
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
      notes
    } = vitalsData;

    const [result] = await pool.query(
      `INSERT INTO vitals (
        appointment_id,
        nurse_id,
        temperature,
        blood_pressure,
        heart_rate,
        respiratory_rate,
        oxygen_saturation,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        appointmentId,
        nurseId,
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
        notes
      ]
    );

    return result.insertId;
  }

  static async getVitalsByAppointment(appointmentId) {
    const [rows] = await pool.query(
      `SELECT
        v.id,
        v.appointment_id,
        v.nurse_id,
        v.temperature,
        v.blood_pressure,
        v.heart_rate,
        v.respiratory_rate,
        v.oxygen_saturation,
        v.notes,
        v.created_at,
        n.name AS nurse_name
      FROM vitals v
      JOIN users n ON v.nurse_id = n.id
      WHERE v.appointment_id = ?
      ORDER BY v.created_at DESC
      `,
      [appointmentId]
    );
    return rows;
  }
}

module.exports = AppointmentDAO;
