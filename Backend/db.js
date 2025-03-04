const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  // Ajusta según tu configuración XAMPP
  database: 'MVC'
});

module.exports = pool;
