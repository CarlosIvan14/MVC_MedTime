const pool = require('../../db');
const Admin = require('../objects/Admin');

class AdminDAO {
    static async getAdminById(id) {
        const [rows] = await pool.query(
            `SELECT id, name, email 
             FROM users 
             WHERE id = ? AND role = 'Admin'`,
            [id]
        );
        return rows.length ? Admin.fromDAO(rows[0]) : null;
    }

    static async getAllAdmins() {
        const [rows] = await pool.query(
            `SELECT id, name, email 
             FROM users 
             WHERE role = 'Admin'`
        );
        return rows;
    }

    static async createAdmin(adminData) {
      const admin = new Admin(
          null,
          adminData.name,
          adminData.email
      );
  
      const [result] = await pool.query(
          `INSERT INTO users (name, email, role) 
           VALUES (?, ?, ?, ?, ?)`,
          [
              admin.name,
              admin.email,
              'medico',
              
          ]
      );
      
      admin.id = result.insertId;
      return {
          id: admin.id,
          name: admin.name,
          role: admin.role,
          email: admin.email
      };
  }

    

    static async updateAdmin(id, adminData) {
        const [result] = await pool.query(
            `UPDATE users 
             SET name = ?, email = ? 
             WHERE id = ? AND role = 'Admin'`,
            [adminData.name, adminData.email, id]
        );
        return result.affectedRows;
    }

    static async deleteAdmin(id) {
        const [result] = await pool.query(
            `DELETE FROM users 
             WHERE id = ? AND role = 'Admin'`,
            [id]
        );
        return result.affectedRows;
    }

}
module.exports = AdminDAO;