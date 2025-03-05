class Appointment {
  constructor(id, date, time, motive, state, patientId, doctorId) {
      this.id = id;
      this.date = date;
      this.time = time;
      this.motive = motive;
      this.state = state || 'Pendiente';
      this.patientId = patientId;
      this.doctorId = doctorId;
  }

  toJSON() {
      return {
          id: this.id,
          date: this.date,
          time: this.time,
          motive: this.motive,
          state: this.state,
          patient_id: this.patientId,
          doctor_id: this.doctorId
      };
  }

  static fromDAO(daoResult) {
      return new Appointment(
          daoResult.id,
          daoResult.date,
          daoResult.time,
          daoResult.motive,
          daoResult.state,
          daoResult.patient_id,
          daoResult.doctor_id
      );
  }
}

module.exports = Appointment;