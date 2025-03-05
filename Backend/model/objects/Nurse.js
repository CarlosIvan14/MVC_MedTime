// Nurse.js
class Nurse {
    constructor(id, name, email = null) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = 'enfermera';
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        role: this.role
      };
    }
  
    static fromDAO(daoResult) {
      return new Nurse(
        daoResult.id,
        daoResult.name,
        daoResult.email
      );
    }
  }
  
  module.exports = Nurse;
  